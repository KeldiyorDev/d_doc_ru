import React from "react";
import { NavLink } from "react-router-dom";

const AdminQushishNavbar = () => {
  return (
    <>
      <li className="nav-item" >
        <NavLink exact to="/super_base_admin_tashkilot-qushish" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-plus2 mr-1"></i> Организации
        </NavLink>
      </li>
    </>
  )
}

export default React.memo(AdminQushishNavbar);