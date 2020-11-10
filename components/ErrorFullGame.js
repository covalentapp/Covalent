import React, { Component } from "react";
import styles from "../styles/ErrorFullGame.module.css";
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
                     <h2 className={styles.errorText}>Sorry, that game is full, or the host has already started it.</h2>
                     <span className={styles.errorLink}>
                        <Link href={this.props.link}>Go join another game!</Link>
                     </span>
                 </div>
            </div>
        );
    }
}

export default ErrorNotFound;