import { button } from 'aws-amplify';
import React, { Component } from 'react';
import styles from '../styles/Buttons.module.css';

class SimpleButton extends Component {
    render() {
        return (
            <button className={styles.simpleButton + " " + styles[this.props.type]} onClick={this.props.onClick} style={this.props.style}>
                {this.props.name}
            </button>
        );
    }
}

export default SimpleButton;