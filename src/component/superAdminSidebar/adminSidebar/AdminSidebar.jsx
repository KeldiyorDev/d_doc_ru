import React, { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { url } from '../../../config';
import OpenModal from './openModal/OpenModal';
import SidebarSection from './sidebarSection/SidebarSection';
import AlertContent from '../../alert/Alert';
import './adminSidebar.css';

const AdminNavbar = ({ currentUser }) => {
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
                <div className="d-flex">
                  <div style={{ width: '36px' }} />
                  <span className="flex-1 text-center">
                    <img
                      src={userData?.file?.id ? `${url}/api/file/view/${userData?.file?.id}` : "/assets/user.png"}
                      className="img-fluid rounded-circle shadow-sm"
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }}
                      alt="" />
                  </span>
                  <div className=" text-right">
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
                  <h6 className="mb-0 text-white text-shadow-dark mt-3 cursor-pointer"
                    onClick={() => setUpdateModal(true)}>{userData?.firstName} {userData?.lastName}</h6>
                </div>
              </div>
            </div>
          </div>

          <SidebarSection />
        </div>
      </div>

      <OpenModal
        setUpdateModal={setUpdateModal}
        updateModal={updateModal}
        currentUser={currentUser}
        setAlert={setAlert}
        userData={userData}
      />

      {/* alert */}
      <AlertContent alert={alert} />
    </>
  )
}

export default React.memo(AdminNavbar);