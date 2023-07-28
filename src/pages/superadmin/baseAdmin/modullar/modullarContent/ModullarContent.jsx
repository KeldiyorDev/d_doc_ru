import React, { useEffect, useState } from "react";
import './modullarContent.css';
import BaseAdminModulNavbar from "../../baseAdminModul/baseAdminModulNavbar/BaseAdminModulNavbar";
import { axiosInstance } from "../../../../../config";
import NumericInput from 'react-numeric-input';
import AlertContent, { Alert } from "../../../../../component/alert/Alert"

const ModullarContent = ({ currentUser }) => {
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [openModal, setOpenModal] = useState({ open: false, id: 0 });
  let sortInput = [];

  useEffect(() => {
    let useEffectCount = true;

    const getData = async () => {
      try {
        const res = await axiosInstance.get("module/v2/getAll/");
        console.log(res.data);
        if (useEffectCount)
          setData(res.data);
      } catch (error) {
        Alert(setAlert, "warning", error.response.data)
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser]);


  const accept = async (id) => {
    try {
      const res = await axiosInstance.put(`module/v2/visibleAll/${id}`)
      console.log(res.data);

      let dat = res.data

      let arr = data.filter((d) => {
        if (d.id === id) {
          d.id = dat.id;
          d.isActive = dat.isActive;
          d.name = dat.name;
          d.orderNumber = dat.orderNumber;
          d.active = dat.active;
        }
        return d;
      })
      setData(arr);
      setOpenModal({ open: false, id: 0 });
      Alert(setAlert, "success", "Изменено успешно!")

    } catch (error) {
      Alert(setAlert, "warning", error.response.data)
    }




  }

  useEffect(() => {
    let useEffectCount = true;
    if (useEffectCount)
      document.querySelector('.close2')?.click();

    return () => {
      useEffectCount = false;
    }
  }, [openModal]);

  const changeInputNumber = async (e, id) => {
    if (e.code === "Enter") {
      let result = sortInput.sort((a, b) => a.moduleId - b.moduleId);
      let arr = [];
      for (let i = 1; i < result.length; i++) {
        if (!(result[i - 1].id === result[i].moduleId)) {
          arr.push(result[i - 1]);
        }
      }
      arr.push(result[result.length - 1]);

      let data = arr.filter((item) => item.order !== null)

      console.log();
      try {
        await axiosInstance.put(`module/v2/changeOrder`, {
          dto: data
        })
        const res1 = await axiosInstance.get("module/v2/getAll")
        console.log(res1.data);
        setData(res1.data);
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    sortInput.push({ moduleId: id, order: e });
    console.log({ moduleId: id, order: e }, sortInput);
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Настройки модуля</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <BaseAdminModulNavbar />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "10px 20px" }}>


                <table className="table my-1 table-bordered table-striped table-hover Tab text-center">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "45%" }}>Документ</th>
                      <th style={{ width: "40%" }}>Положение</th>
                      <th style={{ width: "5%" }}>Настройки</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 && data.map((dat, index) => (
                      <tr key={index} style={{ fontSize: "15px" }}>
                        <td className="text-center">
                          <NumericInput
                            value={dat?.orderNumber}
                            onKeyDown={(e) => changeInputNumber(e, dat.id)}
                            onChange={(e) => inputChangeHandler(e, dat.id)}
                            className="adminSozlamaInput"
                          />
                        </td>
                        <td className="text-left">{dat?.name}</td>
                        <td id="context" className="text-center">
                          {dat?.active ? (
                            <p className="text-success">Включено</p>
                          ) : (
                            <p className="text-danger">Выключенный</p>
                          )}
                        </td>
                        <td>
                          <input type="checkbox" checked={dat.active ? true : false}
                            id="kiruvchi" onClick={() => setOpenModal({ open: true, id: dat?.id })}
                            className="checkboxInput cursor-pointer"
                            style={{ width: "100%", height: "25px", padding: "20px" }} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* alert */}
                {openModal.open && (
                  <div className="adminWindow">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h6 className="modal-title">Окно управления модулем</h6>
                          {/* <button type="button" className="close close2" >×</button> */}
                        </div>
                        <div className="modal-body text-center">
                          {/* <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }} className="text-danger">Ogoh bo'ling!</h3> */}
                          <h5 style={{ color: openModal.color }}>Вы хотите изменить эту информацию?</h5>
                        </div>
                        <div className="modal-footer" style={{ justifyContent: "center" }}>
                          <button type="button" className="btn btn-success"
                            style={{ minWidth: "80px" }}
                            onClick={() => accept(openModal.id)}>
                            Да
                          </button>

                          <button type="button" className="btn btn-danger"
                            style={{ minWidth: "80px" }}
                            onClick={() => setOpenModal({ open: false, id: 0 })}>
                            Нет
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* alert */}
                <AlertContent alert={alert} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ModullarContent);