import React, { useEffect, useState } from "react";
import './shaharTumanContent.css';
import HududNavbar from "../../hududNavbar/HududNavbar";
import { axiosInstanceFq } from "../../../../../../config";
import NumericInput from "react-numeric-input";
import AlertContent from "../../../../../../component/alert/Alert";
import UpdateYunalish from "./updateYunalish/UpdateYunalish";
import UpdateModal from "./updateModal/UpdateModal";
import DeleteModal from "./deleteModal/DeleteModal";
import SaveData from "./saveData/SaveData";

const ShahartumanContent = ({ currentUser }) => {
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [deleteModal, setDeleteModal] = useState({ delete: false, obj: {} });
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [data, setData] = useState([]);
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [updateYunalish, setUpdateYunalish] = useState({ open: false, obj: {}, provinceId: null });
  const [tumanlar, setTumanlar] = useState([]);
  const [mahallalar, setMahallalar] = useState([]);
  let sortInput = []

  const sortNullishValues = (arr = []) => {
    const assignValue = val => {
      if (val === null) {
        return Infinity;
      } else {
        return val;
      }
    }
    const sorter = (a, b) => {
      return assignValue(a.orderNumber) - assignValue(b.orderNumber);
    };
    arr.sort(sorter);
  }

  //viloyat oqib olish
  useEffect(() => {
    let load = true;

    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('province/list')
        let arr = [];
        res.data.data.forEach((item) => {
          arr.push({ value: item.id, label: item.name });
        })

        if (load) {
          setMahallalar(res.data.data)
          setNotParentsCard(arr);
        }
      } catch (error) {
        console.log(error.response)
      }
    }
    getData()

    return () => {
      load = false;
    }
  }, [currentUser])

  useEffect(() => {
    let load = true;

    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('district/list')

        if (load)
          setData(res.data.data);
      } catch (error) {
        console.log(error.response)
      }
    }
    getData();

    return () => {
      load = false;
    }
  }, [currentUser])

  const getTumanlar = async (id) => {
    if (!(tumanlar.length > 0)) {
      try {
        const res = await axiosInstanceFq.get(`district/list/${id}`)
        setTumanlar(res.data.data);
      } catch (error) {
        console.log(error.response)
      }
    } else {
      setTumanlar([]);
    }
  }

  const changeInputNumber = async (e, id) => {
    if (e.key === "Enter") {
      try {
        await axiosInstanceFq.patch(`district/change_order`, {
          orders: sortInput
        })
        try {
          const res = await axiosInstanceFq.get(`district/list/${id}`)
          sortNullishValues(res.data.data)
          setTumanlar(res.data.data);
        } catch (error) {
          console.log(error.response)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    if (sortInput.find((d) => d.id === id)) {
      if (e) {
        sortInput = sortInput.filter((d) => {
          if (d.id === id) {
            d.id = id;
            d.order = e;
          }
          return d;
        })
      }
    } else {
      sortInput.push({ id: id, order: e });
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Города и районы</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <HududNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "10px 20px", paddingBottom: "0" }}>
                {/* save data */}
                <SaveData
                  currentUser={currentUser}
                  setAlert={setAlert}
                  setData={setData}
                  setNotParentsCard={setNotParentsCard}
                  notParentsCard={notParentsCard}
                />

                <div id={`accordion-styled`}>
                  <div id="accordion-default">
                    {/* yunalishlar */}
                    {mahallalar?.map((dat, index1) => (
                      <div key={index1} className="d-flex align-items-center" style={{ position: "relative" }}>
                        <div className="card mb-2 w-100">{/*cardAccordion -> className*/}
                          <div className={'d-flex align-items-center justify-content-between pr-2'}>
                            <div className={'d-flex align-items-center pl-0'}>
                              <div className="card-header orgname" style={{ height: "40px" }} onClick={() => getTumanlar(dat?.id)}>
                                <h6 className="card-title d-flex justify-content-between align-items-center">
                                  <a className="text-body NavLink " style={{ color: "#0056B8 !important" }} href={`#1`}>{dat?.name}</a>
                                </h6>
                              </div>
                            </div>
                          </div>
                          <div className="openTash">
                            {tumanlar.length > 0 && tumanlar?.map((tash, index) => (
                              tash?.provinceId === dat?.id && (
                                <div key={index}>
                                  <div>
                                    <div className="card-body pb-1 pt-0">
                                      <div className="card mb-1">
                                        <i className="fas fa-pen cursor-pointer mr-2 ml-1 updateYunalishcon"
                                          style={{ fontSize: "18px", position: "absolute", top: "7px", left: "0", padding: "5px" }}
                                          onClick={() => setUpdateYunalish({ open: true, obj: tash, provinceId: dat.id })}
                                        ></i>
                                        <div className="ml-3 card-header d-flex align-items-center justify-content-between py-0">
                                          <div className="card-header d-flex align-items-center">
                                            <NumericInput
                                              value={tash?.orderNumber}
                                              onKeyDown={(e) => changeInputNumber(e, dat?.id)}
                                              onChange={(e) => inputChangeHandler(e, tash.id)}
                                              className="adminSozlamaInput"
                                            />
                                            <h6 className="card-title">
                                              <a className="collapsed text-body NavLink ml-2 openInT"
                                                data-toggle="collapse"
                                                href={`#vHokimlik${index}`}>{tash?.name}
                                              </a>
                                            </h6>
                                          </div>
                                          <i className="fa-solid fa-trash-can"
                                            style={{ cursor: 'pointer', fontSize: '20px' }}
                                            onClick={() => setDeleteModal({ delete: true, obj: tash })}
                                          ></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* update */}
                <UpdateModal
                  updateModal={updateModal}
                  setUpdateModal={setUpdateModal}
                  currentUser={currentUser}
                  setAlert={setAlert}
                  data={data}
                  setData={setData}
                  sortNullishValues={sortNullishValues}
                  notParentsCard={notParentsCard}
                />

                {/* delete */}
                <DeleteModal
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  currentUser={currentUser}
                  tumanlar={tumanlar}
                  setAlert={setAlert}
                  setTumanlar={setTumanlar}
                />

                {/* update yo'nalish */}
                <UpdateYunalish
                  updateYunalish={updateYunalish}
                  setUpdateYunalish={setUpdateYunalish}
                  currentUser={currentUser}
                  tumanlar={tumanlar}
                  setTumanlar={setTumanlar}
                  setAlert={setAlert}
                  sortNullishValues={sortNullishValues}
                />
              </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ShahartumanContent)