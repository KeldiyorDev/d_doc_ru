import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../../config";
import AlertContent, { Alert } from "../../../../../../component/alert/Alert";
import './mavjudPaketlarContent.css';

const MavjudPaketlarContent = ({ currentUser }) => {
  const [yunalishlar, setYunalishlar] = useState([]);
  const [tashkilotlar, setTashkilotlar] = useState([]);
  const [boshTashkilotlar, setBoshTashkilotlar] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });

  // barcha ota onasi yo'q card typelarni ni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/cardType/" + JSON.parse(localStorage.getItem('oi')))

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
  const getCard = async (id) => {
    try {
      const res = await axiosInstance.get(`organization/showCardBy/cardType/${id}/${JSON.parse(localStorage.getItem('oi'))}`)
      setTashkilotlar(res.data);
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

  const getKartochkalar = async (id) => {
    try {
      const res = await axiosInstance.get(`organization/showCardType/${id}/${JSON.parse(localStorage.getItem('oi'))}`)
      setBoshTashkilotlar(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const visible = async (dat) => {
    try {
      const res = await axiosInstance.post("organization/setVisible", {
        orgId: JSON.parse(localStorage.getItem('oi')),
        cardId: dat.id,
      })

      let arr = boshTashkilotlar.filter((d) => {
        if (d.id === dat.id) {
          d.id = res.data.id;
          d.isVisible = res.data.isVisible;
          d.report = res.data.report;
          d.cardName = res.data.cardName;
          d.cardType = res.data.cardType;
          d.expireDate = res.data.expireDate;
          d.isActive = res.data.isActive;
          d.orgId = res.data.orgId;
        }
        return d;
      })
      setBoshTashkilotlar(arr);
    } catch (error) {
      console.log(error?.response);
      Alert(setAlert, "warning", error?.response?.data);
    }
  }

  const report = async (dat) => {
    try {
      const res = await axiosInstance.get(`card/setReported/${JSON.parse(localStorage.getItem('oi'))}/${dat.id}`)
      
      if (res.data) {
        let arr = boshTashkilotlar.filter((d) => {
          if (d.id === dat.id) {
            d.isReported = !d.isReported;
          }
          return d;
        })
        setBoshTashkilotlar(arr);
      }
    } catch (error) {
      console.log(error?.response);
      Alert(setAlert, "warning", error?.response?.data);
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Пакеты</h3>
      <div className="">
        <div className="card-body p-0">
          <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink d-flex align-items-center justify-content-between" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
            <li className="nav-item"><h5 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase", color: "#fff", padding: "0 5px 5px 0" }}>Панель управления картами</h5></li>
          </ul>
          <div className="tab-content">
            <div id="accordion-styled">
              <div className="card">
                <div className="card-body" >
                  <div id="accordion-default">
                    {/* yunalishlar */}
                    {yunalishlar?.length > 0 && yunalishlar.map((dat, index1) => (
                      <div className="d-flex align-items-center" style={{ position: "relative" }}>
                        <div key={index1} className="card cardAccordion mb-0 mt-2 w-100">
                          <div className="card-header orgname" style={{ height: "40px" }} onClick={() => getCard(dat.id)}>
                            <h6 className="card-title d-flex justify-content-between align-items-center" >
                              <a className="text-body NavLink" style={{ color: "#0056B8 !important" }} href="#1">{dat.cardName}</a>
                            </h6>
                          </div>

                          <div className="openTash" style={{ display: "none" }}>
                            {tashkilotlar?.length > 0 && tashkilotlar.map((tash, index) => (
                              tash?.parentCardType?.cardName === dat?.cardName && (
                                <div key={Math.ceil(Math.random * 10000)}>
                                  <div className="card-body pb-1 pt-0">
                                    <div className="card mb-1">
                                      <div className="card-header d-flex align-items-center" style={{ height: "40px", position: "relative" }}>
                                        <h6 className="card-title">
                                          <a className="collapsed text-body NavLink" style={{ paddingLeft: "10px" }} data-toggle="collapse" href={`#vHokimlik${index}`}>{tash?.cardName}</a>
                                        </h6>
                                      </div>

                                      <div id={`vHokimlik${index}`} className="card-body collapse" data-parent={`#accordion-default`} >
                                        <div id="accordion-child2">
                                          <div className="card mb-0">
                                            <div className="card-header bg-dark" onClick={() => getKartochkalar(tash.id)}>
                                              <h6 className="card-title">
                                                <a data-toggle="collapse" className="text-white" href={`#bTashkilot${index}`}>Карты</a>
                                              </h6>
                                            </div>

                                            <div id={`bTashkilot${index}`} className="collapse" data-parent={`#bTashkilot${index}`}>
                                              <div className="card-body">
                                                <table className="table datatable-row-full table-bordered table-striped table-hover Tab" id="myTable">
                                                  <thead>
                                                    <tr className="bg-dark text-white NavLink text-center">
                                                      <th style={{ width: "3%" }}>№</th>
                                                      <th style={{ width: "15%" }}>Название карты</th>
                                                      <th style={{ width: "20%" }}>Срок исполнение</th>
                                                      <td style={{ width: "8%" }}>Действия</td>
                                                    </tr>
                                                  </thead>
                                                  <tbody id="viloyat">
                                                    {boshTashkilotlar?.length > 0 && boshTashkilotlar?.map((dat, index) => (
                                                      <tr key={Math.ceil(Math.random * 10000 + tashkilotlar?.length)} className="text-center">
                                                        <td>{index + 1}</td>
                                                        <td>{dat?.name}</td>
                                                        <td>{dat?.period}</td>
                                                        <td className="">
                                                          <button
                                                            className="mavjudPaketlarButton"
                                                            onClick={() => visible(dat)}
                                                            style={{ backgroundColor: dat.isVisible ? "green" : "crimson" }}
                                                          >
                                                            Видимый
                                                          </button>
                                                          <button
                                                            className="mavjudPaketlarButton1"
                                                            style={{ backgroundColor: dat.isReported ? "green" : "crimson" }}
                                                            onClick={() => report(dat)}
                                                          >
                                                            Для отчета
                                                          </button>
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
                              )
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

      {/* alert content */}
      <AlertContent alert={alert} />
    </div >
  )
}

export default React.memo(MavjudPaketlarContent);