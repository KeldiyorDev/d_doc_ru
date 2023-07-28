import React from "react";
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../config";

const DeleteModal = ({ setDeleteModal, deleteModal, setMahallalar, currentUser, setAlert, mahallalar }) => {

  const deleteId = async (id) => {
    try {
      await axiosInstanceFq.delete(`neighborhood/delete/` + id)
      let arr = []
      mahallalar.forEach((d) => {
        if (d.id !== id) {
          arr.push(d);
        }
      })
      Alert(setAlert, 'success', `Данные успешно удалены`);
      setMahallalar(arr);
      setDeleteModal({ open: false, obj: {} });
    } catch (error) {
      console.log(error.response)
      Alert(setAlert, 'warning', error.response?.data?.error?.message);
      setDeleteModal({ open: false, obj: {} });
    }
  }

  return (
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
            <button type="button" className="btn btn-primary" onClick={() => deleteId(deleteModal.obj?.id)}>Удалить</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(DeleteModal);