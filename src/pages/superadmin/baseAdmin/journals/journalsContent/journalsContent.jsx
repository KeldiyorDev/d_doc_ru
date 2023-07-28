import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import AlertContent, { Alert } from "../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../config";
import HududNavbar from "../../hudud/hududNavbar/HududNavbar";
import DeleteModal from "./deleteModal/DeleteModal";
import UpdateModal from "./updateModal/UpdateModal";

const JournalsContent = ({ currentUser }) => {
  const [notParentsCard1, setNotParentsCard1] = useState([]);
  const [notParentsCard2, setNotParentsCard2] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [tumanlar, setTumanlar] = useState([]);
  const [mahallalar, setMahallalar] = useState([]);
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [tasnif3, setTasnif3] = useState([]);
  const desc1ref = useRef();
  const desc2ref = useRef();
  const desc3ref = useRef();

  // barcha ma'lumotlarni o'qib olish
  useEffect(() => {
    let load = true;

    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('ac_1/list')
        let arr = [];
        res.data.data.forEach((item) => {
          arr.push({ value: item.id, label: item.name });
        })

        if (load) {
          setMahallalar(res.data.data);
          setNotParentsCard1(arr);
        }
      } catch (error) {
        console.log(error.response)
      }
    }
    getData()

    return () => {
      load = false;
    }
  }, [currentUser]);

  const notParentsCardClick1 = (e) => {
    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get(`ac_2/list/${e.value}`)
        let arr = [];
        res.data.data.forEach((item) => {
          arr.push({ value: item.id, label: item.name });
        })
        setNotParentsCard2(arr);
      } catch (error) {
        console.log(error.response)
      }
    }
    getData()
  }

  //data ni yaratish
  const saveData = async () => {
    let Tasnif1 = desc1ref.current?.props?.value;
    let Tasnif2 = desc2ref.current?.props?.value;
    let Tasnif3 = desc3ref.current?.value;

    if (Tasnif1) {
      if (Tasnif2) {
        if (Tasnif3?.length > 0) {
          try {
            const res = await axiosInstanceFq.post('ac_3/create', {
              name: Tasnif3,
              ac2Id: Tasnif2 ? Tasnif2.value : null,
            })
            setTasnif3(prev => [...prev, res.data.data]);
            Alert(setAlert, "success", "Информация успешно добавлена");
          } catch (error) {
            console.log(error.response)
          }
          desc1ref.current?.props?.value && desc1ref.current.removeValue(desc1ref.current.props.value);
          desc2ref.current?.props?.value && desc2ref.current.removeValue(desc2ref.current.props.value);
          desc3ref.current.value = "";
        } else {
          Alert(setAlert, "warning", "Класс 3 не включен");
        }
      } else {
        Alert(setAlert, "warning", "Класс 2 не включен");
      }
    } else {
      Alert(setAlert, "warning", "Класс 1 не включен");
    }
  }

  // tumanlarni o'qib olish
  const getTumanlar = async (id) => {
    if (!(tumanlar.length > 0)) {
      try {
        const res = await axiosInstanceFq.get(`ac_2/list/` + id)
        setTumanlar(res.data.data);
      } catch (error) {
        console.log(error.response)
      }
    } else {
      setTumanlar([]);
    }
  }

  // barcha tasnif3 larni o'qib olish
  const openTasnif3 = async (id) => {
    if (!(tasnif3.length > 0)) {
      const res = await axiosInstanceFq("ac_3/list/" + id)
      setTasnif3(res.data.data);
    } else {
      setTasnif3([]);
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Классификация3</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <HududNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "10px 20px", paddingBottom: "5px" }}>
                <form>
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="form-group text-left">
                        <Select
                          options={notParentsCard1}
                          onChange={notParentsCardClick1}
                          placeholder="Классификация1"
                          className="cardTypeId"
                          isClearable={true}
                          ref={desc1ref}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group text-left">
                        <Select
                          options={notParentsCard2}
                          placeholder="Классификация2"
                          className="cardTypeId"
                          isClearable={true}
                          ref={desc2ref}
                        />
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group text-left">
                        <div className="position-relative">
                          <input
                            type="text"
                            style={{ height: '56px' }}
                            className="form-control form-control-outline Tasnif3"
                            placeholder="Классификация1"
                            ref={desc3ref}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <button type="button" className="btn btn-primary" style={{ padding: "1rem" }} onClick={saveData}>
                        <i className="icon-floppy-disk mr-1"></i> Сохранять
                      </button>
                    </div>
                  </div>
                </form>

                <div id="accordion-default">
                  {/* yunalishlar */}
                  {mahallalar?.map((dat, index1) => (
                    <div key={index1} className="d-flex align-items-center pb-2" style={{ position: "relative" }}>
                      <div className="card cardAccordion mb-0 w-100">
                        <div className={'d-flex align-items-center justify-content-between pr-2'}>
                          <div className={'d-flex align-items-center'}>
                            <div className="card-header orgname" style={{ height: "40px" }}
                              onClick={() => getTumanlar(dat?.id)}>
                              <h6 className="card-title d-flex justify-content-between align-items-center">
                                <a className="text-body NavLink " style={{ color: "#0056B8 !important" }} href={`#1`}>{dat?.name}</a>
                              </h6>
                            </div>
                          </div>
                        </div>

                        <div className="openTash">
                          {tumanlar.length > 0 && tumanlar?.map((tash, index) => (
                            tash?.ac1Id === dat?.id && (
                              <div key={index}>
                                <div>
                                  <div className="card-body pb-1 pt-0">
                                    <div className="card mb-1">
                                      <div className="card-header d-flex align-items-center py-1">
                                        <h5 className="card-title" onClick={() => openTasnif3(tash.id)}>
                                          <a className="text-body NavLink " style={{ color: "#0056B8 !important", fontSize: "15px" }} href={`#1`}>{tash?.name}</a>
                                        </h5>
                                      </div>

                                      {tasnif3.length > 0 && (
                                        <div className="card-body pb-0">
                                          <div className="accordion" id="accordionExample">
                                            {tasnif3?.map((tas, index1) => (
                                              tas?.ac2Id === tash?.id &&
                                              <div key={index1}>
                                                <div className="card mb-2">
                                                  <div className="card-header d-flex align-items-center justify-content-between py-1">
                                                    <h5 className="mb-0  d-flex align-items-center">
                                                      <i className="fas fa-pen mr-2 cursor-pointer updateYunalishcon"
                                                        style={{
                                                          fontSize: "15px"
                                                        }}
                                                        title="O'zgartirish"
                                                        onClick={() => setUpdateModal({ open: true, obj: tas })}
                                                      ></i>
                                                      {tas?.name}
                                                    </h5>
                                                    <i
                                                      className="fa-solid fa-trash-can cursor-pointer"
                                                      title="O'chirish"
                                                      style={{ fontSize: "18px" }}
                                                      onClick={() => setDeleteModal({
                                                        open: true,
                                                        obj: tas
                                                      })}
                                                    ></i>
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )
                          ))}
                        </div>

                        {/* update tasnif3 */}
                        <UpdateModal
                          updateModal={updateModal}
                          setUpdateModal={setUpdateModal}
                          currentUser={currentUser}
                          tasnif3={tasnif3}
                          setTasnif3={setTasnif3}
                          setAlert={setAlert}
                        />

                        {/* delete tasnif3 */}
                        <DeleteModal
                          deleteModal={deleteModal}
                          setDeleteModal={setDeleteModal}
                          currentUser={currentUser}
                          tasnif3={tasnif3}
                          setTasnif3={setTasnif3}
                          setAlert={setAlert}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* alert */}
          <AlertContent alert={alert} />

        </div>
      </div>
    </div>
  )
}

export default React.memo(JournalsContent);