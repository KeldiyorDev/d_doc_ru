import React, { useEffect, useRef, useState } from "react";
import { axiosInstanceFq } from "../../../../../../config";
import Select from "react-select";
import NumericInput from "react-numeric-input";
import AlertContent, { Alert } from "../../../../../../component/alert/Alert";
import HududNavbar from "../../../hudud/hududNavbar/HududNavbar";
import UpdateModal from "./updateModal/UpdateModal";
import UpdateYunalish from "./updateYunalish/UpdateYunalish";
import DeleteModal from "./deletModal/DeleteModal";

const Tasnif2Content = ({ currentUser }) => {
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [data, setData] = useState([]);
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [updateYunalish, setUpdateYunalish] = useState({ open: false, obj: {} });
  const [tumanlar, setTumanlar] = useState([]);
  const [mahallalar, setMahallalar] = useState([]);
  let sortInput = [];
  const desc1ref = useRef();
  const desc2ref = useRef();

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

  // barcha tasnif1 larni o'qib olish
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
        const res = await axiosInstanceFq.get('ac_2/list')
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


  //data ni saqlash
  const saveData = async () => {
    let nomi = desc2ref.current.value;
    let tasnif1Select = desc1ref.current?.props?.value;

    if (tasnif1Select) {
      if (nomi !== "") {
        try {
          const res = await axiosInstanceFq.post('ac_2/create', {
            name: nomi,
            ac1Id: tasnif1Select ? tasnif1Select.value : null //id
          })
          Alert(setAlert, 'success', `Информация успешно добавлена`);
          setTumanlar(prev => [...prev, res.data.data]);
          setData(prev => [...prev, res.data.data]);
        } catch (error) {
          console.log(error?.response);
          Alert(setAlert, 'warning', `${error?.response?.data?.error?.message}`);
        }
        document.querySelector('.nomi').value = '';
      } else {
        Alert(setAlert, 'warning', `Класс 2 не включен`);
      }
    } else {
      Alert(setAlert, 'warning', `Классификация 1 не выбрана`);
    }
  }

  const changeInputNumber = async (e, id) => {
    if (e.key === "Enter") {
      try {
        await axiosInstanceFq.patch(`ac_2/change_order`, {
          orders: sortInput
        })
        try {
          const res = await axiosInstanceFq.get('ac_2/list')
          sortNullishValues(res.data.data);
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

  const getTumanlar = async (id) => {
    if (!(tumanlar.length > 0)) {
      try {
        const res = await axiosInstanceFq.get(`ac_2/list/${id}`)
        setTumanlar(res.data.data);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      setTumanlar([]);
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Классификация2</h3>
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
                    <div className="col-lg-4">
                      <div className="form-group">
                        <Select
                          options={notParentsCard}
                          placeholder="Tasnif1"
                          className="tasnif1Select"
                          isClearable={true}
                          ref={desc1ref}
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input type="text"
                              className="form-control form-control-outline nomi"
                              placeholder="Placeholder"
                              ref={desc2ref}
                            />
                            <label className="label-floating">Классификация </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <button type="button" style={{ width: "150px", height: "55px" }} onClick={saveData} className="btn btn-primary">
                        <i className="icon-floppy-disk mr-1"></i> Сохранять
                      </button>
                    </div>
                  </div>
                </form>

                <div id={`accordion-styled`}>
                  <div id="accordion-default">
                    {/* yunalishlar */}
                    {mahallalar?.map((dat, index1) => (
                      <div key={index1} className="d-flex align-items-center pb-2" style={{ position: "relative" }}>
                        <div className="card cardAccordion mb-0 w-100">
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
                            {tumanlar.length > 0 && tumanlar?.map((tash, index) => (
                              tash?.ac1Id === dat?.id && (
                                <div key={index}>
                                  <div>
                                    <div className="card-body pb-1 pt-0">
                                      <div className="card mb-1">
                                        <i className="fas fa-pen cursor-pointer mr-2 ml-2"
                                          style={{
                                            fontSize: "18px",
                                            position: "absolute",
                                            top: "10px",
                                            left: "-5px"
                                          }}
                                          onClick={() => setUpdateYunalish({ open: true, obj: tash })}
                                        ></i>
                                        <div className="ml-2 card-header d-flex align-items-center justify-content-between py-0">
                                          <div className="card-header d-flex align-items-center">
                                            <NumericInput
                                              value={tash?.orderNumber}
                                              onKeyDown={(e) => changeInputNumber(e, tash.id)}
                                              onChange={(e) => inputChangeHandler(e, tash.id)}
                                              className="adminSozlamaInput"
                                            />
                                            <h6 className="card-title" >
                                              <a className="collapsed text-body NavLink ml-2 openInT" data-toggle="collapse" href={`#vHokimlik${index}`}>{tash?.name}</a>
                                            </h6>
                                          </div>
                                          <i className="fa-solid fa-trash-can" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => setDeleteModal({ open: true, obj: tash })}></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            ))
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* delete */}
                <DeleteModal
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  currentUser={currentUser}
                  setAlert={setAlert}
                  setTumanlar={setTumanlar}
                  tumanlar={tumanlar}
                />

                {/* update */}
                <UpdateModal
                  updateModal={updateModal}
                  setUpdateModal={setUpdateModal}
                  currentUser={currentUser}
                  setData={setData}
                  data={data}
                  setAlert={setAlert}
                  sortNullishValue={sortNullishValues}
                  notParentsCard={notParentsCard}
                />

                {/* update yo'nalish */}
                <UpdateYunalish
                  updateYunalish={updateYunalish}
                  setUpdateYunalish={setUpdateYunalish}
                  currentUser={currentUser}
                  tumanlar={tumanlar}
                  setAlert={setAlert}
                  sortNullishValues={sortNullishValues}
                  setTumanlar={setTumanlar}
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
export default React.memo(Tasnif2Content);