import React, { useRef } from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../../../config";

export default function UpdateYunalish({ updateYunalish, setUpdateYunalish, currentUser, tumanlar, setTumanlar, setAlert, sortNullishValues }) {
  const nameref = useRef();

  const yunalishUzgartirish = async (dat, id) => {
    try {
      const res = await axiosInstanceFq.patch(`district/update`, {
        name: nameref.current.value,
        id: dat.id,
        provinceId: id
      })
      let arr1 = [];
      tumanlar.forEach((d) => {
        if (d.id !== res.data.data.id) {
          arr1.push(d)
        }
      })
      arr1.push(res.data.data);
      sortNullishValues(arr1);
      setTumanlar(arr1);
      Alert(setAlert, 'success', `Вы успешно изменили`)
    } catch (error) {
      console.log(error.response)
      Alert(setAlert, 'warning', `${error.response.data}`)
    }
    setUpdateYunalish({ open: false, obj: {} })
  }

  const enter1 = (e, dat, id) => {
    if (e.code === "Enter") {
      yunalishUzgartirish(dat, id);
    }
  }

  return (
    updateYunalish.open && (
      <div className="adminWindow">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header btn-primary p-2">
              <h5 className="modal-title">Удалить окно</h5>
              <button type="button" className="close" onClick={() => setUpdateYunalish({ open: false, obj: {} })}>×</button>
            </div>
            <form className="modal-body form-inline justify-content-center">
              <label>Направление:</label>
              <input
                type="text"
                placeholder="Yo'nalish nomi"
                className="form-control mb-2 mr-sm-2 ml-sm-2 mb-sm-0 w-75 yunalishName"
                defaultValue={updateYunalish.obj?.name}
                onKeyDown={(e) => enter1(e, updateYunalish.obj, updateYunalish.provinceId)}
                ref={nameref}
              />
              <button
                type="button"
                onClick={() => yunalishUzgartirish(updateYunalish.obj, updateYunalish.provinceId)}
                className="btn btn-primary ml-sm-2 mb-sm-0"
                style={{ textTransform: "capitalize" }}
              >
                Изменять
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  )
}