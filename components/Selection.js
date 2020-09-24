import React, { Component } from 'react';
import styles from '../styles/Selection.module.css';

class Selection extends Component {
    constructor(props) {
        super(props);
        this.player = this.props.player;
        this.choice1 = this.props.choice1;
        this.choice2 = this.props.choice2;
        this.choice3 = this.props.choice3;
    }

    choose(statement) {
        alert(statement);
    }

    render() {
        return (
            <div className={styles.statements}>
                <p>Choose <b>{this.player}'s</b> lie.</p>
                <button className={styles.statementButton} onClick={() => { this.choose(1) }}>{this.choice1}</button>
                <button className={styles.statementButton} onClick={() => { this.choose(2) }}>{this.choice2}</button>
                <button className={styles.statementButton} onClick={() => { this.choose(3) }}>{this.choice3}</button>
            </div>
        );
    }
}

export default Selection;