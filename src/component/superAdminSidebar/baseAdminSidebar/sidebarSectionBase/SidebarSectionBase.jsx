import React from "react";
import { Link } from "react-router-dom";

export default function SidebarSectionBase() {

  const openFM = (name) => {
    if (document.querySelector(`.${name}`).querySelector('ul').style.display === "none") {
      document.querySelector(`.${name}`).querySelector('ul').style.display = "block";
    } else {
      document.querySelector(`.${name}`).querySelector('ul').style.display = "none";
    }
  }

  return (
    <div className="sidebar-section">
      <ul className="nav nav-sidebar" data-nav-type="accordion">
        {/* <li className="nav-item-header">
                        <div className="text-uppercase font-size-xs line-height-xs mt-1">Dashboard</div> <i
                            className="icon-menu" title="Main" />
                    </li>
                     collapse */}
        {/* <li className="nav-item nav-item-submenu">
                    <a href="#" className="nav-link"><i className="icon-home4" /> <span>Tashkilot qo'shish</span></a>

                    <ul className="nav nav-group-sub" >
                        <li className="nav-item">
                            <Link to="/super_base_admin_tashkilotlar" className="nav-link">
                                Tashkilotlar
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/super_base_admin_sozlamalar" className="nav-link">
                                Sozlamalar
                            </Link>
                        </li>
                    </ul>
                </li> */}
        {/* <li className="nav-item">
                        <Link to="/super_base_admin" className="nav-link d-flex align-items-center">
                             <i className="icon-home4" />
                            <i className="fas fa-home" />
                            <span>Bosh sahifa</span>
                        </Link>
                    </li>*/}
        <li className="nav-item nav-item-submenu Kiruvchi" style={{ fontSize: '16px !important' }}>
          <div className="nav-link" onClick={() => openFM('Kiruvchi')}>
            <i className="icon-home4 " />
            <span style={{ fontSize: "18px" }}>Входящий</span>
          </div>

          <ul className="nav-item-ul" style={{ display: "none" }}>
            <li className="nav-item">
              <Link to="/super_base_admin_tashkilot-qushish" className="nav-link d-flex align-items-center" style={{ fontSize: "18px" }}>
                <i className="fas fa-folder-plus" />
                <span>Добавить организацию</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/super_base_admin-modullar" className="nav-link d-flex align-items-center" style={{ fontSize: "18px" }}>
                <i className="fas fa-cog" />
                <span>Модул</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/super_base_admin-kartochka" className="nav-link d-flex align-items-center" style={{ fontSize: "18px" }}>
                <i className="fas fa-plus" />
                <span>Добавить карту</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/super_base_admin-fake" className="nav-link d-flex align-items-center" style={{ fontSize: "18px" }}>
                <i className="fa-solid fa-arrows-rotate"></i>
                <span>Ложь</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/super_base_admin-org" className="nav-link d-flex align-items-center" style={{ fontSize: "18px" }}>
                <i className="fa-solid fa-arrows-rotate"></i>
                <span>Администратор</span>
              </Link>
            </li>
          </ul>
        </li>

        {/*      <li className="nav-item nav-item-submenu">
                    <a href="#" className="nav-link"><i className="icon-home4" /> <span>Admin qo'shish</span></a>

                    <ul className="nav nav-group-sub">
                        <li className="nav-item">
                            <a href="index.html" className="nav-link">Adminlar</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Sozlamalar</a>
                        </li>
                    </ul>
                </li>
                     <li className="nav-item">
                    <Link to="/super_base_admin_murojaat" className="nav-link">
                        <i className="icon-home4" />
                        <span>Modullar</span>
                    </Link>
                </li>
                     <li className="nav-item">
                    <Link to="/super_base_admin_hudud" className="nav-link d-flex align-items-center">
                        <i className="fas fa-archway" />
                        <span>Hudud</span>
                    </Link>
                </li>
                     <li className="nav-item">
                    <Link to="/super_base_admin_murojaat" className="nav-link d-flex align-items-center">
                        <i className="fas fa-envelope-open-text" />
                        <span>Murojaat</span>
                    </Link>
                </li> */}
        {/* <li className="nav-item">
                    <a href="#1" className="nav-link d-flex align-items-center">
                        <i className="fas fa-question-circle" />
                        <span>API</span>
                    </a>
                </li>
                <li className="nav-item">
                    <Link to="/super_base_admin_xabarnoma" className="nav-link d-flex align-items-center">
                        <i className="fas fa-envelope-square" />
                        <span>Xabarnoma</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <a href="#1" className="nav-link d-flex align-items-center">
                        <i className="fas fa-chart-pie" />
                        <span>Monitoring</span>
                    </a>
                </li>
                    <li className="nav-item nav-item-submenu" style={{ display: "none" }}>
                    <a href="#1" className="nav-link"><i className="icon-magazine" /> <span>Monitoring</span></a>

                    <ul className="nav nav-group-sub">
                        <li className="nav-item">
                            <a href="index.html" className="nav-link">Hisobotlar</a>
                        </li>
                        <li className="nav-item">
                            <a href="#1" className="nav-link">Statistika</a>
                        </li>
                    </ul>
                </li> */}

        {/*<div className="sidebar-user-material-footer">
                        <a href="#fuqaro-murojati"
                            className={"d-flex justify-content-between align-items-center dropdown-toggle text-decoration-none"}
                            data-toggle="collapse" aria-expanded="true">
                            <span>Fuqoro Murojati</span>
                        </a>
                    </div>

                    <div className="border-bottom collapse" id="fuqaro-murojati">
                        <ul className="nav nav-sidebar">
                            <li className="nav-item">
                                <Link to="/super_base_admin_tashkilot-ko'rish" className="nav-link d-flex align-items-center">
                                    <i className="fas fa-folder-plus" />
                                    <span>Hudud</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/super_base_admin_murojaat_formasi" className="nav-link d-flex align-items-center">
                                    <i className="fas fa-folder-plus" />
                                    <span>Sozlamalar</span>
                                </Link>
                            </li>
                        </ul>
                    </div>*/}
        <li className="nav-item nav-item-submenu fqMurojaati">
          <div className="nav-link" onClick={() => openFM('fqMurojaati')}>
            <i className="icon-home4" />
            <span style={{ fontSize: '18px' }}>Гражданская апелляция</span>
          </div>

          <ul className="nav-item-ul" style={{ display: "none" }}>
            <li className="nav-item">
              <Link to="/super_base_admin_hudud-viloyatlar" className="nav-link d-flex align-items-center" style={{ fontSize: '18px' }}>
                <i className="fas fa-folder-plus" />
                <span>Территория</span>
              </Link>
            </li>
            {/* <li className="nav-item">*/}
            {/*  <Link to="/super_base_admin_murojaat_formasi" className="nav-link d-flex align-items-center" style={{ fontSize: '18px' }}>*/}
            {/*    <i className="fas fa-cog" />*/}
            {/*    <span>Sozlamalar</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
            {/* <li className="nav-item">*/}
            {/*  <Link to="/super_base_admin_journals_tasnif1" className="nav-link d-flex align-items-center" style={{ fontSize: '18px' }}>*/}
            {/*    <i className="fas fa-cog" />*/}
            {/*    <span>Jurnallar</span>*/}
            {/*  </Link>*/}
            {/*</li>*/}
          </ul>
        </li>
      </ul>
    </div>
  )
}