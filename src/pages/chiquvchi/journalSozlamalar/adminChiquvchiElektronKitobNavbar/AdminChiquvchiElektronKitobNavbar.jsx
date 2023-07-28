import React from "react";
import { NavLink } from "react-router-dom";

export default function ChiquvchiElektronKitobNavbar() {
  return (
    <>
      <li className="nav-item" style={{ marginLeft: "25px" }}>
        <NavLink to="/chiquvchi/elektron-kitob" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-plus2 mr-1"></i> Добавить новое
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/chiquvchi/elektron-kitob-faollar" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-stack2 mr-1"></i> Активный
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/chiquvchi/elektron-kitob-arxiv" className="nav-link ml-2d-flex align-items-center" activeClassName="NavLinkLi">
          <i className="icon-newspaper mr-1"></i> Архив
        </NavLink>
      </li>
    </>
  )
}