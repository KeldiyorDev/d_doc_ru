import React from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";

const DeleteModal = ({ deleteModal, setDeleteModal, params, currentUser, data, setAlert, setData }) => {

  // faylni o'chirish
  const Uchirish = async (dat) => {
    try {
      const res = await axiosInstance.delete(`document/deleteFile/${dat.id}/${params.id}`)
      let arr = data?.files?.filter((d) => {
        return d.id !== res.data;
      })
      Alert(setAlert, "success", "Удалено успешно");
      setDeleteModal({ open: false, obj: {} });
      setData({ data, files: arr });
    } catch (error) {
      console.log(error.response);
      setDeleteModal({ open: false, obj: {} });
      Alert(setAlert, "warning", "файл не найден");
    }
  }

  return (
    <div className="adminWindow">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title">Окна удалить</h6>
            <button type="button" className="close close1"
              onClick={() => setDeleteModal({ open: false, obj: {} })}>×
            </button>
          </div>
          <div className="modal-body text-center">
            <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }}
              className="text-danger">Будьте в курсе!</h3>
            <h5>Вы хотите удалить эту информацию?</h5>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link bekorQilish"
              onClick={() => setDeleteModal({ open: false, obj: {} })}>Отмена
            </button>
            <button type="button" className="btn btn-primary"
              onClick={() => Uchirish(deleteModal.obj)}>Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(DeleteModal);