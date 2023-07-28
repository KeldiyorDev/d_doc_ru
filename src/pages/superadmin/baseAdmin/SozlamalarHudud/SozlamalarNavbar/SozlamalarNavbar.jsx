import React from "react";
import { NavLink } from 'react-router-dom';

export default function SozlamalarNavbar() {
  return (
    <>
      <li className="nav-item" style={{ marginLeft: "30px" }}>
        <NavLink exact to="/super_base_admin_murojaat_formasi" className="nav-link" activeClassName='NavLinkLi'>
        Форма заявки
        </NavLink>
      </li>
      <li className="nav-item" >
        <NavLink exact to="/super_base_admin_murojaat_maqsadi" className="nav-link" activeClassName='NavLinkLi'>
        Цель применения
        </NavLink>
      </li>
      <li className="nav-item" >
        <NavLink exact to="/super_base_admin_murojaat_turi" className="nav-link" activeClassName='NavLinkLi'>
        Тип приложения
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact to="/super_base_admin_qabulxona" className="nav-link" activeClassName='NavLinkLi'>
        Прием
        </NavLink>
      </li>
    </>
  )
}