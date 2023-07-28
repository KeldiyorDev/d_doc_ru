import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../../config";

const Directions = ({ currentUser, yunalishlar, boshTashkilotlar, setBoshTashkilotlar }) => {
  const [ids1, setIds1] = useState([]);
  const [change, setChange] = useState(false);
  const [ids, setIds] = useState([]);
  const [orgName, setOrgName] = useState({});
  const [tashkilotlar, setTashkilotlar] = useState([]);

  // admin uchun organizatsiyani o'qib olish
  useEffect(() => {
    let isMounted = true;
    const token = jwtDecode(currentUser);
    if (JSON.parse(token?.supperAdmin).userRoles[0]?.systemName === "admin") {
      const getData = async () => {
        try {
          const res = await axiosInstance.get("user/myOrg/" + JSON.parse(localStorage.getItem('oi')))

          if (isMounted)
            setOrgName(res.data);
        } catch (error) {
          console.log(error?.response);
        }
      }
      getData();
    }

    return () => {
      isMounted = false;
    }
  }, [tashkilotlar, currentUser]);

  const getKartochkalar = async (id) => {
    try {
      const res = await axiosInstance.get(`card/cardType/${id}`)
      setBoshTashkilotlar(res.data);
    } catch (error) {
      console.log(error?.response);
    }

    // ichki checkbox larni id larini olish
    try {
      const res = await axiosInstance.get(`organization/checkedCard/${orgName.id}/${id}`)
      setIds1(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  }

  // tashqi input['checkbox] ni bosgan payt
  const checkedInput = async (e, dat) => {
    if (e.target.checked) {
      try {
        const res = await axiosInstance.post("organization/cardType", {
          cardTypeId: dat.id,
          orgId: orgName.id
        })

        console.log(res.data);
      } catch (error) {
        console.log(error?.response);
      }
      setChange(!change);
    } else {
      try {
        const res = await axiosInstance.post("organization/deleteCardType", {
          cardTypeId: dat.id,
          orgId: orgName.id
        })

        console.log(res.data);
      } catch (error) {
        console.log(error?.response);
      }
      setChange(!change);
    }
  }

  // ichki input['checkbox] ni bosgan payt
  const clickInputCheckboxInlineCard = async (e, dat) => {
    if (e.target.checked) {
      try {
        await axiosInstance.post("organization/card", {
          cardId: dat.id,
          orgId: orgName.id
        })
      } catch (error) {
        console.log(error?.response);
      }
    } else {
      try {
        await axiosInstance.post("organization/delete/card", {
          cardId: dat.id,
          orgId: orgName.id
        })
      } catch (error) {
        console.log(error?.response);
      }
    }
  }

  // id bo'yicha tashkilotlarni o'qib olish
  const getCard = async (id) => {
    try {
      const res = await axiosInstance.get("cardType/" + id)
      setTashkilotlar(res.data);
    } catch (error) {
      console.log(error?.response)
    }
  }

  // barcha checked bo'lgan cardType larni id sini o'qib olish
  useEffect(() => {
    let isMounted = true;
    if (orgName.id) {
      const getData = async () => {
        try {
          const res = await axiosInstance.get("organization/checkedCardTypes/" + orgName.id)
console.log(res.data);
          if (isMounted)
            setIds(res.data);
        } catch (error) {
          console.log(error?.response);
        }
      }
      getData();
    }

    return () => {
      isMounted = false;
    }
  }, [orgName, currentUser]);


  return (
    <div className="tab-content">
      <div id="accordion-styled">
        <div className="card">
          <div className="card-body">
            <div id="accordion-default">
              {/* yunalishlar */}
              {yunalishlar.map((dat, index1) => (
                <div key={index1} className="d-flex align-items-center" style={{ position: "relative" }}>
                  {/*<i className="fas fa-pen cursor-pointer mr-2" style={{ fontSize: "18px", position: "absolute", top: "20px", left: "0" }} onClick={() => setUpdateYunalish({ open: true, obj: dat })}></i>*/}
                  <div key={index1} className="card cardAccordion mb-0 mt-2 w-100">
                    <div className="card-header orgname" style={{ height: "40px" }} onClick={() => getCard(dat.id)}>
                      <h6 className="card-title d-flex justify-content-between align-items-center">
                        <a className="text-body NavLink" style={{
                          color: "#0056B8 !important",
                          paddingLeft: "40px"
                        }} href="#1">{dat.name}</a>
                      </h6>
                    </div>

                    <div className="openTash">
                      {tashkilotlar?.length > 0 && tashkilotlar.map((tash, index) => (
                        (tash?.parentCardType?.cardName === dat?.name) && (
                          <div key={yunalishlar?.length + index} style={{ display: ids.indexOf(dat.id, 0) >= 0 ? "none" : "block" }}>
                            <div className="card-body pb-1 pt-0">
                              <div className="card mb-1">
                                <div
                                  className="card-header d-flex align-items-center"
                                  style={{
                                    height: "40px",
                                    position: "relative"
                                  }}>
                                  {ids.length > 0 ? (
                                    <input
                                      type="checkbox"
                                      onClick={(e) => checkedInput(e, tash)}
                                      style={{
                                        position: "absolute",
                                        top: "8px",
                                        left: "10px",
                                        padding: "10px",
                                        width: "20px",
                                        height: "20px"
                                      }}
                                      className="checkBoxCardInline"
                                      defaultChecked={ids.indexOf(tash.id, 0) >= 0 ? true : false}
                                    />
                                  ) : (
                                    <input
                                      type="checkbox"
                                      style={{
                                        position: "absolute",
                                        top: "8px",
                                        left: "10px",
                                        padding: "10px",
                                        width: "20px",
                                        height: "20px"
                                      }}
                                      className="checkBoxCardInline"
                                      onClick={(e) => checkedInput(e, tash)}
                                    />
                                  )}
                                  <h6 className="card-title"
                                    style={{ marginLeft: "20px" }}
                                    onClick={() => getKartochkalar(tash.id)}>
                                    <a className="collapsed text-body NavLink"
                                      style={{ paddingLeft: "10px" }}
                                      data-toggle="collapse"
                                      href={`#vHokimlik${index}`}>{tash?.cardName}</a>
                                  </h6>
                                </div>
                                <div
                                  style={{ display: ids.indexOf(tash.id, 0) >= 0 ? "none" : "block" }}>
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
                                              href={`#bTashkilot${index}`}>Карты</a>
                                          </h6>
                                        </div>

                                        <div
                                          id={`bTashkilot${index}`}
                                          className="collapse"
                                          data-parent={`#bTashkilot${index}`}>
                                          <div
                                            className="card-body">
                                            <table className="table datatable-row-full table-bordered table-striped table-hover Tab" id="myTable">
                                              <thead>
                                                <tr className="bg-dark text-white NavLink text-center">
                                                  <th style={{ width: "3%" }}>№</th>
                                                  <th style={{ width: "15%" }}>Название карты
                                                  </th>
                                                  <th style={{ width: "20%" }}>Время исполнения
                                                  </th>
                                                  <td style={{ width: "8%" }}>Действия</td>
                                                </tr>
                                              </thead>
                                              <tbody
                                                id="viloyat">
                                                {boshTashkilotlar?.length > 0 && boshTashkilotlar.map((dat, index2) => (
                                                  <tr key={yunalishlar?.length + tashkilotlar?.length + index2} className="text-center">
                                                    <td>{index2 + 1}</td>
                                                    <td>{dat?.cardName}</td>
                                                    <td>{dat?.expireDate}</td>
                                                    <td className="">
                                                      {ids1.length > 0 ? (
                                                        <input
                                                          type="checkbox"
                                                          style={{
                                                            width: "20px",
                                                            height: "20px"
                                                          }}
                                                          onClick={(e) => clickInputCheckboxInlineCard(e, dat)}
                                                          defaultChecked={ids1.indexOf(dat.id, 0) >= 0 ? true : false}
                                                        />
                                                      ) : (
                                                        <input
                                                          type="checkbox"
                                                          style={{
                                                            width: "20px",
                                                            height: "20px"
                                                          }}
                                                          onClick={(e) => clickInputCheckboxInlineCard(e, dat)}

                                                        />
                                                      )}
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
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                  {ids?.length > 0 ? (
                    <input
                      type="checkbox"
                      style={{
                        position: "absolute",
                        left: "20px",
                        top: "20px",
                        padding: "10px",
                        width: "20px",
                        height: "20px"
                      }}
                      onClick={(e) => checkedInput(e, dat)}
                      className="checkBoxCard"
                      defaultChecked={ids.indexOf(dat.id, 0) >= 0 ? true : false}
                    />
                  ) : (
                    <input
                      type="checkbox"
                      style={{
                        position: "absolute",
                        left: "20px",
                        top: "20px",
                        padding: "10px",
                        width: "20px",
                        height: "20px"
                      }}
                      onClick={(e) => checkedInput(e, dat)}
                      className="checkBoxCard"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Directions);