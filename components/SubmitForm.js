import styles from "../styles/SubmitForm.module.css";

class SubmitForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            truth1: "",
            truth2: "",
            lie: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        alert('Truth 1: ' + this.state.truth1 + ' / Truth 2: ' + this.state.truth2 + ' / Lie: ' + this.state.lie);
        event.preventDefault();
    }

    render() {
        return (
            <form className={styles.submitForm} onSubmit={this.handleSubmit}>
                <label>
                    <input
                        name="truth1"
                        className={styles.truth}
                        placeholder="TRUTH"
                        type="text"
                        value={this.state.truth1}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    <input
                        name="truth2"
                        className={styles.truth}
                        placeholder="TRUTH"
                        type="text"
                        value={this.state.truth2}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <label>
                    <input
                        name="lie"
                        className={styles.lie}
                        placeholder="LIE"
                        type="text"
                        value={this.state.lie}
                        onChange={this.handleChange}
                    />
                </label>
                <br />
                <input
                    type="submit"
                    className={styles.submitButton}
                    value="SUBMIT"
                />
            </form>
        );
    }
}

export default SubmitForm;