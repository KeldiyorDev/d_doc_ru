import axios from 'axios';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosInstance } from '../../config';
import { EXIT } from '../../context/AuthReducer';
import AlertContent from '../alert/Alert';
import SuperAdminNotification from './superAdminNotification/SuperAdminNotification';
import { logOut } from "../../redux/actions/actionSingInSingOut";
import './navbar.css';

const Navbar = ({ currentUser, setSimpleUser, setUserAdmin }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openModalData, setOpenModalData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openSize, setOpenSize] = useState(0);
  const [orgName, setOrgName] = useState("");
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });

  // sideba open click
  const openOptionsSidebar = () => {
    if (!document.querySelector('.sidebar').classList.contains('sidebar-mobile-expanded')) {
      document.querySelector('.sidebar').classList.add('sidebar-mobile-expanded')
    }
  }

  // navbardagi organizatsiyani o'qib olish
  useEffect(() => {
    let isMounted = true;
    if (currentUser) {
      const token = jwtDecode(currentUser);
      let decode = JSON.parse(token?.supperAdmin);

      const getData = async () => {
        if (JSON.parse(localStorage.getItem('ids'))) {
          try {
            const res = await axiosInstance.get("organization/getOrgNameByWorkPlaceId/" + JSON.parse(localStorage.getItem('ids')))

            if (isMounted)
              setOrgName(res?.data);
          } catch (error) {
            console.log(error.response);
          }
        } else {
          let role = JSON.parse(token?.supperAdmin).userRoles[0]?.systemName;
          if (role === "admin") {
            try {
              const res = await axiosInstance.get("user/myOrg/" + JSON.parse(localStorage.getItem('oi')))
              if (isMounted)
                setOrgName(res.data?.orgName);
            } catch (error) {
              console.log(error.response);
            }
          }
        }
      }
      getData();
    }

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  const openModalMessage = async () => {
    setOpenModal(true);
    if (JSON.parse(jwtDecode(currentUser)?.supperAdmin).userRoles[0]?.systemName === "base_admin") {
      try {
        const res = await axiosInstance.get("organization/message")
        setOpenModalData(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const removeToken = async () => {
    const token = jwtDecode(currentUser);
    let role = JSON.parse(token?.supperAdmin).userRoles[0]?.systemName;
    let access_token = token.access_token;
    if (role !== "base_admin") {
      try {
        await axios.post(`https://sso.egov.uz/sso/oauth/Authorization.do/?grant_type=one_log_out&client_id=new_d-doc_uz&client_secret=CPi8Y3SatfyeGwpT5AL7bc9q&access_token=${access_token}&scope=new_d-doc_uz`)
      } catch (error) {
        console.log(error.response);
      }
      // dispatch({ type: 'EXIT' });
      logOut(null)
      localStorage.removeItem("ids");
      localStorage.removeItem("oi");
      localStorage.removeItem("user");
      history.push("/");
      dispatch(EXIT());
    } else {
      // dispatch({ type: 'EXIT' });
      dispatch(EXIT());
      logOut(null)
      localStorage.removeItem("user");
      history.push("/darico777");
    }
  }

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      setOpenModal(false)
      if (JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles[0]?.systemName === "base_admin") {
        try {
          const res = await axiosInstance.get("organization/message")
          if (isMounted)
            setOpenSize(res.data?.length)
        } catch (error) {
          console.log(error.response);
        }
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser])

  const ishStoliKirish = (dat) => {
    if (dat?.userRoles?.length > 0) {
      localStorage.setItem("ids", JSON.stringify(dat.id));
      setSimpleUser(true);
      setUserAdmin(false);
      history.push("/sahifa/asosiy");
    }
  }

  const UserRolesKirish = (dat) => {
    if (dat?.systemName === "admin") {
      localStorage.removeItem('ids');
      setSimpleUser(false);
      setUserAdmin(true);
      history.push("/super_admin_elektron-kitob");
    }
  }

  return (
    <>
      <div className="navbar navbar-expand-lg navbar-white bg-white navbar-static shadow bg-body rounded navbarComponents" style={{ backgroundColor: "#fff" }}>
        <div className={'d-flex'}>
          <div className="d-flex " >
            <button className="navbar-toggler sidebar-mobile-main-toggle" type="button" onClick={openOptionsSidebar}>
              <i className="icon-paragraph-justify3" />
            </button>
          </div>
          <div className="navbarBrand d-flex align-items-center" style={{ borderRight: "4px solid trasparent" }}>
            <img src="/assets/doc.png" className={'nav-sm-logo'} style={{ width: "130px", height: "auto" }} alt="" />
            <div className={'mohov'} style={{ width: "3px", height: "95%", backgroundColor: "lightgray" }}></div>
          </div>
        </div>
        {JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles[0]?.systemName !== "base_admin" && (
          <div className="d-flex mobile-table-none align-items-center" style={{ position: 'relative' }}>
            <img src="/assets/gerb.png" className="gerb" style={{ width: "60px", height: "60px", marginRight: "10px" }}
              alt="" />
            <h6 className="text-wrap d-xs-none ">
              {JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles[0]?.systemName === "admin" ? (
                <span>{orgName}</span>
              ) : (
                <span> {orgName}</span>
              )}
            </h6>
          </div>
        )}

        <div className="d-flex justify-content-end align-items-center flex-1 order-1">
          {/* <a href={'http://d-doc.uz'} target={'_blank'} rel={'noreferrer'}>
            <button
              type="button"
              className="btn dropBtn w-full nav-group-sm-btn"
              style={{
                backgroundColor: 'crimson',
                color: '#fff',
                margin: 'auto 10px auto 0',
                padding: "3px 5px",
              }}
              aria-expanded="false"
            >
              D-DOC.UZ
            </button>
          </a> */}
          <ul className="navbar-nav flex-row d-flex align-items-center">
            {/* ish stoli va admin ni tanlash uchun */}
            {JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles[0]?.systemName !== "base_admin" && (
              <div className="btn-group nav-group-sm-btn to-right">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle dropBtn d-flex align-items-center"
                  data-toggle="dropdown" aria-expanded="false"
                  style={{ padding: "3px 5px" }}
                >
                  <i className="icon-cog5 mr-2" />
                  {JSON.parse(JSON.parse(localStorage.getItem('ids'))) ? (
                    <>
                      Рабочий стол
                    </>
                  ) : (
                    JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles?.length > 0 && JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles?.map((d, i) => (
                      <div key={i}>
                        {(d.systemName === "admin" && i === 0) && (
                          <div>
                            {d?.systemName}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </button>

                <div className="dropdown-menu dropdown-menu-left" style={{ marginRight: "50px", top: "50px", padding: 0 }}>
                  {/* ish stoli uchun */}
                  {JSON.parse(jwtDecode(currentUser)?.workPlaces)?.length > 0 && JSON.parse(jwtDecode(currentUser)?.workPlaces)?.map((dat, index) => (
                    dat.orgId === JSON.parse(localStorage.getItem('oi')) && (
                      dat.workPlaces?.map((d, i) => (
                        <span key={index}
                          className="dropdown-item text-light text-dark"
                          onClick={() => ishStoliKirish(d)}
                          style={{ fontSize: "14px", textTransform: "upperCase" }}
                        >
                          Рабочий стол {i + 1}
                        </span>
                      ))
                    )
                  ))}
                  {/*/!* admin uchun *!/*/}
                  {JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles?.length > 0 && JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles?.map((dat, index) => (
                    index === 0 && (
                      <span
                        key={index}
                        onClick={() => UserRolesKirish(dat)}
                        className="dropdown-item text-light text-dark"
                        style={{ fontSize: "14px", textTransform: "upperCase" }}
                      >
                        {dat?.systemName}
                      </span>
                    )))}
                </div>
              </div>
            )}

            <span className={'nav--item__block'}>
              <li className="nav-item ">
                {JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles[0]?.systemName && (
                  <span onClick={openModalMessage} className="navbar-nav-link text-dark pr-1" style={{ fontWeight: "bold" }}>
                    <i className="icon-bell2" style={{ fontSize: "14px", paddingRight: "10px" }} />
                    {openSize > 0 ?
                      <span className="badge badge-danger badge-pill" style={{ width: "17px", height: "17px", display: "flex", alignItems: "center", justifyContent: "center", top: "12px", right: "5px" }}>{openSize}</span> : ''
                    }
                  </span>
                )}

                {!JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles[0]?.systemName && (
                  <span className="navbar-nav-link text-dark pr-1 " style={{ fontWeight: "bold" }}>
                    <i className="icon-bell2" style={{ fontSize: "14px" }} />
                  </span>
                )}

                {/* notification in suoer admin  */}
                {(openModalData?.length > 0 && JSON.parse(jwtDecode(currentUser)?.supperAdmin)?.userRoles[0]?.systemName && openModal) && (
                  <SuperAdminNotification
                    openModalData={openModalData}
                    history={history}
                    setAlert={setAlert}
                    setOpenModal={setOpenModal}
                  />
                )}
              </li>
              <li className="nav-item ml-2">
                <span className="navbar-nav-link navbar-nav-link-toggler text-dark d-flex align-items-center exitIcon" style={{ fontWeight: "bold" }} onClick={removeToken}>
                  <span className='chiqishNavbar' style={{ fontSize: "13px" }}>Выход</span>
                  <i className="icon-switch2" style={{ marginLeft: "5px", fontSize: "12px" }} />
                </span>
              </li>
            </span>
          </ul>
        </div>
      </div>

      {/* alert content */}
      <AlertContent alert={alert} />
    </>
  )
}

export default React.memo(Navbar);