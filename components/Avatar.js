import React from "react";
import styles from "../styles/Avatar.module.css";
import Jdenticon from "react-jdenticon";

/*This file is for the Avatar component for Covalent
@Catherine*/

function Avatar(props) {
    return (
        <div className={styles.Avatar}>
            <div className={styles.icon}>
                <Jdenticon size="10vmin" value={props.name} />
            </div>

            <h2 className={styles.name}>{props.name}</h2>
        </div>
    );
}

export default Avatar;
