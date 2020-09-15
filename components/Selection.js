import React, { Component } from 'react';
import styles from '../styles/Selection.module.css';

class Selection extends Component {
    constructor() {
        super(props);
        this.player = "Daniel";
        this.choice1 = "I enjoy using Figma.";
        this.choice2 = "I like pineapple pizza.";
        this.choice3 = "I think BruinLabs is very cool.";
    }

    choose(statement) {
        alert(statement);
    }

    render() {
        return (
            <div className={styles.statements}>
                <p>Choose <b>{this.player}'s</b> lie.</p>
                <button class={styles.statement-button} onClick={() => { this.choose(1) }}>{this.choice1}</button>
                <button class={styles.statement-button} onClick={() => { this.choose(2) }}>{this.choice2}</button>
                <button class={styles.statement-button} onClick={() => { this.choose(3) }}>{this.choice3}</button>
            </div>
        );
    }
}

export default Selection;