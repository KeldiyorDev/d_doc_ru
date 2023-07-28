import React from "react";
import { useRef } from "react";
import { Alert } from "../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../config";

const FormElements = ({ setAlert, currentUser, stirData, setData }) => {
  const NameRef = useRef()
  const adressRef = useRef()
  const phoneRef = useRef()
  const ePochtaRef = useRef()
  const eXatRef = useRef()

  // malumot qo'shish
  const submitHandler = async (e) => {
    e.preventDefault();

    // to do server
    try {
      const res = await axiosInstance.post("organization/addCorrespondentByStir", {
        stir: stirData.stir,
        orgId: JSON.parse(localStorage.getItem('oi'))
      })
      setData(prev => [...prev, res.data]);
      Alert(setAlert, "success", `${res.data}`);
      document.querySelector('.sitri').value = "";
      document.querySelector('.formClear').reset();
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, "warning", error.response?.data);
    }
  }

  return (
    <form className="mt-3 formClear" onSubmit={submitHandler}>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  ref={NameRef}
                  type="text"
                  className="form-control form-control-outline tashNomi"
                  placeholder="Placeholder"
                />
                <label className="label-floating">Название организации</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  ref={adressRef}
                  type="text"
                  className="form-control form-control-outline manzil"
                  placeholder="Placeholder"
                />
                <label className="label-floating">Адрес</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  ref={phoneRef}
                  type="text"
                  // data-mask="+998(99) 999-99-99"
                  className="form-control form-control-outline telefon"
                  placeholder="Placeholder"
                />
                <label className="label-floating">Телефон</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  ref={ePochtaRef}
                  type="email"
                  className="form-control form-control-outline email"
                  placeholder="Placeholder"
                  required
                />
                <label className="label-floating">E-pochta</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  ref={eXatRef}
                  type="email"
                  className="form-control form-control-outline exat"
                  placeholder="Placeholder"
                />
                <label className="label-floating">E-xat</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <button
                  type="submit"
                  className="btn btn-primary form-control form-control-outline">
                  Qo'shish
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default React.memo(FormElements);