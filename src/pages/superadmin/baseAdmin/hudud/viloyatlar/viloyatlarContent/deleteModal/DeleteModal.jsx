import React from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../../../config";

const DeleteModal = ({ deleteModal, currentUser, data, setData, setAlert, setDeleteModal }) => {

  // delete data
  const deletedData = async (id) => {
    try {
      const res = await axiosInstanceFq.delete(`province/delete/` + id)
      if (res?.data?.success === true) {
        let arr = [];
        data.forEach((d) => {
          if (d.id !== id) arr.push(d)
        })
        Alert(setAlert, 'success', `Удалено успешно`)
        setData(arr);
        setDeleteModal({ open: false, obj: {} });
      }
    } catch (error) {
      console.log(error);
      setDeleteModal({ open: false, obj: {} });
      Alert(setAlert, 'warning', `${error.response?.data?.error?.message}`)
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
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => deletedData(deleteModal.obj.id)}>Выключать</button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default React.memo(DeleteModal);