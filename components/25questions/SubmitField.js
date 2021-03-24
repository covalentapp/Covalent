import React from "react";
import styles from "../../styles/25questions/SubmitField.module.css";

export default function SubmitField({ name, placeholder, type, onChange, style, submitted, maxLength }) {
    return (
        <label>
            <input
                name={name}
                className={styles.field}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                autoComplete="off"
                style={style}
                readOnly={submitted}
                maxLength={maxLength}
            />
        </label>
    );
}
