import React, { useRef } from "react";
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../../config";

const UpdateModal = ({ updateModal, setUpdateModal, currentUser, tasnif3, setTasnif3, setAlert }) => {
  const inputRef = useRef('');

  //uzgartirish
  const updatedData = async (dat) => {
    if (inputRef.current.value !== "") {
      try {
        const res = await axiosInstanceFq.patch(`ac_3/update`, {
          id: dat.id,
          name: inputRef.current.value
        })
        let arr = tasnif3.filter((t) => {
          if (t.id === res.data.data.id) {
            t.id = res.data.data.id;
            t.ac2Id = res.data.data.ac2Id;
            t.name = res.data.data.name;
            t.orderNumber = res.data.data.orderNumber;
          }
          return t;
        })
        Alert(setAlert, "success", "Информация успешно изменена");
        setUpdateModal({ open: false, obj: {} });
        setTasnif3(arr);
      } catch (error) {
        console.log(error.response)
      }
    } else {
      Alert(setAlert, "warning", "Поле Классификация3 должно быть заполнено");
    }
  }

  return (
    updateModal.open && (
      <div className="updateDataWindow">
        <div className="updateDataWindowWrapper">
          <form>
            <div className="updateDataWindowTop">
              <h3>Изменить окно</h3>
              <span onClick={() => setUpdateModal({ open: false, obj: {} })}>&times;</span>
            </div>
            <div className="updateDataWindowCenter">
              <input
                type="text"
                className="form-control inputNom"
                defaultValue={updateModal.obj.name}
                ref={inputRef}
                placeholder="Классификация3"
              />
            </div>
            {/* <hr /> */}
            <div className="updateDataWindowBottom">
              <button type={'button'} className="btn btn-primary" onClick={() => updatedData(updateModal.obj)}>Изменять 
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default React.memo(UpdateModal);