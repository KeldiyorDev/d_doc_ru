import React from 'react';
import {NavLink} from "react-router-dom";

const NavItem = ({ className, ml, styles, to, exact=false, children, classLink }) => {
    return (
        <li className={`nav-item ${className}`} style={{ marginLeft: ml && 20, styles }}>
            <NavLink
                exact={exact}
                to={to}
                activeClassName="NavLinkLi"
                className={`nav-link d-flex align-items-center ${classLink}`}
            >
                {children}
            </NavLink>
        </li>
    );
};

export default NavItem;