import React from 'react';

const Flex = ({children, className, styles, align='flex-start', justify="flex-start"}) => {
    return (
        <div style={{
            display: "flex",
            alignItems: align,
            justifyContent: justify,
            ...styles
        }} className={className}>
            {children}
        </div>
    );
};

export default Flex;