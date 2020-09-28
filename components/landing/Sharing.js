import React from "react";
import styles from "../../styles/Sharing.module.css";

export default function Sharing() {
    return (
        <div className={styles.sharing}>
            <h>
                Sharing <span>memories</span>
                <br />
                and building <span>bonds</span>
            </h>
            <p className={styles.description}>
                Covalent’s simple, intuitive UI and integrated video feed
                provide
                <br />
                for memorable and personal connections.
            </p>
            <img src="images/home.png" className={styles.sharingImg} />
        </div>
    );
}