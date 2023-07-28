import React, { useEffect, useState } from "react";
import { axiosInstance, url } from "./config";
import './qrcodeView.css';
import { status } from './component/status/Status';

export default function QrcodeView() {
  const [data, setData] = useState({});

  // sanani formatlash
  const dateFormat = (date) => {
    return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
  }

  // qrcode 
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("document/qrcode/" + window.location.pathname.split('/')[window.location.pathname.split('/').length - 1])
        if (isMounted)
          setData(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, []);

  return (
    <>
      <div style={{ height: "100vh" }}>
        <div className="page-content" style={{ height: "100%" }}>
          <div className="content-wrapper">
            <div className="content-inner">
              <div className="content mb-5">
                <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "uppercase" }}>Ko'rish</h3>
                <div className="card-body dd">
                  <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px" }}>
                    <li className="nav-item NavLinkLi">
                      <span className="nav-link">
                        <i className="icon-eye2 mr-1"></i> Topshiriqlar
                      </span>
                    </li>
                  </ul>

                  <div className="card">
                    <div className="row">
                      <div className="col-lg-5">
                        <div className="card-body cardBodyQrcode">
                          <div className="fishkaLeftIJroMain" >
                            {data?.document?.files?.length > 0 && data?.document?.files?.map((file, ind) => (
                              (ind === 0) && (
                                file?.extention?.split('/')[file?.extention?.split('/').length - 1] === "pdf" && (
                                  <embed
                                    src={url + "/api/file/view/" + file?.generatedName}
                                    type="application/pdf"
                                    width="100%"
                                    height="1000px"
                                  />
                                )
                              )
                            ))}
                          </div>

                        </div>
                      </div>

                      <div className="col-lg-7">
                        <div className="card-block mt-3">
                          <div className="card-box">
                            <div className="col-lg-12">
                              <div className="card">
                                <div className="card-header bg-primary text-white header-elements-inline">
                                  <h6 className="card-title hujjatH3" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Xujjat aylanish yo'li</h6>
                                </div>
                                <div className="card-body hujjatCardBody">
                                  <div className="col-lg-12">
                                    <span className="text-color bodySpan" style={{ fontSize: "18px" }}>{data?.document?.organizationName}</span>
                                    <ul style={{ fontSize: "17px", lineHeight: "1.9", paddingLeft: "20px" }}>
                                      <li>
                                        <span className="color-black mr-1 ">Korrespondent:</span>
                                        <span className="korresHujjat">{data?.document?.correspondentName}</span>
                                      </li>
                                      <li>
                                        <span className="color-black mr-1">№:</span><b className="text-color font-size-lg">{data?.document?.journalNumber}</b> <span className="text-primary"><b className="text-dark">(</b>{data?.document?.registerAt}<b className="text-dark">)</b></span>
                                      </li>
                                      <li>
                                        <span className="color-black mr-1">Rezalutsiya:</span>
                                        <span className="mr-1">{data?.document?.confirmerName}</span>
                                        <span className="badge badge-success mr-1">Imzolangan</span>
                                        <span className="text-primary"><b className="text-dark">(</b>{data?.document?.registerAt}<b className="text-dark">)</b></span>
                                      </li>
                                      <li>
                                        <span className="color-black" >Nazoratda: </span>
                                        <ul className="ml-2">
                                          {data?.inExecutorInformationList?.length > 0 && data?.inExecutorInformationList?.map((dat, i) => (
                                            dat?.executorStatusName === "NAZORAT UCHUN" && (
                                              <li key={i}>
                                                <span className="mr-1">{(dat?.firstName && dat?.firstName?.length > 1) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}{dat?.lastName}</span>
                                                <span className="badge text-white mr-1" style={{ backgroundColor: status.filter((s) => s.englishName === dat?.documentStatus)[0]?.color }}>{status.filter((s) => s.englishName === dat?.documentStatus)[0]?.LatinName}</span>
                                                <span className="text-primary">
                                                  <b className="text-dark">(</b>{dateFormat(dat?.statusTime)}<b className="text-dark">)</b>
                                                </span>
                                                <ul className="ml-3 middleUl">
                                                  {dat?.directedInExecutors?.map((user, ind) => (
                                                    <li key={ind}>
                                                      <span className="mr-1">{(user?.firstName && user?.firstName?.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : ""}{user?.lastName}</span>
                                                      <strong style={{ textTransform: "lowercase" }}>({user?.executorStatusName})</strong>&nbsp;
                                                      <span className="badge text-white mr-1" style={{ backgroundColor: status.filter((s) => s.englishName === user?.documentStatus)[0]?.color }}>{status.filter((s) => s.englishName === user?.documentStatus)[0]?.LatinName}</span>
                                                      <span className="text-primary">
                                                        <b className="text-dark">(</b>{dateFormat(user?.documentStatusAtTheMoment)}<b className="text-dark">)</b>
                                                      </span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </li>
                                            )
                                          ))}
                                        </ul>
                                      </li>
                                      <li>
                                        <span className="color-black">Ijrochilar:</span>
                                        <ul className="ml-2">
                                          {data?.inExecutorInformationList?.length > 0 && data?.inExecutorInformationList?.map((dat, i) => (
                                            (dat?.executorStatusName !== "NAZORAT UCHUN") && (
                                              <li key={i}>
                                                <span className="mr-1">{(dat?.firstName && dat?.firstName?.length > 1) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}{dat?.lastName}</span>
                                                {!(dat?.executorStatusName === "BAJARISH UCHUN") && (
                                                  !(dat?.documentStatus === "DIRECTED") && (
                                                    <>
                                                      <strong style={{ color: "blue" }}>({dat?.executorStatusName?.substring(0, 1)?.toUpperCase()})</strong> &nbsp;
                                                    </>
                                                  )
                                                )}
                                                <span className="badge text-white mr-1" style={{ backgroundColor: status.filter((s) => s.englishName === dat?.documentStatus)[0]?.color }}>{status.filter((s) => s.englishName === dat?.documentStatus)[0]?.LatinName}</span>
                                                <span className="text-primary">
                                                  <b className="text-dark">(</b>{dateFormat(dat?.statusTime)}<b className="text-dark">)</b>
                                                </span>
                                                <ul className="ml-4 middleUl">
                                                  {dat?.directedInExecutors?.map((user, ind) => (
                                                    <li key={ind}>
                                                      <span className="mr-1">{(user?.firstName && user?.firstName?.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : ""}{user?.lastName}</span>
                                                      {!(user?.executorStatusName === "BAJARISH UCHUN") && (
                                                        <>
                                                          <strong style={{ color: "blue" }}>({user?.executorStatusName?.substring(0, 1).toUpperCase()})</strong>&nbsp;
                                                        </>
                                                      )}
                                                      <span className="badge text-white mr-1" style={{ backgroundColor: status.filter((s) => s.englishName === user?.documentStatus)[0]?.color }}>{status.filter((s) => s.englishName === user?.documentStatus)[0]?.LatinName}</span>
                                                      <span className="text-primary">
                                                        <b className="text-dark">(</b>{dateFormat(user?.documentStatusAtTheMoment)}<b className="text-dark">)</b>
                                                      </span>
                                                    </li>
                                                  ))}
                                                </ul>
                                              </li>
                                            )
                                          ))}
                                        </ul>
                                      </li>
                                      <li>
                                        <span className="color-black">Yuborilgan tashkilotlar:</span>
                                        <ul>
                                          {data?.outExecutorInformationList?.length > 0 && data?.outExecutorInformationList?.map((d, i) => (
                                            <li key={i} className="fw-bold">
                                              <span className="mr-1">{d?.organizationName}</span>
                                              <span className="badge text-white mr-1" style={{ backgroundColor: status.filter((s) => s.englishName === d?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === d?.documentStatusName)[0]?.LatinName}</span>
                                              <b className="text-dark">
                                                (</b><span className="text-primary">
                                                {d?.statusTime !== null && d?.statusTime !== undefined && dateFormat(d?.statusTime)}
                                              </span><b className="text-dark">)</b>
                                            </li>
                                          ))}
                                        </ul>
                                      </li>
                                    </ul>

                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* kiruvchi */}
                          <div className="card-box">
                            <div className="col-lg-12">
                              <div className="card">
                                <div className="card-header bg-primary text-white header-elements-inline">
                                  <h6 className="card-title" style={{
                                    fontWeight: "bold",
                                    textTransform: "upperCase"
                                  }}>Kiruvchi</h6>
                                </div>
                                <div className="card-body">
                                  <div className="p-0">
                                    <table
                                      className="table table-bordered table-striped table-hover Tab">
                                      <tbody>
                                        {data?.document?.files?.length > 0 && data?.document?.files?.map((hujjat, index) => (
                                          hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "pdf" ? (
                                            <tr key={index}>
                                              <th className="d-flex align-items-center cursor-pointer">
                                                <i className="far fa-file-pdf mr-2 fa-2x pdfIcon" style={{ fontSize: "20px" }} />
                                                <a href={url + "/api/file/view/" + hujjat?.generatedName} target="_blank" rel="noreferrer noopener">PDF FILE</a>
                                              </th>
                                            </tr>
                                          ) : (hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "doc" || hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "docx" || hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                            <tr key={index}>
                                              <th className="d-flex align-items-center cursor-pointer">
                                                <i className="far fa-file-word mr-2 fa-2x wordIcon"
                                                  style={{ fontSize: "20px" }} />
                                                <a href={url + "/api/file/view/" + hujjat?.generatedName} target="_blank" rel="noreferrer noopener">WORD FILE</a>
                                              </th>
                                            </tr>
                                          ) : (hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "xls" || hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "xlsx" || hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                            <tr key={index}>
                                              <th className="d-flex align-items-center cursor-pointer">
                                                <i className="far fa-file-excel mr-2 fa-2x excelIcon"
                                                  style={{ fontSize: "20px" }} />
                                                <a href={url + "/api/file/view/" + hujjat?.generatedName}
                                                  target="_blank" rel="noreferrer noopener">EXCEL FILE</a>
                                              </th>
                                            </tr>
                                          ) : (hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "ppt" || hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "pptx" || hujjat?.extention.split('/')[hujjat?.extention.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                            <tr key={index}>
                                              <th className="d-flex align-items-center cursor-pointer">
                                                <i className="far fa-file-powerpoint mr-2 fa-2x pptIcon"
                                                  style={{ fontSize: "20px" }} />
                                                <a href={url + "/api/file/view/" + hujjat?.generatedName}
                                                  target="_blank" rel="noreferrer noopener">POWERPOINT FILE</a>
                                              </th>
                                            </tr>
                                          ) : (
                                            <tr key={index}>
                                              <th className="d-flex align-items-center cursor-pointer">
                                                <i className="far fa-file-archive mr-2 fa-2x rarIcon"
                                                  style={{ fontSize: "20px" }}></i>
                                                <a href={url + "/api/file/view/" + hujjat?.generatedName}
                                                  target="_blank" rel="noreferrer noopener">ZIP, RAR FILE</a>
                                              </th>
                                            </tr>
                                          )
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* eimzo malumotlari */}
                          <div className="card-box hujjatCardBox1">
                            <div className="col-lg-12">
                              <div className="card p-2">
                                <div className="imzo">
                                  <ul>
                                    {/* <li><strong>Калит ID: &nbsp;</strong><span>{data?.document?.signedBy?.serialNumber}</span></li> */}
                                    <li><strong>Лавозими ва Ф.И.О:&nbsp;</strong> <span>{data?.document?.signedBy?.lavozim} {data?.document?.signedBy?.fullName}</span></li>
                                    <li><strong>Имзоланган сана:&nbsp;</strong> <span>{data?.document?.signedAt}</span></li>
                                    <li><strong>Тулик исми шарифи:&nbsp;</strong> <span>{data?.document?.signedBy?.fullName}</span></li>
                                    {/* <li><strong>ИНН:&nbsp;</strong> <span>{data?.document?.signedBy?.inn}</span></li> */}
                                    {/* <li><strong>Корхона:&nbsp;</strong> <span>{data?.document?.signedBy?.orgName}</span></li> */}
                                    {/* <li><strong>Олинган Сана:&nbsp;</strong> <span>{data?.document?.signedBy?.validFrom}</span></li> */}
                                    {/* <li><strong>Амал қилиш муддати:&nbsp;</strong> <span>{data?.document?.signedBy?.validTo}</span></li> */}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div >
                    </div >
                  </div >
                </div >
              </div >
            </div>
          </div>
        </div >
      </div>
    </>
  )
}