import React from 'react';

const week = (props) => {
    return (
        <tr>
            <td>{props.week}</td>
            <td>{props.day1}</td>
            <td>{props.day2}</td>
            <td>{props.day3}</td>
            <td>{props.day4}</td>
            <td>{props.day5}</td>
            <td>{props.day6}</td>
            <td>{props.day7}</td>
        </tr>
    );
};

export default week;