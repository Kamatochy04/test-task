"use client";

import React, { useState, useEffect } from "react";
import styles from "./input.module.scss";

interface InputProps {
  label?: string;
  value?: string;
  errorText?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
  name?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  errorText,
  type = "text",
  placeholder,
  onChange,
  disabled = false,
  className,
  name,
  id,
}) => {
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`${styles.inputContainer} ${className || ""}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`${styles.input} ${errorText ? styles.error : ""}`}
        name={name}
        id={id}
      />
      {errorText && <span className={styles.errorText}>{errorText}</span>}
    </div>
  );
};

export default Input;
