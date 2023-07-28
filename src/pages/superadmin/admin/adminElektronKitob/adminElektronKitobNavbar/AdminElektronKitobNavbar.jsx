import React from "react";
import { NavLink } from "react-router-dom";

const AdminElektronKitobNavbar = () => {
  return (
    <>
      <li className="nav-item" style={{ marginLeft: "15px" }}>
        <NavLink exact to="/super_admin_elektron-kitob" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-plus2 mr-1"></i> Добавить новое
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_admin_elektron-kitob-faollar" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-stack2 mr-1"></i> Активный
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_admin_elektron-kitob-arxiv" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-newspaper mr-1"></i> Архив
        </NavLink>
      </li>
    </>
  )
}

export default React.memo(AdminElektronKitobNavbar);