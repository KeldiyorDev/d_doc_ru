import React from "react";
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstanceOut } from "../../../../../../config";

export default function DeleteModal({ setDeleteModal, deleteModal, currentUser, setAlert, setData, data }) {

  // malumotni o'chirish
  const Uchirish = async (dat) => {
    try {
      const res = await axiosInstanceOut.delete("journal/" + dat.id)
      console.log(res.data);
      let arr = data.content.filter((d) => d.id !== res.data);
      Alert(setAlert, "success", "Данные успешно удалены");
      setData({ ...data, content: arr });
    } catch (error) {
      Alert(setAlert, "warning", `${error.response?.data}`);
    }
    setDeleteModal({ open: false, obj: {} });
  }

  return (
    deleteModal.open && (
      <div className="adminWindow">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h6 className="modal-title">Удалить окно</h6>
              <button type="button" className="close"
                onClick={() => setDeleteModal({ open: false, obj: {} })}>×
              </button>
            </div>
            <div className="modal-body text-center">
              <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }}
                className="text-danger">Будьте в курсе!</h3>
              <h5>Вы хотите удалить эту информацию??</h5>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary"
                onClick={() => Uchirish(deleteModal.obj)}>Выключать
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}