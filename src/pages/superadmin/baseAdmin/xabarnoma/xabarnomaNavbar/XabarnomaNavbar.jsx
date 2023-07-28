import React from "react";

export default function XabarnomaNavbar() {
  return (
    <>
      <li className="nav-item" style={{ marginLeft: "30px" }}>
        <a href="#1" className="nav-link" activeClassName='NavLinkLi'>
          Desktop
        </a>
      </li>
      <li className="nav-item">
        <a href="#1" className="nav-link" activeClassName='NavLinkLi'>
          Телеграм бот
        </a>
      </li>
      <li className="nav-item">
        <a href="#1" className="nav-link" activeClassName='NavLinkLi'>
          СМС
        </a>
      </li>
    </>
  )
}