import React from "react";
import AllBonds from "../components/AllBonds";
import styles from "../styles/Results.module.css";

export default function ResultsBonds({ cookies, error, time }) {
    return (
        <div className={styles.ResultsContainer}>
            <div className={styles.Results}>
                <AllBonds />
            </div>
        </div>
    )
}