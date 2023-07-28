import React from "react";
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance, axiosInstanceKadr } from "../../../../../../config";

const DeleteModal = ({ data, setData, currentUser, setDeleteModal, deleteModal, setAlert }) => {
  console.log(data);
  document.querySelector('.tooltip')?.remove();

  const Uchirish = async (dat) => {
    try {
      const res = await axiosInstance.delete("user/" + dat.id + '/' + JSON.parse(localStorage.getItem('oi')))
      console.log(res.data);
      let arr = [];
      data.content?.forEach((d) => {
        if (d?.id !== dat.id) {
          arr.push(d);
        }
      })

      try {
        console.log(`disconnect/${dat.id}/${localStorage.getItem('oi')}`);
        const deleteKadr = await axiosInstanceKadr.patch(`disconnect/${dat.id}/${localStorage.getItem('oi')}`)
        console.log(deleteKadr.data);
      } catch (error) {
        console.log(error);
      }

      setData({ ...data, content: arr });
      Alert(setAlert, "success", "Данные успешно удалены");
    } catch (error) {
      console.log(error);
      Alert(setAlert, "warning", error.response?.data);
    }
    setDeleteModal({ open: false, obj: {} });
  }

  return (
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
            <h5>Вы хотите удалить эту информацию?</h5>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link bekorQilish"
              onClick={() => setDeleteModal({ open: false, obj: {} })}> Отмена
            </button>
            <button type="button" className="btn btn-primary"
              onClick={() => Uchirish(deleteModal.obj)}>Выключать
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(DeleteModal);