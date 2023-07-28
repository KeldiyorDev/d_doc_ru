import React from "react";
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";

const DeleteModal = ({ deleteModal, setDeleteModal, currentUser, setData, data, setAlert }) => {

  // malumotni o'chirish
  const Uchirish = async (dat) => {
    try {
      const res = await axiosInstance.delete("journal/" + dat.id)
      let arr = data.content.filter((d) => {
        return d.id !== res.data;
      })
      Alert(setAlert, "success", "Данные успешно удалены");
      setData({ ...data, content: arr });
      setDeleteModal({ open: false, obj: {} });
    } catch (error) {
      setDeleteModal({ open: false, obj: {} });
      Alert(setAlert, "warning", error.response?.data);
    }
  }

  return (
    <>
      <div className="adminWindow">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h6 className="modal-title">Удалить окно</h6>
              <button type="button" className="close" onClick={() => setDeleteModal({ open: false, obj: {} })}>×</button>
            </div>
            <div className="modal-body text-center">
              <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }} className="text-danger">Будьте в курсе!</h3>
              <h5>Вы хотите удалить эту информацию?</h5>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => Uchirish(deleteModal.obj)}>Выключать</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(DeleteModal);