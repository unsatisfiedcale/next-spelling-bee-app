"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Cell from "@/components/cell/index";
import styles from "@/containers/home/styles.module.css";
import BorderlessInput from "@/components/word-entry/index";
import Timer from "@/components/timer/index";
import turkishData from "@/public/dictionary/turkish.json"; 
import englishData from "@/public/dictionary/english.json";
import Scoreboard from "@/components/scoreboard";


function HomeContainer() {
  const cellCounts = [2, 3, 2];
  const [commonLetter, setCommonLetter] = useState("");
  const [otherLetters, setOtherLetters] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [cellLetters, setCellLetters] = useState({});
  const [isTimerPlaying, setIsTimerPlaying] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0); // Random index state
  const [validationMessage, setValidationMessage] = useState(""); // Geçerlilik mesajı state'i
  const [correctWord, setCorrectWord] = useState(""); // Doğru kelime state'i
  const [score, setScore] = useState(0); // Puan state'i

 useEffect(() => {
  const randomIndex = Math.floor(Math.random() * turkishData.length);
  setRandomIndex(randomIndex);

  const selectedData = turkishData[randomIndex];
  setCommonLetter(selectedData.commonLetter.toUpperCase());

  const shuffledLetters = shuffleArray(selectedData.letters).slice(0, 6);
  setOtherLetters(shuffledLetters);
}, []);

const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [
      shuffledArray[j],
      shuffledArray[i],
    ];
  }
  return shuffledArray;
};

const handleCellClick = useCallback((letter) => {
  setInputValue((prevValue) =>
    (prevValue + letter).toUpperCase().slice(0, 7)
  );
}, []);

const handleInputKeyPress = (event) => {
  if (event.key.match(/[a-zA-Z]/)) {
    setIsTimerPlaying(true);
  }
};

const handleInputChange = () => {
  setIsTimerPlaying(inputValue.length > 0);
};


const handleSubmitWord = () => {
  const selectedData = turkishData[randomIndex];
  const enteredWord = inputValue.toLowerCase();
  if (selectedData.validWords.includes(enteredWord)) {
    console.log(`"${enteredWord}" geçerlidir`);
    setValidationMessage("Geçerli kelime!");
    setInputValue("");
    setCorrectWord(enteredWord);
    updateScore(enteredWord.length);
  } else {
    console.log(`"${enteredWord}" geçerli değildir`);
    setValidationMessage("Geçersiz kelime!");
  }
};

const updateScore = (wordLength) => {
  setScore((prevScore) => prevScore + wordLength);
};

useEffect(() => {
  const timeout = setTimeout(() => {
    setValidationMessage("");
  }, 3000);

  return () => clearTimeout(timeout);
}, [validationMessage]);
  

  const renderHexagonGrid = useCallback(
    (count, rowIndex) => {
      return (
        <div className={styles.hexagonGrid}>
          {[...Array(count)].map((_, cellIndex) => {
            const cellKey = `${rowIndex}-${cellIndex}`;
            let letter = "";

            if (rowIndex === 1 && cellIndex === 1) {
              letter = commonLetter;
            } else if (cellLetters[cellKey]) {
              letter = cellLetters[cellKey];
            } else if (otherLetters.length > 0) {
              letter = otherLetters.shift();
              setCellLetters((prev) => ({ ...prev, [cellKey]: letter }));
            }

            return (
              <Cell
                key={cellIndex}
                isYellow={rowIndex === 1 && cellIndex === 1}
                letter={letter}
                onClick={() => handleCellClick(letter)}
              />
            );
          })}
        </div>
      );
    },
    [commonLetter, otherLetters, handleCellClick, cellLetters]
  );

  const hexagonGrids = useMemo(() => {
    return cellCounts.map((count, index) => (
      <React.Fragment key={index}>
        {renderHexagonGrid(count, index)}
      </React.Fragment>
    ));
  }, [cellCounts, renderHexagonGrid]);

  return (
      

    <div className={styles.container}>
      <div className={styles.hexagonContainer}>
        <div className={styles.timerScoreContainer} style={{ display: 'flex', gap: '20px' }}> {/* Aralarına 20px boşluk ekledik */}
          <Timer isPlaying={isTimerPlaying} />
          <Scoreboard score={score} correctWord={correctWord} />
        </div>
        <div style={{ padding: "7px", display: "flex", flexDirection: "column", alignItems: "center" }}> {/* Timer ve BorderlessInput'ı aynı seviyede tutmak için */}
          <div style={{ marginBottom: "1px" }}> {/* Timer ve BorderlessInput arasındaki boşluk */}
            {validationMessage && (
              <div className={styles.validationMessage} style={{ color: validationMessage.startsWith("Geçerli") ? "green" : "red" }}>
                {validationMessage}
              </div>
            )}
            <BorderlessInput
              value={inputValue}
              onChange={setInputValue}
              onInputKeyPress={handleInputKeyPress} 
              onSubmit={handleSubmitWord}
            />
          </div>
        </div>
        {hexagonGrids}
      </div>
    </div>
  
  );
}

export default HomeContainer;
