import React, { Component } from 'react';
import styles from '../styles/Footer.module.css';


class Footer extends Component {
    render() {
        return (
            <div className={styles.footer}>
                <p className={styles.content}>
                    <span id={styles.alignright}><a href="https://twitter.com/covalentapp">Follow us on Twitter!</a></span>
                    <span>&#169; Covalent 2020</span>
                </p>
            </div>
        );
    }
}

export default Footer;