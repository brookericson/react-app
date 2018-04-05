import React, { Component } from 'react';
import Aux from '../../hoc/Auxilliary';
import Week from './Week/Week';
import firebase from '../../firebase/firebase';

class SavedSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scheduleData: [],

            message: ''
        };
    }

    componentDidMount() {
       firebase.auth().onAuthStateChanged(function(user) {
            let items;
            let data;
            if (user) {
                const userId = user.uid;
                const scheduleItems = firebase.database().ref("users/" + userId + "/trainingSchedule");
                scheduleItems.on('value', (snapshot) => {
                    items = snapshot.val();
                    this.setState({
                        scheduleData: items,
                    })
                })
                const userData = firebase.database().ref("users/" + userId);
                userData.on('value', (snapshot) => {
                    data = snapshot.val();
                    this.setState({
                        startDate: data.startDate,
                        totalMiles: data.totalMiles,
                        totalMins: data.totalMins,
                        race: data.race
                    })
                })
            }
        }.bind(this));
    }

      render() {
        let showSchedule = null;
        if (this.state.scheduleData != ''){
            const raceDate = new Date(this.state.startDate);
            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            const date = new Date();
            const diff = Math.round(Math.abs((date.getTime() - raceDate.getTime()) / (oneDay)));
            const w = Math.ceil(diff/7);
            const length = this.state.scheduleData.length;
            const weeks = length - w;
            showSchedule = (
                <Aux>
                    <table className="top-table" >
                        <tr id="countDown">
                            <td className="top-label">Current Week:</td>
                            <td id="weeksuntil">{weeks}</td>
                        <td className="top-label">Count Down to {this.state.race}:</td>
                    <td id={"day"}>
                    </td>
                        <td className="top-label">Total Miles:</td>
                        <td>{this.state.totalMiles} </td>
                        <td className="top-label">Total Mins:</td>
                        <td>{this.state.totalMins} </td>
                        </tr>
                    </table>
                    <div>{this.state.message}</div>
                    <table id="saved-schedule-table">
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

                        {this.state.scheduleData.map((week, index) => {
                            return (
                                <Week
                                    data={week}
                                    date={this.state.startDate}
                                    mins={this.state.totalMins}
                                    miles={this.state.totalMiles}
                                    key={index}
                                />
                            )
                        })}
                        </tbody>
                    </table>
                </Aux>
            )
        }
        else {
            showSchedule = (
                <div>You have no schedule saved</div>
            )
        }
        return (
            <Aux>
                {showSchedule}
            </Aux>

        );
    }
}

export default SavedSchedule;