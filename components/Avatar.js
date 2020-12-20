import React from "react";
import styles from "../styles/Avatar.module.css";
import Jdenticon from "react-jdenticon";
import { motion } from "framer-motion";

/*This file is for the Avatar component for Covalent
@Catherine*/

export default function Avatar(props) {
  async function deletePlayer() {
    let res = await fetch(
      `${origin}/api/remove?id=${props.id}&host=${props.host}&player=${props.index}`
    );
    console.log(props.index);
  }
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
      <button onClick={deletePlayer}>delete player</button>
      <h2 className={styles.name}>{props.name}</h2>
    </motion.div>
  );
}
