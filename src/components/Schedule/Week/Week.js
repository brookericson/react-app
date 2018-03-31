import React from 'react';

const week = (props) => {
    return (
        props.data.map((week, index) => {
                return (
                <tr>
                        <td className="lrg-text">{week.week}</td>
                        <td><span>{week[1].workout}</span>
                        </td>
                        <td><span>{week[2].workout}</span>
                        </td>
                        <td><span>{week[3].workout}</span>
                        </td>
                        <td><span>{week[4].workout}</span>
                        </td>
                        <td><span>{week[5].workout}</span>
                        </td>
                        <td><span>{week[6].workout}</span>
                        </td>
                        <td><span>{week[7].workout}</span>
                        </td>
                </tr>
                )
        })
    )
};

export default week;