import React from "react";
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../../config";

export default function DeleteModal({ setDeleteModal, deleteModal, currentUser, setAlert, setData, data }) {

  // malumotni o'chirish
  const Uchirish = async (dat) => {
    try {
      const res = await axiosInstanceFq.delete("journal/" + dat.id)
      console.log(res.data);
      let arr = data.content.filter((d) => d.id !== res.data);
      Alert(setAlert, "success", "Ma'lumot muvaffaqiyatli o'chirildi");
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
              <h6 className="modal-title">O'chirish oynasi</h6>
              <button type="button" className="close"
                onClick={() => setDeleteModal({ open: false, obj: {} })}>×
              </button>
            </div>
            <div className="modal-body text-center">
              <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }}
                className="text-danger">Ogoh bo'ling!</h3>
              <h5>Ushbu ma'lumotni o'chirmoqchimisiz?</h5>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary"
                onClick={() => Uchirish(deleteModal.obj)}>O'chirish
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  )
}