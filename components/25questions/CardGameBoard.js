import React, { Component } from "react";
import styles from "../../styles/25questions/CardGameBoard.module.css";
import GameTile from "./GameTile";

class CardGameBoard extends Component {
    //Change to take in 10 props: 5 category names, and 5 arrays of GameTile components
    render() {
        const totalCards =[];
        for (let i = 0; i < 5; i++) {
            totalCards.push(<GameTile id={i} teamColor="skyblue" price="50" answered={false} />);
        }
        return (
            <div className={styles.all}>
                <div className={styles.board}>
                    <div classname={styles.childOne}>
                        <h2>category 1</h2>
                        {totalCards}
                    </div>
                    <div classname={styles.childTwo}>
                        <h2>category 2</h2>
                        {totalCards}
                    </div>
                    <div classname={styles.childThree}>
                        <h2>category 3</h2>
                        {totalCards}
                    </div>
                    <div classname={styles.childFour}>
                        <h2>category 4</h2>
                        {totalCards}
                    </div>
                    <div classname={styles.childFive}>
                        <h2>category 5</h2>
                        {totalCards}
                    </div>
                </div>
            </div>
        );
    }
}

export default CardGameBoard;

//<GameTile teamColor="skyblue" price="50" />

// export default function Custom404() {
//     return (
//         <div className={styles.Custom404}>
//            <CardGameBoard />
//         </div>

//     )
// }
