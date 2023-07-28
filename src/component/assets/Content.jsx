import React from 'react';

const Content = ({children, title}) => {
    return (
        <div className="content content-mobile mb-5">
            <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "uppercase" }}>{title}</h3>
            <div className="card-body card-body-mobile">
                {children}
            </div>
        </div>
    );
};

export default Content;