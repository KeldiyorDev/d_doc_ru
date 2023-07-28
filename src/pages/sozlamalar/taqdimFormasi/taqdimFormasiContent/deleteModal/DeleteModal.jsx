import React from "react";
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";

const DeleteModal = ({ currentUser, setAlert, setData, data, setDeleteModal, deleteModal }) => {

  const Uchirish = async (dat) => {
    try {
      const res = await axiosInstance.delete("submissionForm/delete/" + dat.id)
      let arr = data.filter((d) => {
        return d.id !== res.data;
      })
      setDeleteModal({ open: false, obj: {} });
      setData(arr);
    } catch (error) {
      console.log(error?.response);
      Alert(setAlert, "warning", error?.response?.data);
      setDeleteModal({ open: false, obj: {} });
    }
  }

  return (
    deleteModal.open && (
      <div className="adminWindow">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h6 className="modal-title">Удалить окно</h6>
              <button type="button" className="close close3" onClick={() => setDeleteModal({ open: false, obj: {} })}>×</button>
            </div>
            <div className="modal-body text-center">
              <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }} className="text-danger">Будьте в курсе!</h3>
              <h5>Вы хотите удалить эту информацию?</h5>
            </div>
            <div class="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => Uchirish(deleteModal.obj)}>Выключать</button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default React.memo(DeleteModal);