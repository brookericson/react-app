import React from 'react';

const week = (props) => {
    return (
                <tr>
                        <td className="lrg-text">{props.data.week}</td>
                        <td><span>{props.data[1].workout}</span>
                        </td>
                        <td><span>{props.data[2].workout}</span>
                        </td>
                        <td><span>{props.data[3].workout}</span>
                        </td>
                        <td><span>{props.data[4].workout}</span>
                        </td>
                        <td><span>{props.data[5].workout}</span>
                        </td>
                        <td><span>{props.data[6].workout}</span>
                        </td>
                        <td><span>{props.data[7].workout}</span>
                        </td>
                </tr>
                )
};

export default week;