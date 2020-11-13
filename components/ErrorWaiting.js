import React, { Component } from "react";
import styles from "../styles/ErrorWaiting.module.css";
import Link from "next/link";

class ErrorWaiting extends Component {
    render () {
        return (
            <div className={styles.ErrorNotFound}>
                <style jsx global>{`
                    img {
                        width: 250px;
                        height: auto;
                        position: absolute;
                        top: 25%;
                        left: 50%;
                        right: -50%;
                        transform: translate(-50%, -50%);
                    }
                `}</style>
                <img src="/images/logo.svg" alt="Logo"/>
                 <div className={styles.errorBlock}>
                     <h3 className={styles.errorText}>Covalent is creating bonds!</h3>
                     <h3 className={styles.errorText}>Sit tight.</h3>
                     <span className={styles.errorLink}>
                        <Link href={this.props.link}>or join another game.</Link>
                     </span>
                 </div>
            </div>
        );
    }
}

export default ErrorWaiting;