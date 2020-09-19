import React from 'react';
import styles from '../styles/Avatar.module.css';
import Jdenticon from 'react-jdenticon';

/*This file is for the Avatar component for Covalent
@Catherine*/

function Avatar(props){

        return (
            <div>
<svg width="15vmin" height="15vmin" className={styles.size} data-jdenticon-value={props.name}>
</svg>
<h1 className={styles.name}>{props.name}</h1>

            </div>
            );
}

export default Avatar;

