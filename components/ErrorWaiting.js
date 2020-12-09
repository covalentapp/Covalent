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
                    }
                `}</style>
                
                 <div className={styles.errorBlock}>
                 <img src="/images/loading.gif" alt="Logo"/>
                     <div className={styles.errorText}>{this.props.text}</div>
                 </div>
            </div>
        );
    }
}

export default ErrorWaiting;