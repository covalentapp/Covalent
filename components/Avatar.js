import React, { Component } from 'react';
import styles from '../styles/Avatar.module.css';

/*This file is for the Avatar component for Covalent
@Catherine*/

class Avatar extends Component {

    render() {
        return (
            <div>
                <img src={this.props.img || "/images/avatar.png"} className={styles.avatarPNG} alt="Avatar" />
                <h1 className={styles.name}>{this.props.name}</h1>
            </div>
            );
    }
}

export default Avatar;
