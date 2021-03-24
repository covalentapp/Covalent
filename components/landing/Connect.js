import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import styles from "../../styles/landing/Connect.module.css";

const origin =
    process.env.NODE_ENV == "production"
        ? "https://covalent.app"
        : "http://localhost:3000";

class Connect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            submitting: false,
            valid: false,
            small: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        let emailInputBox = document.getElementsByClassName(
            styles.emailInput
        )[0];
        if (
            emailInputBox.value == "" ||
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,24}))$/.test(
                emailInputBox.value
            )
        ) {
            emailInputBox.style.boxShadow = "none";
            this.state.valid = true;
        } else {
            emailInputBox.style.boxShadow =
                "0px 0px 11px -2px rgba(255,0,0,0.9)";
            this.state.valid = false;
        }
    }


    async handleSubmit(event) {
        event.preventDefault();
        if (this.state.valid) {
            this.state.submitting = true;
            document.getElementsByClassName(
                styles.emailValidation
            )[0].innerHTML = "SUBMITTING...";
            await fetch(origin + "/api/email?email=" + this.state.value)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        document.getElementsByClassName(
                            styles.emailValidation
                        )[0].innerHTML = "Thank you for subscribing!";
                        setTimeout(() => {
                            document.getElementsByClassName(
                                styles.emailValidation
                            )[0].innerHTML = "";
                        }, 3000);
                    }
                });
        }
    }

    handleResize() {
        this.setState({ small: window.innerWidth / window.innerHeight < 1.6 || window.innerWidth <= 612 });
    }

    componentDidMount() {
        this.setState({ small: window.innerWidth / window.innerHeight < 1.6 || window.innerWidth <= 612 });
        window.addEventListener("resize", this.handleResize);
    }

    render() {
        return (
            <div className={styles.connect}>
                {!this.state.small ?  
                <a
                    href="https://www.producthunt.com/posts/covalent?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-covalent"
                    target="_blank"
                >
                    <img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=282391&theme=light"
                        alt="Covalent - Interactive icebreakers for remote teams | Product Hunt"
                        style={{position: "absolute", right: "10%", width: "25vw", height: "auto", minWidth: 200}}
                        width="250"
                        height="54"
                    />
                </a>
                :
                <a
                    href="https://www.producthunt.com/posts/covalent?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-covalent"
                    target="_blank"
                >
                    <img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=282391&theme=light"
                        alt="Covalent - Interactive icebreakers for remote teams | Product Hunt"
                        style={{width: "20vw", height: "auto", minWidth: 200}}
                        width="250"
                        height="54"
                    />
                </a>
                }
                <h1>
                    Connect with <span>Covalent</span>
                </h1>
                <p className={styles.description}>
                    Covalent is a platform designed to connect you with your
                    peers and teammates to enhance your team’s productivity and
                    virtual workplace environment.
                </p>
                <p className={styles.tellEmail}>
                    Tell us your <b>email</b> and we’ll keep you up to date with
                    the latest additions to Covalent.
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
                    {this.state.submitting ? (
                        <button className={styles.emailSubmit}>
                            <FontAwesomeIcon
                                icon="arrow-circle-right"
                                className={styles.submitIcon}
                            />
                        </button>
                    ) : (
                        <button className={styles.emailSubmit} type="submit">
                            <FontAwesomeIcon
                                icon="arrow-circle-right"
                                className={styles.submitIcon}
                            />
                        </button>
                    )}
                </form>
                <p className={styles.emailValidation}></p>
            </div>
        );
    }
}

export default Connect;
