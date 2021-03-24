import React, { Component } from "react";
import styles from '../styles/JoinOptions.module.css';

class JoinOptions extends Component {
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
        if (this.state.value.length !== 6) {
            alert("Please enter a valid 6-letter code.");
        } else {
            alert("A code was submitted: " + this.state.value); //eventually link this properly}
        }
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form>
                    <div>
                    <style jsx global>{`
                    #root { 
                    --font-size: 2.75vmin;
                    }
                    @media all and (max-height: 400px) {
                        #root {
                            --font-size: 11px;
                        }
                    }
                    @media all and (max-width: 400px) {
                        #root {
                            --font-size: 11px;
                        }
                    }
                    `}</style>
                        <label className={styles.joinCodeLabel}>
                            CODE:
                            <input
                                placeholder="ABCDEF"
                                className={styles.codeInput}
                                type="text"
                                maxLength="6"
                                value={this.state.value}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

export default JoinOptions;
