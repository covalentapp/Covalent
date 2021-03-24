import React, { Component } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from '../../styles/Selection25.module.css';

class Selection25 extends Component {
    render() {
        return (
            <div className={styles.statements}>
                <div className={styles.top}>
                    <p>{this.props.category}</p>
                    <h6>{this.props.question}</h6>
                    <button className={styles.statementButton + " " + styles[(this.props.selected == "1") && 'selected']} onClick={this.props.onClick1}>{this.props.choice1}</button>
                    <button className={styles.statementButton + " " + styles[(this.props.selected == "2") && 'selected']} onClick={this.props.onClick2}>{this.props.choice2}</button>
                    <button className={styles.statementButton + " " + styles[(this.props.selected == "3") && 'selected']} onClick={this.props.onClick3}>{this.props.choice3}</button>
                    <button className={styles.statementButton + " " + styles[(this.props.selected == "4") && 'selected']} onClick={this.props.onClick4}>{this.props.choice4}</button>
                </div>
                {this.props.selected && !this.props.submitted &&
                    <button
                        type="submit"
                        className={styles.submitButton}
                        onClick={this.props.onSubmit}
                    >SUBMIT</button>
                }
                {!this.props.selected && !this.props.submitted &&
                    <p><b>CHOOSE ONE!</b></p>
                }
            </div>
        );

        // if (!this.props.results) {
        // return (
        //     <div className={styles.statements}> 
        //         <div>
        //             <p>{this.props.question}</p>
        //             <button className={styles.statementButton + " " + styles[(this.props.selected == "1") && 'selected']} onClick={this.props.onClick1}>{this.props.choice1}</button>
        //             <button className={styles.statementButton + " " + styles[(this.props.selected == "2") && 'selected']} onClick={this.props.onClick2}>{this.props.choice2}</button>
        //             <button className={styles.statementButton + " " + styles[(this.props.selected == "3") && 'selected']} onClick={this.props.onClick3}>{this.props.choice3}</button>
        //         </div>
        //         {this.props.selected && !this.props.submitted &&
        //         <button
        //             type="submit"
        //             className={styles.submitButton}
        //             onClick={this.props.onSubmit}
        //         >SUBMIT</button>
        //         }
        //         {!this.props.selected && !this.props.submitted &&
        //         <p><b>CHOOSE ONE!</b></p>
        //         }
        //     </div>
        // );
        // } else {
        //     return (
        //         <div className={styles.statements}> 
        //             <div>
        //                 <p>Results</p>
        //                 <button className={styles.resultsButton + " " + styles[(this.props.selected == "1") && (this.props.choice1valid ? 'wrong' : 'correct')]}>
        //                     {this.props.choice1}
        //                     {!this.props.choice1valid && <FontAwesomeIcon icon="check-circle" className={styles.icon} />}
        //                 </button>
        //                 <button className={styles.resultsButton + " " + styles[(this.props.selected == "2") && (this.props.choice2valid ? 'wrong' : 'correct')]}>
        //                     {this.props.choice2}
        //                     {!this.props.choice2valid && <FontAwesomeIcon icon="check-circle" className={styles.icon} />}
        //                 </button>
        //                 <button className={styles.resultsButton + " " + styles[(this.props.selected == "3") && (this.props.choice3valid ? 'wrong' : 'correct')]}>
        //                     {this.props.choice3}
        //                     {!this.props.choice3valid && <FontAwesomeIcon icon="check-circle" className={styles.icon} />}
        //                 </button>
        //             </div>
        //             <button
        //                 type="submit"
        //                 className={styles.submitButton}
        //                 onClick={this.props.continue}
        //             >CONTINUE</button>
        //         </div>
        //     );
        // }
    }
}

export default Selection25;

// TO TEST:
// import React, { useState, useEffect } from "react";
// import Selection25 from "../components/25questions/Selection25";
// export default function Test() {
//     const [currentFact, incrementFacts] = useState(0);
//     const [factsId, setFacts] = useState(null);
//     const [name1, setName1] = useState("Daniel L.");
//     const [name2, setName2] = useState("Will");
//     const [name3, setName3] = useState("Catherine");
//     const [name4, setName4] = useState("Michael");
//     const [video, setVideo] = useState(null);
//     const [submitted, setSubmitted] = useState(0);
//     const [selected, setSelected] = useState(false);
//     const [selectedFact, selectFact] = useState(null);
//     const [results, enableResults] = useState(false);
//     const [resultSet, setResults] = useState([]);
//     const [connections, setConnections] = useState([]);
//     const [correctConnect, setCorrectConnect] = useState(0);
//     const [internalTime, setInternalTime] = useState(0);
//     const [disabledTimer, disableTimer] = useState(true);
//     return (
//         <div>
//             <Selection25
//                 category="SPORTS 400"
//                 question="Who is a Patriots fan?"
//                 choice1={name1}
//                 choice2={name2}
//                 choice3={name3}
//                 choice4={name4}
//                 // choice1valid={
//                 //     resultSet.length != 0
//                 //         ? resultSet.filter((fact) => {
//                 //             return fact.id == fact1.id;
//                 //         })[0].valid
//                 //         : null
//                 // }
//                 // choice2valid={
//                 //     resultSet.length != 0
//                 //         ? resultSet.filter((fact) => {
//                 //             return fact.id == fact2.id;
//                 //         })[0].valid
//                 //         : null
//                 // }
//                 // choice3valid={
//                 //     resultSet.length != 0
//                 //         ? resultSet.filter((fact) => {
//                 //             return fact.id == fact3.id;
//                 //         })[0].valid
//                 //         : null
//                 // }
//                 selected={selected}
//                 submitted={submitted}
//                 onClick1={() => {
//                     selectFact(name1);
//                     setSelected(1);
//                 }}
//                 onClick2={() => {
//                     selectFact(name2);
//                     setSelected(2);
//                 }}
//                 onClick3={() => {
//                     selectFact(name3);
//                     setSelected(3);
//                 }}
//                 onClick4={() => {
//                     selectFact(name4);
//                     setSelected(4);
//                 }}
//                 onSubmit={() => { // delete this later
//                     alert("You selected " + selected + "!");
//                 }}
//                 // onSubmit={() => {
//                 //     if (selected) {
//                 //         enableResults(true);
//                 //     }
//                 // }}
//                 // continue={() => {
//                 //     incrementFacts(currentFact + 1);
//                 // }}
//                 // results={resultSet.length != 0}
//             ></Selection25>
//         </div>
//     )
// }