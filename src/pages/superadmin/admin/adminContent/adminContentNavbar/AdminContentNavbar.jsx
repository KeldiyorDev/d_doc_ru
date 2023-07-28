import React from "react";
import { NavLink } from "react-router-dom";

const AdminContentNavbar = () => {
  return (
    <>
      <li className="nav-item" style={{ marginLeft: "20px" }}>
        <NavLink exact to="/super_admin_sozlamalar" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-stack2 mr-1"></i> Отделение
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_admin_lavozim" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-user-tie mr-1"></i> Позиция
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_admin_foydalanuvchi" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-user mr-1"></i> Пользователь
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_admin_ish-stoli" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-laptop mr-1"></i> Рабочий стол
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_admin_fishka" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-laptop mr-1"></i> Фишка
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_admin_asosiy-banner" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-laptop mr-1"></i> Главный баннер
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_admin_buyruq-banner" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-laptop mr-1"></i> Командный баннер
        </NavLink>
      </li>
    </>
  )
}

export default React.memo(AdminContentNavbar);