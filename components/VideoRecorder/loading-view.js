import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../styles/VideoRecorderView.module.css'

const LoadingView = () => (
    <div className={styles.view}>
        <FontAwesomeIcon icon='camera' className={styles.icon} />
        <br />
        <br />
        <div className={styles.viewHeader}>Loading...</div>
    </div>
)

export default LoadingView