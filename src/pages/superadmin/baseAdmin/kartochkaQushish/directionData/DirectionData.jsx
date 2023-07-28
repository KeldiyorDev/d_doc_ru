import React, { useState } from "react";
import { axiosInstance } from "../../../../../config";
import UpdateDirection from "./UpdateDirection";
import CardView from "./CardView";

const DirectionData = ({ currentUser, setAlert, cardsName, notParentsCard, setYunalishlar, notParentsCardClick, yunalishlar, setBoshTashkilotlar, boshTashkilotlar, updateYunalish, setUpdateYunalish, setChange, change, setNotParentsCard }) => {
  const [cardKurish, setCardKurish] = useState({ open: false, obj: {} });
  const [tashkilotlar, setTashkilotlar] = useState([]);

  // get cards
  const getKartochkalar = async (id) => {
    try {
      const res = await axiosInstance.get("card/cardType/" + id)
      setBoshTashkilotlar(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  }

  const changeYunalish = (dat) => {
    setUpdateYunalish({ open: true, obj: dat });
    setChange(!change);
  }

  // id bo'yicha tashkilotlarni o'qib olish
  const getCard = async (id) => {
    try {
      const res = await axiosInstance.get("cardType/" + id)
      setTashkilotlar(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  }

  return (
    <>
      <div className="tab-content">
        <div id="accordion-styled">
          <div className="card">
            <div className="card-body p-2">
              <div id="accordion-default">
                {/* yunalishlar */}
                {yunalishlar.map((dat, index1) => (
                  <div key={index1} className="d-flex align-items-center" style={{ position: "relative" }}>
                    <i className="fas fa-pen cursor-pointer mr-2" style={{
                      fontSize: "18px",
                      position: "absolute",
                      top: "20px",
                      left: "0"
                    }} onClick={() => changeYunalish(dat)}></i>
                    <div key={index1} className="card cardAccordion mb-0 mt-2 w-100 ml-4">
                      <div className="card-header orgname" style={{ height: "40px" }}
                        onClick={() => getCard(dat.id)}>
                        <h6 className="card-title d-flex justify-content-between align-items-center">
                          <a className="text-body NavLink "
                            style={{ color: "#0056B8 !important" }}
                            href="#1">{dat.cardName}</a>
                        </h6>
                      </div>

                      <div className="openTash" style={{ display: "none" }}>
                        {tashkilotlar.length > 0 && tashkilotlar.map((tash, index) => (
                          <>
                            {tash?.parentCardType?.cardName === dat?.cardName && (
                              <div key={index}>
                                <div className="card-body pb-1 pt-0" style={{ position: "relative" }}>
                                  <i className="fas fa-pen cursor-pointer mr-2 pl-2"
                                    style={{
                                      fontSize: "18px",
                                      position: "absolute",
                                      top: "10px",
                                      left: "0"
                                    }}
                                    onClick={() => changeYunalish(tash)}></i>
                                  <div className="card mb-1 ml-3">
                                    <div className="card-header" style={{ height: "40px" }} onClick={() => getKartochkalar(tash.id)}>
                                      <h6 className="card-title">
                                        <a className="collapsed text-body NavLink ml-2"
                                          data-toggle="collapse"
                                          href={`#vHokimlik${index}`}>{tash?.cardName}</a>
                                      </h6>
                                    </div>

                                    <div id={`vHokimlik${index}`}
                                      className="card-body collapse"
                                      data-parent={`#accordion-default`}>
                                      <div id="accordion-child2">
                                        <div className="card mb-0">
                                          <div
                                            className="card-header bg-dark">
                                            <h6 className="card-title">
                                              <a data-toggle="collapse"
                                                className="text-white"
                                                href={`#bTashkilot${index}`}>Карты </a>
                                            </h6>
                                          </div>

                                          <div
                                            id={`bTashkilot${index}`}
                                            className="collapse"
                                            data-parent={`#bTashkilot${index}`}>
                                            <div
                                              className="card-body">
                                              <table
                                                className="table datatable-row-full table-bordered table-striped table-hover Tab"
                                                id="myTable">
                                                <thead>
                                                  <tr className="bg-dark text-white NavLink text-center">
                                                    <th style={{ width: "3%" }}>№</th>
                                                    <th style={{ width: "15%" }}>Название карты
                                                    </th>
                                                    <th style={{ width: "20%" }}>Срок реализации 
                                                    </th>
                                                    <td style={{ width: "8%" }}>Действия</td>
                                                  </tr>
                                                </thead>
                                                <tbody
                                                  id="viloyat">
                                                  {boshTashkilotlar.length > 0 && boshTashkilotlar?.map((dat2, index) => (
                                                    <tr key={index}
                                                      className="text-center">
                                                      <td>{index + 1}</td>
                                                      <td className="text-left">{dat2?.cardName}</td>
                                                      <td>{dat2?.expireDate}</td>
                                                      <td className="">
                                                        <div
                                                          className="icon d-flex justify-content-center align-items-center">
                                                          <span
                                                            className="btn btn-dark p-0 px-2 py-1"
                                                            onClick={() => setCardKurish({
                                                              open: true,
                                                              obj: dat2
                                                            })}><i
                                                              className="icon-pencil5"></i></span>
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
                          </ >
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

      {updateYunalish.open && (
        <UpdateDirection
          currentUser={currentUser}
          notParentsCard={notParentsCard}
          setAlert={setAlert}
          yunalishlar={yunalishlar}
          setYunalishlar={setYunalishlar}
          setTashkilotlar={setTashkilotlar}
          tashkilotlar={tashkilotlar}
          setUpdateYunalish={setUpdateYunalish}
          updateYunalish={updateYunalish}
          setNotParentsCard={setNotParentsCard}
        />
      )}

      {cardKurish.open && (
        <CardView
          notParentsCardClick={notParentsCardClick}
          notParentsCard={notParentsCard}
          setCardKurish={setCardKurish}
          cardKurish={cardKurish}
          currentUser={currentUser}
          setAlert={setAlert}
          cardsName={cardsName}
          setBoshTashkilotlar={setBoshTashkilotlar}
          boshTashkilotlar={boshTashkilotlar}
          setNotParentsCard={setNotParentsCard}
        />
      )}
    </>
  )
}

export default React.memo(DirectionData);