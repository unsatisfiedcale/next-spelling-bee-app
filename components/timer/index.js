import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import styles from "@/components/timer/styles.module.css";

const Timer = ({ remainingTime }) => {

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  if (remainingTime === 0) {
    return <div className={styles.timer}>Çok geç...</div>;
  }

  return (
    <div className={styles.timer}>
      <div className={styles.text}>Kalan</div>
      <div className={styles.value}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div className={styles.text}>
        {minutes > 0 ? "dakika" : "saniye"}
      </div>
    </div>
  );
};

const TimerComponent = ({ isPlaying }) => {
  const [remainingTime, setRemainingTime] = useState(60); // Başlangıç zamanı

  useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            clearInterval(timer);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer); // Timer durduğunda interval'i temizle
      setRemainingTime(60); // Başlangıç zamanına geri dön
    }
    return () => clearInterval(timer); // Component unmount edildiğinde interval'i temizle
  }, [isPlaying]);

  return (
    <div className="TimerComponent">
      <div className={styles["timer-wrapper"]}>
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={60}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[60, 40, 20, 0]}
          onComplete={() => ({ shouldRepeat: false, delay: 1 })}
        >
          {({ remainingTime }) => <Timer remainingTime={remainingTime} />}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default TimerComponent;