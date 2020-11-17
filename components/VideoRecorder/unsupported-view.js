import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../styles/VideoRecorderView.module.css'

const UnsupportedView = () => (
    <div className={styles.view}>
        <FontAwesomeIcon icon='camera' className={styles.icon} />
        <br />
        <br />
        <div className={styles.viewHeader}>Oh no! You're using an unsupported browser.</div>
        <br />
        <div className={styles.viewText}>Make sure you're using a supported browser, such as Google Chrome or Mozilla Firefox, and that your browser is up-to-date.</div>
    </div>
)

export default UnsupportedView