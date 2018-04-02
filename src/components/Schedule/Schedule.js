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
        const {
            history,
        } = this.props;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
               const userID = user.uid;
                firebase.database().ref("users/" + userID).set({
                    race: raceName,
                    trainingSchedule
                });
                history.push(routes.LANDING);
            }
            else {
                this.setstate = {
                    message: 'You must sign in to save a training schedule!'
                }
            }
        });
    }

    componentDidMount() {
        const numWeeks = this.props.match.params.id;
        if (numWeeks > 16 && numWeeks < 26) {
            const scheduleItems = firebase.database().ref("trainingPlan/" + numWeeks);
            scheduleItems.on('value', (snapshot) => {
                let items = snapshot.val();
                this.setState({
                    scheduleData: items,
                    message: "Here is a " + numWeeks + "training plan"
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
                    message: "25 Week Training Plan. Begin training plan in " + weeksDif + " weeks."
                });
                console.log(this.state.scheduleData);
            });
        }
        else {
            const scheduleItems = firebase.database().ref("trainingPlan/16");
            scheduleItems.on('value', (snapshot) => {
                const weeksDiff = 16 - numWeeks;
                let items = snapshot.val();
                this.setState({
                    scheduleData: items,
                    weeks: true,
                    message: "This race is only " + weeksDiff + " weeks away. Please only follow this schedule if you have already been training!"
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
                <div className="row-container">
                    <div><Link to={routes.LANDING}>Find New Race</Link></div>
                    <div className="btn-sm warning" onClick={this.writeScheduleToFirebase}>Save this Schedule</div>
                </div>
                <div>{this.state.message}</div>
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