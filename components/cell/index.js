import React from 'react';
import styles from './styles.module.css';

const Cell = ({ isYellow, letter, onClick }) => {
  return (
    <div className={`${styles.cell} ${isYellow ? styles.yellowCell : ''}`} onClick={() => onClick(letter)}>
      {letter && <strong>{letter.toUpperCase()}</strong>}
    </div>
  );
};

export default Cell;
