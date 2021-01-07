import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/ResultsBonds.module.css";

/*const list = [
    {
        id: "a",
        icon: "check-circle",
        name: "Catherine H.",
        truth1: "I’m Canadian.",
        truth2: "I’m allergic to cats.",
        lie: "I play basketball.",
    },
    {
        id: "b",
        icon: "times-circle",
        name: "Arek D.",
        truth1: "I’ve hugged Gene Block.",
        truth2: "My favorite color is orange.",
        lie: "I love roller-skating.",
    },
    {
        id: "c",
        icon: "check-circle",
        name: "Catherine H.",
        truth1: "I’m Canadian.",
        truth2: "I’m allergic to cats.",
        lie: "I play basketball.",
    },
    {
        id: "d",
        icon: "check-circle",
        name: "Catherine H.",
        truth1: "I’m Canadian.",
        truth2: "I’m allergic to cats.",
        lie: "I play basketball.",
    },
];*/

export default function ResultsBonds({ list }) {
    return (
        <ul className={styles.ResultsBody}>
            <span className={styles.bondText}>
                <p>ALL BONDS</p>
            </span>
            <div className={styles.ResultsBonds}>
                <span className={styles.bondDivider}></span>
                {list.map((item) => (
                    <li className={styles.bond} key={item.player.id}>
                        <div className={styles.bondDivider}></div>
                        <div className={styles.bondName}>
                            {item.player.name}
                        </div>
                        <div className={styles.flexBox}>
                            <div className={styles.bondTruth}>
                                {item.facts[0].name}
                            </div>
                            <div className={styles.bondTruth}>
                                {item.facts[1].name}
                            </div>
                            <div className={styles.bondLie}>
                                {item.facts[2].name}
                            </div>
                        </div>

                        {/* need to add the connections array from game.js to backend */
                        /*<li key={item.player.id}>
                            <div className={styles.bondDivider}></div>
                            <div className={styles.bondName}>
                                <FontAwesomeIcon icon={item.icon} className={styles.bondIcon} />
                                {item.name}
                            </div>
                            <div className={styles.flexBox}>
                                <div className={styles.bondTruth}>{item.truth1}</div>
                                <div className={styles.bondTruth}>{item.truth2}</div>
                                <div className={styles.bondLie}>{item.lie}</div>
                            </div>
                        </li>*/}
                    </li>
                ))}
            </div>
        </ul>
    );
}
