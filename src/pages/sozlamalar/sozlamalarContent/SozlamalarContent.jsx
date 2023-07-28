import React, { useContext, useEffect, useState } from 'react';
import ContentNavbarSozlamalar from '../contentNavbarSozlamalar/ContentNavbarSozlamalar';
import { axiosInstance } from '../../../config';
import { AuthContext } from '../../../context/AuthContext';
import './sozlamalarContent.css';

const SozlamalarContent = () => {
  const [yunalishlar, setYunalishlar] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [tashkilotlar, setTashkilotlar] = useState([]);
  const [boshTashkilotlar, setBoshTashkilotlar] = useState([]);

  // barcha ota onasi yo'q card typelarni ni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/showCardType")

        if (isMounted)
          setYunalishlar(res.data);
      } catch (error) {
        console.log(error.response);
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
      const res = await axiosInstance.get(`organization/showCardBy/cardType/${id}`)
      setTashkilotlar(res.data);
    } catch (error) {
      console.log(error.response);
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
      const res = await axiosInstance.get(`organization/showCardType/${id}`)
      setBoshTashkilotlar(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Карта</h3>
      <div className="card-body ">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <ContentNavbarSozlamalar />
        </ul>
        <div className="tab-content">
          <div id="accordion-styled">
            <div className="card">
              <div className="card-body" >
                <div id="accordion-default">
                  {/* yunalishlar */}
                  {yunalishlar.map((dat, index1) => (
                    <div className="d-flex align-items-center" style={{ position: "relative" }}>
                      <div key={index1} className="card cardAccordion mb-0 mt-2 w-100">
                        <div className="card-header orgname" style={{ height: "40px" }} onClick={() => getCard(dat.id)}>
                          <h6 className="card-title d-flex justify-content-between align-items-center" >
                            <a className="text-body NavLink" style={{ color: "#0056B8 !important" }} href="#1">{dat.cardName}</a>
                          </h6>
                        </div>

                        <div className="openTash" style={{ display: "none" }}>
                          {tashkilotlar.length > 0 && tashkilotlar.map((tash, index) => (
                            tash?.parentCardType?.cardName === dat?.cardName && (
                              <div key={index} className="">
                                <div className="card-body pb-1 pt-2 " >
                                  <div className="card mb-1">
                                    <div className="card-header d-flex align-items-center" style={{ height: "40px", position: "relative" }}>
                                      <h6 className="card-title">
                                        <a className="collapsed text-body NavLink" style={{ paddingLeft: "10px" }} data-toggle="collapse" href={`#vHokimlik${index}`}>{tash?.cardName}</a>
                                      </h6>
                                    </div>

                                    <div id={`vHokimlik${index}`} className="card-body collapse" data-parent={`#accordion-default`} >
                                      <div id="accordion-child2">
                                        <div className="card">
                                          <div className="card-header bg-dark" onClick={() => getKartochkalar(tash.id)}>
                                            <h6 className="card-title">
                                              <a data-toggle="collapse" className="text-white" href={`#bTashkilot${index}`}>Карты</a>
                                            </h6>
                                          </div>

                                          <div id={`bTashkilot${index}`} className="collapse" data-parent={`#bTashkilot${index}`}>
                                            <div className="card-body">
                                              <table className="table datatable-row-full  mt-3 table-bordered table-striped table-hover Tab" id="myTable">
                                                <thead>
                                                  <tr className="bg-dark text-white NavLink text-center">
                                                    <th style={{ width: "3%" }}>№</th>
                                                    <th style={{ width: "15%" }}>Kartochka nomi</th>
                                                    <th style={{ width: "20%" }}>Срок оплаты</th>
                                                  </tr>
                                                </thead>
                                                <tbody id="viloyat">
                                                  {boshTashkilotlar.length > 0 && boshTashkilotlar?.map((dat, index) => (
                                                    <tr key={index} className="text-center">
                                                      <td>{index + 1}</td>
                                                      <td>{dat?.cardName}</td>
                                                      <td>{dat?.expireDate}</td>
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
    </div>
  )
}

export default React.memo(SozlamalarContent);