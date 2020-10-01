import React, { Component } from "react";
import styles from "../styles/SubmitForm.module.css";

class SubmitForm extends Component {
    render() {
        return (
            <div className={styles.submitForm}>
                <label>
                    <input
                        name="truth1"
                        className={styles.truth}
                        placeholder="TRUTH"
                        type="text"
                        onChange={this.props.onTruthOneChange}
                        autoComplete="off"
                        readOnly={this.props.submitted}
                    />
                </label>
                <br />
                <label>
                    <input
                        name="truth2"
                        className={styles.truth}
                        placeholder="TRUTH"
                        type="text"
                        onChange={this.props.onTruthTwoChange}
                        autoComplete="off"
                        readOnly={this.props.submitted}
                    />
                </label>
                <br />
                <label>
                    <input
                        name="lie"
                        className={styles.lie}
                        placeholder="LIE"
                        type="text"
                        onChange={this.props.onLieChange}
                        autoComplete="off"
                        readOnly={this.props.submitted}
                    />
                </label>
                <br />

                {!this.props.submitted &&
                <button
                    type="submit"
                    className={styles.submitButton}
                    onClick={this.props.onSubmit}
                >SUBMIT</button>
                }

                {this.props.submitted &&
                <h1 className={styles.submitted}>SUBMITTED! WAITING ON TEAMMATES...</h1>
                }
            </div>
        );
    }
}

export default SubmitForm;