import React from "react";
import styles from "../../styles/Results.module.css";
import SimpleButton from "../SimpleButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export default function ResultsMain({ tricksters, guessers }) {
    return (
        <div className={styles.ResultsBody}>
            <div className={styles.trickstersContainer}>
                <h1>TOP TRICKSTERS</h1>
                <span className={styles.tricksters}>
                    <div className={styles.player} id={styles.first}>
                        <div>
                            <FontAwesomeIcon
                                icon="trophy"
                                className={styles.icon}
                            />
                            <p>{tricksters[0].name}</p>
                        </div>
                        <div className={styles.progressBarBorder}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                    width: tricksters[0].streak + "%",
                                    transition: {
                                        duration: 1,
                                    },
                                }}
                                className={styles.progressBar}
                            />
                            <span>{tricksters[0].score}</span>
                        </div>
                        {/*for percentage following red bar
                            <div className={styles.progressBarBorder}>
                                <div
                                    className={styles.progressBar}
                                    style={
                                        {
                                            width: tricksters[0].streak + '%'
                                        }
                                    }
                                >
                                    <p>{tricksters[0].streak}%</p>
                                </div>
                                            
                                </div>*/}
                    </div>
                    <div className={styles.player} id={styles.second}>
                        <div>
                            <FontAwesomeIcon
                                icon="medal"
                                className={styles.icon}
                            />
                            <p>{tricksters[1].name}</p>
                        </div>
                        <div className={styles.progressBarBorder}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{
                                    width: tricksters[1].streak + "%",
                                    transition: {
                                        duration: 1,
                                    },
                                }}
                                className={styles.progressBar}
                            />
                            <span>{tricksters[1].score}</span>
                        </div>
                    </div>
                    {tricksters[2] && ( // accounts for two person games
                        <div className={styles.player} id={styles.third}>
                            <div>
                                <FontAwesomeIcon
                                    icon="medal"
                                    className={styles.icon}
                                />
                                <p>{tricksters[2].name}</p>
                            </div>
                            <div className={styles.progressBarBorder}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: tricksters[2].streak + "%",
                                        transition: {
                                            duration: 1,
                                        },
                                    }}
                                    className={styles.progressBar}
                                />
                                <span>{tricksters[2].score}</span>
                            </div>
                        </div>
                    )}
                </span>
            </div>
            <hr />
            <div className={styles.guessersContainer}>
                <span className={styles.guessers}>
                    <h1>TOP GUESSERS</h1>
                    <div className={styles.player} id={styles.first}>
                        <div>
                            <FontAwesomeIcon
                                icon="trophy"
                                className={styles.icon}
                            />
                            <p>
                                {guessers[0].name} // {guessers[0].streak}
                            </p>
                            <FontAwesomeIcon
                                icon="check-circle"
                                className={styles.icon}
                            />
                        </div>
                    </div>
                    <div className={styles.player} id={styles.second}>
                        <div>
                            <FontAwesomeIcon
                                icon="trophy"
                                className={styles.icon}
                            />
                            <p>
                                {guessers[1].name} // {guessers[1].streak}
                            </p>
                            <FontAwesomeIcon
                                icon="check-circle"
                                className={styles.icon}
                            />
                        </div>
                    </div>
                    {guessers[2] && (
                        <div className={styles.player} id={styles.third}>
                            <div>
                                <FontAwesomeIcon
                                    icon="trophy"
                                    className={styles.icon}
                                />
                                <p>
                                    {guessers[2].name} // {guessers[2].streak}
                                </p>
                                <FontAwesomeIcon
                                    icon="check-circle"
                                    className={styles.icon}
                                />
                            </div>
                        </div>
                    )}
                </span>
            </div>
        </div>
    );
}
