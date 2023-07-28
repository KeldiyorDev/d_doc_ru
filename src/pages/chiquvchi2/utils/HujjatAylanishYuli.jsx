import React from "react";
import { statusCodeOutGoing } from "../../../component/status/Status";

const HujjatAylanishYuli = ({ obj }) => {
    console.log(obj)
    const dateFormatGet = (date) => {
        return date?.split('-').reverse().join('.')
    }
    return (
        <div className="card mx-2">
            <div className="card-header bg-primary text-white header-elements-inline">
                <h6 className="card-title" style={{ fontWeight: "bold", textTransform: "upperCase" }}>Xujjat aylanish
                    yo'li</h6>
            </div>
            <div className="card-body">
                <div className="col-lg-12">
                    <ul style={{ fontSize: "17px", lineHeight: "1.9", paddingLeft: "20px" }}>
                        <li>
                            <span> <span
                                className="color-black">Chiquvchi (Xomaki) № </span>: Sana : {dateFormatGet(obj?.createdAt)}</span>
                            <ul className="ml-3">
                                <li>
                                    <span className="color-black mr-1">Tayyorlovchi :</span>

                                    <ul className="ml-4 middleUl">
                                        <li>
                                            <span className={'mr-1'}>{(obj?.sender?.firstName) ? ((((obj?.sender?.firstName[0].toUpperCase() === "S" || obj?.sender?.firstName[0].toUpperCase() === "C") && obj?.sender?.firstName[1].toUpperCase() === "H")) ? obj?.sender?.firstName?.substring(0, 2) + "." : obj?.sender?.firstName?.substring(0, 1) + ".") : ""}{obj?.sender?.lastName}</span>
                                            <span className="badge text-white mr-1"
                                                style={{ backgroundColor: statusCodeOutGoing.filter((s) => s.englishName === obj?.sender?.status)[0]?.color }}>{statusCodeOutGoing.filter((s) => s.englishName === obj?.sender?.status)[0]?.LatinName}</span>
                                            <span className="text-primary"><b className="text-dark">(</b>{dateFormatGet(obj?.sender?.statusTime)}<b
                                                className="text-dark">)</b></span>
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <span className="color-black"> Imzolovchi: : </span>
                                    <ul className="ml-4 middleUl">
                                        <li>
                                            <span className={'mr-1'}>{(obj?.signatory?.firstName) ? ((((obj?.signatory?.firstName[0].toUpperCase() === "S" || obj?.signatory?.firstName[0].toUpperCase() === "C") && obj?.signatory?.firstName[1].toUpperCase() === "H")) ? obj?.signatory?.firstName?.substring(0, 2) + "." : obj?.signatory?.firstName?.substring(0, 1) + ".") : ""}{obj?.signatory?.lastName}</span>
                                            <span className="badge text-white mr-1"
                                                style={{ backgroundColor: statusCodeOutGoing.filter((s) => s.englishName === obj?.signatory?.status)[0]?.color }}>{statusCodeOutGoing.filter((s) => s.englishName === obj?.signatory?.status)[0]?.LatinName}</span>
                                            <span className="text-primary"><b className="text-dark">(</b>{dateFormatGet(obj?.signatory?.statusTime)}<b
                                                className="text-dark">)</b></span>
                                        </li>
                                    </ul>
                                </li>

                                <li>
                                    <span className="color-black d-block"> Tasdiqlovchi : </span>
                                    <ul className="ml-4 middleUl">
                                        {
                                            obj?.confirmatives?.map((items, index) => {
                                                return (
                                                    <li
                                                        key={index}>
                                                        <span className={'mr-1'}>{(items?.firstName) ? ((((items?.firstName[0].toUpperCase() === "S" || items?.firstName[0].toUpperCase() === "C") && items?.firstName[1].toUpperCase() === "H")) ? items?.firstName?.substring(0, 2) + "." : items?.firstName?.substring(0, 1) + ".") : ""}{items?.lastName}</span>
                                                        <span className="badge text-white mr-1"
                                                            style={{ backgroundColor: statusCodeOutGoing.filter((s) => s.englishName === items?.status)[0]?.color }}>{statusCodeOutGoing.filter((s) => s.englishName === items?.status)[0]?.LatinName}</span>
                                                        <span className="text-primary"><b className="text-dark">(</b>{dateFormatGet(items?.statusTime)}<b
                                                            className="text-dark">)</b></span>
                                                        <br />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>


                                <li>
                                    <span className="color-black"> Ichki tashkilotlar: </span>
                                    <ul className="ml-4 middleUl">
                                        {
                                            obj?.inReceivers?.map((item, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>
                                                            <span className="color-black" style={{ letterSpacing: '0.5px', lineHeight: '10px' }}> {item.orgName}  </span>
                                                        </li>
                                                    </>
                                                )
                                            })

                                        }
                                    </ul>
                                </li>

                                <li>
                                    <span className="color-black"> Tashqi tashkilotlar: </span>
                                    <ul className="ml-4 middleUl">
                                        {
                                            obj?.outReceivers?.map((item, index) => {
                                                return (
                                                    <>
                                                        <li key={index}>
                                                            <span className="color-black" style={{ letterSpacing: '0.5px', lineHeight: '10px' }}> {item.orgName} : <span className="text-primary"> <span className="text-dark">(</span>{item?.email} <span className="text-dark">)</span> </span> </span>
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
    )
}

export default React.memo(HujjatAylanishYuli)
