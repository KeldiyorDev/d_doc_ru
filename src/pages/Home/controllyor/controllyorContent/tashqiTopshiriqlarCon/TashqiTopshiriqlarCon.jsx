import React from "react";
import { status } from "../../../../../component/status/Status";
import { url } from "../../../../../config";

const TashqiTopshiriqlarCon = ({ data, dateFormat }) => {

  return (
    data.outExecutorInformationList?.length > 0 && (
      <div className="card-box mt-3">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header bg-primary text-white header-elements-inline">
              <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Внешние назначения</h6>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover Tab">
                  <thead className="bg-dark text-white NavLink text-center">
                    <tr>
                      <th style={{ width: "33.333%" }}>Назначение</th>
                      <th style={{ width: "33.333%" }}>Срок/статус</th>
                    <th style={{ width: "33.333%" }}>Производительность</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.outExecutorInformationList?.length > 0 && data?.outExecutorInformationList?.map((dat, index) => (
                      <tr key={index} style={{ textAlign: 'center' }} className="trTashqiNumber">
                        <td style={{ textAlign: 'left' }}>
                          <p style={{ fontWeight: "600" }}>{dat?.organizationName}</p>
                          <p style={{ fontWeight: "600" }}>{(dat?.leaderLastName && (dat?.leaderFirstName?.length > 1)) ? ((((dat?.leaderFirstName[0].toUpperCase() === "S" || dat?.leaderFirstName[0].toUpperCase() === "C") && dat?.leaderFirstName[1].toUpperCase() === "H")) ? dat?.leaderFirstName?.substring(0, 2) + ". " : dat?.leaderFirstName?.substring(0, 1) + ". ") : ""}{dat?.leaderLastName} </p>
                        </td>
                        <td>
                          <p style={{ fontWeight: "600" }}>{dateFormat(dat?.deadline)}</p>
                          <span className="badge text-white mr-1" style={{ backgroundColor: status.filter((s) => s.englishName === dat?.documentStatusName)[0]?.color }}>{status.filter((s) => s.englishName === dat?.documentStatusName)[0]?.LatinName}</span>
                        </td>
                        <td style={{ textAlign: 'left' }}>
                          {dat?.outInExecutors?.length > 0 && dat?.outInExecutors?.map((d, i) => (
                            <>
                              <div key={data?.outExecutorInformationList?.length + i} className={'direction-mobile mb-2'} style={{
                                display: 'flex',
                                alignItems: "center",
                                flexWrap: 'wrap',
                              }}>
                                <p className="m-0">{(d?.firstName && (d?.firstName?.length > 1)) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""}{d?.lastName} </p>
                                <span
                                  className="badge text-white ml-2"
                                  style={{
                                    backgroundColor: status.filter(s => s.englishName === d?.documentStatus)[0]?.color,
                                    cursor: 'pointer'
                                  }}>
                                  {status.filter(s => s.englishName === d?.documentStatus)[0]?.LatinName}
                                </span>
                              </div>

                              {d?.tabName === "DONE" && (
                                <>
                                  <p>
                                    {d?.executeDocument?.comment && (
                                      <span className="d-block mb-1">
                                        <strong>Izoh:&nbsp;</strong>
                                        <span style={{ fontWeight: "400" }}>
                                          <span style={{ display: "none" }} className="cursor-pointer IzohTashqiTopshiriqNoneY" >
                                            {d?.executeDocument?.comment} <span style={{ color: "blue", fontSize: "11px" }}>&nbsp; Скрывать</span>
                                          </span>
                                          <span style={{ display: "block" }} className="cursor-pointer IzohTashqiTopshiriqBlockY">
                                            {d?.executeDocument?.comment?.substring(0, 50)}...
                                            {d?.executeDocument?.comment?.length > 50 ? (
                                              <span style={{ color: "blue", fontSize: "11px" }}>&nbsp; продолжение</span>
                                            ) : (
                                              <span></span>
                                            )}
                                          </span>
                                        </span>
                                      </span>
                                    )}
                                    {d?.executeDocument?.chosenFiles?.length > 0 && (
                                      <div className="d-flex" style={{ flexWrap: "wrap" }}>
                                        <strong>File:&nbsp;</strong>
                                        {d?.executeDocument?.chosenFiles?.map((hujjat, index) => (
                                          hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pdf" ? (
                                            <span key={d?.executeDocument?.chosenFiles + dat?.outInExecutors?.length + data?.outExecutorInformationList?.length + index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-pdf mr-1 fa-2x pdfIcon" style={{ fontSize: "20px" }} />
                                              <a href={url + "/api/file/view/" + hujjat?.generatedName} target="_blank" rel="noreferrer noopener">PDF FILE, </a>
                                            </span>
                                          ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "doc" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "docx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.wordprocessingml.document") ? (
                                            <span key={index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-word mr-1 fa-2x wordIcon"
                                                style={{ fontSize: "20px" }} />
                                              <a href={url + "/api/file/view/" + hujjat?.generatedName}
                                                target="_blank" rel="noreferrer noopener">WORD FILE, </a>
                                            </span>
                                          ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xls" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "xlsx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.spreadsheetml.sheet") ? (
                                            <span key={index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-excel mr-1 fa-2x excelIcon"
                                                style={{ fontSize: "20px" }} />
                                              <a href={url + "/api/file/view/" + hujjat?.generatedName}
                                                target="_blank" rel="noreferrer noopener">EXCEL FILE, </a>
                                            </span>
                                          ) : (hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "ppt" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "pptx" || hujjat?.extention?.split('/')[hujjat?.extention?.split('/').length - 1] === "vnd.openxmlformats-officedocument.presentationml.presentation") ? (
                                            <span key={index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-powerpoint mr-1 fa-2x pptIcon"
                                                style={{ fontSize: "20px" }} />
                                              <a href={url + "/api/file/view/" + hujjat?.generatedName}
                                                target="_blank" rel="noreferrer noopener">POWERPOINT FILE, </a>
                                            </span>
                                          ) : (
                                            <span key={index} className="d-flex align-items-center cursor-pointer mr-2 mb-1">
                                              <i className="far fa-file-archive mr-1 fa-2x rarIcon" style={{ fontSize: "20px" }}></i>
                                              <a href={url + "/api/file/view/" + hujjat?.generatedName} target="_blank" rel="noreferrer noopener">ZIP, RAR FILE, </a>
                                            </span>
                                          )
                                        ))}
                                      </div>
                                    )}
                                  </p>
                                  <hr style={{ height: "1px", backgroundColor: "#000" }} />
                                </>
                              )}
                            </>
                          ))}
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
    )
  )
}

export default React.memo(TashqiTopshiriqlarCon);