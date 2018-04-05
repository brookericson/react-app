import React, {Component} from 'react';
import Day from './Day/Day';
import firebase from '../../../firebase/firebase';

class Week extends Component {
    constructor(props) {
        super(props);
    }

    handleTableDisplay = (week,day) => {
        const div = document.getElementById(week + "-day" + day);
        div.classList.add("show-form");
        const div2 = document.getElementById(week + "-day" + day + "-cell");
        div2.classList.add("hidden");
    };

    handleCheckboxEvent = (isComplete,week,day,time,distance) => {
        let totalMins = parseFloat(this.props.mins);
        let totalMiles = parseFloat(this.props.miles);
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const userId = user.uid;
                if(isComplete) {
                    totalMins += parseFloat(time);
                    totalMiles += parseFloat(distance);
                }else if (!isComplete) {
                    totalMins -= time;
                    totalMiles -= distance;
                }

                firebase.database().ref("users/" + userId + "/trainingSchedule/" + week + "/" + day).update({
                        completed: isComplete
                    })
                        .catch(error => {
                            console.log("There was an error writing to Firebase");
                        });
                    firebase.database().ref("users/" + userId).update({
                        totalMiles: totalMiles,
                        totalMins: totalMins
                    })
                        .catch(error => {
                            console.log("There was an error writing to Firebase");
                        });
                }
        });
    };

    componentDidMount(){
        let raceDate;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const userId = user.uid;
                const userData = firebase.database().ref("users/" + userId);
                userData.on('value', (snapshot) => {
                    const data = snapshot.val();
                    raceDate = new Date(data.startDate);
                const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                const date = new Date();
                const diff = Math.round(Math.abs((date.getTime() - raceDate.getTime()) / (oneDay)));
                const deadline = new Date(Date.parse(new Date()) + diff * 24 * 60 * 60 * 1000);
                    const clock = document.getElementById('countDown');
                    const daysSpan = document.getElementById('day');

                    const updateClock = () => {
                        const getTimeRemaining = (endtime) => {
                            const t = Date.parse(endtime) - Date.parse(new Date());
                            const days = Math.floor(t / (1000 * 60 * 60 * 24));
                            return {
                                'total': t,
                                'days': days + " days",
                            };
                        };

                        const t = getTimeRemaining(deadline);

                        daysSpan.innerHTML = t.days;

                        if (t.total <= 0) {
                            clearInterval(timeinterval);
                        }
                    };

                    updateClock();
                    const timeinterval = setInterval(updateClock, 1000);
                });
            }
        });
    }
    render()
    {
        return (
            <tr>
                <td className="lrg-text">{this.props.data.week}</td>
                <Day data={this.props.data[1]} week={this.props.data.week} day={"1"}
                     tableDisplayHandler={this.handleTableDisplay}
                checkboxHandler={this.handleCheckboxEvent}/>
                <Day data={this.props.data[2]} week={this.props.data.week} day={"2"}
                     tableDisplayHandler={this.handleTableDisplay}
                     checkboxHandler={this.handleCheckboxEvent}/>
                <Day data={this.props.data[3]} week={this.props.data.week} day={"3"}
                     tableDisplayHandler={this.handleTableDisplay}
                     checkboxHandler={this.handleCheckboxEvent}/>
                <Day data={this.props.data[4]} week={this.props.data.week} day={"4"}
                     tableDisplayHandler={this.handleTableDisplay}
                     checkboxHandler={this.handleCheckboxEvent}/>
                <Day data={this.props.data[5]} week={this.props.data.week} day={"5"}
                     tableDisplayHandler={this.handleTableDisplay}
                     checkboxHandler={this.handleCheckboxEvent}/>
                <Day data={this.props.data[6]} week={this.props.data.week} day={"6"}
                     tableDisplayHandler={this.handleTableDisplay}
                     checkboxHandler={this.handleCheckboxEvent}/>
                <Day data={this.props.data[7]} week={this.props.data.week} day={"7"}
                     tableDisplayHandler={this.handleTableDisplay}
                     checkboxHandler={this.handleCheckboxEvent}/>
            </tr>
        )
    }
};

export default Week;