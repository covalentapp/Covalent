import React from "react";
import styles from "../styles/Avatar.module.css";
import Jdenticon from "react-jdenticon";
import { motion } from "framer-motion";

/*This file is for the Avatar component for Covalent
@Catherine*/

export default function Avatar(props) {
    return (
        <motion.div
            className={styles.Avatar}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                damping: 10,
                mass: 0.5,
                stiffness: 200,
            }}
        >
            <div className={styles.icon}>
                <Jdenticon value={props.name} />
            </div>
            <h2 className={styles.name}>{props.name}</h2>
        </motion.div>
    );
}
