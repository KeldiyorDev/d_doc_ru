import jwtDecode from 'jwt-decode';
import React, { useState } from 'react';
// import { AuthContext } from '../../../context/AuthContext';
import './baseAdminSidebar.css';
import { url } from '../../../config';
import SidebarSectionBase from './sidebarSectionBase/SidebarSectionBase';
import UpdateModalBase from './updateModalBase/UpdateModalBase';

const BaseAdminNavbar = ({ currentUser }) => {
  // const { dispatch } = useContext(AuthContext);
  const [updateModal, setUpdateModal] = useState(false);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const userData = JSON.parse(jwtDecode(currentUser)?.supperAdmin);

  return (
    <>
      <div className="sidebar sidebar-light sidebar-main sidebar-expand-lg sidebar-main-resized">
        <div className="sidebar-content">
          <div className="sidebar-section">
            <div className="sidebar-user-material">
              <div className="sidebar-section-body">
                <div className="d-flex" >
                  <div className="flex-1"></div>
                  <a
                    href="#1"
                    className="flex-1 text-center"
                    style={{ height: "100px !important" }}>
                    <img
                      src={userData?.avatar ? `${url}/api/file/view/${userData?.avatar?.generatedName}` : "/assets/user.png"}
                      className="img-fluid rounded-circle shadow-sm overflow-hidden"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        aspectRatio: '3/3',
                        flex: 'none'
                      }}
                      alt="Your avatar"
                    />
                  </a>
                  <div className="flex-1 text-right">
                    <button type="button"
                      className="btn btn-outline-light border-transparent btn-icon rounded-pill btn-sm sidebar-control sidebar-main-resize d-none d-lg-inline-flex">
                      <i className="icon-transmission" />
                    </button>

                    <button type="button"
                      className="btn btn-outline-light border-transparent btn-icon rounded-pill btn-sm sidebar-mobile-main-toggle d-lg-none">
                      <i className="icon-cross2" />
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <h6 className="mb-0 text-white text-shadow-dark mt-3 cursor-pointer" onClick={() => setUpdateModal(true)}>{userData?.fullName}</h6>
                </div>
              </div>
            </div>

            <div className="collapse border-bottom" id="user-nav">
              <ul className="nav nav-sidebar"></ul>
            </div>
          </div>

          <SidebarSectionBase />
        </div >
      </div >

      {updateModal && (
        <UpdateModalBase
          setAlert={setAlert}
          currentUser={currentUser}
          userData={userData}
          setUpdateModal={setUpdateModal}
        />
      )}

      {/* alert */}
      {alert.open && (
        <div className={`alert alert-${alert.color} alertNotice alert-styled-left alert-dismissible`} style={{ zIndex: "999 !important!" }}>
          <span className="font-weight-semibold">{alert.text}</span>
        </div>
      )}
    </>
  )
}

export default React.memo(BaseAdminNavbar);