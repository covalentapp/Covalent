import React, { Component } from "react";
import styles from "../../styles/25questions/GameTile.module.css";

//Props that must be passed in:
//  - Item Prop:
//     - Question Price Value 
//     - Category
//     - Question 
//     - Answer
//  - Team Color
//  - Selected/Unselected boolean
//  -Answered/Unanswered Boolean 


class GameTile extends Component {
    render() {
        let cardColor = "lightgrey";
        if (this.props.selected === true){
            cardColor = this.props.teamColor;
        }


        return (
            this.props.answered ? 
            (<div className={styles.cardTile} style={{ backgroundColor: cardColor }}>
                <div className={styles.cardTileQA}>
                <p className={styles.cardTileQ} >{this.props.question}</p>
                <p className={styles.cardTileA}>{this.props.response}</p>
                </div>
            </div>)
            :
            (<div className={styles.cardTile} style={{ backgroundColor: cardColor }}>
                <div className={styles.cardTileText}>
                <p>${this.props.price}</p>
                </div>
            </div>)
        );
    }
}

export default GameTile;


// testing:
// <div>
//         <GameTile teamColor="skyblue" price="50" selected={false} 
//                     answered={true} question="Who manages the Twitter?"
//                     response="Nouf"/>
//         <GameTile teamColor="skyblue" price="50" selected={true} answered={false}/>
//         <GameTile teamColor="skyblue" price="50" />
//         <GameTile teamColor="skyblue" price="50" />
// </div>