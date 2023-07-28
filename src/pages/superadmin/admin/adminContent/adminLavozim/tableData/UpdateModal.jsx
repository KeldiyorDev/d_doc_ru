import React, { useEffect, useRef } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";

const UpdateModal = ({ setUpdateModal, updateModal, setData, setAlert, selectBulimlar, selected }) => {
  const departmentsref = useRef();
  const rankref = useRef();

  console.log(updateModal);

  useEffect(() => {
    let isMounted = true;

    if (isMounted)
      departmentsref.current.setValue({ value: updateModal.obj.departmentId, label: updateModal.obj.departmentName })

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Uzgartirish = async (obj) => {
    console.log(obj);
    if (departmentsref.current.props?.value) {
      if (rankref.current.value) {
        try {
          const sendData = {
            id: updateModal.obj.id,
            name: rankref.current.value,
            departmentId: departmentsref.current.props.value.value,
          }

          console.log(sendData);
          await axiosInstance.patch("user_position", sendData)
          try {
            const res1 = await axiosInstance.get("user_position/" + JSON.parse(localStorage.getItem('oi')) + "?page=" + selected)
            setData(res1.data);
          } catch (error) {
            console.log(error?.response);
          }
          Alert(setAlert, "success", "Информация успешно изменена");
          rankref.current.value = "";
          setUpdateModal({ open: false, obj: {} });
        } catch (error) {
          console.log(error.response);
          setUpdateModal({ open: false, obj: {} });
        }
      } else {
        Alert(setAlert, "warning", "Позиция не введена");
        setUpdateModal({ open: false, obj: {} });
      }
    } else {
      Alert(setAlert, "warning", "Раздел не выбран");
      setUpdateModal({ open: false, obj: {} });
    }
  }

  return (
    <div className="adminWindow">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h6 className="modal-title">Добавить позицию</h6>
            <button type="button" className="close"
              onClick={() => setUpdateModal({
                open: false,
                obj: {}
              })}>&times;</button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row px-0">
                <div className="col-lg-12">
                  <div className="form-group mb-0">
                    <div className="col-lg-12 px-0 mb-3">
                      <Select
                        // defaultValue={{
                        //   value: updateModal.obj.id,
                        //   label: updateModal.obj.departmentName
                        // }}
                        options={selectBulimlar}
                        ref={departmentsref}
                        placeholder="Департамент работ"
                        isClearable={true}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-lg-12 px-0">
                  <div
                    className="form-group form-group-floating row mb-0">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline"
                          placeholder="Placeholder"
                          defaultValue={updateModal.obj?.name}
                          ref={rankref}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-lg-12 mt-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => Uzgartirish(updateModal.obj)}
                  >
                    <i className="fas fa-save"
                      style={{ fontSize: "18px" }}></i> Сохранять
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UpdateModal);