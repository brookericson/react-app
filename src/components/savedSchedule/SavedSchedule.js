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
            let items
            if (user) {
                const userId = user.uid;
                const scheduleItems = firebase.database().ref("users/" + userId + "/trainingSchedule");
                scheduleItems.on('value', (snapshot) => {
                    items = snapshot.val();
                    this.setState({
                        scheduleData: items,
                        user: userId
                    })
                })
            }
        }.bind(this));
    }

    submitTrainingDataToFirebase = (week, day) => {
        let distance = document.getElementById("distance").value;
        let time = document.getElementById("time").value;
        let workout = document.getElementById("workout").value;
        let completed;
        if(document.getElementById("completion-checkmark").checked){
            completed = true;
            const id = week + "-day" + day;
            const cell = document.getElementById(id);
            cell.className = "completed";
        }
        else {
            completed = false;
        }

        if (distance === ''){
            distance = 0;
        }
        if (time === ''){
            time = 0;
        }
        if (workout === ''){
            alert("You Must Enter a Workout Name");
        }
        else {
            firebase.database().ref("users/" + this.state.user + "/trainingSchedule/" + week + "/" + 1 + "/" + day).update({
                completed: completed,
                distance: distance,
                time: time,
                workout: workout
            });
            document.getElementById("workout").remove();
            document.getElementById("distance").remove();
            document.getElementById("time").remove();
            document.getElementById("submit-button").remove();
            document.getElementById("checkbox-container").remove();
            document.getElementById("distLabel").remove();
            document.getElementById("timeLabel").remove();
            const hiddenElements = document.getElementsByClassName("hidden");
            for(let i = 0; i < hiddenElements.length; i++){
                hiddenElements[0].classList.remove("hidden");
            }
        }
}

    changeCellValue = (week,day,workout,dist,t) => {
        if (document.getElementById("distance")){
            document.getElementById("workout").remove();
            document.getElementById("distance").remove();
            document.getElementById("time").remove();
            document.getElementById("submit-button").remove();
            document.getElementById("checkbox-container").remove();
            document.getElementById("distLabel").remove();
            document.getElementById("timeLabel").remove();
            const hiddenElements = document.getElementsByClassName("hidden");
            const lngth = hiddenElements.length;
            for(let i = 0; i < lngth; i++){
                hiddenElements[0].classList.remove("hidden");
            }
        }


        const id = week + "-day" + day;
       const cell = document.getElementById(id);
        const children = cell.childNodes;
        const length = children.length;

        for(let i = 0; i < length; i++){
            children[i].className = "hidden";
        }

        const wrkout = document.createElement("input");
       const distance = document.createElement("input");
       const time = document.createElement("input");
       const container = document.createElement("div");
       const checkbox = document.createElement("input");
       const label = document.createElement("label");
       const button = document.createElement("button");

       distance.id = "distance";
       distance.setAttribute("type", "number");
        distance.setAttribute("min", "0");
        distance.setAttribute("step", ".1");

        if (dist === ''){
            distance.value = 0;
        }
        else {
            distance.value = dist;
        }

       cell.appendChild(distance);

        const distLabel = document.createElement("label");
        distLabel.innerHTML = "miles";
        distLabel.htmlFor = "time";
        distLabel.id = "distLabel";
        distLabel.className = "workout-label";
        cell.appendChild(distLabel);

        time.id = "time";
        time.setAttribute("type", "number");
        time.setAttribute("min", "0");
        time.setAttribute("step", ".01");
        if (t === ''){
            time.value = 0;
        }
        else {
            time.value = t;
        }
        cell.appendChild(time);
        const timeLabel = document.createElement("label");
        timeLabel.innerHTML = "min";
        timeLabel.htmlFor = "time";
        timeLabel.id = "timeLabel";
        timeLabel.className = "workout-label";
        cell.appendChild(timeLabel);

        wrkout.id = "workout";
        wrkout.setAttribute("type", "text");
        wrkout.placeholder = "workout description";
        cell.appendChild(wrkout);

        container.id = "checkbox-container";

        checkbox.setAttribute("type", "checkbox");
        checkbox.id = "completion-checkmark";

        label.innerHTML = "Completed";

        cell.appendChild(container);
        container.appendChild(checkbox);
        container.appendChild(label);


        button.addEventListener("click", () => this.submitTrainingDataToFirebase(week,day,workout));
        button.id = "submit-button";
        button.innerHTML = "Save Workout";
        cell.appendChild(button);
    }

    render() {
        return (
            <Aux>
                <div className="row-container">
                    <div>Weeks Until Race</div>
                    <div>Total Miles run</div>
                </div>
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
                                key={index}
                                changeValue={this.changeCellValue}
                            />
                        )
                    })}
                    </tbody>
                </table>
            </Aux>

        );
    }
}

export default SavedSchedule;