import React, { Component } from "react";
import styles from "../styles/RedirectModal.module.css";

class RedirectModal extends Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        window.location = "https://covalent.app/";
    }
    render() {
        return (
            <div>
                <div className={styles.modal}>
                    <div className={styles.modal-content}>
                        <p>
                            Sorry, you've been removed from the game. Please
                            contact the host to rejoin.
                        </p>
                        <button className={styles.btn} onClick={this.handleClick}>
                            Okay
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}


export default RedirectModal;