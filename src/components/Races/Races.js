import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Request from 'superagent';
import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';
import firebase from "../../firebase/firebase";

class Races extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: {},
            location: '',
            change: false,
            showRaceList: false,
            showRaceSearch: true
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            location: event.target.value,
            change: true
        });
    }


    raceSelectedHandler = (date) => {
        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        const firstDate = new Date(date);
        const secondDate = new Date();
        const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));

        // const numWeeks = Math.ceil(diffDays / 7);

        return diffDays;
    };

    componentDidMount() {
        // navigator.geolocation.getCurrentPosition((position) => {
        //     const lat = parseFloat(position.coords.latitude);
        //     const lng = parseFloat(position.coords.longitude);
        //
        //     const reverseGeoUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyBZ6EZRs2Iaa0Z0xij3i7Rqkk3G6y7h-8A";
        //     Request.get(reverseGeoUrl).then((response) => {
        //         userLocation = response.body.results[0].address_components[4].short_name;
                const raceItems = firebase.database().ref("races/ID");
                raceItems.on('value', (snapshot) => {
                    const response = snapshot.val();
                    this.setState({
                        races: response,
                        location: "ID",
                        showRaceList: true
                    });
                });
            // });
        // });
    }

    componentDidUpdate() {
        if (this.state.change === true) {
            const userLocation = this.state.location;
            const raceItems = firebase.database().ref("races/" + userLocation);
            raceItems.on('value', (snapshot) => {
                const response = snapshot.val();
                this.setState({
                    races: response,
                    change: false
                });
            });
        }
    }

    render() {
        let raceSearch = null;
        if(this.state.showRaceSearch){
            raceSearch = (
                <div className="row-container">
                    <form className="">
                        <label>Search Races by Location:</label>
                        <select value={this.state.location} onChange={this.handleChange}>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </form>
                </div>
            )
        }
        let raceList = null;
        if (this.state.showRaceList) {
            raceList = (
                <ul className="grid">
                    {
                        this.state.races.map(race => {
                            const daysUntil = this.raceSelectedHandler(race.date);
                            const date = new Date();
                            const raceDate = new Date(race.date);
                            return (
                                <li className="grid-box" key={race.race_id}>
                                    <ul className="grid-box-items">
                                        <a href={race.url}>
                                            <li className="grid-image"><img src={race.logo_url} alt="logo"></img>
                                            </li>
                                            <li className="top-padding-15"><strong>{race.name}</strong></li>
                                            <li>{race.city}, {this.state.location} &ndash; {race.date}</li>
                                        </a>
                                        {(date > raceDate) ?
                                            <span>* This race has already passed.</span> :
                                            <li>
                                                <Link to={routes.SCHEDULE + "/" + daysUntil + "/" + race.name}>
                                                    <button disabled={date > raceDate} className="btn-sm action">Create
                                                        a Training Plan
                                                    </button>
                                                </Link>
                                            </li>
                                        }

                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
            );
        }

        return (
            <Aux>
                {raceSearch}
                {raceList}
            </Aux>
        );
    };
}

export default Races;

