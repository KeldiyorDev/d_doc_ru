import React from "react";

const DeleteModalSettings = ({ deleteModal, setDeleteModal }) => {

  // faylni o'chirish  (o'chirilmasin)
  const Uchirish = async (dat) => {
    // console.log("salom");
  }

  return (
    <div className="adminWindow">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title">Удалить окно</h6>
            <button type="button" className="close close1" onClick={() => setDeleteModal({ open: false, obj: {} })}>×</button>
          </div>
          <div className="modal-body text-center">
            <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }} className="text-danger">Будьте в курсе!</h3>
            <h5>Ushbu ma'lumotni o'chirmoqchimisiz?</h5>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-link bekorQilish" onClick={() => setDeleteModal({ open: false, obj: {} })}>Отмена</button>
            <button type="button" className="btn btn-primary" onClick={() => Uchirish(deleteModal.obj)}>Выключать</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(DeleteModalSettings);