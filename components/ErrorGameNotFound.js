import React, { Component } from "react";
import styles from "../styles/ErrorNotFound.module.css";
import Head from "next/head";
import Link from "next/link";

class ErrorNotFound extends Component {
    render () {
        return (
            <div className={styles.ErrorNotFound}>
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
                     <h2 className={styles.errorText}>Sorry, Covalent couldn't find that game.</h2>
                     <h2 className={styles.errorText}>Make sure your host has enabled the game,</h2>
                     <span className={styles.errorLink}>
                        <Link href={this.props.link}>or join another game.</Link>
                     </span>
                 </div>
            </div>
        );
    }
}

export default ErrorNotFound;