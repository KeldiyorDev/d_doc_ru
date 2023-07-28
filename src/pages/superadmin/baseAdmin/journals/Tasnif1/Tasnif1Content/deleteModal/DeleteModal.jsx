import React from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../../../config";

const DeleteModal = ({ deleteModal, setDeleteModal, setData, data, currentUser, setAlert }) => {

  // delete data
  const deletedData = async (id) => {
    try {
      const res = await axiosInstanceFq.delete(`ac_1/delete/` + id)
      
      if (res.data.data) {
        let arr = data.filter((d) => d.id !== id)
        Alert(setAlert, 'success', `Данные успешно удалены`);
        setDeleteModal({ open: false, obj: {} });
        setData(arr);
      }
    } catch (error) {
      console.log(error);
      Alert(setAlert, 'warning', `${error.response?.data?.error?.message}`);
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
              <h5>Вы хотите удалить эту информацию??</h5>
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