'use client'
import React, { useState } from 'react';
import styles from '@/components/scoreboard/styles.module.css';

const Scoreboard = ({ score, correctWord }) => {

  const updateScore = () => {
    // Her doğru kelime girişinde, kelimenin uzunluğu kadar puan ekle
    setScore(prevScore => prevScore + correctWord.length);
  };

  return (
    <div className={styles.scoreboard}>
      <h2>Scoreboard</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Current Score</th>
            <th className={styles.th}>Last Word</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`${styles.td} ${styles.score}`}>{score}</td>
            <td className={`${styles.td} ${styles.word}`}>{correctWord}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
