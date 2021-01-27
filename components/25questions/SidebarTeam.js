import React, { Component } from "react";
import styles from "../../styles/SidebarTeam.module.css";

// SAMPLE USAGE:
// import React from "react";
// import SidebarTeam from "../components/25questions/SidebarTeam";
// export default function test() {
//     const people = [
//         { name: "Daniel L." },
//         { name: "Michael" },
//         { name: "Arek" },
//         { name: "Catherine" },
//         { name: "Will" },
//     ];
//     return (
//         <div>
//             <SidebarTeam
//                 teamColor="#D5D4F1"
//                 teamNum="1"
//                 teamName="Bruins"
//                 teamPoints="1200"
//                 people={people}
//             />
//         </div>
//     )
// }

class SidebarTeam extends Component {
    render() {
        const people = this.props.people;

        return (
            <div
                className={styles.box}
                style={{ backgroundColor: this.props.teamColor }}
            >
                <div className={styles.boxText}>
                    <h3>Team {this.props.teamNum}:</h3>
                    <h1>{this.props.teamName}</h1>
                    <h2>{this.props.teamPoints} points</h2>
                    <div className={styles.divider} />
                    <div>
                        {people.map(person => (
                            <p>{person.name}</p>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default SidebarTeam;