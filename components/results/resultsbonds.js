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

export default function ResultsBonds({ list, ownFacts }) {
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
                            <div className={styles.bondTruth} style={{fontWeight: item.facts[0].guessed ? 'bold' : 'normal'}}>
                                {item.facts[0].name}
                            </div>
                            <div className={styles.bondTruth} style={{fontWeight: item.facts[1].guessed ? 'bold' : 'normal'}}>
                                {item.facts[1].name}
                            </div>
                            <div className={styles.bondLie} style={{fontWeight: item.facts[2].guessed ? 'bold' : 'normal'}}>
                                {item.facts[2].name}
                            </div>
                        </div>
                    </li>
                ))}
                <hr />
                <li className={styles.ownBond}>
                    <div className={styles.bondName}>
                    Your 2 Truths and a Lie
                    </div>
                    <div className={styles.flexBox}>
                        <div className={styles.bondTruth}>
                            {ownFacts[0].name}
                        </div>
                        <div className={styles.bondTruth}>
                            {ownFacts[1].name}
                        </div>
                        <div className={styles.bondLie}>
                            {ownFacts[2].name}
                        </div>
                    </div>
                </li>
            </div>
        </ul>
    );
}
