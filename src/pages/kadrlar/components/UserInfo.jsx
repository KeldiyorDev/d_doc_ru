import React from 'react';
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCv, getEmpBook, getRelativeData, getUserById, updateUserInfo } from '../../../redux/reducers/kadr';
import CvPdf from '../cv/cvContent/CvPdf';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import "../kadrlar.css"
import { urlKadr } from '../../../config';
import InputMask from "react-input-mask";
import { axiosInstanceKadr } from "../../../config";
import AlertContent, { Alert } from "../../../component/alert/Alert";

const UserInfo = ({ location }) => {
  const [updateModal, setUpdateModal] = useState(false)
  const [cvModal, setCvModal] = useState(false)
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  const userData = useSelector((state) => state.kadr.userInfo)
  const relativeData = useSelector((state) => state.kadr.relativeData)
  const empBook = useSelector((state) => state.kadr.empBook)
  const cvData = useSelector((state) => state.kadr.cvData)

  console.log(userData);

  const docRef = useRef()
  const dateRef = useRef()

  const dispatch = useDispatch()

  const id = location.pathname?.split('/')[3]
  console.log(id);

  const languagesOption = [
    { value: "0", label: "Uzb" },
    { value: "1", label: "Ru" },
    { value: "2", label: "Eng" },
  ]

  let lan = ""
  cvData?.languages?.forEach((item) => {
    lan = lan + languagesOption[Number(item)].label + " "
  })

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(getEmpBook(id));
      dispatch(getRelativeData(id));
      dispatch(getUserById(id));
      dispatch(getCv(id));
    }

    return () => {
      isMounted = false
    }
  }, [id, dispatch])

  const updateKadrFunc = () => {
    const docData = {
      date: dateRef.current.value.split(".").reverse().join("-"),
      series: docRef.current.value.toUpperCase().split("-").join(""),
    }
    console.log(docData);

    axiosInstanceKadr.post(`auth/getUser`, docData)
      .then(res => {
        const userData = res.data
        userData.id = id

        axiosInstanceKadr.patch(`refresh`, userData)
          .then((res) => {
            Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi");
            setUpdateModal(false)
            dispatch(updateUserInfo(res.data))
          })
          .catch(err => Alert(setAlert, "warning", err.response.data))

      }).catch(err => Alert(setAlert, "warning", err.response.data))

  }

  const keyDown = (e, type) => {
    if (e.key === "Enter" && type === "update") {
      updateKadrFunc();
    }
  }

  return (
    <div className="user-info" style={{ display: "flex", gap: "2rem" }}>
      <div className="px-0" style={{ width: "200px" }}>

        <img src={userData?.avatarPath ? `${urlKadr}file/view/${userData?.id}` : "/assets/user.png"} alt="avatar" width={"200px"} />
      </div>

      <div className="px-0" style={{ minWidth: "calc(100% - 250px)" }}>
        <h3 style={{ margin: "0", fontWeight: "bold", textTransform: "upperCase" }}>{userData?.firstName} {userData?.lastName} {userData?.middleName}</h3>

        <div className="row px-0">
          <div className="col-lg-10 px-0">
            <div className="row mt-2">

              <div className="col-lg-4 col-md-6 px-0">
                <div className="form-group form-group-floating row mb-0 pb-0">
                  <div className="col-md-12 px-0">
                    <div className="position-relative">
                      <p><span className="text-muted" style={{ fontSize: "18px" }}>Pasport raqami</span>: <span style={{ fontWeight: "600", fontSize: "18px" }}>&nbsp;&nbsp;{userData?.document}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 px-0 ">
                <div className="form-group form-group-floating row mb-0 pb-0">
                  <div className="col-md-12 px-0">
                    <div className="position-relative">
                      <p><span className="text-muted" style={{ fontSize: "18px" }}>Tug'ilgan joyi</span>: <span style={{ fontWeight: "600", fontSize: "18px" }}>&nbsp;&nbsp;{userData?.birthPlace}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 px-0 ">
                <div className="form-group form-group-floating row mb-0 pb-0">
                  <div className="col-md-12 px-0">
                    <div className="position-relative">
                      <p><span className="text-muted" style={{ fontSize: "18px" }}>Tug'ilgan sanasi</span>: <span style={{ fontWeight: "600", fontSize: "18px" }}>&nbsp;&nbsp;{userData?.birthDate?.split("-")?.reverse()?.join(".")}</span></p>
                    </div>
                  </div>
                </div>
              </div>


              <div className="col-lg-4 col-md-6 px-0">
                <div className="form-group form-group-floating row mb-0 pb-0">
                  <div className="col-md-12 px-0">
                    <div className="position-relative">
                      <p><span className="text-muted" style={{ fontSize: "18px" }}>JSHR</span>: <span style={{ fontWeight: "600", fontSize: "18px" }}>&nbsp;&nbsp;{userData?.pin}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 px-0">
                <div className="form-group form-group-floating row mb-0 pb-0">
                  <div className="col-md-12 px-0">
                    <div className="position-relative">
                      <p><span className="text-muted" style={{ fontSize: "18px" }}>Berilgan</span>: <span style={{ fontWeight: "600", fontSize: "18px" }}>&nbsp;&nbsp;{userData?.docGivePlace?.split(" ")[0] + " " + userData?.docGivePlace?.split(" ")[1]}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 px-0">
                <div className="form-group form-group-floating row mb-0 pb-0">
                  <div className="col-md-12 px-0">
                    <div className="position-relative">
                      <p><span className="text-muted" style={{ fontSize: "18px" }}>Berilgan sanasi</span>: <span style={{ fontWeight: "600", fontSize: "18px" }}> &nbsp;&nbsp;{userData?.dateBeginDocument?.split("-")?.reverse()?.join(".")}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 px-0 ">
                <div className="form-group form-group-floating row mb-0 pb-0">
                  <div className="col-md-12 px-0">
                    <div className="position-relative">
                      <p><span className="text-muted" style={{ fontSize: "18px" }}>Millati</span>: <span style={{ fontWeight: "600", fontSize: "18px" }}>&nbsp;&nbsp;{userData?.nationality?.split("/")[0]}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 px-0">
                <div className="form-group form-group-floating row mb-0 pb-0">
                  <div className="col-md-12 px-0">
                    <div className="position-relative">
                      <p><span className="text-muted" style={{ fontSize: "18px" }}>Amal qilish muddati</span>: <span style={{ fontWeight: "600", fontSize: "18px" }}>&nbsp;&nbsp;{userData?.dateEndDocument?.split("-")?.reverse()?.join(".")}</span></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 px-0">
                <div className="form-group form-group-floating row mb-0 pb-0">
                  <div className="col-md-12 px-0">
                    <div className="position-relative">
                      <p><span className="text-muted" style={{ fontSize: "18px" }}>Jinsi</span>: <span style={{ fontWeight: "600", fontSize: "18px" }}>&nbsp;&nbsp;{userData?.sex}</span></p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="col-lg-2 mt-2 px-0">
            <div className="col-lg-12 px-0">
              <button onClick={() => setUpdateModal(true)} type="button" className="btn btn-success w-100 py-2">
                <i className="fas fa-refresh mr-1" style={{ fontSize: "18px" }}></i>Yangilash
              </button>
            </div>

            <div className="col-lg-12 px-0">
              {/* <button onClick={() => setCvModal(true)} type="button" className="btn btn-primary mt-3 py-2 w-100">
                <i className="fas fa-download mr-1" style={{ fontSize: "18px" }}></i>CVni yuklab olish
              </button> */}

              <PDFDownloadLink document={<CvPdf userData={userData} cvData={cvData} empBook={empBook} relativeData={relativeData} lan={lan} />} fileName="form">
                {({ loading, error }) => (loading ? 
                <button type="button" className="btn btn-primary">Yuklanmoqda...</button> : 
                <button type="button" className="btn btn-primary mt-3 py-2 w-100">
                  <i className="fas fa-download mr-1" style={{ fontSize: "18px" }}></i>
                  Ma'lumotnomani yuklash</button>)}
              </PDFDownloadLink>
            </div>
          </div>
        </div>

      </div>

      {updateModal && (
        <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Ma'lumotlarni yangilash</h5>
                <button onClick={() => setUpdateModal(false)} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>
              <form>
                <div className="modal-body pb-0 px-2">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-lg-6">
                        <InputMask mask="aa-9999999" style={{ textTransform: "uppercase" }}>
                          {(inputProps) => <div className="form-group form-group-floating mb-0">
                            <div className="position-relative">
                              <input
                                {...inputProps}
                                ref={docRef}
                                type="text"
                                className="form-control form-control-outline"
                                onKeyDown={(e) => keyDown(e, "update")}
                                required
                              />
                              <label
                                className="label-floating kadrInp">Pasport seriasi va raqamini kiriting:</label>
                            </div>
                          </div>}
                        </InputMask>
                      </div>

                      <div className="col-lg-6">
                        <InputMask mask="99.99.9999">
                          {(inputProps) => <div className="form-group form-group-floating mb-0">
                            <div className="position-relative">
                              <input
                                {...inputProps}
                                ref={dateRef}
                                onKeyDown={(e) => keyDown(e, "update")}
                                type="text"
                                className="form-control form-control-outline"
                                required
                              />
                              <label
                                className="label-floating kadrInp">Tug'ilgan kuninggizni kiriting:</label>
                            </div>
                          </div>}
                        </InputMask>
                      </div>
                    </div>

                  </div>

                </div>

                <div className="modal-footer">
                  <button onClick={() => updateKadrFunc()} type="button" className="btn btn-primary py-2">
                    <i class="fa-solid fa-arrows-rotate mr-2"></i>Yangilash</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {
        cvModal && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div style={{ width: "210mm", margin: "0 auto" }}>
            <div className="modal-content" >
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">CV</h5>
                <button onClick={() => setCvModal(false)} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>

              <div className="modal-body pb-0 px-4" style={{ height: '80vh', overflowY: 'scroll', overflowX: "hidden" }}>

                <div>
                  <div className="row px-0">
                    <div className="col-lg-12 px-0 mb-2">
                      <p className='user-bold-p' style={{ textAlign: "center" }}>MA'LUMOTNOMA</p>
                    </div>
                    <div className="col-lg-12 px-0 mb-2">
                      <p className='user-bold-p' style={{ textAlign: "center" }}>{userData.lastName} {userData.firstName} {userData.middleName}</p>
                    </div>

                    <div className="col-lg-9 px-0 mb-2">
                      <p className='user-p'>{empBook.length > 0 && empBook[empBook.length - 1]?.startDate} dan:</p>
                      <p className='user-bold-p'> {empBook.length > 0 && empBook[empBook.length - 1]?.companyName}</p>
                    </div>


                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Tug'ilgan yili: </p>
                      <p className='user-p'>{userData?.birthDate.split("-").join(".")}</p>
                    </div>

                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Tug'ilgan joyi: </p>
                      <p className='user-p'>{userData?.birthPlace}</p>
                    </div>


                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Millati: </p>
                      <p className='user-p'>{userData?.nationality.split("/")[0]}</p>
                    </div>

                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Partiyaviyligi: </p>
                      <p className='user-p'>{cvData?.party || "yo'q"}</p>
                    </div>


                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Ma'lumoti: </p>
                      <p className='user-p'>{cvData?.higherEducation || "yo'q"}</p>
                    </div>

                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Tamomlagan: </p>
                      <p className='user-p'>{cvData?.graduated || "yo'q"}</p>
                    </div>


                    <div className="col-lg-12 px-0 mb-2">
                      <span className='user-bold-p'> Ma'lumoti bo'yicha mutaxasisligi: </span>
                      <span className='user-p'>{cvData?.profession || "yo'q"}</span>
                    </div>


                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Ilmiy darajasi: </p>
                      <p className='user-p'>{cvData?.academicDegree || "yo'q"}</p>
                    </div>

                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Ilmiy unvoni: </p>
                      <p className='user-p'>{cvData?.academicTitle || "yo'q"}</p>
                    </div>


                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Qaysi chet tillarini biladi: </p>
                      <p className='user-p'>{lan || "yo'q"}</p>
                    </div>

                    <div className="col-lg-6 px-0 mb-2">
                      <p className='user-bold-p'> Harbiy (maxsus) unvoni: </p>
                      <p className='user-p'>{cvData?.militaryRank || "yo'q"}</p>
                    </div>

                    <div className="col-lg-12 px-0 mb-2">
                      <p className='user-bold-p'> Davlat mukofotlari bilan taqdirlanganmi (qanaqa): </p>
                      <p className='user-p'>{cvData?.stateAward || "yo'q"}</p>
                    </div>

                    <div className="col-lg-12 px-0 mb-2">
                      <p className='user-bold-p'> Xalq deputatlari respublika, viloyat, shahar va tuman kengashi deputatimi yoki boshqa saylanadigan organlarning a'zosimi (to'liq ko'rsatilishi lozim): </p>
                      <p className='user-p'>{cvData?.deputy || "yo'q"}</p>
                    </div>

                    {/* mehnat faoliyati */}
                    <div className='emp col-lg-12 px-0'>
                      {
                        empBook.length > 0 && (
                          <>
                            <p className='user-bold-p' style={{ textTransform: "uppercase", textAlign: "center" }}>
                              Mehnat faoliyati
                            </p>

                            <div className="d-flex mb-3" style={{ gap: "1rem" }}>
                              <ul style={{ listStyle: "none", minWidth: "150px" }}>

                                {
                                  empBook?.map((item) => {
                                    return (
                                      <li>
                                        <p className='user-p'><span className='user-bold-p'> {item.startDate}-{item.endDate === "-1" ? "h.v" : item.endDate + " yy."} </span> - {item.companyName}</p>
                                      </li>
                                    )
                                  })
                                }
                              </ul>
                            </div>

                          </>
                        )
                      }
                    </div>

                    <div style={{ width: "150px", height: "200px", position: "absolute", right: "30px", top: "50px" }}>
                      <img src={userData?.avatarPath ? `${urlKadr}file/view/${userData?.id}` : "/assets/user.png"} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt="avatar" />
                    </div>

                    <div className="qarindosh">
                      {
                        relativeData.length > 0 && (
                          <>
                            <p className='user-bold-p' style={{ textAlign: "center", marginBottom: "1rem" }}>
                              {userData.lastName} {userData.firstName} {userData.middleName} ning yaqin qarindoshlari haqida MA'LUMOT
                            </p>

                            <table id="myTable" className="table table-bordered mb-3 table-striped table-hover Tab">
                              <thead>
                                <tr className="bg-dark text-white NavLink text-center">
                                  <th id='tabRow' style={{ width: "5%" }}>№</th>
                                  <th style={{ width: "10%" }}>Qarindoshligi</th>
                                  <th style={{ width: "20%" }}>Familiyasi, ismi, otasining ismi</th>
                                  <th style={{ width: "20%" }}>Tug'ilgan sanasi va joyi</th>
                                  <th style={{ width: "25%" }}>Ish joyi va lavozimi</th>
                                  <th style={{ width: "20%" }}>Yashash joyi</th>
                                </tr>
                              </thead>
                              <tbody>

                                {
                                  relativeData.length > 0 && relativeData?.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{item.kinship}</td>
                                        <td className={'text-center'}>{item.lastName} {item.firstName} {item.middleName}</td>
                                        <td className="text-center"> {item.birthDate} <br /> {item.birthPlace} </td>
                                        <td className="text-center"> {item.workplace} </td>
                                        <td className="text-center"> {item.locus}</td>
                                      </tr>
                                    )
                                  })
                                }

                              </tbody>
                            </table>
                          </>
                        )
                      }
                    </div>

                  </div>
                </div>

                <div className="modal-footer">
                  <PDFDownloadLink document={<CvPdf userData={userData} cvData={cvData} empBook={empBook} relativeData={relativeData} lan={lan} />} fileName="form">
                    {({ loading, error }) => (loading ? <button type="button" className="btn btn-primary">Yuklanmoqda...</button> : <button type="button" className="btn btn-primary">CVni yuklash</button>)}
                  </PDFDownloadLink>

                </div>

              </div>
            </div >
          </div >
        </div>
      }


      {/* alert */}
      <AlertContent alert={alert} />

    </div >
  );
}

export default React.memo(UserInfo);
