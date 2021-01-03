import React, { Component } from "react";
import styles from "../styles/RedirectModal.module.css";

class RedirectModal extends Component {
    render () {
        return (
            <div className={styles.RedirectModal}>
                <div className={styles.displayBlock}>
                <h2 className={styles.displayText}>Sorry, you've been removed from the game.</h2>
                </div>
            </div>
        );
    }
}

export default RedirectModal;