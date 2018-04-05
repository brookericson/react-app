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
            scheduleData: [],
            message: '',
            weeks: false
        };
    }

    writeScheduleToFirebase = () => {
        const trainingSchedule = this.state.scheduleData;
        const raceName = this.props.match.params.name;
        const daysUntil = parseInt(this.props.match.params.id);
        const date = new Date();
        const newDate = date.setDate(date.getDate() + daysUntil);
        const d = date.toLocaleDateString();
        const {
            history,
        } = this.props;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
               const userID = user.uid;
                firebase.database().ref("users/" + userID).update({
                    race: raceName,
                    startDate: d,
                    totalMiles: 0,
                    totalMins: 0,
                    trainingSchedule
                });
                history.push(routes.SAVED_SCHEDULE);
            }
            else {
                document.getElementById("message-display").innerHTML = "You must sign in to save a training plan";
            }
        });
    }

    componentDidMount() {
        const daysUntil = this.props.match.params.id;
        const numWeeks = Math.ceil(daysUntil / 7);
        if (numWeeks > 16 && numWeeks < 26) {
            const scheduleItems = firebase.database().ref("trainingPlan/" + numWeeks);
            scheduleItems.on('value', (snapshot) => {
                let items = snapshot.val();
                this.setState({
                    scheduleData: items,
                    weeks: true,
                    message: "This is a " + numWeeks + " training plan"
                });
                console.log(this.state.scheduleData);
            });
        }
        else if (numWeeks > 25){
            const scheduleItems = firebase.database().ref("trainingPlan/" +25);
            scheduleItems.on('value', (snapshot) => {
                const weeksDif = numWeeks - 25;
                let items = snapshot.val();
                this.setState({
                    scheduleData: items,
                    weeks: true,
                    message: "This is a 25 Week Training Plan. Begin training in " + weeksDif + " weeks."
                });
                console.log(this.state.scheduleData);
            });
        }
        else {
            const scheduleItems = firebase.database().ref("trainingPlan/16");
            scheduleItems.on('value', (snapshot) => {
                let items = snapshot.val();
                this.setState({
                    scheduleData: items,
                    weeks: true,
                    message: "This race is only " + numWeeks + " weeks away. Follow this training plan ONLY if you have already been training!"
                });
                console.log(this.state.scheduleData);
            });
        }
    }
    render() {
        let weekView = null;
        if (this.state.weeks){
            weekView = (
                <Aux>
                {this.state.scheduleData.map((week, index) => {
                    return (
                        <Week
                            data={week}
                            key={index}
                        />
                    );
                })};
                </Aux>
            )
        }
        return (
            <Aux>
                <div id="message-display">*{this.state.message}</div>

                <div className="container-spaceBetween">

                    <div><Link to={routes.LANDING}><span className="arrow-icon">&#9664;</span> Find New Race</Link></div>
                    <div className="btn-sm warning" onClick={this.writeScheduleToFirebase}>Save this Schedule</div>

                </div>
                <table>
                    <tbody>
                <tr>
                <th>Week</th>
                <th>Mon</th>
                <th>Tues</th>
                <th>Wed</th>
                <th>Thurs</th>
                <th>Fri</th>
                <th>Sat</th>
                <th>Sun</th>
                </tr>

                {weekView}
                    </tbody>
                </table>
            </Aux>

        );
    }
}

export default Schedule;