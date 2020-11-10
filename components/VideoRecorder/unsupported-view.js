import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../../styles/UnsupportedView.module.css'

const UnsupportedView = () => (
    <div className={styles.unsupportedView}>
        <FontAwesomeIcon icon='camera' className={styles.cameraIcon}/>
        <br />
        <br />
        Oops! Looks like you're using an <b>unsupported</b> browser.
        <br />
        <br />
        Please try using <b>Google Chrome</b> or <b>Mozilla Firefox</b>!
    </div>
)

export default UnsupportedView