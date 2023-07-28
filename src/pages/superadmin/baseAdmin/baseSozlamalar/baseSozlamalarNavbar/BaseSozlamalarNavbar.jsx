import React from "react";
import { NavLink } from 'react-router-dom';

const BaseSozlamalarNavbar = () => {
  return (
    <>
      <li className="nav-item ">
        <NavLink exact to="/super_base_admin_sozlamalar" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-file-text mr-1"></i>Карточка
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_base_admin_sozlamalar-korrespandent" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-bubbles6 mr-1"></i>Корреспондент
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_base_admin_sozlamalar_tadqim-etish-formasi" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-vcard mr-1"></i>Форма представления
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_base_admin_sozlamalar-rezalutsiya" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-hour-glass2 mr-1"></i>Быстрое разрешение
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/super_base_admin_sozlamalar-jurnallar" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-newspaper mr-1"></i>Журнали
        </NavLink>
      </li>
    </>
  )
}

export default React.memo(BaseSozlamalarNavbar);