import React, { useState } from 'react';
import './allSidebarData.css';
import jwtDecode from 'jwt-decode';
import { url } from '../../config';
import OpenModalFaq from './openModalFaq/OpenModalFaq';
import UpdateModal from './updateModal/UpdateModal';
import SidebarSection from './sidebarSection/SidebarSection';
// import { useEffect } from 'react';
import AlertContent from '../alert/Alert';

const AllSidebarData = ({ permission1, ranks, roles, currentUser }) => {
  const [updateModal, setUpdateModal] = useState(false);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [openModalFaq, setOpenModalFaq] = useState(false);
  const userData = JSON.parse(jwtDecode(currentUser)?.supperAdmin);

  // console.log(roles, permission1, ranks);

  // useEffect(() => {
  //   let isMounted = true;

  //   if (isMounted) {
  //     if (document.querySelector('.sidebar').classList.contains('sidebar-mobile-expanded')) {

  //     }
  //   }

  //   return () => isMounted = false;
  // }, []);

  return (
    <>
      <div className="sidebar sidebar-light sidebar-main sidebar-expand-lg sidebar-main-resized">
        <div className="sidebar-content sidebar-content-hover" style={{ postion: 'relative' }}>
          <div className="sidebar-section sidebar-user">
            <div className="sidebar-user-material">
              <div className="sidebar-section-body">
                <div className="d-flex">
                  <div className={'flex-1'} />
                  <span className="text-center">
                    {userData.file ? (
                      <img
                        src={userData.file?.generatedName ? url + "/api/file/view/" + userData.file.generatedName : "/assets/user.png"}
                        className="rounded-circle shadow-sm overflow-hidden"
                        style={{
                          width: '80%',
                          height: '100%',
                          objectFit: 'cover',
                          aspectRatio: '3 / 3',
                        }}
                        alt="your avatar"
                      />
                    ) : (
                      <img
                        src={"/assets/user.png"}
                        className="rounded-circle shadow-sm overflow-hidden"
                        style={{
                          width: '80%',
                          height: '100%',
                          objectFit: 'cover',
                          aspectRatio: '3 / 3',
                        }}
                        alt="your avatar"
                      />
                    )}
                  </span>

                  <div className="text-right position-absolute" style={{ right: 10 }}>
                    <button type="button"
                      className="btn btn-outline-light border-transparent btn-icon rounded-pill btn-sm sidebar-control sidebar-main-resize d-none d-lg-inline-flex">
                      <i className="icon-transmission" />
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <h6 className="mb-0 text-white text-shadow-dark mt-3 cursor-pointer"
                    onClick={() => setUpdateModal(true)}>{userData.firstName} {userData.lastName} </h6>
                </div>
              </div>
            </div>
          </div>

          <SidebarSection
            roles={roles}
            permission={permission1}
            ranks={ranks}
            currentUser={currentUser}
          />

          <OpenModalFaq
            setOpenModalFaq={setOpenModalFaq}
            openModalFaq={openModalFaq}
          />
        </div>
      </div>

      <UpdateModal
        setUpdateModal={setUpdateModal}
        setAlert={setAlert}
        updateModal={updateModal}
        userData={userData}
      />

      {/* alert */}
      <AlertContent alert={alert} />

    </>
  )
}

export default React.memo(AllSidebarData);