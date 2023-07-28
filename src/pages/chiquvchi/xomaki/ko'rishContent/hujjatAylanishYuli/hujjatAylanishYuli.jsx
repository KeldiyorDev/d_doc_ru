import React from "react";
import {statusCode, statusCodeOutGoing, statusName} from "../../../../../component/status/Status";

const ChiquvchiHujjatAylanishYuli=({obj})=> {
    console.log(obj)
    const dateFormatGet=(date)=>{
        return date?.split('-').reverse().join('.')
    }
    return (
    <>
        <div className="col-lg-12">
            <div className="card">
                <div className="card-header bg-primary text-white header-elements-inline">
                    <h6 className="card-title" style={{fontWeight: "bold", textTransform: "upperCase"}}>Xujjat aylanish
                        yo'li</h6>
                </div>
                <div className="card-body">
                    <div className="col-lg-12">
                        <ul style={{fontSize: "17px", lineHeight: "1.9", paddingLeft: "20px"}}>
                            <li>
                                <span> <span
                                    className="color-black">Chiquvchi (Xomaki) № </span>: Sana : {dateFormatGet(obj?.createdAt)}</span>
                                <ul className="ml-3">
                                    <li>
                                        <span  className="color-black mr-1">Kim tomonidan :</span>

                                        <ul className="ml-4 middleUl">
                                            <li>
                                                <span className={'mr-1'}>{(obj?.sender?.firstName) ? ((((obj?.sender?.firstName[0].toUpperCase() === "S" || obj?.sender?.firstName[0].toUpperCase() === "C") && obj?.sender?.firstName[1].toUpperCase() === "H")) ? obj?.sender?.firstName?.substring(0, 2) + "." : obj?.sender?.firstName?.substring(0, 1) + ".") : ""}{obj?.sender?.lastName}</span>
                                                <span className="badge text-white mr-1"
                                                      style={{backgroundColor: statusCodeOutGoing.filter((s) => s.englishName === obj?.sender?.status)[0]?.color}}>{statusCodeOutGoing.filter((s) => s.englishName === obj?.sender?.status)[0]?.LatinName}</span>
                                                <span className="text-primary"><b className="text-dark">(</b>{dateFormatGet(obj?.sender?.statusTime)}<b
                                                    className="text-dark">)</b></span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <span  className="color-black d-block"> Tasdiqlovchilar : </span>
                                        <ul className="ml-4 middleUl">
                                        {
                                            obj?.confirmatives?.map((items,index)=>{
                                                return(
                                                    <li
                                                    key={index}>
                                                        <span className={'mr-1'}>{(items?.firstName) ? ((((items?.firstName[0].toUpperCase() === "S" || items?.firstName[0].toUpperCase() === "C") && items?.firstName[1].toUpperCase() === "H")) ? items?.firstName?.substring(0, 2) + "." : items?.firstName?.substring(0, 1) + ".") : ""}{items?.lastName}</span>
                                                         <span className="badge text-white mr-1"
                                                               style={{backgroundColor: statusCodeOutGoing.filter((s) => s.englishName === items?.status)[0]?.color}}>{statusCodeOutGoing.filter((s) => s.englishName === items?.status)[0]?.LatinName}</span>
                                                        <span className="text-primary"><b className="text-dark">(</b>{dateFormatGet(items?.statusTime)}<b
                                                            className="text-dark">)</b></span>
                                                        <br/>
                                                    </li>
                                                )
                                            })
                                        }
                                        </ul>
                                    </li>
                                    <li>
                                        <span  className="color-black"> Jo'natilgan : </span>
                                        <span> Rahbariyat: </span>
                                        <span className={'mr-1'}>{(obj?.signatory?.firstName) ? ((((obj?.signatory?.firstName[0].toUpperCase() === "S" || obj?.signatory?.firstName[0].toUpperCase() === "C") && obj?.signatory?.firstName[1].toUpperCase() === "H")) ? obj?.signatory?.firstName?.substring(0, 2) + "." : obj?.signatory?.firstName?.substring(0, 1) + ".") : ""}{obj?.signatory?.lastName}</span>
                                    </li>

                                    <li>
                                        <span  className="color-black"> Tashkilot: </span>
                                        <ul className="ml-4 middleUl">
                                            {
                                                obj?.inReceivers?.map((item,index)=>{
                                                    return(
                                                        <>
                                                            <li key={index}>
                                                                <span className="color-black" style={{letterSpacing:'0.5px',lineHeight:'10px'}}> {item.orgName} : <span className="text-primary"> {item?.email}</span> </span>
                                                            </li>
                                                        </>
                                                    )
                                                })

                                            }
                                            {
                                                obj?.outReceivers?.map((item,index)=>{
                                                    return(
                                                        <>
                                                            <li key={index}>
                                                                <span  className="color-black" style={{letterSpacing:'0.5px',lineHeight:'10px'}}> {item.orgName} : <span className="text-primary"> {item?.email}</span> </span>
                                                            </li>
                                                        </>
                                                    )
                                                })

                                            }
                                        </ul>
                                    </li>
                                </ul>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>
        {/*<div className="col-lg-12">*/}
        {/*    <div className="card">*/}
        {/*        <div className="card-header bg-primary text-white header-elements-inline">*/}
        {/*            <h6 className="card-title" style={{fontWeight: "bold", textTransform: "upperCase"}}>Xujjat aylanish*/}
        {/*                yo'li</h6>*/}
        {/*        </div>*/}
        {/*        <div className="card-body">*/}
        {/*            <div className="col-lg-12">*/}
        {/*                <span className="text-color" style={{fontSize: "18px"}}>{obj?.correspondent}</span>*/}
        {/*                <ul style={{fontSize: "17px", lineHeight: "1.9", paddingLeft: "20px"}}>*/}
        {/*                    <li><span className="color-black mr-1">Korrespondent:</span>{obj?.correspondent} </li>*/}
        {/*                    <li>*/}
        {/*                        <span className="color-black mr-1">№:</span>*/}
        {/*                        <b className="text-color font-size-lg">{obj?.regNumber}</b>*/}
        {/*                        <span className="text-primary"><b className="text-dark">(</b>{obj?.regDate}<b*/}
        {/*                            className="text-dark">)</b></span>*/}
        {/*                    </li>*/}
        {/*                    <li>*/}
        {/*                        <span className="color-black mr-1">Rezalutsiya:</span>*/}
        {/*                        <span*/}
        {/*                            className="mr-1">{(obj?.signedUserViewDTO?.firstName && obj?.signedUserViewDTO.firstName?.length > 1) ? ((((obj?.signedUserViewDTO.firstName[0].toUpperCase() === "S" || obj?.signedUserViewDTO.firstName[0].toUpperCase() === "C") && obj?.signedUserViewDTO.firstName[1].toUpperCase() === "H")) ? obj?.signedUserViewDTO.firstName?.substring(0, 2) + ". " : obj?.signedUserViewDTO.firstName?.substring(0, 1) + ". ") : ""}{obj?.signedUserViewDTO?.lastName}</span>*/}
        {/*                        <span className="badge badge-success mr-1">Imzolangan</span>*/}
        {/*                        <span className="text-primary"><b*/}
        {/*                            className="text-dark">(</b>{obj?.signedUserViewDTO?.signedDate}<b*/}
        {/*                            className="text-dark">)</b></span>*/}
        {/*                    </li>*/}
        {/*                    <li>*/}
        {/*                        <span className="color-black">Nazoratda: </span>*/}
        {/*                        <ul className="ml-2">*/}
        {/*                            {obj?.inExecutorViewDTOS?.length > 0 && obj?.inExecutorViewDTOS?.map((dat, i) => (*/}
        {/*                                dat?.executorStatusCode === 4 && dat?.inExecutors.length === 0 &&*/}
        {/*                                dat?.directedBy === null &&*/}
        {/*                                (*/}
        {/*                                    <li key={i}>*/}
        {/*                                        <span*/}
        {/*                                            className="mr-1">{(dat?.firstName) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}{dat?.lastName}</span>*/}
        {/*                                        <span className="badge text-white mr-1"*/}
        {/*                                              style={{backgroundColor: statusName.filter((s) => s.code === dat?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === dat?.documentStatusCode)[0]?.LatinName}</span>*/}
        {/*                                        <span className="text-primary">*/}
        {/*                          <b className="text-dark">(</b>{dat?.statusDate}<b*/}
        {/*                                            className="text-dark">)</b>*/}
        {/*                      </span>*/}
        {/*                                        /!*<ul className="ml-3 middleUl">*!/*/}
        {/*                                        /!*    {dat?.directedInExecutors?.map((user, ind) => (*!/*/}
        {/*                                        /!*        <li key={ind}>*!/*/}
        {/*                                        /!*            <span className="mr-1">{(user?.firstName && user?.firstName?.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : ""}{user?.lastName}</span>*!/*/}
        {/*                                        /!*            <strong style={{ textTransform: "lowercase" }}>({user?.executorStatusName})</strong>&nbsp;*!/*/}
        {/*                                        /!*            <span className="badge text-white mr-1" style={{ backgroundColor: statusName.filter((s) => s.englishName === user?.documentStatus)[0]?.color }}>{statusName.filter((s) => s.englishName === user?.documentStatus)[0]?.LatinName}</span>*!/*/}
        {/*                                        /!*            <span className="text-primary">*!/*/}
        {/*                                        /!*                <b className="text-dark">(</b>{dateFormat(user?.documentStatusAtTheMoment)}<b className="text-dark">)</b>*!/*/}
        {/*                                        /!*            </span>*!/*/}
        {/*                                        /!*        </li>*!/*/}
        {/*                                        /!*    ))}*!/*/}
        {/*                                        /!*</ul>*!/*/}
        {/*                                    </li>*/}
        {/*                                )*/}
        {/*                            ))}*/}
        {/*                        </ul>*/}
        {/*                    </li>*/}
        {/*                    <li>*/}
        {/*                        <span className="color-black">Ijrochilar:</span>*/}
        {/*                        <ul className="ml-2">*/}
        {/*                            {obj?.inExecutorViewDTOS?.length > 0 && obj?.inExecutorViewDTOS?.map((dat, i) => (*/}
        {/*                                !dat?.isDirected && !(dat?.executorStatusCode === 4 && dat?.inExecutors.length === 0) &&*/}
        {/*                                <li key={i}>*/}
        {/*              <span*/}
        {/*                  className="mr-1">{(dat?.firstName && dat?.firstName?.length > 1) ? ((((dat?.firstName[0].toUpperCase() === "S" || dat?.firstName[0].toUpperCase() === "C") && dat?.firstName[1].toUpperCase() === "H")) ? dat?.firstName?.substring(0, 2) + ". " : dat?.firstName?.substring(0, 1) + ". ") : ""}{dat?.lastName}</span>*/}
        {/*                                    <>*/}
        {/*                                        <strong*/}
        {/*                                            style={{color: "blue"}}>({statusCode.filter((d) => d?.code === dat?.executorStatusCode)[0]?.LatinName.substring(0, 1)?.toUpperCase()})</strong> &nbsp;*/}
        {/*                                    </>*/}
        {/*                                    <span className="badge text-white mr-1"*/}
        {/*                                          style={{backgroundColor: statusName?.filter((s) => s.code === dat?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === dat?.documentStatusCode)[0]?.LatinName}</span>*/}
        {/*                                    <span className="text-primary">*/}
        {/*                <b className="text-dark">(</b>{dat?.statusDate}<b*/}
        {/*                                        className="text-dark">)</b>*/}
        {/*              </span>*/}
        {/*                                    <ul className="ml-4 middleUl">*/}
        {/*                                        {dat?.inExecutors?.map((user, ind) => (*/}
        {/*                                            <li key={ind}>*/}
        {/*                    <span*/}
        {/*                        className="mr-1">{(user?.firstName && user?.firstName?.length > 1) ? ((((user?.firstName[0].toUpperCase() === "S" || user?.firstName[0].toUpperCase() === "C") && user?.firstName[1].toUpperCase() === "H")) ? user?.firstName?.substring(0, 2) + ". " : user?.firstName?.substring(0, 1) + ". ") : ""}{user?.lastName}</span>*/}
        {/*                                                <>*/}
        {/*                                                    <strong*/}
        {/*                                                        style={{color: "blue"}}>({statusCode.filter((d) => d?.code === user?.executorStatusCode)[0]?.LatinName.substring(0, 1)?.toUpperCase()})</strong> &nbsp;*/}
        {/*                                                </>*/}
        {/*                                                <span className="badge text-white mr-1"*/}
        {/*                                                      style={{backgroundColor: statusName?.filter((s) => s.code === user?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === user?.documentStatusCode)[0]?.LatinName}</span>*/}
        {/*                                                <span className="text-primary">*/}
        {/*                      <b className="text-dark">(</b>{user?.statusDate}<b*/}
        {/*                                                    className="text-dark">)</b>*/}
        {/*                    </span>*/}
        {/*                                            </li>*/}
        {/*                                        ))}*/}
        {/*                                    </ul>*/}
        {/*                                </li>*/}
        {/*                            ))}*/}
        {/*                        </ul>*/}
        {/*                    </li>*/}
        {/*                    <li>*/}
        {/*                        <span className="color-black">Yuborilgan tashkilotlar:</span>*/}
        {/*                        <ul>*/}
        {/*                            {obj?.outExecutorViewDTOS?.length > 0 && obj?.outExecutorViewDTOS?.map((d, i) => (*/}
        {/*                                <li key={i} className="fw-bold">*/}
        {/*                                    <span className="mr-1">{d?.responsibleOrgShortInfo?.name}</span>*/}
        {/*                                    <span className="badge text-white mr-1"*/}
        {/*                                          style={{backgroundColor: statusName.filter((s) => s.code === d?.documentStatusCode)[0]?.color}}>{statusName.filter((s) => s.code === d?.documentStatusCode)[0]?.LatinName}</span>*/}
        {/*                                    <b className="text-dark">*/}
        {/*                                        (</b><span className="text-primary">*/}
        {/*                                    {d?.statusTime !== null && d?.statusTime !== undefined && d?.statusTime}*/}
        {/*                                    </span><b className="text-dark">)</b>*/}
        {/*                                </li>*/}
        {/*                            ))}*/}
        {/*                        </ul>*/}
        {/*                    </li>*/}
        {/*                </ul>*/}

        {/*            </div>*/}
        {/*        </div>*/}
        {/*    </div>*/}
        {/*</div>*/}

    </>
    )
}

export default React.memo(ChiquvchiHujjatAylanishYuli)