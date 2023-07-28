import React, { useRef } from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../../../config";

const UpdateYunalish = ({ updateYunalish, setUpdateYunalish, currentUser, tumanlar, setAlert, sortNullishValues, setTumanlar }) => {
  const directionref = useRef();

  const yunalishUzgartirish = async (dat) => {
    const yunalishName = directionref.current.value

    if (yunalishName?.length > 0) {
      try {
        const res = await axiosInstanceFq.patch(`ac_2/update`, {
          name: yunalishName,
          id: dat.id
        })
        
        let arr1 = tumanlar.filter((d) => {
          if (d.id === res.data.data.id) {
            d.id = res.data.data.id;
            d.ac1Id = res.data.data.ac1Id;
            d.name = res.data.data.name;
            d.orderNumber = res.data.data.orderNumber;
          }
          return d;
        })
        Alert(setAlert, 'success', `Направление успешно изменено`);
        sortNullishValues(arr1);
        setTumanlar(arr1);
      } catch (error) {
        console.log(error.response);
        Alert(setAlert, 'warning', `${error.response.data}`);
      }
      setUpdateYunalish({ open: false, obj: {} });
    } else {
      Alert(setAlert, 'success', `Не введено направление`);
    }
  }

  return (
    updateYunalish.open && (
      <div className="adminWindow">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header btn-primary p-2">
              <h5 className="modal-title">Изменить окно</h5>
              <button type="button" className="close"
                onClick={() => setUpdateYunalish({ open: false, obj: {} })}>×
              </button>
            </div>

            <form className="modal-body form-inline justify-content-center">
              <label>Направление:</label>
              <input
                type="text"
                placeholder="Yo'nalish nomi"
                className="form-control mb-2 mr-sm-2 ml-sm-2 mb-sm-0 w-75 yunalishName"
                defaultValue={updateYunalish.obj?.name}
                ref={directionref}
              />
              <button type="button" onClick={() => yunalishUzgartirish(updateYunalish.obj)} className="btn btn-primary ml-sm-2 mb-sm-0" style={{ textTransform: "capitalize" }}>
              Изменять
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  )
}

export default React.memo(UpdateYunalish);