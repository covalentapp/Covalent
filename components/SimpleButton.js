import React, { Component } from 'react';
import styles from '../styles/Buttons.module.css';

class SimpleButton extends Component {
    render() {
        return (
            <button className={styles.simpleButton + " " + styles[this.props.type]} onClick={this.props.onClick} id={this.props.autoWidth ? styles.autoWidth : null}>
                {this.props.name}
            </button>
        );
    }
}

export default SimpleButton;