import React from "react";
import { NavLink } from 'react-router-dom';

const NavbarContentMonitoring = () => {

  return (
    <>
      <li exact className="nav-item" style={{ marginLeft: "20px", display: "none" }}>
        <NavLink exact to={`/monitoring`} activeClassName='NavLinkLi'
          className="nav-link d-flex align-items-center">
          <i className="icon-plus2 mr-1"></i> Все
        </NavLink>
      </li>
      <li className="nav-item" style={{ marginLeft: "20px" }}>
        <NavLink to={`/monitoring_kiruvchi`} activeClassName="NavLinkLi"
          className="nav-link d-flex align-items-center">
          <i className="icon-user-plus mr-1"></i> Входящий
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/monitoring_nazorat-kartochka`} activeClassName="NavLinkLi"
          className="nav-link d-flex align-items-center">
          <i className="icon-user-plus mr-1"></i>Контрольная карта
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/monitoring_nazorat-kartochka-malumot`} activeClassName="NavLinkLi"
          className="nav-link d-flex align-items-center">
          <i className="icon-newspaper mr-1"></i> Информация о контрольной карте
        </NavLink>
      </li>
      <li className="nav-item">
        {/* <NavLink to="/monitoring_test" activeClassName="NavLinkLi" className="nav-link d-flex align-items-center">
                    <i className="icon-user-plus mr-1"></i> Test
                </NavLink> */}
        {/* <a href="./test.html" class="nav-link">
                <i class="icon-user-plus"></i> Test
                </a> */}
      </li>
      <li className="nav-item">
        {/* <NavLink to="/monitoring_svodaka-new" activeClassName="NavLinkLi" className="nav-link d-flex align-items-center">
                    <i class="icon-user-plus mr-1"></i> Svodaka New
                </NavLink> */}
      </li>
      {/* <li className="nav-item">
        <NavLink to={`/monitoring_svodka`} activeClassName="NavLinkLi"
          className="nav-link d-flex align-items-center">
          <i className="icon-user-plus mr-1"></i> Umumiy hisobot
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/monitoring_svodka_qvc`} activeClassName="NavLinkLi"
          className="nav-link d-flex align-items-center">
          <i className="icon-user-plus mr-1"></i> Umumiy hisobot qidirish
        </NavLink>
      </li> */}
      <li className="nav-item">
        <NavLink to={`/monitoring_yuqori_tashkilot_1a`} activeClassName="NavLinkLi"
          className="nav-link d-flex align-items-center">
          <i className="icon-user-plus mr-1"></i> Высшая организация 1
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={`/monitoring_umumiy-hisobot`} activeClassName="NavLinkLi"
          className="nav-link d-flex align-items-center">
          <i className="icon-user-plus mr-1"></i> Отчет
        </NavLink>
      </li>
    </>
  )
}

export default React.memo(NavbarContentMonitoring);