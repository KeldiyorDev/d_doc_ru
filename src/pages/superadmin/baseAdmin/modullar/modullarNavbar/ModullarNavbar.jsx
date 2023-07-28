import React from "react";
import { NavLink } from "react-router-dom";

const ModullarNavbar = () => {
  return (
    <>
      <NavLink exact to="/super_base_admin-modullar" className="nav-link" activeClassName='NavLinkLi'>
        <i className="icon-stack2"></i> Настройка модулей
      </NavLink>
      {/* <li className="nav-item" >
        <NavLink exact to="/super_base_admin-modullar" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-plus2 mr-1"></i> Modullar
        </NavLink>
      </li>
      <li className="nav-item">
        <a href="#1" className="nav-link" activeClassName='NavLinkLi'>
          Sozlamalar
        </a>
      </li> */}
    </>
  )
}

export default React.memo(ModullarNavbar);