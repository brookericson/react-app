import React, {Component} from 'react';
import Aux from '../../hoc/Auxilliary';
import Week from './Week/Week';

class Schedule extends Component {
    render() {
        return (
            <Aux>
            <div className="row-container">
                <div className="btn-sm navigate">&#8701; Find a new schedule</div>
                <div className="btn-sm warning">Save this Schedule</div>
            </div>
            <table>
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

                {this.props.scheduleItems.map((week, index) => {
                    return (
                        <Week
                            week={week.week}
                            day1={week[1]}
                            day2={week[2]}
                            day3={week[3]}
                            day4={week[4]}
                            day5={week[5]}
                            day6={week[6]}
                            day7={week[7]}
                            key={week.week}
                        />
                    )
                })}

            </table>
            </Aux>

        );
    };
}

export default Schedule;