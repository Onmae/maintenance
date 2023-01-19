import {Link} from "react-router-dom";
import React from "react";

export const linkTd = ({whereFrom, linkId, value, index}) => {
    return (
        <td key={index} className="px-3 py-2">
            <Link to={`${whereFrom}/${linkId}`}>{value}</Link>
        </td>
    )
}

export default linkTd