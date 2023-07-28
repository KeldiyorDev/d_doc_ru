import React from "react";
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";

const DeleteData = ({ setOpenDeleteModal, openDeleteModal, currentUser, setAlert, setYunalishQidirishHajmi, setSize, yunalishQidirishHajmi }) => {

  const deleteDataId = async (dat) => {
    try {
      const res = await axiosInstance.delete(`organization/adminstrator/${dat.id}/${dat.organizationId}`)
      if (res.data) {
        let arr = yunalishQidirishHajmi.filter(d => d.id !== res.data.id);
        setYunalishQidirishHajmi(arr);
      }
      setSize(res.data.fake);
      Alert(setAlert, "success", "Вы успешно удалили")
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, "warning", 'Организация не найдена')
    }
    setOpenDeleteModal({ open: false, id: null })
  }

  return (
    <div className="adminWindow">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title">Удалить окно</h6>
            <button type="button" className="close" onClick={() => setOpenDeleteModal({ open: false, id: null })}>×
            </button>
          </div>
          <div className="modal-body text-center">
            <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }}
              className="text-danger">Будьте в курсе!</h3>
            <h5>Вы хотите удалить эту информацию?</h5>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary"
              onClick={() => deleteDataId(openDeleteModal.id)}>Выключать 
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(DeleteData);