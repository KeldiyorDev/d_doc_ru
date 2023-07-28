import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";

const FormData = ({ currentUser, setAlert, setData, data, setSelectBulimlar, selectBulimlar }) => {
  const [check, setCheck] = useState(false);
  const departmentref = useRef();
  const workcountref = useRef();
  const formresetref = useRef();

  // refresh
  useEffect(() => {
    let isMounted = true;
    const get1 = async () => {
      try {
        const res = await axiosInstance.get("workplace/checkSyn/" + JSON.parse(localStorage.getItem('oi')))
        if (isMounted)
          setCheck(res.data)
      } catch (error) {
        console.log(error.response);
      }
    }
    get1();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // reload
  const reloadRef = async () => {
    try {
      await axiosInstance.get("workplace/syn/" + JSON.parse(localStorage.getItem('oi')))
      const getAllBulim = async () => {
        try {
          const res = await axiosInstance.get('department/all')
          let arr = [];
          res.data.forEach((d, i) => {
            arr.push({ value: d.id, label: d.uzName });
          })
          setSelectBulimlar(arr);
        } catch (error) {
          console.log(error);
        }
      }
      getAllBulim();
      setCheck(false);
    } catch (error) {
      console.log(error.response);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    if (departmentref.current.props.value) {
      if (workcountref.current.value) {
        try {
          const res = await axiosInstance.post("workplace", {
            departmentId: departmentref.current.props.value.value,
            count: workcountref.current.value,
            orgId: JSON.parse(localStorage.getItem('oi'))
          })
          formresetref.current.reset();
          Alert(setAlert, "success", "Информация успешно добавлена");
          setData({ ...data, content: [...data.content, ...res.data] });
        } catch (error) {
          console.log(error.response);
        }
      } else {
        Alert(setAlert, "warning", "Количество парт в отделении не указано");
      }
    } else {
      Alert(setAlert, "warning", "Название раздела не выбрано");
    }
  }

  return (
    <form onSubmit={submitHandler} ref={formresetref}>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <Select
              options={selectBulimlar}
              placeholder="Отделение"
              className="bulim"
              ref={departmentref}
              isClearable={true}
            />
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-outline"
                placeholder="Placeholder"
                ref={workcountref}
              />
              <label className="label-floating">Стол в отделе</label>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating">
            <div className="position-relative d-flex">
              <button type="submit" className="btn btn-primary form-control form-control-outline">
                <i className="fas fa-save" style={{ fontSize: "18px" }}></i> Сохранять 
              </button>
              {!check && <button type="button" className="ml-3 btn btn-primary form-control form-control-outline"
                onClick={() => reloadRef()}> Перезагрузить 
              </button>
              }
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default React.memo(FormData);