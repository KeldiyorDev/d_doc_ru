import React from 'react';
import { NavLink } from 'react-router-dom';

export default function RollarNavbar() {
  return (
    <>
      <li className="nav-item" >
        <NavLink exact to="/super_base_admin_rollar" className="nav-link" activeClassName='NavLinkLi'>
        Организационные роли
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_base_admin_xodim-rollari" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-office"></i> Роли сотрудников
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact to="/super_base_admin_boshqa-rollar" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-stack2"></i> Другие роли
        </NavLink>
      </li>
    </>
  )
}