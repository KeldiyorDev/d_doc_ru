import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { axiosInstance, url } from "../../../../../../config";
import AlertContent, { Alert } from "../../../../../../component/alert/Alert";

const UmumiyTashkilotlarContent = ({ currentUser }) => {
  const [yunalishlar, setYunalishlar] = useState([]);
  const [tashkilotlar, setTashkilotlar] = useState([]);
  const [boshTashkilotlar, setBoshTashkilotlar] = useState([]);
  const [quyiTashkilotlar, setQuyiTashkilotlar] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [updateYunalish, setUpdateYunalish] = useState({});
  const [change, setChange] = useState(false);
  const [tashkilotIds, setTashkilotIds] = useState([]);
  const params = useParams()

  useEffect(() => {
    let isMounted = true;
    if (params.stir && isMounted) {
      document.querySelector('.atAuto').click();
      document.querySelector('.putStir').value = params.stir.substring(0, 3) + "-" + params.stir.substring(3, 6) + "-" + params.stir.substring(6, 9);
      document.querySelector('.buttonStir').click();
    }

    return () => {
      isMounted = false;
    }
  }, [params.stir])

  // barcha yo'nalishlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("orgType/all")

        if (isMounted)
          setYunalishlar(res.data);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // id bo'yicha tashkilotlarni o'qib olish
  const getTashkilot = async (id) => {
    try {
      const res = await axiosInstance.get("organization/orgType/" + id)
      setTashkilotlar(res.data);
    } catch (error) {
      console.log(error?.response);
    }

    try {
      const res = await axiosInstance.get('organization/checkedOrgId/forCorrespondent/' + id + '/' + JSON.parse(localStorage.getItem('oi')))
      setTashkilotIds(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  }

  // yunalishni bosganda tashkilot chiqishi
  useEffect(() => {
    let isMounted = true;
    let orgNames = document.querySelectorAll('.cardAccordion');

    if (isMounted) {
      orgNames.forEach((org) => {
        org.querySelector('.orgname').addEventListener('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
    }

    return () => {
      orgNames.forEach((org) => {
        org.querySelector('.orgname').removeEventListener('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
      isMounted = false;
    }
  }, [yunalishlar]);

  const getTashBoshTashkilot = async (id) => {
    try {
      await axiosInstance.get("organization/mainOrganization/" + id)
      try {
        const res = await axiosInstance.get("organization/by/" + id)
        setBoshTashkilotlar(res.data);
      } catch (error) {
        console.log(error?.response);
      }
    } catch (error) {
      console.log(error?.response);
    }
  }

  const getTashQuyiTashkilot = async (id) => {
    try {
      const res = await axiosInstance.get('organization/childOrganization/' + id)
      setQuyiTashkilotlar(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  }

  const yunalishUzgartirish = async (dat) => {
    let yunalishName = document.querySelector('.yunalishName').value;
    if (yunalishName) {
      try {
        const res = await axiosInstance.patch("orgType", {
          id: dat.id,
          name: yunalishName
        })
        let arr = yunalishlar.filter((d) => {
          if (d.id === res.data.id) {
            d.id = res.data.id;
            d.name = res.data.name;
            d.isActive = res.data.isActive;
          }
          return d;
        })
        Alert(setAlert, "success", "Маршрутизация успешно переименована")
        setYunalishlar(arr);
        setUpdateYunalish({ open: false, obj: {} });
        let orgNames = document.querySelectorAll('.cardAccordion');
        orgNames.forEach((org) => {
          org.querySelector('.orgname').addEventListener('click', () => {
            if (org.querySelector('.openTash').style.display === "none") {
              org.querySelector('.openTash').style.display = "block";
            } else {
              org.querySelector('.openTash').style.display = "none";

            }
          })
        })
      } catch (error) {
        console.log(error?.response);
      }
    } else {
      Alert(setAlert, "warning", "Необходимо ввести имя пункта назначения.")
    }
  }

  // tashqi input['checkbox] ni bosgan payt
  const checkedInput = async (e, dat) => {
    if (e.target.checked) {
      await axiosInstance.post("organization/addCorrespondent", {
        id: dat.id,
        orgId: JSON.parse(localStorage.getItem('oi'))
      })
        .then(res => {
          Alert(setAlert, "success", "Добавлено успешно")
        })
        .catch(err => {
          console.log(err.response);
          Alert(setAlert, "warning", err?.response?.data);
        })
      setChange(!change);
    } else {
      await axiosInstance.post("organization/deleteCorrespondent", {
        id: dat.id,
        orgId: JSON.parse(localStorage.getItem('oi'))
      })
        .then(res => {
          Alert(setAlert, "danger", "Удалено успешно")
        })
        .catch(err => {
          console.log(err.response);
          Alert(setAlert, "warning", "Ошибка сервера");
        })
      setChange(!change);
    }
  }

  return (
    <div className="content mb-5 ">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Общие организации</h3>
      <div className="card-body" style={{ marginTop: "-20px" }}>
        <div className="card-body p-0 mt-3" style={{ borderRadius: "0" }}>
          <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink d-flex align-items-center justify-content-between">
            <li className="nav-item"><h5 style={{
              margin: "10px 0 0 20px",
              fontWeight: "bold",
              textTransform: "upperCase",
              color: "#fff",
              padding: "0 5px 5px 0"
            }}>Панель управления организациями</h5></li>
          </ul>

          <div className="tab-content">
            <div id="accordion-styled">
              <div className="card">
                <div className="card-body">
                  <div id="accordion-default">
                    {/* yunalishlar */}
                    {yunalishlar.map((dat, index1) => (
                      <div className="d-flex align-items-center" style={{ position: "relative" }}>
                        <div key={index1} className="card cardAccordion mb-0 mt-2 w-100 ml-4">
                          <div className="card-header orgname" style={{ height: "40px" }}
                            onClick={() => getTashkilot(dat.id)}>
                            <h6 className="card-title d-flex justify-content-between align-items-center">
                              <a className="text-body NavLink "
                                style={{ color: "#0056B8 !important" }}
                                href={`#1`}>{dat?.name}</a>
                            </h6>
                          </div>

                          <div className="openTash" style={{ display: "none" }}>
                            {tashkilotlar.map((tash, index) => (
                              <div key={index}>
                                {tash?.orgType?.name === dat?.name && (
                                  <div key={index} className="">
                                    <div className="card-body pb-1 pt-2">
                                      <div className="card mb-1">
                                        <div
                                          className="card-header d-flex align-items-center"
                                          style={{ height: "40px" }}>
                                          {tashkilotIds.includes(tash.id) ? (
                                            <input
                                              type="checkbox"
                                              onClick={(e) => checkedInput(e, tash)}
                                              style={{
                                                // position: "absolute",
                                                // top: "8px",
                                                // left: "10px",
                                                padding: "10px",
                                                width: "20px",
                                                height: "20px"
                                              }}
                                              className="checkBoxCardInline"
                                              defaultChecked={tashkilotIds.indexOf(tash.id) > -1 ? true : false}
                                            />
                                          ) : (
                                            <input
                                              type="checkbox"
                                              style={{
                                                // position: "absolute",
                                                // top: "8px",
                                                // left: "10px",
                                                padding: "10px",
                                                width: "20px",
                                                height: "20px"
                                              }}
                                              className="checkBoxCardInline"
                                              onClick={(e) => checkedInput(e, tash)}
                                            />
                                          )}
                                          <h6 className="card-title">
                                            <a className="collapsed text-body NavLink ml-2"
                                              data-toggle="collapse"
                                              href={`#vHokimlik${index}`}>{tash.orgName}</a>
                                          </h6>
                                        </div>

                                        <div id={`vHokimlik${index}`}
                                          className="card-body collapse"
                                          data-parent={`#accordion-default`}>
                                          <div id="accordion-child2">
                                            <div className="card">
                                              <div
                                                className="card-header bg-dark"
                                                onClick={() => getTashBoshTashkilot(tash.id)}>

                                                <h6 className="card-title">
                                                  <a data-toggle="collapse"
                                                    className="text-white"
                                                    href={`#bTashkilot${index}`}>Основная организация</a>
                                                </h6>
                                              </div>

                                              <div
                                                id={`bTashkilot${index}`}
                                                className="collapse"
                                                data-parent={`#bTashkilot${index}`}>
                                                <div
                                                  className="card-body">
                                                  <table
                                                    className="table datatable-row-full  mt-3 table-bordered table-striped table-hover Tab"
                                                    id="myTable">
                                                    <thead>
                                                      <tr className="bg-dark text-white NavLink text-center">
                                                        <th style={{ width: "3%" }}>№</th>
                                                        <th style={{ width: "15%" }}>Лого</th>
                                                        <th style={{ width: "20%" }}>Район (город)
                                                        </th>
                                                        <th style={{ width: "25%" }}>Короткое имя
                                                        </th>
                                                        <th style={{ width: "25%" }}>Директор</th>
                                                        <td style={{ width: "8%" }}>Действия</td>
                                                      </tr>
                                                    </thead>
                                                    <tbody
                                                      id="viloyat">
                                                      {boshTashkilotlar.length > 0 && boshTashkilotlar?.map((dat, index) => (
                                                        <tr key={index}
                                                          className="text-center">
                                                          <td>{index + 1}</td>
                                                          <td>
                                                            <img
                                                              src={dat?.logo ? `${url}/api/file/download/${dat.logo.id}` : "assets/user.png"}
                                                              style={{
                                                                width: "120px",
                                                                height: "120px"
                                                              }}
                                                              alt="" />
                                                          </td>
                                                          <td>{dat?.orgDistrict}</td>
                                                          <td>{dat?.orgShortName}</td>
                                                          <td>{dat?.leaderName}</td>
                                                          <td className="">
                                                            <div
                                                              className="icon d-flex justify-content-center align-items-center">
                                                              {tashkilotIds.includes(tash.id) ? (
                                                                <input
                                                                  type="checkbox"
                                                                  onClick={(e) => checkedInput(e, tash)}
                                                                  style={{
                                                                    // position: "absolute",
                                                                    // top: "8px",
                                                                    // left: "10px",
                                                                    padding: "10px",
                                                                    width: "20px",
                                                                    height: "20px"
                                                                  }}
                                                                  className="checkBoxCardInline"
                                                                  defaultChecked={tashkilotIds.indexOf(tash.id) > -1 ? true : false}
                                                                />
                                                              ) : (
                                                                <input
                                                                  type="checkbox"
                                                                  style={{
                                                                    // position: "absolute",
                                                                    // top: "8px",
                                                                    // left: "10px",
                                                                    padding: "10px",
                                                                    width: "20px",
                                                                    height: "20px"
                                                                  }}
                                                                  className="checkBoxCardInline"
                                                                  onClick={(e) => checkedInput(e, tash)}
                                                                />
                                                              )}
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      ))}
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="card mb-0">
                                              <div
                                                className="card-header bg-dark"
                                                onClick={() => getTashQuyiTashkilot(tash.id)}>
                                                <h6 className="card-title">
                                                  <a className="collapsed text-white"
                                                    data-toggle="collapse"
                                                    href={`#qTashkilot${index}`}>Низшие организации</a>
                                                </h6>
                                              </div>

                                              <div
                                                id={`qTashkilot${index}`}
                                                className="collapse"
                                                data-parent={`#qTashkilot${index}`}>
                                                <div
                                                  className="card-body">
                                                  <table
                                                    className="table datatable-row-full  mt-3 table-bordered table-striped table-hover Tab"
                                                    id="myTable">
                                                    <thead>
                                                      <tr className="bg-dark text-white NavLink text-center">
                                                        <th style={{ width: "3%" }}>№</th>
                                                        <th style={{ width: "15%" }}>Лого</th>
                                                        <th style={{ width: "20%" }}>TРайон 
                                                        (город)
                                                        </th>
                                                        <th style={{ width: "25%" }}>Короткое
                                                         имя
                                                        </th>
                                                        <th style={{ width: "25%" }}>Директор</th>
                                                        <td style={{ width: "8%" }}>Действия</td>
                                                      </tr>
                                                    </thead>
                                                    <tbody
                                                      id="viloyat">
                                                      {quyiTashkilotlar.length > 0 && quyiTashkilotlar.map((dat, index) => (
                                                        <tr key={index}
                                                          className="text-center">
                                                          <td>{index + 1}</td>
                                                          <td>
                                                            <img
                                                              src={dat?.logo?.id ? `${url}/api/file/download/${dat.logo.id}` : "/assets/user.png"}
                                                              style={{
                                                                width: "120px",
                                                                height: "120px"
                                                              }}
                                                              alt="" />
                                                          </td>
                                                          <td>{dat?.orgDistrict}</td>
                                                          <td>{dat?.orgShortName}</td>
                                                          <td>{dat?.leaderName}</td>
                                                          <td className="">
                                                            <div
                                                              className="icon d-flex justify-content-center align-items-center">
                                                              {tashkilotIds.includes(dat.id) ? (
                                                                <input
                                                                  type="checkbox"
                                                                  onClick={(e) => checkedInput(e, dat)}
                                                                  style={{
                                                                    // position: "absolute",
                                                                    // top: "8px",
                                                                    // left: "10px",
                                                                    padding: "10px",
                                                                    width: "20px",
                                                                    height: "20px"
                                                                  }}
                                                                  className="checkBoxCardInline"
                                                                  defaultChecked={tashkilotIds.indexOf(dat.id) > -1 ? true : false}
                                                                />
                                                              ) : (
                                                                <input
                                                                  type="checkbox"
                                                                  style={{
                                                                    // position: "absolute",
                                                                    // top: "8px",
                                                                    // left: "10px",
                                                                    padding: "10px",
                                                                    width: "20px",
                                                                    height: "20px"
                                                                  }}
                                                                  className="checkBoxCardInline"
                                                                  onClick={(e) => checkedInput(e, dat)}
                                                                />
                                                              )}
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      ))}
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {updateYunalish.open && (
        <div className="adminWindow">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header btn-primary p-2">
                <h5 className="modal-title">Изменить окно</h5>
                <button type="button" className="close"
                  onClick={() => setUpdateYunalish({ open: false, obj: {} })}>×
                </button>
              </div>

              <form className="modal-body form-inline justify-content-center">
                <label>Yo'nalish:</label>
                <input type="text" placeholder="Название маршрута"
                  className="form-control mb-2 mr-sm-2 ml-sm-2 mb-sm-0 w-75 yunalishName"
                  defaultValue={updateYunalish.obj?.name} />
                <button type="button" onClick={() => yunalishUzgartirish(updateYunalish.obj)}
                  className="btn btn-primary ml-sm-2 mb-sm-0"
                  style={{ textTransform: "capitalize" }}>Изменять
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* alert */}
      <AlertContent alert={alert} />
    </div>
  )
}

export default React.memo(UmumiyTashkilotlarContent);