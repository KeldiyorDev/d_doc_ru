import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../../../../../config";
import TashkilotKurishNavbar from "../../tashkilotKurishNavbar/TashkilotKurishNavbar";
import './modulSozlamaContent.css';
// import ReactPaginate from "react-paginate";
import NumericInput from 'react-numeric-input';
import AlertContent, { Alert } from "../../../../../../../component/alert/Alert";

const ModulSozlamaContent = ({ currentUser }) => {
  const [data, setData] = useState([]);
  // const [selected, setSelected] = useState(0);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [openModal, setOpenModal] = useState({ open: false, id: 0 });

  const { id } = useParams();
  console.log(id);
  // barcha modullarni o'qib olish
  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`module/v2/getAll/${id}`)
        console.log(res.data);
        if (useEffectCount)
          setData(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser, id]);

  const accept = async (modulId) => {
    console.log(modulId, id);

    try {
      const res = await axiosInstance.put(`module/v2/visible`, {
        orgId: id,
        moduleId: modulId
      })
      console.log(res.data);

      let arr = data.filter((d) => {
        if (d.id === modulId) {
          d.visible = !d.visible;
        }
        return d;
      })
      setData(arr);
      setOpenModal({ open: false, id: 0 });
      Alert(setAlert, "success", "Информация успешно изменена!")

    } catch (error) {
      Alert(setAlert, "warning", error.response.data)
    }
  }


  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Настройки модуля</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <TashkilotKurishNavbar params={id} />
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
                      <th style={{ width: "40%" }}>Положение дел</th>
                      <th style={{ width: "5%" }}>Настройки</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.length > 0 && data.map((dat, index) => (
                      <tr key={index} style={{ fontSize: "15px" }}>
                        <td className="text-center">
                          {dat?.orderNumber}
                          {/* <NumericInput
                            value={dat?.orderNumber}
                            className="adminSozlamaInput"
                          /> */}
                        </td>
                        <td className="text-left">{dat?.name}</td>
                        <td id="context" className="text-center">
                          {(dat?.visible && dat?.active) ? (
                            <p className="text-success">Включено</p>
                          ) : (
                            <p className="text-danger">Выключенный</p>
                          )}
                        </td>
                        <td>
                          {
                            dat?.active ? (
                              <input type="checkbox" checked={dat.visible ? true : false}
                              id="kiruvchi" onClick={() => setOpenModal({ open: true, id: dat?.id })}
                              className="checkboxInput cursor-pointer"
                              style={{ width: "100%", height: "25px", padding: "20px" }} 
                              />
                            ) : (
                              <input type="checkbox" checked={false}
                              id="kiruvchi" disabled={true}
                              className="checkboxInput cursor-pointer"
                              style={{ width: "100%", height: "25px", padding: "20px" }} 
                              />
                            )
                          }
                        
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
            </div>
          </div>
        </div>

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
    </div >
  )
}

export default React.memo(ModulSozlamaContent);