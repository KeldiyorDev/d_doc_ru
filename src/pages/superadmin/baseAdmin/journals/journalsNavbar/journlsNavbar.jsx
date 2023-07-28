import React from "react";
import { NavLink } from 'react-router-dom';

const JournalsNavbar = () => {
  return (
    <>
      <li className="nav-item" style={{ marginLeft: "30px" }}>
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

export default React.memo(JournalsNavbar);