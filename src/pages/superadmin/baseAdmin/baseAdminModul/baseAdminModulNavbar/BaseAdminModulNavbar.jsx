import React from 'react';
import { NavLink } from 'react-router-dom';

export default function BaseAdminModulNavbar() {
  return (
    <>
      {/* <li className="nav-item">
                <NavLink to="/super_base_admin_tashkilot-tuzilishi" className="nav-link" activeClassName='NavLinkLi'>
                    <i className="icon-plus2 mr-1"></i> Структура организации
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/super_base_admin_administrator" className="nav-link" activeClassName='NavLinkLi'>
                    <i className="icon-office"></i> Администратор
                </NavLink>
            </li> */}
      <li className="nav-item" style={{ marginLeft: "20px" }}>
        <NavLink exact to="/super_base_admin-modullar" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-stack2"></i> Настройка модулей
        </NavLink>
        {/* <a href="./deteilHokimlik.html" className="nav-link  ml-2" >
                    <i className="icon-office"></i> Структура организации
                </a> */}
      </li>
      {/* <li className="nav-item">
                <a href="#" className="nav-link  ml-2" >
                    <i className="icon-office"></i> Входные данные
                </a>
            </li> */}
      {/* <li className="nav-item"><a href="./adminstartor.html" className="nav-link"><i className="icon-user-tie"></i> Администратор</a></li> */}
      {/* <li className="nav-item"><a href="./modulSozlamalari.html" className="nav-link NavLinkLi"><i className="icon-stack2"></i> Конфигурация модулей</a></li> */}
      {/* <li className="nav-item"><a href="#" className="nav-link "><i className="icon-newspaper"></i> Входные данные</a></li> */}

    </>
  )
}