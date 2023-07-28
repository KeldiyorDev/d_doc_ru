import React from "react";
import {status, statusName, statusCode} from "../../../../../../../component/status/Status";

export default function HujjatAylanishYuli({data, dateFormat,}) {
    console.log(data);
    return (
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header bg-primary text-white header-elements-inline">
                    <h6 className="card-title" style={{fontWeight: "bold", textTransform: "upperCase"}}>Xujjat aylanish
                        yo'li</h6>
                </div>
                <div className="card-body">
                    <div className="col-lg-12">
                        <span className="text-color" style={{fontSize: "18px"}}>{data?.correspondent}</span>
                        <ul style={{fontSize: "17px", lineHeight: "1.9", paddingLeft: "20px"}}>
                            <li><span className="color-black mr-1">Korrespondent:</span>{data?.correspondent} </li>
                            <li>
                                <span className="color-black mr-1">№:</span>
                                <b className="text-color font-size-lg">{data?.regNumber}</b>
                                <span className="text-primary"><b className="text-dark">(</b>{dateFormat(data?.regDate)}<b
                                    className="text-dark">)</b></span>
                            </li>
                            <li>
                                <span className="color-black mr-1">Rezalutsiya:</span>
                                <span
                                    className="mr-1">{(data?.signedUserViewDTO?.firstName && data?.signedUserViewDTO.firstName?.length > 1) ? ((((data?.signedUserViewDTO.firstName[0].toUpperCase() === "S" || data?.signedUserViewDTO.firstName[0].toUpperCase() === "C") && data?.signedUserViewDTO.firstName[1].toUpperCase() === "H")) ? data?.signedUserViewDTO.firstName?.substring(0, 2) + ". " : data?.signedUserViewDTO.firstName?.substring(0, 1) + ". ") : ""}{data?.signedUserViewDTO?.lastName}</span>
                                <span className="badge badge-success mr-1">Imzolangan</span>
                                <span className="text-primary"><b
                                    className="text-dark">(</b>{dateFormat(data?.signedUserViewDTO?.signedDate)}<b
                                    className="text-dark">)</b></span>
                            </li>
                            <li>
                                <span className="color-black">Nazoratda: </span>
                                <ul className="ml-2">
                                    {data?.inExecutorViewDTOS?.length > 0 && data?.inExecutorViewDTOS?.map((dat, i) => (
                                        dat?.executorStatusCode === 4 && dat?.inExecutors.length === 0 &&
                                        dat?.directedBy === null &&
                                        (
                                            <li key={i}>
                                                <span
                                                    className="mr-1">{(dat?.firstName) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}{dat?.lastName}</span>
                                                <span className="badge text-white mr-1"
                                                      style={{backgroundColor: statusName.filter((s) => s.code === dat?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === dat?.documentStatusCode)[0]?.LatinName}</span>
                                                <span className="text-primary">
                                  <b className="text-dark">(</b>{dateFormat(dat?.statusDate)}<b
                                                    className="text-dark">)</b>
                              </span>
                                                {/*<ul className="ml-3 middleUl">*/}
                                                {/*    {dat?.directedInExecutors?.map((user, ind) => (*/}
                                                {/*        <li key={ind}>*/}
                                                {/*            <span className="mr-1">{(user?.firstName && user?.firstName?.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : ""}{user?.lastName}</span>*/}
                                                {/*            <strong style={{ textTransform: "lowercase" }}>({user?.executorStatusName})</strong>&nbsp;*/}
                                                {/*            <span className="badge text-white mr-1" style={{ backgroundColor: statusName.filter((s) => s.englishName === user?.documentStatus)[0]?.color }}>{statusName.filter((s) => s.englishName === user?.documentStatus)[0]?.LatinName}</span>*/}
                                                {/*            <span className="text-primary">*/}
                                                {/*                <b className="text-dark">(</b>{dateFormat(user?.documentStatusAtTheMoment)}<b className="text-dark">)</b>*/}
                                                {/*            </span>*/}
                                                {/*        </li>*/}
                                                {/*    ))}*/}
                                                {/*</ul>*/}
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <span className="color-black">Ijrochilar:</span>
                                <ul className="ml-2">
                                    {data?.inExecutorViewDTOS?.length > 0 && data?.inExecutorViewDTOS?.map((dat, i) => (
                                        !dat?.isDirected && !(dat?.executorStatusCode === 4 && dat?.inExecutors.length === 0) &&
                                        <li key={i}>
                      <span
                          className="mr-1">{(dat?.firstName && dat?.firstName?.length > 1) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}{dat?.lastName}</span>
                                            <>
                                                <strong
                                                    style={{color: "blue"}}>({statusCode.filter((d) => d?.code === dat?.executorStatusCode)[0]?.LatinName.substring(0, 1)?.toUpperCase()})</strong> &nbsp;
                                            </>
                                            <span className="badge text-white mr-1"
                                                  style={{backgroundColor: statusName?.filter((s) => s.code === dat?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === dat?.documentStatusCode)[0]?.LatinName}</span>
                                            <span className="text-primary">
                        <b className="text-dark">(</b>{dateFormat(dat?.statusDate)}<b
                                                className="text-dark">)</b>
                      </span>
                                            <ul className="ml-4 middleUl">
                                                {dat?.inExecutors?.map((user, ind) => (
                                                    <li key={ind}>
                            <span
                                className="mr-1">{(user?.firstName && user?.firstName?.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : ""}{user?.lastName}</span>
                                                        <>
                                                            <strong
                                                                style={{color: "blue"}}>({statusCode.filter((d) => d?.code === user?.executorStatusCode)[0]?.LatinName.substring(0, 1)?.toUpperCase()})</strong> &nbsp;
                                                        </>
                                                        <span className="badge text-white mr-1"
                                                              style={{backgroundColor: statusName?.filter((s) => s.code === user?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === user?.documentStatusCode)[0]?.LatinName}</span>
                                                        <span className="text-primary">
                              <b className="text-dark">(</b>{dateFormat(user?.statusDate)}<b
                                                            className="text-dark">)</b>
                            </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>           
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <span className="color-black">Yuborilgan tashkilotlar:</span>
                                <ul>
                                    {data?.outExecutorViewDTOS?.length > 0 && data?.outExecutorViewDTOS?.map((d, i) => (
                                        <li key={i} className="fw-bold">
                                            <span className="mr-1">{d?.responsibleOrgShortInfo?.name}</span>
                                            <span className="badge text-white mr-1"
                                                  style={{backgroundColor: statusName.filter((s) => s.code === d?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === d?.documentStatusCode)[0]?.LatinName}</span>
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
    )
}