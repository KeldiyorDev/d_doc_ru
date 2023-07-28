import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { axiosInstance } from "../../config";
import jwtDecode from "jwt-decode";
import './loginOther.css';
import axios from 'axios';
import AlertContent, { Alert } from '../../component/alert/Alert';
import { logInSuccess } from "../../redux/actions/actionSingInSingOut";
// import Partcl from "../../component/particlas/Particlas";

let bool = false;
const LoginOther = ({ setSimpleUser, setUserAdmin }) => {
  const [workPlace, setWorkPlace] = useState([]);
  const [userRoles, setUserRoles] = useState([]);
  const history = useHistory();
  const [alert1, setAlert] = useState({ open: false, text: "", color: "" });
  const [token, setToken] = useState([]);
  const [openOrg, setOpenOrg] = useState({ open: false, obj: {} });
  const seriaRef = useRef();

  useEffect(() => {
    let isMounted = true;
    const params = new URLSearchParams(window.location.search);
    let code = params.get('code');

    if (code) {
      axiosInstance.post("auth/loginOneId", {
        code: code
      })
        .then(res => {
          if (isMounted) {
            setToken(res.data);
            const token1 = jwtDecode(res.data);
            let access_token = token1.access_token;
            let roleBool = JSON.parse(token1?.supperAdmin)?.userRoles?.length;
            if (roleBool === 0 && JSON.parse(token1.workPlaces)?.length === 0) {
              Alert(setAlert, "warning", "У вас еще нет рабочих столов")
              axios.post(`https://sso.egov.uz/sso/oauth/Authorization.do/?grant_type=one_log_out&client_id=new_d-doc_uz&client_secret=CPi8Y3SatfyeGwpT5AL7bc9q&access_token=${encodeURIComponent(access_token)}&scope=new_d-doc_uz`)
                .then(res => {
                })
                .catch(err => {
                  console.log(err.response);
                })
              history.push("/");
            } else {
              let d = JSON.parse(token1?.supperAdmin).userRoles;
              history.push('/');
              if (JSON.parse(token1.workPlaces).length > 0 || d.length > 0) {
                setUserRoles(JSON.parse(token1?.supperAdmin).userRoles);
                setWorkPlace(JSON.parse(token1.workPlaces));
              } else {
                Alert(setAlert, 'warning', "У вас еще нет рабочих столов");
                axios.post(`https://sso.egov.uz/sso/oauth/Authorization.do/?grant_type=one_log_out&client_id=new_d-doc_uz&client_secret=CPi8Y3SatfyeGwpT5AL7bc9q&access_token=${encodeURIComponent(access_token)}&scope=new_d-doc_uz`)
                  .then(res => {
                    // console.log(res.data);
                  })
                  .catch(err => {
                    console.log(err.response);
                  })
              }
            }
          }
        })
        .catch(err => {
          const token = jwtDecode(err.response?.data);
          let access_token = token.access_token;
          Alert(setAlert, 'warning', "Пользователи не найдены");
          axios.post(`https://sso.egov.uz/sso/oauth/Authorization.do/?grant_type=one_log_out&client_id=new_d-doc_uz&client_secret=CPi8Y3SatfyeGwpT5AL7bc9q&access_token=${encodeURIComponent(access_token)}&scope=new_d-doc_uz`)
            .then(res => {
              // console.log(res.data);
            })
            .catch(err => {
              // console.log(err.response);
            })
          history.push("/");
        })
    }

    return () => {
      isMounted = false;
    }
  }, [history]);

  const orgKirish = (dat) => {
    localStorage.setItem("oi", JSON.stringify(dat.orgId));
    setOpenOrg({ open: true, obj: dat });
  }

  const ishStoliKirish = async (dat, workPlaces) => {
    if (dat.userRoles?.length > 0) {
      logInSuccess(token);
      localStorage.setItem('user', JSON.stringify(token));  //save token localstorage
      localStorage.setItem("ids", JSON.stringify(dat.id))
      if (!openOrg?.open)
        localStorage.setItem("oi", JSON.stringify(workPlaces?.orgId));

      setSimpleUser(true);
      setUserAdmin(false);
      history.push("/sahifa/asosiy");
      // window.location.replace('/sahifa/asosiy');
    }
  }


  const UserRolesKirish = (dat, workPlaces) => {
    if (dat?.systemName === "admin") {
      logInSuccess(token);
      if (workPlaces) {
        localStorage.setItem("oi", JSON.stringify(workPlaces?.orgId));
      } else {
        localStorage.setItem("oi", JSON.stringify(dat?.orgId));
      }
      setSimpleUser(false);
      setUserAdmin(true);
      history.push("/super_admin_elektron-kitob");
      // window.location.replace('/super_admin_elektron-kitob');
    }
  }

  // qushimcha
  const EnterPage = async (e) => {
    e.preventDefault();

    if (seriaRef.current.value.length !== 0) {
      try {
        const res = await axiosInstance.get(`auth/login/withOutOneId/${seriaRef.current.value.toUpperCase()}`);

        // decodeToken(res.data);
        setToken(res.data);

        const token1 = JSON.parse(jwtDecode(res.data).workPlaces);
        if (token1.length > 0) {
          for (let i = 0; i < token1.length; i++) {
            if (token1[i].workPlaces?.length > 0 || token1[i].userRoles?.length > 0) {
              bool = true;
              break;
            }
          }
          if (bool) {
            setWorkPlace(JSON.parse(jwtDecode(res.data).workPlaces));
          } else {
            Alert(setAlert, 'warning', 'У вас нет рабочих столов')
          }
        } else {
          Alert(setAlert, 'warning', 'Вы не связаны ни с одной организацией.')
        }
        setUserRoles(JSON.parse(jwtDecode(res.data).supperAdmin)?.userRoles);
      } catch (error) {
        console.log(error);
        Alert(setAlert, 'warning', `${error?.response?.data}`)
      }
    } else {
      Alert(setAlert, 'warning', `Не введена серия паспорта`)
    }
  }

  return (
    <>
      {workPlace.length > 0 || userRoles.length > 0 ? (
        <>
          <div className="bg-image1" >
            <img src={"/assets/1.jpg"} alt="" className="animationImg" />
          </div>
          <div className="bg-text">
            <div className="links">
              {!openOrg.open ? (
                <ul className={'d-flex flex-column w-100'}>
                  {/* agar workplace 1ta yoki bir nechta bo'lsa */}
                  {workPlace.length === 1 ? (
                    <>
                      {workPlace[0]?.workPlaces?.map((dat, index) => (
                        <li key={index} onClick={() => ishStoliKirish(dat, workPlace[0])}>Рабочий стол {index + 1}</li>  //Ish Stoli#{dat?.id}
                      ))}
                      {workPlace[0]?.userRoles?.length > 0 && workPlace[0]?.userRoles?.map((dat, index) => (
                        <li key={index} onClick={() => UserRolesKirish(dat, workPlace[0])} >
                          {dat?.systemName}
                        </li>
                      ))}
                    </>
                  ) : (
                    workPlace?.map((dat, index) => (
                      <li key={index} onClick={() => orgKirish(dat, dat.orgId)}>{dat?.orgName} </li>
                    ))
                  )}
                </ul>
              ) : (
                <div>
                  <ul>
                    {openOrg?.obj?.workPlaces?.map((dat, index) => (
                      <li key={index} onClick={() => ishStoliKirish(dat)}>Рабочий стол {index + 1}</li>
                    ))}
                    {openOrg?.obj?.userRoles?.map((dat, index) => (
                      <li key={index} onClick={() => UserRolesKirish(dat)}>{dat?.systemName}</li>
                    ))}
                  </ul>
                  <button type={"button d-block"} className="btn btn-primary" onClick={() => setOpenOrg({ open: false, obj: {} })}><i className="fas fa-angle-double-left text-white"></i> Назад</button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* <div id="vanta"></div> */}
          <div id="particles-js1">
            <div className="animated bounceInDown">
              <div className="contaidner">
                <span className="error animated" id="msg" />
                <form id="form" onSubmit={EnterPage} className="box">
                  <h4>
                    <img src="./assets/gerb.png" width="100" alt={"GERB UZBEKISTAN"} />
                  </h4>
                  <span>Добро пожаловать!</span>
                  <h3>Межведомственная исполнительная <br />  дисциплина информационная система</h3>
                  <a href="https://sso.egov.uz/sso/oauth/Authorization.do?response_type=one_code&client_id=new_d-doc_uz&redirect_uri=http://d-doc.uz&scope=new_d-doc_uz&state=testState">
                    <button type={'button'} className={'btn1'}>Войти</button>
                  </a>
                  <div className="form-footer">
                    <input
                      type="text"
                      className='seria'
                      placeholder="Введите серию паспорта"
                      id="userInput"
                      ref={seriaRef}
                    />
                    <button type="submit" className="btn2">Войти без единого идентификатора</button>
                  </div>
                </form>
              </div>
            </div>

            <AlertContent alert={alert1} />
          </div>
        </>
      )}
    </>
  )
}

export default React.memo(LoginOther);