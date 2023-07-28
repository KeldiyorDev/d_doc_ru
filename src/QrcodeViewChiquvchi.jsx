import React, { useEffect, useState } from "react";
import { axiosInstanceOut, urlOut } from "./config";
import './qrcodeView.css';
import HujjatAylanishYuli from "./pages/chiquvchi2/utils/HujjatAylanishYuli";
import BiriktirilganFayllar from "./pages/chiquvchi2/utils/BiriktirilganFayllar";

export default function QrcodeViewChiquvchi() {
  const [data, setData] = useState({});
  const [obj, setObj] = useState({});
  const [isShowIlova, setIsShowIlova] = useState(false)

  const dateFormatGet = (date) => {
    return date?.split('-').reverse().join('.')
}

  // ekran full
  const [full, setFull] = useState(false)

  // qrcode 
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstanceOut.get("missive/qrcode/" + window.location.pathname.split('/')[window.location.pathname.split('/').length - 2] + "/" + window.location.pathname.split('/')[window.location.pathname.split('/').length - 1])
        if (isMounted) {
          setData(res.data);
          setObj(res.data?.missiveGetDTO)
          console.log(res.data);
        }
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

                  <div className="row pb-3 kurishCkEditor px-0">
                    <div className={`${full ? "col-lg-12" : "col-lg-6"}`} style={{ paddingLeft: "0" }}>
                      <button className="btn btn-primary m-0 mt-3 w-100"
                        onClick={() => setFull(!full)}>
                        {full ? "Ekranni qisqartirish" : "To'liq ekran"}
                      </button>

                      <>
                        <div className="borderPdf mt-3">
                          {
                            obj?.readyPDF?.id && (
                              <embed
                                src={urlOut + "file/" + obj?.readyPDF?.id}
                                type="application/pdf"
                                width="100%"
                                height="1000px"
                              />
                            )
                          }
                        </div>

                        {
                          (obj?.appendixPdfList) && <div className="btn btn-primary w-100 mt-3"
                            onClick={() => setIsShowIlova(!isShowIlova)}>
                            {!isShowIlova ? "Ilovalarni ko'rish" : "Ilovalarni yopish"}
                          </div>
                        }

                        {
                          (obj?.appendixPdfList && isShowIlova) && obj?.appendixPdfList?.map((item) => {
                            return (
                              <div className="borderPdf mt-3">
                                <embed
                                  src={urlOut + "file/" + item?.id}
                                  type="application/pdf"
                                  width="100%"
                                  height="1000px"
                                />
                              </div>
                            )
                          })

                        }
                      </>

                    </div>

                    <div className={`col-lg-6 mx-0 px-0`} style={{ display: full ? "none" : "block", paddingRight: "0" }}>
                      <div className="card-block mt-3">

                        <div className="card-box">
                          <HujjatAylanishYuli obj={obj} />
                        </div>

                        <BiriktirilganFayllar data={obj} />

                        <div className="card-box hujjatCardBox1">
                          <div className="col-lg-12">
                            <div className="card p-2">
                              <div className="imzo">
                                <ul>
                                  <li><strong>Lavozimi:&nbsp;</strong> {data?.workPlaceShortInfo?.positionName}</li>
                                  <li><strong>Imzolangan sana:&nbsp;</strong> {dateFormatGet(data?.signedAt?.slice(0,10))} {data?.signedAt?.slice(11,16)}</li>
                                  <li><strong>To'liq ismi sharifi:&nbsp;</strong>
                                  {data?.workPlaceShortInfo?.lastName} {data?.workPlaceShortInfo?.firstName} {data?.workPlaceShortInfo?.middleName}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div >
              </div >
            </div>
          </div>
        </div >
      </div>
    </>
  )
}