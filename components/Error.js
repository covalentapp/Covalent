import React, { Component } from "react";
import styles from "../styles/Error.module.css";
import Link from "next/link";

class Error extends Component {
    render () {
        return (
            <div className={styles.error}>
                {this.props.noLink ? (
                    <img src="/images/logo_wordmark.png" alt="Partial Logo" />
                ) : (
                    <Link href="/menu">
                        <img
                            src="/images/logo_wordmark.png"
                            style={{ cursor: "pointer" }}
                            alt="Partial Logo"
                        />
                    </Link>
                )}
                 <div className={styles.errorBlock}>
                     <h2 className={styles.errorText}>{this.props.text}</h2>
                 </div>
            </div>
        );
    }
}

export default Error;