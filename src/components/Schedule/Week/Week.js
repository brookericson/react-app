import React from 'react';

const week = (props) => {
    return (
        <tr>
            <td class="lrg-text">{props.week}</td>
            <td><span>{props.day1}</span>
            </td>
            <td><span>{props.day2}</span>
            </td>
            <td><span>{props.day3}</span>
            </td>
            <td><span>{props.day4}</span>
            </td>
            <td><span>{props.day5}</span>
            </td>
            <td><span>{props.day6}</span>
            </td>
            <td><span>{props.day7}</span>
            </td>
        </tr>
    );
};

export default week;