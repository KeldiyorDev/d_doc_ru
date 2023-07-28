import React from "react";
import { useRef } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstanceFq } from "../../../../../../../config";

const UpdateModal = ({ updateModal, setUpdateModal, currentUser, setData, data, setAlert, sortNullishValues, notParentsCard }) => {
  const cardTyperef = useRef();
  const inputNameref = useRef();

  // update data
  const updatedData = async (obj) => {
    try {
      const res = await axiosInstanceFq.put('ac_2/update', {
        id: obj.id,
        provinceId: cardTyperef.current?.props?.value ? cardTyperef.current.props.value.value : null, //idP,
        name: inputNameref.current.value
      })
      let arr = [];
      data.forEach((d) => {
        if (d.id !== obj.id) {
          arr.push(d)
        }

      })
      let arr1 = [...arr, res.data.data]
      arr1.sort((a, b) => {
        return a - b;
      })
      sortNullishValues(arr1)
      setData(arr1);
      setUpdateModal({ open: false, obj: {} });
    } catch (error) {
      console.log(error.response)
      Alert(setAlert, 'warning', `${error.response.data.error.message}`)
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
            <div className="d-flex mt-2 px-2 row">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control inputNom mr-2"
                  defaultValue={updateModal.obj.name}
                  style={{ height: '56px' }}
                  ref={inputNameref}
                />
              </div>
              <div className="col-6">
                <Select
                  defaultValue={{
                    value: `${updateModal.obj.province.id}`,
                    label: `${updateModal.obj.province.name}`
                  }}
                  options={notParentsCard}
                  placeholder="Направление:"
                  className="cardTypeId"
                  ref={cardTyperef}
                />
              </div>
            </div>
            <hr />
            <div className="updateDataWindowBottom">
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