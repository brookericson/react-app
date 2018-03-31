import React from 'react';

const week = (props) => {
    return (
        props.data.map((week, index) => {
            return (
                <tr>
                        <td className="lrg-text">{week.week}</td>
                        <td id={week.week + "-day1"}><strong
                            onClick={() => props.changeValue(week.week, 1, week[1].workout,week[1].time,week[1].distance)}>{week[1].workout}</strong>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 1, week[1].workout,week[1].time,week[1].distance)}>{week[1].distance}&nbsp;miles</div>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 1, week[1].workout,week[1].time,week[1].distance)}>{week[1].time}&nbsp;min</div>
                        </td>
                        <td id={week.week + "-day2"}><strong
                            onClick={() => props.changeValue(week.week, 2, week[2].workout,week[2].time,week[2].distance)}>{week[2].workout}</strong>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 2, week[2].workout,week[2].time,week[2].distance)}>{week[2].distance}&nbsp;miles</div>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 2, week[2].workout,week[2].time,week[2].distance)}>{week[2].time}&nbsp;min</div>
                        </td>
                        <td id={week.week + "-day3"}><strong
                            onClick={() => props.changeValue(week.week, 3, week[3].workout,week[3].time,week[3].distance)}>{week[3].workout}</strong>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 3, week[3].workout,week[3].time,week[3].distance)}>{week[3].distance}&nbsp;miles</div>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 3, week[3].workout,week[3].time,week[3].distance)}>{week[3].time}&nbsp;min</div>
                        </td>
                        <td id={week.week + "-day4"}><strong
                            onClick={() => props.changeValue(week.week, 4, week[4].workout,week[4].time,week[4].distance)}>{week[4].workout}</strong>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 4, week[4].workout,week[4].time,week[4].distance)}>{week[4].distance}&nbsp;miles</div>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 4, week[4].workout,week[4].time,week[4].distance)}>{week[4].time}&nbsp;min</div>
                        </td>
                        <td id={week.week + "-day5"}><strong
                            onClick={() => props.changeValue(week.week, 5, week[5].workout,week[5].time,week[5].distance)}>{week[5].workout}</strong>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 5, week[5].workout,week[5].time,week[5].distance)}>{week[5].distance}&nbsp;miles</div>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 5, week[5].workout,week[5].time,week[5].distance)}>{week[5].time}&nbsp;min</div>
                        </td>
                        <td id={week.week + "-day6"}><strong
                            onClick={() => props.changeValue(week.week, 6, week[6].workout,week[6].time,week[6].distance)}>{week[6].workout}</strong>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 6, week[6].workout,week[6].time,week[6].distance)}>{week[6].distance}&nbsp;miles</div>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 6, week[6].workout,week[6].time,week[6].distance)}>{week[6].time}&nbsp;min</div>
                        </td>
                        <td id={week.week + "-day7"}><strong
                            onClick={() => props.changeValue(week.week, 7, week[7].workout,week[7].time,week[7].distance)}>{week[7].workout}</strong>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 7, week[7].workout,week[7].time,week[7].distance)}>{week[7].distance}&nbsp;miles</div>
                                <div className="workout-description"
                                    onClick={() => props.changeValue(week.week, 7, week[7].workout,week[7].time,week[7].distance)}>{week[7].time}&nbsp;min</div>
                        </td>
                </tr>
            )
        })
    );
};

export default week;