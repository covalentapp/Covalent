import React, { Component } from "react";
import styles from "../styles/Error.module.css";
import Link from "next/link";

class Error extends Component {
    render () {
        return (
            <div className={styles.error}>
                <style jsx global>{`
                    img {
                        width: 180px;
                        height: auto;
                        position: absolute;
                        top: 87%;
                        left: 50%;
                        right: -50%;
                        transform: translate(-50%, -50%);
                    }
                `}</style>
                <Link href="/menu"><img src="/images/logo_wordmark.png" style={{cursor: "pointer"}} alt="Partial Logo"/></Link>
                 <div className={styles.errorBlock}>
                     <h2 className={styles.errorText}>{this.props.text}</h2>
                 </div>
            </div>
        );
    }
}

export default Error;