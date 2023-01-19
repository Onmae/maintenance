import React from 'react';
import Td from './Td';

const Tr = ({info, className, whereFrom}) => {
    return (
        <tbody className={className}>
        {
            info.map(item => {
                return (
                    <Td key={item.id} item={item} whereFrom={whereFrom} />
                )
            })
        }
        </tbody>
    );
};

export default Tr;