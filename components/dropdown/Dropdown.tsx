"use client";

import React, { useState } from "react";
import styles from "./dropdown.module.scss";

interface DropdownProps {
  label?: string;
  value?: string;
  options: { value: string; label: string }[];
  errorText?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  errorText,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  name,
  id,
  className,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className={`${styles.dropdownContainer} ${className || ""}`}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
      <select
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled}
        className={`${styles.dropdown} ${errorText ? styles.error : ""}`}
        name={name}
        id={id}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorText && <span className={styles.errorText}>{errorText}</span>}
    </div>
  );
};

export default Dropdown;
