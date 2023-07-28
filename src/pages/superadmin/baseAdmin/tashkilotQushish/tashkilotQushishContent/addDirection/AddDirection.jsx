import React, { useRef } from "react";
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";

const AddDirection = ({  setAlert, setYunalishlar }) => {
  const directionref = useRef();
  const closeBtn = useRef();

  // yunalish qushish va hamma yunalishni o'qib olish
  const yunalishQushish = async (e) => {
    e.preventDefault();

    if (directionref.current.value) {
      // yunalish kiritish
      try {
        const res = await axiosInstance.post("orgType/", { name: directionref.current.value })
        Alert(setAlert, "success", "Yo'nalish muvaffaqiyatli qo'shildi");
        setYunalishlar(prev => [...prev, { id: res.data.id, name: res.data.name }])
      } catch (error) {
        console.log(error.response);
        Alert(setAlert, "warning", error?.response?.data);
      }
      closeBtn.current.click();
    } else {
      Alert(setAlert, "warning", "Не введено название направления");
    }
  }

  return (
    <div className="modal-dialog modal-lg ">
      <div className="modal-content">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title" style={{ textTransform: "capitalize" }}>Добавить направление</h5>
          <button type="button" className="close" data-dismiss="modal" ref={closeBtn}>&times;</button>
        </div>

        <div className="modal-body">
          <form onSubmit={yunalishQushish}>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-outline yunalishNomi"
                      placeholder="Placeholder"
                      ref={directionref}
                      autoFocus
                    />
                    <label className="label-floating">Направление</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <span className="error text-danger d-block" style={{ textTransform: "capitalize" }}></span>
                <button type="submit" className="btn btn-primary" >Сохранять</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AddDirection);