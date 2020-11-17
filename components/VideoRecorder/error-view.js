import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../styles/VideoRecorderView.module.css'

const ErrorView = () => (
    <div className={styles.view}>
        <FontAwesomeIcon icon='camera' className={styles.icon} />
        <br />
        <br />
        <div className={styles.viewHeader}>Oh no! We can't access your camera or microphone.</div>
        <br />
        <div className={styles.viewText}>Make sure your browser isn't blocking Covalent's access and that other applications aren't using your camera, then refresh this page.</div>
    </div>
)

export default ErrorView