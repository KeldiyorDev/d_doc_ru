import React from "react";
import { NavLink } from 'react-router-dom';

const ContentNavbarSozlamalar = () => {
  return (
    <>
      {/*<li className="nav-item " style={{ marginLeft: "30px" }}>*/}
      {/*    <NavLink exact to="/sozlamalar" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">*/}
      {/*        <i className="icon-file-text mr-1"></i>Kartochka*/}
      {/*    </NavLink>*/}
      {/*</li>*/}
      <li className="nav-item" style={{ marginLeft: "30px" }}>
        <NavLink exact to="/office_manager/mavjud/paketlar" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-file-text mr-1"></i>Пакеты
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/office_manager/umumiy/tashkilotlar" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-file-text mr-1"></i> Организации
        </NavLink>
      </li>
      {/* <li className="nav-item">
        <NavLink to="/sozlamalar_korrespondent" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-bubbles6 mr-1"></i>Korrespondent
        </NavLink>
      </li> */}
      <li className="nav-item">
        <NavLink to="/sozlamalar_taqdim-formasi" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-vcard mr-1"></i>Форма представления
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/sozlamalar_tezkor-rezolutsiya" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
          <i className="icon-hour-glass2 mr-1"></i>Быстрое разрешение
        </NavLink>
      </li>
      {/* <li className="nav-item">
                <NavLink to="/jurnallar_yangi-qo'shish" activeClassName="NavLinkLi d-flex align-items-center" className="nav-link">
                    <i className="icon-newspaper mr-1"></i>Jurnallar
                </NavLink>
            </li> */}
    </>
  )
}

export default React.memo(ContentNavbarSozlamalar);