import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../styles/Selection.module.css';

class Selection extends Component {
    render() {
        if (!this.props.results) {
        return (
            <div className={styles.statements}> 
                <p>Choose <b>{this.props.player}'s</b> lie.</p>
                <button className={styles.statementButton + " " + styles[(this.props.selected == "1") && 'selected']} onClick={this.props.onClick1}>{this.props.choice1}</button>
                <button className={styles.statementButton + " " + styles[(this.props.selected == "2") && 'selected']} onClick={this.props.onClick2}>{this.props.choice2}</button>
                <button className={styles.statementButton + " " + styles[(this.props.selected == "3") && 'selected']} onClick={this.props.onClick3}>{this.props.choice3}</button>
                {this.props.selected &&
                <button
                    type="submit"
                    className={styles.submitButton}
                    onClick={this.props.onSubmit}
                >SUBMIT</button>
                }
                {
                !this.props.selected &&
                <p>Choose one!</p>
                }
            </div>
        );
        } else {
            return (
                <div className={styles.statements}> 
                    <p>Results</p>
                    <button className={styles.resultsButton + " " + styles[(this.props.selected == "1") && (this.props.choice1valid ? 'wrong' : 'correct')]}>
                        {this.props.choice1}
                        {this.props.choice1valid && <FontAwesomeIcon icon="check-circle" className={styles.icon} />}
                        {!this.props.choice1valid && <FontAwesomeIcon icon="times-circle" className={styles.icon} />}
                    </button>
                    <button className={styles.resultsButton + " " + styles[(this.props.selected == "2") && (this.props.choice2valid ? 'wrong' : 'correct')]}>
                        {this.props.choice2}
                        {this.props.choice2valid && <FontAwesomeIcon icon="check-circle" className={styles.icon} />}
                        {!this.props.choice2valid && <FontAwesomeIcon icon="times-circle" className={styles.icon} />}
                    </button>
                    <button className={styles.resultsButton + " " + styles[(this.props.selected == "3") && (this.props.choice3valid ? 'wrong' : 'correct')]}>
                        {this.props.choice3}
                        {this.props.choice3valid && <FontAwesomeIcon icon="check-circle" className={styles.icon} />}
                        {!this.props.choice3valid && <FontAwesomeIcon icon="times-circle" className={styles.icon} />}
                    </button>
                    <button
                        type="submit"
                        className={styles.submitButton}
                        onClick={this.props.continue}
                    >CONTINUE</button>
                </div>
            );
        }
    }
}

export default Selection;