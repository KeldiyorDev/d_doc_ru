import React from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";

const OpenButtonClick = ({ setOpenButtonClick, params, history, setAlert }) => {

  const passedPage = async () => {
    try {
      if (params.name === "nazorat") {
        try {
          await axiosInstance.patch(`superVisor/done/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`, {})
          history.push("/kiruvchi/bajarilgan");
        } catch (error) {
          console.log(error.response);
        }
      }
      if (params.name === "malumot") {
        try {
          await axiosInstance.patch(`forInfo/done/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`, {})
          history.push("/kiruvchi/bajarilgan");
        } catch (error) {
          console.log(error.response);
        }
      }
      if (params.name === "bajarilmagan") {
        try {
          await axiosInstance.patch(`notDoneDocs/done/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`, {})
          history.push("/kiruvchi/bajarilgan");
        } catch (error) {
          console.log(error.response);
          Alert(setAlert, "warning", error?.response?.data);
          setOpenButtonClick(false);
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="adminWindow">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title">Окно переключения состояния</h6>
            <button type="button" className="close" onClick={() => setOpenButtonClick(false)}>×</button>
          </div>
          <div className="modal-body text-center">
            <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }} className="text-danger">Будьте в курсе!</h3>
            <h5>Принять статус «сделано»?</h5>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger" onClick={() => setOpenButtonClick(false)}>Нет</button>
            <button type="button" className="btn btn-primary ml-1" onClick={passedPage}>да</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(OpenButtonClick);