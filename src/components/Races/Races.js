import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Request from 'superagent';
// import _ from 'lodash';

class Races extends Component {
    constructor(props) {
        super(props);
        this.state = {
            races: {},
            location: '',
            change: false,
            showRaceList: false,
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

    render() {
        let raceList = null;
        if (this.state.showRaceList){
            raceList = (
                <ul className="grid">
                    {
                        this.state.races.map(race => {
                            return (
                                <li className="grid-box" key={race.race.race_id}>
                                    <ul className="grid-box-items">
                                        <a href={race.race.url}>
                                        <li className="grid-image"><img src={race.race.logo_url} alt="logo"></img></li>
                                        <li className="top-padding-15"><strong>{race.race.name}</strong></li>
                                        <li>{race.race.address.city}, {race.race.address.state} &ndash; {race.race.next_date}</li>
                                        </a>
                                        <li>
                                            <button onClick={()=>this.props.raceHandler(race.race.next_date)}
                                            className="btn-lrg action">Create a Training Plan</button>
                                        </li>

                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
        return (
            <Aux>
            <div className="row-container">
                    <span>Races Near: {this.state.location}</span>

                <form className="">
                    <label>Search by location</label>
                    <select value={this.state.location} onChange={this.handleChange}>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
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
                {raceList}
            </Aux>
        );
    };
}

export default Races;

