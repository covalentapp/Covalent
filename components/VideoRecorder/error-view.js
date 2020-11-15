import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../styles/ErrorView.module.css'

const ErrorView = () => (
    <div className={styles.errorView}>
        <FontAwesomeIcon icon='camera' className={styles.cameraIcon}/>
        <br />
        <br />
        Oops! There was an <b>error</b> accessing your camera or microphone.
        <br />
        <br />
        Please make sure your browser <b>isn't blocking</b> Covalent's access, then <b>refresh</b> this page!
    </div>
)

export default ErrorView