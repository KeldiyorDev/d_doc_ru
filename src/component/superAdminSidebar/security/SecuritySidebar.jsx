import React from 'react';

export default function SecuritySidebar() {
  return (
    <div className="sidebar sidebar-light sidebar-main sidebar-expand-lg sidebar-main-resized">
      <div className="sidebar-content">
        <div className="sidebar-section">
          <div className="sidebar-user-material">
            <div className="sidebar-section-body">
              <div className="d-flex">
                <div className="flex-1">
                </div>
                <a href="#1" className="flex-1 text-center">
                  <img src="/style/images/demo/users/face6.jpg"
                    className="img-fluid rounded-circle shadow-sm" width="80" height="80" alt="" />
                </a>
                <div className="flex-1 text-right">
                  <button type="button"
                    className="btn btn-outline-light border-transparent btn-icon rounded-pill btn-sm sidebar-control sidebar-main-resize d-none d-lg-inline-flex">
                    <i className="icon-transmission"></i>
                  </button>

                  <button type="button"
                    className="btn btn-outline-light border-transparent btn-icon rounded-pill btn-sm sidebar-mobile-main-toggle d-lg-none">
                    <i className="icon-cross2"></i>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <h6 className="mb-0 text-white text-shadow-dark mt-3">Doniyor Sodiqov</h6>
              </div>
            </div>

            <div className="sidebar-user-material-footer">
              <a href="#user-nav"
                className="d-flex justify-content-between align-items-center text-shadow-dark dropdown-toggle"
                data-toggle="collapse"><span> Настройки</span>
              </a>
            </div>
          </div>

          <div className="collapse border-bottom" id="user-nav">
            <ul className="nav nav-sidebar">
              <li className="nav-item">
                <a href="#1" className="nav-link">
                  <i className="icon-cog5"></i>
                  <span>Настройки учетной записи </span>
                </a>
              </li>
              <li className="nav-item">
                <a href="#1" className="nav-link">
                  <i className="icon-switch2"></i>
                  <span>Выход</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-section">
          <ul className="nav nav-sidebar" data-nav-type="accordion">
            <li className="nav-item-header">
              <div className="text-uppercase font-size-xs line-height-xs mt-1">Панель приборов</div> <i
                className="icon-menu" title="Main"></i>
            </li>
            <li className="nav-item nav-item-submenu">
              <a href="#1" className="nav-link"><i className="icon-home4"></i> <span> пришел и ушел</span></a>

              <ul className="nav nav-group-sub">
                <li className="nav-item">
                  <a href="index.html" className="nav-link">Сотрудники</a>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-item-submenu">
              <a href="#1" className="nav-link"><i className="icon-home4"></i> <span>Принятие </span></a>

              <ul className="nav nav-group-sub">
                <li className="nav-item">
                  <a href="index.html" className="nav-link">Прием Директор</a>
                </li>
                <li className="nav-item">
                  <a href="#1" className="nav-link">Прием граждан</a>
                </li>
              </ul>
            </li>
            <li className="nav-item nav-item-submenu">
              <a href="#1" className="nav-link"><i className="icon-home4"></i> <span>Уведомление</span></a>

              <ul className="nav nav-group-sub">
                <li className="nav-item">
                  <a href="index.html" className="nav-link">Уведомление об объявлении</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
