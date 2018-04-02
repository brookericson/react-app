import React from 'react';

const week = (props) => {
    return (
        <tr>
            <td className="lrg-text">{props.data.week}</td>
            <td id={props.data.week + "-day1"}>
                <div className="cell-container" onClick={() => props.changeValue(props.data.week, 1, props.data[1].workout, props.data[1].time, props.data[1].distance)}><strong
            >{props.data[1].workout}</strong>
                    <div className="row-spacebetween">
                <div>{props.data[1].distance}&nbsp;
                    miles
                </div>
                <div>{props.data[1].time}&nbsp;
                    min
                </div></div>
            </div>
                <div className="cell-update-container" onClick={() => props.changeValue(props.data.week, 1, props.data[1].workout, props.data[1].time, props.data[1].distance)}>

                    <input type="number" step="0.01" id="distance" defaultValue={props.data[1].distance}></input><label>mi</label>
                    <input type="number" step="0.01" id="time" defaultValue={props.data[1].time}></input><label>min</label>
                    <input type="text" id="workout" defaultValue={props.data[1].workout}></input>
                    <input type="checkbox" id="completed-checkbox"></input><label htmlFor="completed-checkbox">Completed</label>
                    <span>X</span>
                    <button value="Save Run"></button>
                </div>

            </td>
            <td id={props.data.week + "-day2"}>
                <div className="cell-container" onClick={() => props.changeValue(props.data.week, 2, props.data[2].workout, props.data[2].time, props.data[2].distance)}><strong
                >{props.data[2].workout}</strong>
                    <div className="row-spacebetween">
                    <div>{props.data[2].distance}&nbsp;
                        miles
                    </div>
                    <div>{props.data[2].time}&nbsp;
                        min
                    </div>
                    </div>
                </div>
                <div className="cell-update-container" onClick={() => props.changeValue(props.data.week, 2, props.data[2].workout, props.data[2].time, props.data[2].distance)}>

                    <input type="number" step="0.01" id="distance" defaultValue={props.data[2].distance}></input><label>mi</label>
                    <input type="number" step="0.01" id="time" defaultValue={props.data[2].time}></input><label>min</label>
                    <input type="text" id="workout" defaultValue={props.data[2].workout}></input>
                    <input type="checkbox" id="completed-checkbox"></input><label htmlFor="completed-checkbox">Completed</label>
                    <span>X</span>
                    <button value="Save Run"></button>
                </div>
            </td>

            <td id={props.data.week + "-day3"}>
                <div className="cell-container" onClick={() => props.changeValue(props.data.week, 3, props.data[3].workout, props.data[3].time, props.data[3].distance)}><strong
            >{props.data[3].workout}</strong>
                    <div className="row-spacebetween">
                <div>{props.data[3].distance}&nbsp;
                    miles
                </div>
                <div>{props.data[3].time}&nbsp;
                    min
                </div>
                    </div>
            </div>
                <div className="cell-update-container" onClick={() => props.changeValue(props.data.week, 3, props.data[3].workout, props.data[3].time, props.data[3].distance)}>

                    <input type="number" step="0.01" id="distance" defaultValue={props.data[3].distance}></input><label>mi</label>
                    <input type="number" step="0.01" id="time" defaultValue={props.data[3].time}></input><label>min</label>
                    <input type="text" id="workout" defaultValue={props.data[3].workout}></input>
                    <input type="checkbox" id="completed-checkbox"></input><label htmlFor="completed-checkbox">Completed</label>
                    <span>X</span>
                    <button value="Save Run"></button>
                </div>
            </td>

            <td id={props.data.week + "-day4"}><div className="cell-container" onClick={() => props.changeValue(props.data.week, 4, props.data[4].workout, props.data[4].time, props.data[4].distance)}><strong
            >{props.data[4].workout}</strong>
                <div className="row-spacebetween">
                <div>{props.data[4].distance}&nbsp;
                    miles
                </div>
                <div>{props.data[4].time}&nbsp;
                    min
                </div>
                </div>
            </div>
                <div className="cell-update-container" onClick={() => props.changeValue(props.data.week, 4, props.data[4].workout, props.data[4].time, props.data[4].distance)}>

                    <input type="number" step="0.01" id="distance" defaultValue={props.data[4].distance}></input><label>mi</label>
                    <input type="number" step="0.01" id="time" defaultValue={props.data[4].time}></input><label>min</label>
                    <input type="text" id="workout" defaultValue={props.data[4].workout}></input>
                    <input type="checkbox" id="completed-checkbox"></input><label htmlFor="completed-checkbox">Completed</label>
                    <span>X</span>
                    <button value="Save Run"></button>
                </div>
            </td>

            <td id={props.data.week + "-day5"}><div className="cell-container" onClick={() => props.changeValue(props.data.week, 5, props.data[5].workout, props.data[5].time, props.data[5].distance)}><strong
            >{props.data[5].workout}</strong>
                <div className="row-spacebetween">
                <div>{props.data[5].distance}&nbsp;
                    miles
                </div>
                <div>{props.data[5].time}&nbsp;
                    min
                </div>
                </div>
            </div>
                <div className="cell-update-container" onClick={() => props.changeValue(props.data.week, 5, props.data[5].workout, props.data[5].time, props.data[5].distance)}>

                    <input type="number" step="0.01" id="distance" defaultValue={props.data[5].distance}></input><label>mi</label>
                    <input type="number" step="0.01" id="time" defaultValue={props.data[5].time}></input><label>min</label>
                    <input type="text" id="workout" defaultValue={props.data[5].workout}></input>
                    <input type="checkbox" id="completed-checkbox"></input><label htmlFor="completed-checkbox">Completed</label>
                    <span>X</span>
                    <button value="Save Run"></button>
                </div>
            </td>

            <td id={props.data.week + "-day6"}><div className="cell-container" onClick={() => props.changeValue(props.data.week, 6, props.data[6].workout, props.data[6].time, props.data[6].distance)}><strong
            >{props.data[6].workout}</strong>
                <div className="row-spacebetween">
                <div>{props.data[6].distance}&nbsp;
                    miles
                </div>
                <div>{props.data[6].time}&nbsp;
                    min
                </div>
                </div>
            </div>
                <div className="cell-update-container" onClick={() => props.changeValue(props.data.week, 7, props.data[7].workout, props.data[7].time, props.data[6].distance)}>

                    <input type="number" step="0.01" id="distance" defaultValue={props.data[6].distance}></input><label>mi</label>
                    <input type="number" step="0.01" id="time" defaultValue={props.data[6].time}></input><label>min</label>
                    <input type="text" id="workout" defaultValue={props.data[6].workout}></input>
                    <input type="checkbox" id="completed-checkbox"></input><label htmlFor="completed-checkbox">Completed</label>
                    <span>X</span>
                    <button value="Save Run"></button>
                </div>
            </td>

            <td id={props.data.week + "-day7"}><div className="cell-container" onClick={() => props.changeValue(props.data.week, 7, props.data[7].workout, props.data[7].time, props.data[7].distance)}><strong
            >{props.data[7].workout}</strong>
                <div className="row-spacebetween">
                <div>{props.data[7].distance}&nbsp;
                    miles
                </div>
                <div>{props.data[7].time}&nbsp;
                    min
                </div>
                </div>
            </div>
                <div className="cell-update-container" onClick={() => props.changeValue(props.data.week, 7, props.data[7].workout, props.data[7].time, props.data[7].distance)}>

                    <input type="number" step="0.01" id="distance" defaultValue={props.data[7].distance}></input><label>mi</label>
                    <input type="number" step="0.01" id="time" defaultValue={props.data[7].time}></input><label>min</label>
                    <input type="text" id="workout" defaultValue={props.data[7].workout}></input>
                    <input type="checkbox" id="completed-checkbox"></input><label htmlFor="completed-checkbox">Completed</label>
                    <span>X</span>
                    <button value="Save Run"></button>
                </div>
            </td>
        </tr>
)
};

export default week;