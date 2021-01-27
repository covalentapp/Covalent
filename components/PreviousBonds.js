import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/PreviousBonds.module.css";

const PreviousBonds = ({ connections }) => (
    <ul className={styles.bondUl}>
        {connections.map((item, index) => (
            <li key={item.id}>
                {index != 0 && <div className={styles.bondDivider}></div>}
                <div className={styles.bondName}>
                    <FontAwesomeIcon icon={item.correct ? 'check-circle' : 'times-circle'} className={styles.bondIcon} />
                    {item.name}
                </div>
                <div className={styles[item.facts[0].valid ? 'bondTruth' : 'bondLie']} style={{ fontWeight: item.facts[0].id == item.chosenId ? "bold" : "normal" }}>{item.facts[0].name}</div>
                <div className={styles[item.facts[1].valid ? 'bondTruth' : 'bondLie']} style={{ fontWeight: item.facts[1].id == item.chosenId ? "bold" : "normal" }}>{item.facts[1].name}</div>
                <div className={styles[item.facts[2].valid ? 'bondTruth' : 'bondLie']} style={{ fontWeight: item.facts[2].id == item.chosenId ? "bold" : "normal" }}>{item.facts[2].name}</div>
            </li>
        ))}
    </ul>
);

export default PreviousBonds;