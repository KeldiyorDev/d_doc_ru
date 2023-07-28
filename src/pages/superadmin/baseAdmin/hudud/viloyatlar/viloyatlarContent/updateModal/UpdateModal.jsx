import React from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../../../config";

const UpdateModal = ({ updateModal, setUpdateModal, currentUser, data, setData, setAlert, sortNullishValues }) => {

  // update data
  const updatedData = async (obj) => {
    let nom = document.querySelector('.inputNom').value
    try {
      const res = await axiosInstanceFq.patch('province/update', {
        id: obj.id,
        name: nom
      })
      let arr = [];
      data.forEach((d) => {
        if (d.id !== obj.id) {
          arr.push(d)
        }
      })
      let arr1 = [...arr, res?.data?.data]
      arr1.sort((a, b) => a - b)
      sortNullishValues(arr1);
      setData(arr1);
      setUpdateModal({ open: false, obj: {} });
      Alert(setAlert, 'success', `Информация успешно изменена`)
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, 'warning', `${error.response.data}`)
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
              />
            </div>
            <hr />
            <div className="updateDataWindowBottom">
              {/* <button type={'button'} className="btn btn-danger"
                onClick={() => setUpdateModal({ open: false, obj: {} })}>Bekor
                qilish
              </button> */}
              <button type={'button'} className="btn btn-primary"
                onClick={() => updatedData(updateModal.obj)}>Изменять
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}

export default React.memo(UpdateModal);