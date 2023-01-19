import React from 'react';
import {Link, useNavigate} from "react-router-dom";

const Td = ({item, className, whereFrom}) => {
    const navigate = useNavigate()

    const linkEvent = () => {
        navigate(`/${whereFrom}/${item.id}`)
    }

    return (
        <>
            <tr className='bg-white border-t-2 border-b-2 border-gray-100 text-sm hover:cursor-pointer hover:bg-gray-400' onClick={linkEvent}>
                {
                    Object.values(item).map((value, index) => {
                            return (<td key={index} className="px-3 py-2 text-center whitespace-pre-wrap">{value}</td>)
                    })
                }
            </tr>
        </>
    )
};

export default Td;