import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/AllBonds.module.css";

const list = [
    {
        id: 'a',
        icon: 'check-circle',
        name: 'Catherine H.',
        truth1: 'I’m Canadian.',
        truth2: 'I’m allergic to cats.',
        lie: 'I play basketball.'
    },
    {
        id: 'b',
        icon: 'times-circle',
        name: 'Arek D.',
        truth1: 'I’ve hugged Gene Block.',
        truth2: 'My favorite color is orange.',
        lie: 'I love roller-skating.'
    },
];

const AllBonds = () => (
    <ul className={styles.bondUl}>
        <div className={styles.prevText}>
            <p>ALL BONDS</p>
        </div>
        {list.map(item => (
            <li key={item.id}>
                <div className={styles.bondDivider}></div>
                <div className={styles.bondName}>
                    <FontAwesomeIcon icon={item.icon} className={styles.bondIcon} />
                    {item.name}
                </div>
                <div className={styles.flexRow}>
                    <div className={styles.bondTruth}>{item.truth1}</div>
                    <div className={styles.bondTruth}>{item.truth2}</div>
                    <div className={styles.bondLie}>{item.lie}</div>
                </div>
            </li>
        ))}
    </ul>
);

export default AllBonds;