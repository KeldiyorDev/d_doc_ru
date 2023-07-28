import React, { useEffect, useRef, useState } from "react";
import './viloyatlarContent.css';
import HududNavbar from "../../hududNavbar/HududNavbar";
import { axiosInstanceFq } from "../../../../../../config";
import AlertContent, { Alert } from "../../../../../../component/alert/Alert";
import NumericInput from "react-numeric-input";
import DeleteModal from "./deleteModal/DeleteModal";
import UpdateModal from "./updateModal/UpdateModal";

const ViloyatlarContent = ({ currentUser }) => {
  let sortInput = [];
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [data, setData] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const nameref = useRef();

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

  useEffect(() => {
    let load = true;

    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('province/list')

        if (load)
          setData(res?.data?.data);
      } catch (error) {
        console.log(error.response)
      }
    }
    getData()

    return () => {
      load = false;
    }
  }, [currentUser]);

  const changeInputNumber = async (e, id) => {
    if (e.key === "Enter") {
      try {
        await axiosInstanceFq.patch(`province/change_order`, {
          orders: sortInput
        })
        try {
          const res = await axiosInstanceFq.get('province/list')
          sortInput = [];
          setData(res?.data?.data);
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

  const clickEnter = async () => {
    try {
      const res = await axiosInstanceFq.post('province/create', {
        name: nameref.current.value
      })
      Alert(setAlert, 'success', `Информация успешно добавлена`); 
      if (res?.data?.data)
        setData(prev => [...prev, res?.data?.data]);
      nameref.current.value = "";
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, 'warning', `${error.response.data}`);
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Провинции</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <HududNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "10px 20px" }}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group form-group-floating">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline name"
                          placeholder="Placeholder"
                          ref={nameref}
                        />
                        <label className="label-floating">Именование</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <button type="button" style={{ width: "150px", height: "55px" }} className="btn btn-primary" onClick={(e) => clickEnter(e)}>
                      <i className="icon-floppy-disk mr-1"></i> Сохранять
                    </button>
                  </div>
                </div>
                <table
                  className="table table-bordered datatable-select-single table-striped table-hover Tab">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "40%" }}>Именование</th>
                      <th style={{ width: "15%" }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 && data?.map((dat, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <NumericInput
                            value={dat?.orderNumber}
                            onKeyDown={(e) => changeInputNumber(e, dat.id)}
                            onChange={(e) => inputChangeHandler(e, dat.id)}
                            className="adminSozlamaInput"
                          />
                        </td>
                        <td>{dat?.name}</td>
                        <td>
                          <div className="icon d-flex justify-content-center align-items-center">
                            <button type={'button'}
                              onClick={() => setUpdateModal({ open: true, obj: dat })}
                              className="infoBtn bg-dark" data-popup="tooltip"
                              title="O'zgartirish"><i className="icon-pencil5"></i>
                            </button>
                            <button
                              type='button'
                              className="infoBtn bg-dark"
                              data-popup="tooltip"
                              title="O'chirish"
                              onClick={() => setDeleteModal({ open: true, obj: dat })}
                            >
                              <i className="icon-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* update */}
                <UpdateModal
                  updateModal={updateModal}
                  setUpdateModal={setUpdateModal}
                  currentUser={currentUser}
                  data={data}
                  setData={setData}
                  setAlert={setAlert}
                  sortNullishValues={sortNullishValues}
                />

                {/* delete */}
                <DeleteModal
                  deleteModal={deleteModal}
                  currentUser={currentUser}
                  data={data}
                  setData={setData}
                  setAlert={setAlert}
                  setDeleteModal={setDeleteModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* alert */}
      <AlertContent alert={alert} />
    </div>
  )
}

export default React.memo(ViloyatlarContent);