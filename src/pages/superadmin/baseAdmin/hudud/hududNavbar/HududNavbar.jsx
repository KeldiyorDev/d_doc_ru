import React from "react";
import { NavLink } from 'react-router-dom';

const HududNavbar = () => {
  return (
    <>
      <li className="nav-item" style={{ marginLeft: "20px" }}>
        <NavLink to="/super_base_admin_hudud-viloyatlar" className="nav-link" activeClassName='NavLinkLi'>
        Провинции
        </NavLink>
      </li>
      <li className="nav-item" >
        <NavLink to="/super_base_admin_hudud-shahar-tuman" className="nav-link" activeClassName='NavLinkLi'>
        Города и районы
        </NavLink>
      </li>
      <li className="nav-item" >
        <NavLink exact to="/super_base_admin_hudud" className="nav-link" activeClassName='NavLinkLi'>
        Район
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink exact to="/super_base_admin_journals_tasnif1" className="nav-link" activeClassName='NavLinkLi'>
        Классификация1
        </NavLink>
      </li>
      <li className="nav-item" >
        <NavLink to="/super_base_admin_journals_tasnif2" className="nav-link" activeClassName='NavLinkLi'>
        Классификация2
        </NavLink>
      </li>
      <li className="nav-item" >
        <NavLink to="/super_base_admin_journals_tasnif3" className="nav-link" activeClassName='NavLinkLi'>
        Классификация3
        </NavLink>
      </li>
    </>
  )
}

export default React.memo(HududNavbar);