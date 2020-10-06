import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import styles from "../../styles/landing/Connect.module.css";

class Connect extends Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert("An email was submitted: " + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className={styles.connect}>
                <h>
                    Connect with <span>Covalent</span>
                </h>
                <p className={styles.description}>
                    Covalent is a platform designed to connect you with your
                    peers and teammates to enhance your team’s productivity and virtual workplace
                    environment.
                </p>
                <p className={styles.tellEmail}>
                    Tell us your <b>email</b> and we’ll keep you up to <br />
                    date with the latest additions to Covalent.
                </p>
                <form className={styles.emailForm} onSubmit={this.handleSubmit}>
                    <label>
                        <input
                            className={styles.emailInput}
                            placeholder="Email"
                            type="email"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </label>
                    <button className={styles.emailSubmit} type="submit">
                        <FontAwesomeIcon icon="arrow-circle-right" className={styles.submitIcon}/>
                    </button>
                </form>
            </div>
        );
    }
}

export default Connect;
