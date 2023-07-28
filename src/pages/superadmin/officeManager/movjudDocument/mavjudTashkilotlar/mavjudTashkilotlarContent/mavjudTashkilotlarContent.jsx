import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { axiosInstance, url } from "../../../../../../config";
import AlertContent, { Alert } from "../../../../../../component/alert/Alert";
import ContentNavbarSozlamalar from "../../../../../sozlamalar/contentNavbarSozlamalar/ContentNavbarSozlamalar";
import AddModal from "./AddModal";

export default function UmumiyTashkilotlarContent({ currentUser }) {
  const [yunalishlar, setYunalishlar] = useState([]);
  const [tashkilotlar, setTashkilotlar] = useState([]);
  const [boshTashkilotlar, setBoshTashkilotlar] = useState([]);
  const [quyiTashkilotlar, setQuyiTashkilotlar] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [change, setChange] = useState(false);
  const [tashkilotIds, setTashkilotIds] = useState([]);
  const params = useParams()

  // add modal
  const [addModal, setAddModal] = useState(false)

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
      const res = await axiosInstance.get(`organization/checkedOrgId/forCorrespondent/${id}/${JSON.parse(localStorage.getItem('oi'))}`)
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

  const checkedInput = async (e, dat) => {
    if (e.target.checked) {
      try {
        await axiosInstance.post("organization/addCorrespondent", {
          id: dat.id,
          orgId: JSON.parse(localStorage.getItem('oi'))
        })
        Alert(setAlert, "success", "Добавлено успешно")
      } catch (error) {
        console.log(error?.response);
        Alert(setAlert, "warning", error?.response?.data);
      }
      setChange(!change);
    } else {
      try {
        await axiosInstance.post("organization/deleteCorrespondent", {
          id: dat.id,
          orgId: JSON.parse(localStorage.getItem('oi'))
        })
        Alert(setAlert, "danger", "Удалено успешно")
      } catch (error) {
        console.log(error?.response);
        Alert(setAlert, "warning", "Произошла ошибка на сервере");
      }
      setChange(!change);
    }
  }

  return (
    <>
      <div className="content content-mobile mb-5">
        <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Общие организации</h3>
        <div className="card-body-mobile" >
          <div className="card-body card-body-mobile p-0" >
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink d-flex align-items-center ">
              <ContentNavbarSozlamalar />
            </ul>

            <div className="tab-content">
              <div id="accordion-styled">
                <div className="card">
                  <div className="card-body card-body-mobile" >
                    <div id="accordion-default">
                      <button className="btn btn-primary"
                        onClick={() => setAddModal(true)}>
                        Добавить организацию
                      </button>

                      {/* yunalishlar */}
                      {yunalishlar.map((dat, index1) => (
                        <div key={index1} className="d-flex align-items-center" style={{ position: "relative" }}>
                          <div key={index1} className="card cardAccordion mb-0 mt-2 w-100">
                            <div className="card-header orgname" style={{ height: "40px" }} onClick={() => getTashkilot(dat.id)}>
                              <h6 className="card-title d-flex justify-content-between align-items-center" >
                                <a className="text-body NavLink " style={{ color: "#0056B8 !important" }} href={`#1`} >{dat?.name}</a>
                              </h6>
                            </div>

                            <div className="openTash" style={{ display: "none" }}>
                              {tashkilotlar.map((tash, index) => (
                                <div key={index}>
                                  {tash?.orgType?.name === dat?.name && (
                                    <div key={index} className="">
                                      <div className="card-body pb-1 pt-0">
                                        <div className="card mb-1">
                                          <div className="card-header d-flex align-items-center" style={{ height: "40px" }}>
                                            {tashkilotIds.includes(tash.id) ? (
                                              <input
                                                type="checkbox"
                                                onClick={(e) => checkedInput(e, tash)}
                                                style={{
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
                                                  padding: "10px",
                                                  width: "20px",
                                                  height: "20px"
                                                }}
                                                className="checkBoxCardInline"
                                                onClick={(e) => checkedInput(e, tash)}
                                              />
                                            )}
                                            <h6 className="card-title">
                                              <a className="collapsed text-body NavLink ml-2" data-toggle="collapse" href={`#vHokimlik${index}`}>{tash.orgName}</a>
                                            </h6>
                                          </div>

                                          <div id={`vHokimlik${index}`} className="card-body collapse" data-parent={`#accordion-default`}>
                                            <div id="accordion-child2">
                                              <div className="card">
                                                <div className="card-header bg-dark" onClick={() => getTashBoshTashkilot(tash.id)}>

                                                  <h6 className="card-title">
                                                    <a data-toggle="collapse" className="text-white" href={`#bTashkilot${index}`}> Основная организация </a>
                                                  </h6>
                                                </div>

                                                <div id={`bTashkilot${index}`} className="collapse" data-parent={`#bTashkilot${index}`}>
                                                  <div className="card-body">
                                                    <table className="table datatable-row-full table-bordered table-striped table-hover Tab" id="myTable">
                                                      <thead>
                                                        <tr className="bg-dark text-white NavLink text-center">
                                                          <th style={{ width: "3%" }}>№</th>
                                                          <th style={{ width: "15%" }}>логотип </th>
                                                          <th style={{ width: "20%" }}>Район (город))</th>
                                                          <th style={{ width: "25%" }}>Короткое имя</th>
                                                          <th style={{ width: "25%" }}> Директор </th>
                                                          <td style={{ width: "8%" }}>Действия </td>
                                                        </tr>
                                                      </thead>
                                                      <tbody id="viloyat">
                                                        {boshTashkilotlar.length > 0 && boshTashkilotlar?.map((dat, index) => (
                                                          <tr key={index} className="text-center">
                                                            <td>{index + 1}</td>
                                                            <td >
                                                              <img src={dat?.logo ? `${url}/api/file/view/${dat.logo.id}` : "assets/user.png"} style={{ width: "120px", height: "120px" }} alt="" />
                                                            </td>
                                                            <td>{dat?.orgDistrict}</td>
                                                            <td>{dat?.orgShortName}</td>
                                                            <td>{dat?.leaderName}</td>
                                                            <td className="">
                                                              <div className="icon d-flex justify-content-center align-items-center">
                                                                {tashkilotIds.includes(tash.id) ? (
                                                                  <input
                                                                    type="checkbox"
                                                                    onClick={(e) => checkedInput(e, tash)}
                                                                    style={{
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
                                                <div className="card-header bg-dark" onClick={() => getTashQuyiTashkilot(tash.id)}>
                                                  <h6 className="card-title">
                                                    <a className="collapsed text-white" data-toggle="collapse" href={`#qTashkilot${index}`}>Низшие организации </a>
                                                  </h6>
                                                </div>

                                                <div id={`qTashkilot${index}`} className="collapse" data-parent={`#qTashkilot${index}`}>
                                                  <div className="card-body">
                                                    <table className="table datatable-row-full table-bordered table-striped table-hover Tab" id="myTable">
                                                      <thead>
                                                        <tr className="bg-dark text-white NavLink text-center">
                                                          <th style={{ width: "3%" }}>№</th>
                                                          <th style={{ width: "15%" }}>Логотип</th>
                                                          <th style={{ width: "20%" }}>Район (город)</th>
                                                          <th style={{ width: "25%" }}>Короткое имя</th>
                                                          <th style={{ width: "25%" }}>Директор</th>
                                                          <td style={{ width: "8%" }}>Действия</td>
                                                        </tr>
                                                      </thead>
                                                      <tbody id="viloyat">
                                                        {quyiTashkilotlar.length > 0 && quyiTashkilotlar.map((dat, index) => (
                                                          <tr key={index} className="text-center">
                                                            <td>{index + 1}</td>
                                                            <td >
                                                              <img src={dat?.logo?.id ? `${url}/api/file/download/${dat.logo.id}` : "/assets/user.png"} style={{ width: "120px", height: "120px" }} alt="" />
                                                            </td>
                                                            <td>{dat?.orgDistrict}</td>
                                                            <td>{dat?.orgShortName}</td>
                                                            <td>{dat?.leaderName}</td>
                                                            <td className="">
                                                              <div className="icon d-flex justify-content-center align-items-center">
                                                                {tashkilotIds.includes(dat.id) ? (
                                                                  <input
                                                                    type="checkbox"
                                                                    onClick={(e) => checkedInput(e, dat)}
                                                                    style={{
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
        </div >
      </div >
      {
        addModal && (
          <AddModal
            setAddModal={setAddModal}
            currentUser={currentUser}
            setAlert={setAlert}
            yunalishlar={yunalishlar}
            setYunalishlar={setYunalishlar}
          />
        )
      }

      {/* alert */}
      <AlertContent alert={alert} />
    </>
  )
}