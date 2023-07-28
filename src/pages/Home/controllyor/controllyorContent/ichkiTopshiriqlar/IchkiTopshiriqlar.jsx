import React from "react";
import { status } from "../../../../../component/status/Status";
import { url } from "../../../../../config";

const IchkiTopshiriqlar = ({ data, dateFormat }) => {

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

  return (
    data?.inExecutorInformationList?.length > 0 && (
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
                      <th style={{ width: "15%" }}>Присвоение</th>
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
                          {(dat?.executeDocument?.chosenFiles?.length > 0 || dat?.executeDocument?.comment) ? (
                            <p>
                              <span className="mb-1">
                                <span style={{ fontWeight: "400" }}>
                                  <span onClick={() => setOpenStrFunc(index, "n")} style={{ display: "none" }} className="cursor-pointer IzohIchkiTopshiriqNone" >
                                    <strong>Izoh:</strong>&nbsp; {dat?.executeDocument?.comment}<span style={{ color: "blue", fontSize: "11px" }}>&nbsp; Скрывать</span>
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
                              <span className="mt-1" style={{ display: "block" }}>
                                <strong>File:&nbsp;</strong>
                                <span className="d-flex" style={{ flexWrap: "wrap" }}>
                                  {dat.executeDocument?.chosenFiles?.length > 0 && dat.executeDocument?.chosenFiles?.map((hujjat, ind1) => (
                                    hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
                                      <span key={ind1} className="d-flex align-items-center cursor-pointer mr-2 mb-1" >
                                        <i className="far fa-file-pdf mr-1 fa-2x pdfIcon" style={{ fontSize: "20px" }} />
                                        <a href={url + "/api/file/view/" + hujjat?.id} target="_blank" rel="noreferrer noopener">PDF FILE, </a>
                                      </span>
                                    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                      <span key={ind1} className="d-flex align-items-center cursor-pointer mr-2 mb-1" >
                                        <i className="far fa-file-word mr-1 fa-2x wordIcon"
                                          style={{ fontSize: "20px" }} />
                                        <a href={url + "/api/file/view/" + hujjat?.id}
                                          target="_blank" rel="noreferrer noopener">WORD FILE, </a>
                                      </span>
                                    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                      <span key={ind1} className="d-flex align-items-center cursor-pointer mr-2 mb-1" >
                                        <i className="far fa-file-excel mr-1 fa-2x excelIcon"
                                          style={{ fontSize: "20px" }} />
                                        <a href={url + "/api/file/view/" + hujjat?.id}
                                          target="_blank" rel="noreferrer noopener">EXCEL FILE, </a>
                                      </span>
                                    ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                      <span key={ind1} className="d-flex align-items-center cursor-pointer mr-2 mb-1" >
                                        <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
                                          style={{ fontSize: "20px" }} />
                                        <a href={url + "/api/file/view/" + hujjat?.id}
                                          target="_blank" rel="noreferrer noopener">POWERPOINT FILE, </a>
                                      </span>
                                    ) : (
                                      <span key={ind1} className="d-flex align-items-center cursor-pointer mr-2 mb-1" >
                                        <i className="far fa-file-archive mr-1 fa-2x rarIcon" style={{ fontSize: "20px" }}></i>
                                        <a href={url + "/api/file/view/" + hujjat?.id} target="_blank" rel="noreferrer noopener">ZIP, RAR FILE, </a>
                                      </span>
                                    )
                                  ))}
                                </span>
                              </span>
                            </p>
                          ) : (
                            <>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* faqat yo'naltirganlar */}
                  <tbody>
                    {data?.inExecutorInformationList.length > 0 && data?.inExecutorInformationList?.map((dat, index) => (
                      dat?.directedInExecutors?.map((user, i) => (
                        <>
                          {/* ajratish uchun chiziq */}
                          {i === 0 && (
                            <tr key={data?.inExecutorInformationList?.length + i}>
                              <td colSpan={4}>
                                <hr style={{ height: '2px', backgroundColor: "#000", width: "100%" }} />
                              </td>
                            </tr>
                          )}
                          <tr key={index} className="text-center trNumberRedirect" >
                            <td>
                              <p>{(user?.firstName && user?.firstName?.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : ""}{user?.lastName}</p>
                              <p className="badge badge-primary">РЕГ № {data?.document?.journalNumber}</p>
                              <p>{dateFormat(user?.documentStatusAtTheMoment)}</p>
                            </td>
                            <td className="py-2 px-0">
                              <p>{(user?.directFirstName && user?.directFirstName?.length > 1) ? ((((user?.directFirstName[0].toUpperCase() === "S" || user?.directFirstName[0].toUpperCase() === "C") && user?.directFirstName[1].toUpperCase() === "H")) ? user?.directFirstName.substring(0, 2) + ". " : user?.directFirstName?.substring(0, 1) + ". ") : ""}{user?.directLastName}</p>
                              <p>{dateFormat(user?.deadline)}</p>
                              <span className="badge text-white mr-1 span1" style={{ backgroundColor: status.filter((s, i) => s.englishName === user?.documentStatus)[0]?.color }}>{status.filter((s, i) => s.englishName === user?.documentStatus)[0]?.LatinName}</span><br />
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
                                          <strong>Izoh:</strong>&nbsp; {user?.executeDocument?.comment} <span style={{ color: "blue", fontSize: "11px" }}>&nbsp; Скрывать</span>
                                        </span>
                                        <span style={{ display: "block" }} className="cursor-pointer IzohIchkiTopshiriqBlockY">
                                          <strong>Izoh:</strong>&nbsp; {user?.executeDocument?.comment?.substring(0, 50)}...
                                          {user?.executeDocument?.comment?.length > 50 ? (
                                            <span style={{ color: "blue", fontSize: "11px" }}>&nbsp; продолжение</span>
                                          ) : (
                                            <span></span>
                                          )}
                                        </span>
                                      </span>
                                    </span>
                                    <div className="mt-1">
                                      <strong >File:&nbsp;</strong>
                                      <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                        {user?.executeDocument?.chosenFiles?.length > 0 && user?.executeDocument?.chosenFiles?.map((hujjat, index) => (
                                          hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
                                            <span key={index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-pdf mr-1 fa-2x pdfIcon" style={{ fontSize: "20px" }} />
                                              <a href={url + "/api/file/view/" + hujjat?.id} target="_blank" rel="noreferrer noopener">PDF FILE, </a>
                                            </span>
                                          ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                            <span key={index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-word mr-1 fa-2x wordIcon"
                                                style={{ fontSize: "20px" }} />
                                              <a href={url + "/api/file/view/" + hujjat?.id}
                                                target="_blank" rel="noreferrer noopener">WORD FILE, </a>
                                            </span>
                                          ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                            <span key={index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-excel mr-1 fa-2x excelIcon"
                                                style={{ fontSize: "20px" }} />
                                              <a href={url + "/api/file/view/" + hujjat?.id}
                                                target="_blank" rel="noreferrer noopener">EXCEL FILE, </a>
                                            </span>
                                          ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                            <span key={index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
                                                style={{ fontSize: "20px" }} />
                                              <a href={url + "/api/file/view/" + hujjat?.id}
                                                target="_blank" rel="noreferrer noopener">POWERPOINT FILE, </a>
                                            </span>
                                          ) : (
                                            <span key={index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-archive mr-1 fa-2x rarIcon" style={{ fontSize: "20px" }}></i>
                                              <a href={url + "/api/file/view/" + hujjat?.id} target="_blank" rel="noreferrer noopener">ZIP, RAR FILE, </a>
                                            </span>
                                          )
                                        ))}
                                      </div>
                                    </div>
                                  </p>
                                ) : (
                                  <>
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
    )
  )
}

export default React.memo(IchkiTopshiriqlar);