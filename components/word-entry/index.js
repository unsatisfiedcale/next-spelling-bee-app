import React, { useEffect, useRef } from 'react';
import styles from '@/components/word-entry/styles.module.css';

const BorderlessInput = ({ value, onChange, onInputKeyPress, onSubmit, placeholder }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();

    const handleMouseDown = (event) => {
      if (!inputRef.current.contains(event.target)) {
        event.preventDefault();
        inputRef.current.focus();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value.toUpperCase();
    onChange(inputValue.slice(0, 7));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
    onInputKeyPress(event);
  };

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={handleInputChange}
      maxLength={7}
      className={`${styles.borderlessInput} ${styles.customFont}`}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  );
};

export default BorderlessInput;
