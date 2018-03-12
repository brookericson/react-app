import React, { Component } from 'react';
import './App.css';
import Header from '../components/Header/Header';
import Races from '../components/Races/Races';
import Schedule from '../components/Schedule/Schedule';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import firebase from '../firebase';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            showLogin: false,
            showSchedule: false,
            showRaceList: true,
            scheduleData: {}
        };
    }

    handleChange(event) {
            this.setState({
                location: event.target.value,
                change: true
            });
    }

    raceSelectedHandler = (date) => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const month = date.match(/^\d*(?=\/)/g);
        const day = date.match(/\d*(?=\/\d{4})/g);
        const year = 2018;
        const firstDate = new Date(year, month[0], day[0]);
        const secondDate = new Date();

        const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

        const numWeeks = Math.ceil(diffDays / 7);

        if (numWeeks > 16 && numWeeks < 26) {
            const scheduleItems = firebase.database().ref(numWeeks);
            scheduleItems.on('value', (snapshot) => {
                let items = snapshot.val();
                this.setState({
                    scheduleData: items,
                    showSchedule: true,
                    showRaceList: false
                });
                console.log(this.state.scheduleData);
            });
        }
    };


    toggleRaceList = () => {
        this.setState({
            showSchedule:false,
            showRaceList: true,
            showLogin: false
        })
    };

    toggleSchedule = () => {
        this.setState({
            showSchedule:true,
            showRaceList: false,
            showLogin: false
        })
    };

    logoutHandler = () => {
        this.setState({
            showSchedule:true,
            showRaceList: true,
            showLogin: false,
            loggedIn: false
        })
    };

    loginHandler = () => {
        this.setState({
            showSchedule:false,
            showRaceList: false,
            showLogin: true
        })
    };

      render() {
        let loginForm = null;
        if(this.state.showLogin){
            if(this.state.loggedIn){
                loginForm = <Login></Login>;
            }
            else{
                loginForm = <SignUp></SignUp>;
            }
        }
        let raceList = null;
        if (this.state.showRaceList){
            raceList =
            <Races races={this.state.races} location={this.state.location} handleChange={this.handleChange} raceHandler={this.raceSelectedHandler} raceListHandler={this.toggleRaceList}/>;
        }

        let trainingSchedule = null;
        if (this.state.showSchedule){
            trainingSchedule =
                <Schedule scheduleItems={this.state.scheduleData}/>;
        }

        return (
            <div className="App">
              <Header logginState={this.state.loggedIn} toggleList={this.toggleRaceList} togglePlan={this.toggleSchedule} toggleLogin={this.loginHandler} toggleLogout={this.logoutHandler}/>
                {raceList}
                {trainingSchedule}
                {loginForm}
               </div>
        );
    }
}


export default App;
