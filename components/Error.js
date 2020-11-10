import React, { Component } from "react";
import styles from "../styles/Error.module.css";
import Head from "next/head";

class Error extends Component {
    render () {
        return (
            <div className={styles.error}>
                <style jsx global>{`
                    img {
                        width: 411.08px;
                        height: 423px;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        right: -50%;
                        transform: translate(-50%, -50%);
                    }
                `}</style>
                <img src="/images/partial-logo.png" alt="Partial Logo"/>
                 <div className={styles.errorBlock}>
                     <h2 className={styles.errorText}>{this.props.text}</h2>
                 </div>
            </div>
        );
    }
}

export default Error;