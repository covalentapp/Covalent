import React from "react";
import styles from "../../styles/landing/LandingGames.module.css";
import SimpleButton from "../SimpleButton";

export default function LandingGames() {
    return (
        <div className={styles.landing}>
            <h1>
                <span id={styles.purple}>Choose</span> from our{" "}
                <span id={styles.purple}>selection</span> of games
            </h1>
            <table className={styles.table}>
                <tr className={styles.column}>
                    <td className={styles.text}>
                        <h2>20 Questions</h2>
                        <p>
                            20 Questions is a fun game where teammates work
                            together asking yes or no questions to the person in
                            the hot seat in order to reveal their secret talent!
                        </p>
                        <h4>Coming Soon</h4>
                    </td>
                    <td>
                        <hr></hr>
                    </td>
                    <td className={styles.text}>
                        <h2>2 Truths &#38; A Lie</h2>
                        <p>
                            2 Truths &#38; A Lie is a quick and easy way to get
                            to know a little about your teammates! In the hot
                            seat, share a couple quick factoids and a believable
                            lie, and try to figure out your teammates' lies when
                            guessing.
                        </p>
                        <SimpleButton
                            name="Play Now"
                            type="purple"
                        ></SimpleButton>
                    </td>
                    <td>
                        <hr></hr>
                    </td>
                    <td className={styles.text}>
                        <h2>Send Us Suggestions</h2>
                        <p>
                            As we continue developing games, we're always
                            looking for feedback so we'd love to get our users'
                            input on what we should create next. Please feel
                            free to send suggestions our way so we can improve
                            and add on new features for all of you!{" "}
                        </p>
                    </td>
                </tr>
            </table>
        </div>
    );
}
