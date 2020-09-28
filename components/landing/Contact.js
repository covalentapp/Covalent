import React, { Component } from "react";
import styles from "../../styles/landing/Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const spanStyles = {
    color: "#80FFDB"
}

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = { value: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('An email was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div className={styles.contactBody}>
                <h1>Let's <span style={spanStyles}>keep in touch</span></h1>
                <p>Tell us your <strong>email</strong> and we’ll keep you up to date<br></br>with the latest additions to Covalent.</p>
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

export default Contact;