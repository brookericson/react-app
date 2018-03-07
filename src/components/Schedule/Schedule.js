import React from 'react';
import Week from './Week/Week';

const schedule = (props) => {

        return (
                <table>
                    <tr>
                        <th>Week</th>
                        <th>Day 1</th>
                        <th>Day 2</th>
                        <th>Day 3</th>
                        <th>Day 4</th>
                        <th>Day 5</th>
                        <th>Day 6</th>
                        <th>Day 7</th>
                    </tr>

                    {props.scheduleItems.map((week, index) => {
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

        );
};

export default schedule;