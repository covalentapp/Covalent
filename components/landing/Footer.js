import React from 'react';
import styles from '../../styles/landing/Footer.module.css';


export default function Footer(){

        return (
            <div className={styles.footer}>
                <p className={styles.content}>
                    <span id={styles.alignright}><a href="https://twitter.com/covalentapp">Follow us on Twitter!</a></span>
                    <span>&#169; Covalent 2020</span>
                </p>
            </div>
        );

}
