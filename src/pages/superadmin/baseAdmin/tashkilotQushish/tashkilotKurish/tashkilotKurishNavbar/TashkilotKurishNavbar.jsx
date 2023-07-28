import React from "react";
import { NavLink } from "react-router-dom";

export default function TashkilotKurishNavbar({ params }) {
  return (
    <>
      <li className="nav-item" style={{ marginLeft: "20px" }}>
        <NavLink exact to={`/super_base_admin_tashkilotlar-tuzilishi/${params}`} className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-plus2 mr-1"></i> Структура организации
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/super_base_admin-administratsiya/${params}`} className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-office"></i> Администратор
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/super_base_admin_modul-sozlama/${params}`} className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-stack2"></i> Конфигурация модулей
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/super_base_admin_card-sozlama/${params}`} className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-stack2"></i> Настройки карты
        </NavLink>
      </li>
    </>
  )
}