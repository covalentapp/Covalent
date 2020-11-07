import React, { Component } from "react";
import styles from "../styles/Error404.module.css";
import log from "./public/images/partial-logo.png";

class Error404 extends Component {
    render () {
        return (
            <div className={styles.error404}>
                <img src={logo} alt="Partial Logo"/>
                <div className={styles.error-block}>
                    <h2 className={styles.error-number}>Error 404</h2>
                    <h2 className={styles.error-text}>Covalent couldn't find that bond.</h2>
                    <a href="https://covalent.app/" className={styles.error-link}>GO BACK</a>
                </div>
            </div>
        );
    }
}

export default Error404;