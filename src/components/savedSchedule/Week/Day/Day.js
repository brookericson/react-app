import React, { Component } from 'react';
import firebase from '../../../../firebase/firebase';
import Aux from '../../../../hoc/Auxilliary';

const checkedStyle = {
    backgroundImage: "url('check.png')",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
};
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    workout: '',
    distance: '',
    time: ''
};

class Day extends Component{
    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event,week,day,originalDistance,originalTime,isCompleted) => {
        const {
            workout,
            distance,
            time
        } = this.state;

        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                const userId = user.uid;
                firebase.database().ref("users/" + userId + "/trainingSchedule/" + week + "/" + day).update({
                    distance: distance,
                    time: time,
                    workout: workout
                })
                    .catch(error => {
                        console.log("There was an error writing to Firebase");
                    });
                if(isCompleted){
                    let totalMiles;
                    let totalMins;
                    const dayItems = firebase.database().ref("users/" + userId);
                    dayItems.on('value', (snapshot) => {
                        const data = snapshot.val();
                        totalMiles = parseFloat(data.totalMiles);
                        totalMins = parseFloat(data.totalMins);
                        totalMiles -= parseFloat(originalDistance);
                        totalMins -= parseFloat(originalTime);
                        totalMiles += parseFloat(distance);
                        totalMins += parseFloat(time);
                    });
                    firebase.database().ref("users/" + userId).update({
                        totalMiles: totalMiles,
                        totalMins: totalMins
                    });
                }

                const div = document.getElementById(week + "-day" + day);
                div.classList.remove("show-form");
                const div2 = document.getElementById(week + "-day" + day + "-cell");
                div2.classList.remove("hidden");
            }
        });
    };

    handleFormDisplay = (week,day) => {
        const div = document.getElementById(week + "-day" + day);
        div.classList.remove("show-form");
        const div2 = document.getElementById(week + "-day" + day + "-cell");
        div2.classList.remove("hidden");
    };

    render() {
        const {
            workout,
            distance,
            time
        } = this.state;

        const isInvalid =
            workout === '' ||
            distance === '' ||
            time === '';

        const isCompleted = this.props.data.completed;
        const week = this.props.week;
        const day = this.props.day;
        const data = this.props.data;
        const wrkout = this.props.data.workout;
        const dst = this.props.data.distance;
        const t = this.props.data.time;

        return (
            <Aux>
                <td>
                    <div className="cell-container" id={week + "-day" + day + "-cell"}>
                        <label htmlFor={"checkbox-"+ week + "-" + day} style={(isCompleted ? checkedStyle : null)} id="checkbox" >
                            <input
                                defaultChecked={isCompleted ? true : false}
                                type="checkbox"
                                id={"checkbox-"+ week + "-" + day}
                                ref={"checkbox-"+ week + "-" + day}
                                onClick={(event) => this.props.checkboxHandler((isCompleted ? false : true),week,day,t,dst)}
                            />
                        </label>
                        <strong onClick={() => this.props.tableDisplayHandler(week, day)}>
                            {wrkout}
                        </strong>
                        <div
                            className="row-spacebetween"
                            onClick={() => this.props.tableDisplayHandler(week, day)}
                        >
                            <div>{dst}&nbsp;miles</div>
                            <div>{t}&nbsp;min</div>
                        </div>
                    </div>
                    <div id={week + "-day" + day} className="cell-update-container">
                        <form>
                        <textarea
                            placeholder="workout description"
                            onChange={event => this.setState(byPropKey('workout', event.target.value))}
                            placeholder={wrkout}>
                            </textarea>
                            <div className="row-container">
                                <label>
                                    <input
                                    type="number"
                                    step="0.01" min="0"
                                    placeholder={dst}
                                    onChange={event => this.setState(byPropKey('distance', event.target.value))}/>
                                    mi
                                </label>
                                <label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        placeholder={t}
                                        onChange={event => this.setState(byPropKey('time', event.target.value))}/>
                                    min
                                </label>
                            </div>
                            <div className="row-container">
                            <button disabled={isInvalid}
                                    type="button"
                                    onClick={(event) => this.onSubmit(event,week,day,dst,t,isCompleted)}
                                    className="btn-sm action">Save</button>
                            <span className="btn-sm warning" onClick={() => this.handleFormDisplay(week, day)}>Cancel</span>
                            </div>
                        </form>
                    </div>
                </td>
            </Aux>
        )
    }
}

export default Day;