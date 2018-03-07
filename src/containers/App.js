import React, { Component } from 'react';
import './App.css';
import Header from '../components/Header/Header';
import Races from '../components/Races/Races';
import Schedule from '../components/Schedule/Schedule';
import Login from '../components/Login/Login';
import SignUp from '../components/SignUp/SignUp';
import Request from 'superagent';
// import _ from 'lodash';
import firebase from '../firebase';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            showLogin: false,
            races: {},
            location: '',
            change: false,
            showSchedule: false,
            showRaceList: false,
            scheduleData: {}
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
            this.setState({
                location: event.target.value,
                change: true
            });
    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = parseFloat(position.coords.latitude);
            const lng = parseFloat(position.coords.longitude);

            const reverseGeoUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyBZ6EZRs2Iaa0Z0xij3i7Rqkk3G6y7h-8A";
            Request.get(reverseGeoUrl).then((response) => {
                const userLocation = response.body.results[0].address_components[4].short_name;

                const url = "https://runsignup.com/Rest/races/?format=json&events=T&race_headings=T&race_links=T&include_waiver=F&include_event_days=T&sort=date+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&state=" + userLocation + "&distance_units=M&api_key=bKueVsywo2rxTfZ7Ip2QSP44RR0HFGZz&api_secret=NS4x0tJWMQZpTDJGpkCihtdN0MX5vx5D";
                Request.get(url).then((response) => {
                    this.setState({
                        races: response.body.races,
                        location: userLocation,
                        showRaceList: true
                    });
                });
            });
        });
    }

    componentDidUpdate() {
            if (this.state.change === true) {
                const userLocation = this.state.location;
                const url = "https://runsignup.com/Rest/races/?format=json&events=T&race_headings=T&race_links=T&include_waiver=F&include_event_days=T&sort=date+ASC&start_date=today&only_partner_races=F&search_start_date_only=F&only_races_with_results=F&state=" + userLocation + "&api_key=bKueVsywo2rxTfZ7Ip2QSP44RR0HFGZz&api_secret=NS4x0tJWMQZpTDJGpkCihtdN0MX5vx5D";
                Request.get(url).then((response) => {
                    this.setState({
                        races: response.body.races,
                        change: false
                    });
                });
            }
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
                loginForm = <Login></Login>
            }
            else{
                loginForm = <SignUp></SignUp>
            }
        }
        let raceList = null;
        if (this.state.showRaceList){
            raceList =
            <Races races={this.state.races} location={this.state.location} handleChange={this.handleChange} raceHandler={this.raceSelectedHandler}/>;
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
