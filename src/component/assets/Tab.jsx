import React from 'react';

const Tab = ({children, bar}) => {
    return (
        <>
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
                {bar}
            </ul>

            <div className="tab-content">
                <div className="tab-pane fade show active" id="colored-tab1">
                    <div className="card">
                        <div className="card-body card-body-mobile">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Tab;