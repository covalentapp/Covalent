import React from "react";
import styles from "../../styles/landing/Footer.module.css";

export default function Footer() {
    return (
        <div className={styles.footer}>
                <span id={styles.alignright}>
                    <div className={styles.twitter}>
                    <a href="https://twitter.com/covalentapp">
                        Follow us on Twitter!
                    </a>
                    </div>
                    <div>
                    <a href="https://instagram.com/covalentapp?igshid=1xjtnl953g3e6">
                        Follow us on Instagram!
                    </a>
                    </div>
                </span>
                <span className={styles.copyright}>&#169; Covalent 2020</span>
        </div>
    );
}
