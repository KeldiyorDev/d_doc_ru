import React, { useRef } from "react";
import Select from 'react-select'
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";

const FormElements = ({ currentUser, setData, data, setAlert, allBulimSelect }) => {
  const uzbekNameref = useRef();
  const russianNameref = useRef();
  const shortDescref = useRef();
  const departmentref = useRef();
  const checkboxref = useRef();
  const department = useRef();
  const formClear = useRef();

  const changeCheckbox = (e) => {
    if (e.target.checked) {
      department.current.style.display = "block";
    } else {
      department.current.style.display = "none";
    }
  }

  const bulimQushish = async (e) => {
    e.preventDefault();

    if (uzbekNameref.current.value) {
      if (russianNameref.current.value) {
        if (shortDescref.current.value) {
          // to do server
          try {
            const res = await axiosInstance.post('department', {
              uzName: uzbekNameref.current.value,
              ruName: russianNameref.current.value,
              description: shortDescref.current.value,
              upperDepartmentId: departmentref.current.props.value ? departmentref.current.props.value.value : null,
              orgId: JSON.parse(localStorage.getItem('oi'))
            })
            setData([...data, res.data]);
            formClear.current.reset();
            Alert(setAlert, "success", "Информация успешно добавлена");
          } catch (error) {
            console.log(error.response);
            Alert(setAlert, "warning", error.response?.data);
          }
        } else {
          Alert(setAlert, "warning", "Поле описания не должно быть пустым");
        }
      } else {
        Alert(setAlert, "warning", "Русское название кафедры не указано");
      }
    } else {
      Alert(setAlert, "warning", "Не введено название раздела");
    }
  }

  return (
    <form onSubmit={bulimQushish} className="formClear" ref={formClear}>
      <div className="row">
        <div className="col-lg-3">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline nomlanishi"
                  placeholder="Placeholder"
                  ref={uzbekNameref}
                />
                <label className="label-floating">Именование</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline ruschaNomi"
                  placeholder="Placeholder"
                  ref={russianNameref}
                />
                <label className="label-floating">Русское имя</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline tavsif"
                  placeholder="Placeholder"
                  ref={shortDescref}
                />
                <label className="label-floating">Описание</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <button type="submit" className="btn btn-primary w-100" style={{ height: "56px" }}>
            <i className="fas fa-save" style={{ fontSize: "18px" }}></i> Сохранять
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="mb-2 d-flex align-items-center mt-3 mt-sm-3 mt-md-3 mt-lg-0 mt-xl-0 ">
            <input
              type="checkbox"
              className='mr-1 cursor-pointer'
              id="bulimFunc"
              ref={checkboxref}
              style={{ width: "20px", height: "20px" }}
              onChange={(e) => changeCheckbox(e)}
            />
           Выберите основную категорию
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12" id="bulim" ref={department} style={{ display: "none" }}>
          <div className="form-group mb-0">
            <Select
              options={allBulimSelect}
              placeholder="Разделы"
              className='upperDepartmentId'
              ref={departmentref}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default React.memo(FormElements);