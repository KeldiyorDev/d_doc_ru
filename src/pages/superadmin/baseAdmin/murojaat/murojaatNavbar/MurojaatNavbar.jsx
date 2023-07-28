import React from "react";
import { NavLink } from "react-router-dom";

export default function MurojaatNavbar() {
  return (
    <>
      <li className="nav-item" style={{ marginLeft: "30px" }}>
        <NavLink to="/super_base_admin_murojaat" className="nav-link" activeClassName='NavLinkLi'>
          {/* <i className="icon-plus2 mr-1"></i> */}
          Направления
        </NavLink>
      </li>
      <li className="nav-item" >
        <NavLink exact to="/super_base_admin_fuqaro-savollari" className="nav-link" activeClassName='NavLinkLi'>
        Вопросы приложения
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_base_admin_fuqaro-javoblari" className="nav-link" activeClassName='NavLinkLi'>
          {/* <i className="icon-office"></i>  */}
          Ответы приложений
        </NavLink>
      </li>
    </>
  )
}