import React, { Component } from "react";
import styles from "../styles/ErrorWaiting.module.css";
import Link from "next/link";

class ErrorWaiting extends Component {
    render () {
        return (
            <div className={styles.ErrorWaiting}>
                <style jsx global>{`
                    img {
                        width: calc(50px + 15vmin);
                        height: auto;
                        position: absolute;
                        top: 35%;
                        left: 50%;
                        right: -50%;
                        transform: translate(-50%, -50%);
                    }
                `}</style>
                <img src="/images/loading.gif" alt="Logo"/>
                 <div className={styles.errorBlock}>
                     <h3 className={styles.errorText}>{this.props.text}</h3>
                 </div>
            </div>
        );
    }
}

export default ErrorWaiting;