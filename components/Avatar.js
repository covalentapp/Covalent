import React from "react";
import styles from "../styles/Avatar.module.css";
import Jdenticon from "react-jdenticon";
import { motion } from "framer-motion";
import { faBorderNone } from "@fortawesome/free-solid-svg-icons";

/*This file is for the Avatar component for Covalent
@Catherine*/

export default function Avatar(props) {
  function DeleteButton(props) {
    if (props.deletePlayer && props.deleteIndex != props.index) {
      return (
        <button
          className={styles.delete}
          id={"delete-" + props.index}
          onClick={() => {
            props.deletePlayer(props.id, props.host, props.index);
          }}
        >
          x
        </button>
      );
    } else {
      return null;
    }
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
      <DeleteButton
        deletePlayer={props.deletePlayer}
        index={props.index}
        id={props.id}
        host={props.host}
        deleteIndex={props.deleteIndex}
      />
      <h2 className={styles.name}>{props.name}</h2>
    </motion.div>
  );
}
