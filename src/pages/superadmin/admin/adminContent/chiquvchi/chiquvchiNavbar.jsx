import React from 'react';
import {NavLink} from "react-router-dom";

const ChiquvchiNavbar = () => {
    return (
        <li className="nav-item">
            <NavLink to="/chiquvchi/super_admin_fishka" className="nav-link ml-2d-flex align-items-center"
                     activeClassName="NavLinkLi">
                <i className="icon-laptop mr-1"></i> Фишка
            </NavLink>
        </li>
    );
};

export default ChiquvchiNavbar;