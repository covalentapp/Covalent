import React, { Component } from "react";
import styles from "../styles/Error.module.css";

class Error extends Component {
    render () {
        return (
            <div className={styles.error}>
                <h2>{this.props.text}</h2>
            </div>
        );
    }
}

export default Error;