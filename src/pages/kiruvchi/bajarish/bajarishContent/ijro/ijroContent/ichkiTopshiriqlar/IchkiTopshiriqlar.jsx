import React, { useEffect, useState } from "react";
import { status } from "../../../../../../../component/status/Status";
import IjroniYuklash from "./IjroniYuklash";
import IjroniUzgartirish from "./IjroniUzgartirish";
import AllFiles from "../../../../../../../component/AllFiles";
import OpenButtonClick from "./OpenButtonClick";
import ClosedIjro from "./ClosedIjro";
import OpenIjro from "./OpenIjro";

const IchkiTopshiriqlar = ({ data, dateFormat, params, setData, setAlert, history, setChange, change, permission }) => {
  const [closedIjro, setClosedIjro] = useState({ open: false, obj: {} });
  const [openIjro, setOpenIjro] = useState({ open: false, obj: {} });
  const [openButtonCLick, setOpenButtonClick] = useState(false);
  const [openIjroniYuklash, setOpenIjroniYuklash] = useState({ open: false, obj: {} });
  const [openIjroniUzgartirish, setOpenIjroniUzgartirish] = useState({ open: false, obj: {} });
  const [chooseFiles, setChooseFiles] = useState([]);
  // const [cardsName, setCardsName] = useState([]);
  // const [searchReg, setSearchReg] = useState("");
  // const [ijroDataYulash, setIjroDataYuklash] = useState([]);
  // const [otherFiles, setOtherFiles] = useState([]);
  // const [notParentsCard, setNotParentsCard] = useState([]);

  // ijrocontent yo'naltirmaganlar uchun commentni yashirish va ko'rsatish 
  const setOpenStrFunc = (index, name) => {
    if (name === "n") {
      document.getElementsByClassName('trNumber')[index].querySelector('.IzohIchkiTopshiriqBlock').style.display = "block";
      document.getElementsByClassName('trNumber')[index].querySelector('.IzohIchkiTopshiriqNone').style.display = "none";
    } else {
      document.getElementsByClassName('trNumber')[index].querySelector('.IzohIchkiTopshiriqBlock').style.display = "none";
      document.getElementsByClassName('trNumber')[index].querySelector('.IzohIchkiTopshiriqNone').style.display = "block";
    }
  }

  const uzgartirish = (dat) => {
    setOpenIjroniUzgartirish({ open: true, obj: dat });

    // shu yerdan davom ettiramiz
    let arr = [];
    dat?.executeDocument?.chosenFiles?.forEach((f) => {
      arr.push(f);
    })
    let arr1 = [];
    dat?.executeDocument?.otherFiles?.forEach((f) => {
      arr1.push(f);
    })
    setChooseFiles(arr);
    // setOtherFiles(arr1);
  }

  // ijrocontent yo'naltirganlar uchun commentni yashirish va ko'rsatish
  useEffect(() => {
    let isMounted = true;
    let trNumberRedirect = document.querySelectorAll('.trNumberRedirect');
    let IzohTashqiTopshiriqBlockY = document.querySelectorAll('.IzohTashqiTopshiriqBlockY');
    let IzohTashqiTopshiriqNoneY = document.querySelectorAll('.IzohTashqiTopshiriqNoneY');

    // ichki topshiriqning commentini yashirish yoki ko'rsatish
    if (isMounted) {
      trNumberRedirect?.forEach((d) => {
        d.querySelector('.IzohIchkiTopshiriqNoneY')?.addEventListener('click', () => {
          d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "none";
          d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "block";
        })
        d.querySelector('.IzohIchkiTopshiriqBlockY')?.addEventListener('click', () => {
          d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "block";
          d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "none";
        })
      })

      // tashqi topshiriqning commentini yashirish yoki ko'rsatish
      IzohTashqiTopshiriqBlockY.forEach((d, i) => {
        d.addEventListener('click', () => {
          IzohTashqiTopshiriqNoneY[i].style.display = "block";
          IzohTashqiTopshiriqBlockY[i].style.display = "none";
        })
      })
      IzohTashqiTopshiriqNoneY.forEach((d, i) => {
        d.addEventListener('click', () => {
          IzohTashqiTopshiriqNoneY[i].style.display = "none";
          IzohTashqiTopshiriqBlockY[i].style.display = "block";
        })
      })
    }

    return () => {
      trNumberRedirect?.forEach((d) => {
        d.querySelector('.IzohIchkiTopshiriqNoneY')?.removeEventListener('click', () => {
          d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "none";
          d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "block";
        })
        d.querySelector('.IzohIchkiTopshiriqBlockY')?.removeEventListener('click', () => {
          d.querySelector('.IzohIchkiTopshiriqNoneY').style.display = "block";
          d.querySelector('.IzohIchkiTopshiriqBlockY').style.display = "none";
        })
      })

      IzohTashqiTopshiriqBlockY.forEach((d, i) => {
        d.removeEventListener('click', () => {
          IzohTashqiTopshiriqNoneY[i].style.display = "block";
          IzohTashqiTopshiriqBlockY[i].style.display = "none";
        })
      })
      IzohTashqiTopshiriqNoneY.forEach((d, i) => {
        d.removeEventListener('click', () => {
          IzohTashqiTopshiriqNoneY[i].style.display = "none";
          IzohTashqiTopshiriqBlockY[i].style.display = "block";
        })
      })
      isMounted = false;
    }
  }, [data]);

  // CARD TYPE NI BOSGANDA CARDNAME NI CHIQISHI
  // const notParentsCardClick = (e) => {
  //     const getData = async () => {
  //         try {
  //             const res = await axiosInstance.get("journal/moduleJournal/" + e.value, {
  //                 headers: {
  //                     Authorization: "Bearer " + currentUser
  //                 }
  //             })
  //             let arr = [];
  //             res.data.forEach((d) => {
  //                 arr.push({ value: d.id, label: d.uzName });
  //             })
  //             setCardsName(arr);
  //         } catch (error) {
  //             console.log(error.response);
  //         }
  //     }
  //     getData();
  // }

  // const getFile = async () => {
  //         let cardTypeYuklash = document.querySelector('.cardTypeYuklash').querySelector('.css-qc6sy-singleValue').textContent;
  //         let cardNameYuklash = document.querySelector('.cardNameYuklash').querySelector('.css-qc6sy-singleValue').textContent;

  //         // cardName id sini olish
  //         let cardsNameId = cardsName.filter((c) => {
  //             return c.label === cardNameYuklash;
  //         })

  //         if (cardTypeYuklash) {
  //             if (cardNameYuklash) {
  //                 if (searchReg) {
  //                     try {
  //                         const res = await axiosInstance.get(`document/files/${cardsNameId[0].value}/${searchReg}`, {
  //                             headers: {
  //                                 Authorization: "Bearer " + currentUser
  //                             }
  //                         })
  //                         setIjroDataYuklash(res.data);
  //                     } catch (error) {
  //                         console.log(error.response);
  //                         // setOpenIjroniYuklash({ open: false, obj: {} });
  //                     }
  //                 } else {
  //                     Alert(setAlert, "warning", "Ro'yxatga olish sanasi kiritilmagan");
  //                     // setOpenIjroniYuklash({ open: false, obj: {} });
  //                 }
  //             } else {
  //                 Alert(setAlert, "warning", "Jurnal tanlanmagan");
  //                 // setOpenIjroniYuklash({ open: false, obj: {} });
  //             }
  //         } else {
  //             Alert(setAlert, "warning", "Modul tanlanmagan");
  //             // setOpenIjroniYuklash({ open: false, obj: {} });
  //         }
  // }

  // barcha cardtype ni o'qib olish
  // useEffect(() => {
  //     const getData = async () => {
  //         try {
  //             const res = await axiosInstance.get("module/all/org/", {
  //                 headers: {
  //                     Authorization: "Bearer " + currentUser
  //                 }
  //             })
  //             let arr = [];
  //             res.data.forEach((c) => {
  //                 arr.push({ value: c.id, label: c.name });
  //             })
  //             setNotParentsCard(arr);
  //         } catch (error) {
  //             console.log(error.response);
  //         }
  //     }
  //     getData();
  // }, [currentUser]);

  console.log(permission);

  console.log(data?.inExecutorInformationList);

  return (
    <>
      <div className="card-box">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header bg-primary text-white header-elements-inline">
              <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Внутренние задания</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover Tab">
                  <thead className="bg-dark text-white NavLink text-center">
                    <tr>
                      <th style={{ width: "15%" }}>Назначение</th>
                      <th style={{ width: "20%" }}>Срок/статус</th>
                      <th style={{ width: "30%" }}>Дополнительный комментарий</th>
                      <th style={{ width: "40%" }}>Производительность</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.inExecutorInformationList.length > 0 && data?.inExecutorInformationList?.map((dat, index) => (
                      <tr key={index} className="text-center trNumber">
                        <td>
                          <p>{(dat?.firstName && dat?.firstName?.length > 1) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}{dat?.lastName}</p>
                          <p className="badge badge-primary">РЕГ № {data?.document?.journalNumber}</p>
                          <p>{dateFormat(dat?.documentStatusAtTheMoment)}</p>
                        </td>
                        <td>
                          <p>{dateFormat(dat?.deadline)}</p>
                          {/* refresh bo'lmasdan o'zgartirish */}
                          <span className="badge text-white mr-1 span1" style={{ backgroundColor: status.filter((s) => s.englishName === dat?.documentStatus)[0]?.color }}>{status.filter((s) => s.englishName === dat?.documentStatus)[0]?.LatinName}</span><br />
                          <span className="d-flex align-items-center justify-content-center"><br />
                            {(params.name === "nazoratdanOlish" || params.name === "maxsusNazoratdanOlish") && (
                              (dat?.documentStatus === "IN_PROCESS") && (
                                <>
                                  <i className="fas fa-close text-danger cursor-pointer iconCheckDanger" onClick={() => setClosedIjro({ open: true, obj: dat })} style={{ fontSize: "20px" }}></i>
                                  {
                                    !permission.includes("RECEPTION") && (
                                      <i className="fas fa-check text-success cursor-pointer iconCheckSuccess" onClick={() => setOpenIjro({ open: true, obj: dat })} style={{ fontSize: "20px" }}></i>
                                    )
                                  }
                                </>
                              )
                            )}

                            {/* maxsus nazoratdan olish */}
                            {/* {params.name === "maxsusNazoratdanOlish" && (
                              (dat?.documentStatus === "DONE") && (
                                <>
                                  <i className="fas fa-close text-danger cursor-pointer iconCheckDanger" onClick={() => setClosedIjro({ open: true, obj: dat })} style={{ fontSize: "20px" }}></i>
                                </>
                              )
                            )} */}

                            {(dat?.documentStatus === "REJECTED") && (
                              <div className="userCommit">
                                <span >{dat?.comment}</span>
                              </div>
                            )}
                          </span>
                        </td>
                        <td className="text-left" style={{ wordBreak: "break-word" }}>
                          {dat?.description}
                        </td>
                        <td className="text-left" style={{ wordBreak: "break-word" }}>
                          <>
                            {(dat?.executeDocument?.chosenFiles?.length > 0 || dat?.executeDocument?.comment) ? (
                              <p>
                                <span className="mb-1">
                                  {/* <strong>Izoh:&nbsp;</strong> */}
                                  <span style={{ fontWeight: "400" }}>
                                    <span onClick={() => setOpenStrFunc(index, "n")} style={{ display: "none" }} className="cursor-pointer IzohIchkiTopshiriqNone" >
                                      <strong>к:</strong>&nbsp; {dat?.executeDocument?.comment}<span style={{ color: "blue", fontSize: "11px" }}>&nbsp; Скрывать</span>
                                    </span>
                                    <span onClick={() => setOpenStrFunc(index, "b")} style={{ display: "block" }} className="cursor-pointer IzohIchkiTopshiriqBlock">
                                      <strong>Izoh:</strong>&nbsp; {dat?.executeDocument?.comment?.substring(0, 50)}...
                                      {dat?.executeDocument?.comment?.length > 50 ? (
                                        <span style={{ color: "blue", fontSize: "11px" }}>&nbsp; продолжение</span>
                                      ) : (
                                        <span></span>
                                      )}
                                    </span>
                                  </span>
                                </span>
                                <div className="mt-1">
                                  <strong>File:&nbsp;</strong>
                                  <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                    {dat.executeDocument?.chosenFiles?.length > 0 && dat.executeDocument?.chosenFiles?.map((hujjat, ind1) => (
                                      <span key={ind1}>
                                        <AllFiles
                                          hujjat={hujjat}
                                        />
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                {(dat?.workPlaceId === JSON.parse(localStorage.getItem('ids')) && !(params.name === "nazorat" || params.name === "bajarilgan" || params.name === "malumot" || params.name === "nazoratdanOlish" || params.name === "maxsusNazorat" || params.name === "maxsusNazoratdanOlish" || (params.name === "bajarilmagan" && !data?.document?.isUpload))) && (
                                  <span className="d-block infoBtn bg-dark cursor-pointer m-auto d-flex align-items-center justify-content-center" onClick={() => uzgartirish(dat)} data-popup="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="O'zgartirish">
                                    <i i className="icon-pencil5"></i>
                                  </span>
                                )}
                              </p>
                            ) : (
                              <>
                                {/* data?.document?.isUpload */}
                                {(dat?.workPlaceId === JSON.parse(localStorage.getItem('ids')) && !(params.name === "nazorat" || params.name === "bajarilgan" || params.name === "malumot" || params.name === "nazoratdanOlish" || params.name === "maxsusNazoratdanOlish" || params.name === "maxsusNazorat" || (params.name === "bajarilmagan" && !data?.document?.isUpload))) && (
                                  <div className="d-flex justify-content-center" style={{ fontSize: "24px" }}>
                                    <span className="infoBtn bg-primary cursor-pointer text-white px-3 py-3" onClick={() => setOpenIjroniYuklash({ open: true, obj: dat })} data-popup="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="Скачать исполнение">
                                      <i class="fa-solid fa-cloud-arrow-up"></i>
                                    </span>
                                  </div>
                                )}
                                {(dat?.workPlaceId === JSON.parse(localStorage.getItem('ids')) && (params.name === "nazorat" || params.name === "malumot" || (params.name === 'bajarilmagan' && data?.document?.isShowButton))) && (
                                  <div className="d-flex justify-content-center">
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => setOpenButtonClick(true)}
                                      style={{ textTransform: "uppercase", alignItems: "center", justifyContent: "center", textAlign: "center" }}
                                    >
                                      Подтверждение
                                      <i class="fa-solid fa-floppy-disk pl-1" style={{ fontSize: "18px" }}></i>
                                      {/* <i class="fa-sharp fa-regular fa-floppy-disk ml-1"></i> */}
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* button tugma uchun */}
                  {openButtonCLick && (
                    <OpenButtonClick
                      setOpenButtonClick={setOpenButtonClick}
                      params={params}
                      history={history}
                      setAlert={setAlert}
                    />
                  )}

                  {/* faqat yo'naltirganlar */}
                  <tbody>
                    {data?.inExecutorInformationList.length > 0 && data?.inExecutorInformationList?.map((dat) => (
                      dat?.directedInExecutors?.map((user, i) => (
                        <>
                          {/* ajratish uchun chiziq */}
                          {i === 0 && (
                            <tr key={user.id}>
                              <td colSpan={4}>
                                <hr style={{ height: '2px', backgroundColor: "#000", width: "100%" }} />
                              </td>
                            </tr>
                          )}
                          <tr key={user.id} className="text-center trNumberRedirect" >
                            <td>
                              <p>{(user?.firstName && user?.firstName?.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : ""}{user?.lastName}</p>
                              <p className="badge badge-primary">РЕГ № {data?.document?.journalNumber}</p>
                              <p>{dateFormat(user?.documentStatusAtTheMoment)}</p>
                            </td>
                            <td className="py-2 px-0">
                              <p>{(user?.directFirstName && user?.directFirstName?.length > 1) ? ((((user?.directFirstName[0].toUpperCase() === "S" || user?.directFirstName[0].toUpperCase() === "C") && user?.directFirstName[1].toUpperCase() === "H")) ? user?.directFirstName.substring(0, 2) + ". " : user?.directFirstName?.substring(0, 1) + ". ") : ""}{user?.directLastName}</p>
                              <p>{dateFormat(user?.deadline)}</p>
                              <span className="badge text-white mr-1 span1" style={{ backgroundColor: status.filter((s) => s.englishName === user?.documentStatus)[0]?.color }}>{status.filter((s) => s.englishName === user?.documentStatus)[0]?.LatinName}</span><br />
                              {(params.name === "nazoratdanOlish" || params.name === "maxsusNazoratdanOlish") && (
                                (user.documentStatus === "IN_PROCESS") && (
                                  <>
                                    <i className="fas fa-close text-danger cursor-pointer iconCheckDanger" onClick={() => setClosedIjro({ open: true, obj: user })} style={{ fontSize: "20px" }}></i>
                                    {
                                      !permission.includes("RECEPTION") && (
                                        <i className="fas fa-check text-success cursor-pointer iconCheckSuccess" onClick={() => setOpenIjro({ open: true, obj: user })} style={{ fontSize: "20px" }}></i>
                                      )
                                    }
                                  </>
                                )
                              )}

                              {/* maxsus nazoratdan olish */}
                              {/* {params.name === "maxsusNazoratdanOlish" && (
                                (dat?.documentStatus === "DONE") && (
                                  <>
                                    <i className="fas fa-close text-danger cursor-pointer iconCheckDanger" onClick={() => setClosedIjro({ open: true, obj: dat })} style={{ fontSize: "20px" }}></i>
                                  </>
                                )
                              )} */}

                              {(user?.documentStatus === "REJECTED") && (
                                <div className="userCommit">
                                  <span >{user?.comment}</span>
                                </div>
                              )}
                            </td>
                            <td className="text-left" style={{ wordBreak: "break-word" }}>
                              {user?.description}
                            </td>
                            <td className="text-left" style={{ wordBreak: "break-word" }}>
                              <>
                                {(user?.executeDocument?.chosenFiles?.length > 0 || user?.executeDocument?.comment) ? (
                                  <p>
                                    <span className="mb-1">
                                      <span style={{ fontWeight: "400" }}>
                                        <span style={{ display: "none" }} className="cursor-pointer IzohIchkiTopshiriqNoneY" >
                                          <strong>комментарий:</strong>&nbsp; {user?.executeDocument?.comment} <span style={{ color: "blue", fontSize: "11px" }}>&nbsp; yashirish</span>
                                        </span>
                                        <span style={{ display: "block" }} className="cursor-pointer IzohIchkiTopshiriqBlockY">
                                          <strong>комментарий:</strong>&nbsp; {user?.executeDocument?.comment?.substring(0, 50)}...
                                          {user?.executeDocument?.comment?.length > 50 ? (
                                            <span style={{ color: "blue", fontSize: "11px" }}>&nbsp; продолжение</span>
                                          ) : (
                                            <span></span>
                                          )}
                                        </span>
                                      </span>
                                    </span>
                                    <div className="mt-1">
                                      <strong >Файл:&nbsp;</strong>
                                      <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                        {user?.executeDocument?.chosenFiles?.length > 0 && user?.executeDocument?.chosenFiles?.map((hujjat, index2) => (
                                          <span key={index2}>
                                            <AllFiles
                                              hujjat={hujjat}
                                            />
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    {(user?.workPlaceId === JSON.parse(localStorage.getItem('ids')) && !(params.name === "nazorat" || params.name === "bajarilgan" || params.name === "malumot" || params.name === "nazoratdanOlish" || params.name === "maxsusNazorat" || params.name === "maxsusNazoratdanOlish" || (params.name === "bajarilmagan" && !data?.document?.isUpload))) && (
                                      <span className="d-block infoBtn updateIconIjro bg-dark cursor-pointer m-auto d-flex align-items-center justify-content-center" onClick={() => uzgartirish(user)} data-popup="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="O'zgartirish">
                                        <i className="icon-pencil5"></i>
                                      </span>
                                    )}
                                  </p>
                                ) : (
                                  <>
                                    {(user?.workPlaceId === JSON.parse(localStorage.getItem('ids')) && !(params.name === "nazorat" || params.name === "bajarilgan" || params.name === "malumot" || params.name === "nazoratdanOlish" || params.name === "maxsusNazoratdanOlish" || params.name === "maxsusNazorat" || (params.name === "bajarilmagan" && !data?.document?.isUpload))) && (
                                      <div className="d-flex justify-content-center" style={{ fontSize: "24px" }}>
                                        <span className="infoBtn uploadIconIjro bg-primary cursor-pointer px-3 py-3" onClick={() => setOpenIjroniYuklash({ open: true, obj: user })} data-popup="tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="Скачать исполнение">
                                          <i class="fa-solid fa-cloud-arrow-up"></i>
                                        </span>
                                      </div>
                                    )}
                                    {(user?.workPlaceId === JSON.parse(localStorage.getItem('ids')) && (params.name === "nazorat" || params.name === "malumot" || (params.name === 'bajarilmagan' && data?.document?.isShowButton))) && (
                                      <div className="d-flex justify-content-center">
                                        <button
                                          className="btn btn-success"
                                          onClick={() => setOpenButtonClick(true)}
                                          style={{ textTransform: "capitalize" }}
                                        >
                                          button
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            </td>
                          </tr>
                        </>
                      ))
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {closedIjro.open && (
        <ClosedIjro
          closedIjro={closedIjro}
          setClosedIjro={setClosedIjro}
          setAlert={setAlert}
          setData={setData}
          params={params}
        />
      )}

      {openIjro.open && (
        <OpenIjro
          setOpenIjro={setOpenIjro}
          openIjro={openIjro}
          setAlert={setAlert}
          params={params}
          setData={setData}
        />
      )}

      {/* ijroni yuklash uchun */}
      <IjroniYuklash
        openIjroniYuklash={openIjroniYuklash}
        setOpenIjroniYuklash={setOpenIjroniYuklash}
        params={params}
        setAlert={setAlert}
        setChange={setChange}
        change={change}
      />

      {/* ijroni uzgartirish uchun */}
      <IjroniUzgartirish
        openIjroniUzgartirish={openIjroniUzgartirish}
        setOpenIjroniUzgartirish={setOpenIjroniUzgartirish}
        params={params}
        setChange={setChange}
        change={change}
        setAlert={setAlert}
        chooseFiles={chooseFiles}
        setChooseFiles={setChooseFiles}
      />
    </>
  )
}

export default React.memo(IchkiTopshiriqlar);