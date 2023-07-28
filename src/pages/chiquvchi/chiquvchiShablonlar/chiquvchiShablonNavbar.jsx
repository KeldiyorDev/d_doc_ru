import React from 'react';
import {NavLink} from "react-router-dom";
import './chiquvchiStyle.css';

const ChiquvchiShablonNavbar = ({currentUser}) => {
    return (
        <>
            <li className="nav-item" >
                <NavLink to="/chiquvchi/shablon/yaratish" className="nav-link " activeClassName='NavLinkLi' style={{ marginLeft: "20px" }}>
                    <i className="icon-plus2 mr-1 sx-none"></i> Добавить новое
                </NavLink>
            </li>
        </>
    );
};

export default ChiquvchiShablonNavbar;