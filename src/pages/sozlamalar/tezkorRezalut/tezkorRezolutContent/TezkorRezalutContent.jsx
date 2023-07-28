import React, { useEffect, useState } from "react";
import ContentNavbarSozlamalar from "../../contentNavbarSozlamalar/ContentNavbarSozlamalar";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import { axiosInstance } from "../../../../config";
import NumericInput from 'react-numeric-input';
import DeleteModal from "./deleteModal/DeleteModal";
import UpdateModal from "./updateModal/UpdateModal";

const TezkorRezalutContent = ({ currentUser }) => {
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [data, setData] = useState([]);
  let sortInput = [];

  // barcha malumotlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    try {
      const getData = async () => {
        const res = await axiosInstance.get("fastResolution/orgAll/" + JSON.parse(localStorage.getItem('oi')))

        if (isMounted)
          setData(res.data);
      }
      getData();
    } catch (error) {
      console.log(error.response);
    }

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // malumot qo'shish
  const qushish = async () => {
    let nomlanishi = document.querySelector('.nomlanishi').value;

    if (nomlanishi.length !== 0) {
      // to do server
      try {
        const res = await axiosInstance.post("fastResolution", {
          name: nomlanishi,
          orgId: JSON.parse(localStorage.getItem('oi'))
        })
        Alert(setAlert, "success", "Информация успешно добавлена");
        document.querySelector('.nomlanishi').value = "";
        setData(prev => [...prev, res.data]);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      Alert(setAlert, "warning", "Не введено название организации");
    }
  }

  const enter = (e) => {
    if (e.code === "Enter") {
      qushish();
    }
  }

  const changeInputNumber = async (e, id) => {
    if (e.code === "Enter") {
      let result = sortInput.sort((a, b) => a.id - b.id);
      let arr = [];
      for (let i = 1; i < result.length; i++) {
        if (!(result[i - 1].id === result[i].id)) {
          arr.push(result[i - 1]);
        }
      }
      arr.push(result[result.length - 1]);
      try {
        await axiosInstance.patch(`fastResolution/orderNumber`, {
          orderNumberDtos: arr
        })
        try {
          const res1 = await axiosInstance.get("fastResolution/orgAll/" + JSON.parse(localStorage.getItem('oi')))
          setData(res1.data);
        } catch (error) {
          console.log(error.response);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    sortInput.push({ id: id, orderNumber: e });
  }

  return (
    <div className="content content-mobile mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Быстрое разрешение</h3>
      <div className="card-body-mobile">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <ContentNavbarSozlamalar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "20px" }}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline nomlanishi"
                            placeholder="Placeholder"
                            onKeyDown={(e) => enter(e)}
                          />
                          <label className="label-floating">Именование</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group form-group-floating row mb-0">
                      <div className="col-lg-5">
                        <div className="position-relative">
                          <button type="button" onClick={qushish} className="btn btn-primary form-control form-control-outline">Добавлять</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="table table-bordered mt-3 table-striped table-hover Tab" >
                  <thead>
                    <tr className="bg-dark text-white NavLink text-left">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "90%" }}>Именование</th>
                      <th style={{ width: "5%" }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 && data.map((dat, index) => (
                      <tr key={index} style={{ fontSize: "14px", textAlign: "left" }}>
                        <td className="text-center">
                          <NumericInput
                            value={dat?.orderNumber}
                            onKeyDown={(e) => changeInputNumber(e, dat.id)}
                            onChange={(e) => inputChangeHandler(e, dat.id)}
                            className="adminSozlamaInput"
                          />
                        </td>
                        <td >{dat?.name}</td>
                        <td className="text-center d-flex">
                          <a href="#1" className="infoBtn bg-dark cursor-pointer" onClick={() => setUpdateModal({ open: true, obj: dat })} data-popup="tooltip" title="O'zgartirish"><i className="icon-pencil5" ></i> </a>
                          <a href="#1" className="infoBtn bg-dark cursor-pointer" onClick={() => setDeleteModal({ open: true, obj: dat })} data-popup="tooltip" title="O'chirish"><i className="icon-trash"></i> </a>
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
                />

                {/* delete */}
                <DeleteModal
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  currentUser={currentUser}
                  data={data}
                  setData={setData}
                />

                {/* alert */}
                <AlertContent alert={alert} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default React.memo(TezkorRezalutContent);