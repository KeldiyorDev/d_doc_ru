import React, { useState } from "react";
import { axiosInstanceFq } from "../../../../../config";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const AllData = ({ currentUser, setAlert, sectorlar, viloyatData, notParentsCard1, notParentsCard2, notParentsCard3, notParentsCardClick1 }) => {
  const [tumanlar, setTumanlar] = useState([]);
  const [mahallalar, setMahallalar] = useState([]);
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });

  const getTumanlar = async (id) => {
    if (!(tumanlar.length > 0)) {
      try {
        const res = await axiosInstanceFq.get(`district/list/${id}`)
        setTumanlar(res.data.data);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      setTumanlar([]);
    }
  }

  const getTashBoshTashkilot = async (code, id) => {
    try {
      const res = await axiosInstanceFq.get(`neighborhood/listBySector/${id}/${code}`)
      setMahallalar(res.data.data);
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div id="accordion-default">
      {/* yunalishlar */}
      {viloyatData?.map((dat, index1) => (
        <div key={index1} className="d-flex align-items-center" style={{ position: "relative" }}>
          <div className="card cardAccordion mb-2 w-100">
            <div className={'d-flex align-items-center justify-content-between pr-2'}>
              <div className={'d-flex align-items-center'}>
                <div className="card-header orgname" style={{ height: "40px" }} onClick={() => getTumanlar(dat?.id)}>
                  <h6 className="card-title d-flex justify-content-between align-items-center">
                    <a className="text-body NavLink " style={{ color: "#0056B8 !important" }} href={`#1`}>{dat?.name}</a>
                  </h6>
                </div>
              </div>
            </div>

            <div className="openTash">
              {tumanlar?.length > 0 && tumanlar?.map((tash, index) => (
                tash?.provinceId === dat?.id && (
                  <div key={index}>
                    <div className="card-body pb-1 pt-0">
                      <div className="card mb-1">
                        <div className="card-header d-flex align-items-center">
                          <h6 className="card-title">
                            <a className="collapsed text-body NavLink ml-2 openInT"
                              data-toggle="collapse"
                              href={`#vHokimlik${index}`}>{tash?.name}</a>
                          </h6>
                        </div>

                        <div id={`vHokimlik${index}`} className="card-body collapse pb-0" data-parent={`#accordion-default`}>
                          <div className="accordion" id="accordionExample">
                            {sectorlar?.map((sec, index1) => (
                              <div key={index1}>
                                <div className="card mb-2">
                                  <div className="card-header" id={`heading${index}${index1}${sec?.id}${tash?.id}`}>
                                    <h2 className="mb-0">
                                      <button
                                        className="btn btn-link btn-block text-left putBtn p-0"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target={`#collapse1${index}${index1}${sec?.id}${tash?.id}`}
                                        aria-expanded="true"
                                        aria-controls={`collapse1${index}${index1}${sec?.id}${tash?.id}`}
                                        onClick={() => getTashBoshTashkilot(sec.code, tash.id)}>
                                        {sec?.name}
                                      </button>
                                    </h2>
                                  </div>

                                  <div id={`collapse1${index}${index1}${sec?.id}${tash?.id}`} className="collapse" aria-labelledby={`heading${index}${index1}${sec?.id}${tash?.id}`} data-parent="#accordionExample">
                                    {mahallalar?.length > 0 &&
                                      <div className="card-body">
                                        <table className="table datatable-row-full table-bordered table-striped table-hover Tab" id="myTable">
                                          <thead>
                                            <tr className="bg-dark text-white NavLink text-center">
                                              <th style={{ width: "3%" }}>№</th>
                                              <th style={{ width: "15%" }}>Махалля</th>
                                              <th style={{ width: "20%" }}>Район 
                                              (Город) 
                                              </th>
                                              <th style={{ width: "25%" }}>Провинция
                                              </th>
                                              <th style={{ width: "25%" }}>Сектор</th>
                                              <td style={{ width: "8%" }}>Действия</td>
                                            </tr>
                                          </thead>
                                          <tbody id="viloyat">
                                            {mahallalar?.map((dat, index) => (
                                              dat.district?.id === tash?.id &&
                                              <tr key={index} className="text-center">
                                                <td>{index + 1}</td>
                                                <td>{dat?.name}</td>
                                                <td>{dat?.district?.name}</td>
                                                <td>{dat?.district?.province?.name}</td>
                                                <td>{dat?.sector?.name}</td>
                                                <td>
                                                  <div className="icon d-flex justify-content-center align-items-center">
                                                    <button type={'button'} onClick={() => setUpdateModal({ open: true, obj: dat })} className="infoBtn bg-dark" data-popup="tooltip"
                                                      title="O'zgartirish"
                                                    >
                                                      <i className="icon-pencil5"></i>
                                                    </button>
                                                    <button type="button" className="infoBtn bg-dark" onClick={() => setDeleteModal({ open: true, obj: dat })}>
                                                      <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                  </div>
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    }
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>

            {/* update */}
            {updateModal.open && (
              <UpdateModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                setMahallalar={setMahallalar}
                currentUser={currentUser}
                setAlert={setAlert}
                mahallalar={mahallalar}
                notParentsCard1={notParentsCard1}
                notParentsCard2={notParentsCard2}
                notParentsCard3={notParentsCard3}
                notParentsCardClick1={notParentsCardClick1}
              />
            )}

            {/* delete */}
            {deleteModal.open && (
              <DeleteModal
                deleteModal={deleteModal}
                setDeleteModal={setDeleteModal}
                setMahallalar={setMahallalar}
                currentUser={currentUser}
                setAlert={setAlert}
                mahallalar={mahallalar}
              />
            )}
          </div>
        </div>
      ))}
    </div >
  )
}

export default React.memo(AllData);