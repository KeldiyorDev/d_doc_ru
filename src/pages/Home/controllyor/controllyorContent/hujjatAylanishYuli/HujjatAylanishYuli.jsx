import React from "react";
import { status } from "../../../../../component/status/Status";

const HujjatAylanishYuli = ({ data, dateFormat }) => {
  return (
    <div className="card-box">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header bg-primary text-white header-elements-inline">
            <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Путь документооборота</h6>
          </div>
          <div className="card-body">
            <div className="col-lg-12">
              <span className="text-color" style={{ fontSize: "18px" }}>{data?.document?.organizationName}</span>
              <ul style={{ fontSize: "17px", lineHeight: "1.9", paddingLeft: "20px" }}>
                <li>
                  <span className="color-black mr-1">Корреспондент:</span>{data?.document?.correspondentName}
                </li>
                <li>
                  <span className="color-black mr-1">№:</span><b className="text-color font-size-lg">{data?.document?.journalNumber}</b> <span className="text-primary"><b className="text-dark">(</b>{dateFormat(data?.document?.registerAt)}<b className="text-dark">)</b></span>
                </li>
                <li>
                  <span className="color-black mr-1">Резолюция:</span>
                  <span className="mr-1">{(data?.document?.confirmerFirstName && data?.document?.confirmerFirstName?.length > 1) ? ((((data?.document?.confirmerFirstName[0].toUpperCase() === "S" || data?.document?.confirmerFirstName[0].toUpperCase() === "C") && data?.document?.confirmerFirstName[1].toUpperCase() === "H")) ? data?.document?.confirmerFirstName?.substring(0, 2) + ". " : data?.document?.confirmerFirstName?.substring(0, 1) + ". ") : ""}{data?.document?.confirmerLastName}</span>
                  <span className="badge badge-success mr-1">Подписано:</span>
                  <span className="text-primary"><b className="text-dark">(</b>{dateFormat(data?.document?.signedAt)}<b className="text-dark">)</b></span>
                </li>
                <li>
                  <span className="color-black" >Под контролем: </span>
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
                              <li key={data?.inExecutorInformationList?.length + ind}>
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
                  <span className="color-black"> Исполнители:</span>
                  <ul className="ml-2">
                    {data?.inExecutorInformationList?.length > 0 && data?.inExecutorInformationList?.map((dat, i) => (
                      <div key={i}>
                        {(dat?.executorStatusName !== "NAZORAT UCHUN") && (
                          <li>
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
                                <li key={data?.inExecutorInformationList?.length + ind}>
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
                        )}
                      </div>
                    ))}
                  </ul>
                </li>
                <li>
                  <span className="color-black">Отправленные организации:</span>
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
  )
}

export default React.memo(HujjatAylanishYuli);