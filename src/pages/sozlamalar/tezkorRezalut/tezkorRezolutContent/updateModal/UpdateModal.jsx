import React, { useRef } from "react";
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";

const UpdateModal = ({ updateModal, setUpdateModal, currentUser, data, setData, setAlert }) => {
  const updatenameref = useRef();

  const Uzgartirish = async (dat) => {
    if (updatenameref.current.value) {
      try {
        const res = await axiosInstance.patch("fastResolution", {
          id: dat.id,
          name: updatenameref.current.value
        })
        let arr = data.filter((d) => {
          if (d.id === res.data.id) {
            d.id = res.data.id;
            d.name = res.data.name;
          }
          return d;
        })
        Alert(setAlert, "success", "Информация успешно изменена");
        setData(arr);
        setUpdateModal({ open: false, obj: {} });
      } catch (error) {
        console.log(error.response);
      }
    } else {
      Alert(setAlert, "warning", "Не введено название организации");
    }
  }

  return (
    updateModal.open && (
      <div className="adminWindow">
        <div className="modal-dialog modal-lg ">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h3 className="modal-title">Обновлять</h3>
              <button type="button" className="close close2" onClick={() => setUpdateModal({ open: false, obj: {} })}>&times;</button>
            </div>
            <div className="modal-body">
              <form className="">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline nomlanishiUzgartirish"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.name}
                            ref={updatenameref}
                          />
                          <label className="label-floating">Именование</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <button
                            type="button"
                            className="btn btn-primary form-control form-control-outline"
                            onClick={() => Uzgartirish(updateModal.obj)}
                          >
                            Добавлять
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default React.memo(UpdateModal);