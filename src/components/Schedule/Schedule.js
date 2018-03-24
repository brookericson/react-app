import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Week from './Week/Week';
import firebase from '../../firebase/firebase';
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log(this);
        // const numWeeks = this.props.match.params.date;
        // if (numWeeks > 16 && numWeeks < 26) {
        //     const scheduleItems = firebase.database().ref(numWeeks);
        //     scheduleItems.on('value', (snapshot) => {
        //         let items = snapshot.val();
        //         this.setState({
        //             scheduleData: items,
        //             showSchedule: true,
        //             showRaceList: false,
        //             showRaceSearch: false,
        //             message: "Here is a " + numWeeks + "training plan"
        //         });
        //         console.log(this.state.scheduleData);
        //     });
        // }
        // else if (numWeeks > 25){
        //     const scheduleItems = firebase.database().ref(25);
        //     scheduleItems.on('value', (snapshot) => {
        //         const weeksDif = numWeeks - 25;
        //         let items = snapshot.val();
        //         this.setState({
        //             scheduleData: items,
        //             showSchedule: true,
        //             showRaceList: false,
        //             showRaceSearch: false,
        //             message: "25 Week Training Plan. Begin training plan in " + weeksDif + " weeks."
        //         });
        //         console.log(this.state.scheduleData);
        //     });
        // }
        // else {
        //     const scheduleItems = firebase.database().ref(16);
        //     scheduleItems.on('value', (snapshot) => {
        //         const weeksDiff = 16 - numWeeks;
        //         let items = snapshot.val();
        //         this.setState({
        //             scheduleData: items,
        //             showSchedule: true,
        //             showRaceList: false,
        //             showRaceSearch: false,
        //             message: "This race is only " + weeksDiff + " weeks away. Please only follow this schedule if you have already been training!"
        //         });
        //         console.log(this.state.scheduleData);
        //     });
        // }
    }
    render() {
        return (
            <Aux>
                <div className="row-container">
                    <div><Link to={routes.LANDING}>Find New Race</Link></div>
                    <div className="btn-sm warning">Save this Schedule</div>
                </div>
                {/*<div>{props.message}</div>*/}
                {/*<table>*/}
                {/*<tr>*/}
                {/*<th>Week</th>*/}
                {/*<th>Mon</th>*/}
                {/*<th>Tues</th>*/}
                {/*<th>Wed</th>*/}
                {/*<th>Thurs</th>*/}
                {/*<th>Fri</th>*/}
                {/*<th>Sat</th>*/}
                {/*<th>Sun</th>*/}
                {/*</tr>*/}

                {/*{props.scheduleItems.map((week, index) => {*/}
                {/*return (*/}
                {/*<Week*/}
                {/*week={week[8]}*/}
                {/*day1={week[1]}*/}
                {/*day2={week[2]}*/}
                {/*day3={week[3]}*/}
                {/*day4={week[4]}*/}
                {/*day5={week[5]}*/}
                {/*day6={week[6]}*/}
                {/*day7={week[7]}*/}
                {/*key={week[8]}*/}
                {/*/>*/}
                {/*)*/}
                {/*})}*/}

                {/*</table>*/}
            </Aux>

        );
    }
}

export default Schedule;