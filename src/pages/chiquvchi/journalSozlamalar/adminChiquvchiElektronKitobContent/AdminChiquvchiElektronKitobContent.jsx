import React, { useState } from "react";
import {axiosInstanceOut} from "../../../../config";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import ChiquvchiElektronKitobNavbar from "../adminChiquvchiElektronKitobNavbar/AdminChiquvchiElektronKitobNavbar";

const ChiquvchiElektronKitobContent = ({ currentUser }) => {
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });

  // malumotni saqlash
  const submitHandler = async (e) => {
    e.preventDefault();

    let uzbekchaNomi = document.querySelector('.uzbekchaNomi').value;
    let tasnif = document.querySelector('.tasnif').value;
    let ruschaNomi = document.querySelector('.ruschaNomi').value;
    let jurnalPrefiks = document.querySelector('.jurnalPrefiks').value;
    let jurnalPostfiks = document.querySelector('.jurnalPostfiks').value;
    let raqam = document.querySelector('.raqam').value;

    if (uzbekchaNomi) {
      if (tasnif) {
        if (raqam) {
          // to do server
          try {
            await axiosInstanceOut.post("journal", {
              uzName: uzbekchaNomi,
              ruName: ruschaNomi,
              shortDescription: tasnif,
              journalPrefix: jurnalPrefiks,
              journalPostfix: jurnalPostfiks,
              beginNumber: parseInt(raqam),
              orgId: JSON.parse(localStorage.getItem('oi')),
              workPlaceID: JSON.parse(localStorage.getItem('ids')),
              orderNumber: 0,//nomalum
              userID: 0//nomalum
            })
            Alert(setAlert, "success", "Информация успешно добавлена");
            document.querySelector('.formClear').reset();
          } catch (error) {
            console.log(error?.response);
            Alert(setAlert, "warning", `${error?.response?.data}`)
          }
        } else {
          Alert(setAlert, "warning", "Не введен стартовый номер");
        }
      } else {
        Alert(setAlert, "warning", "Краткая классификация не включена");
      }
    } else {
      Alert(setAlert, "warning", "Узбекское имя не указано");
    }
  }

  return (
    <div className="content">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Все</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
          style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <ChiquvchiElektronKitobNavbar />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body pb-0" >
                <form className="formClear" onSubmit={submitHandler}>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control form-control-outline uzbekchaNomi"
                              placeholder="Placeholder"
                            />
                            <label className="label-floating">Русское имя</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control form-control-outline ruschaNomi"
                              placeholder="Placeholder"
                            />
                            <label className="label-floating">Узбекское имя</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row ">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control form-control-outline tasnif"
                              placeholder="Placeholder"
                            />
                            <label className="label-floating">Краткая классификация</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 mb-3">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="number"
                              className="form-control form-control-outline raqam"
                              placeholder="Placeholder"
                            />
                            <label className="label-floating">Стартовый номер</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control form-control-outline jurnalPrefiks"
                              placeholder="Placeholder"
                            />
                            <label className="label-floating">Префикс журнала</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control form-control-outline form-control-sm jurnalPostfiks"
                              aria-label="form-control-sm example"
                              placeholder="Placeholder"
                            />
                            <label className="label-floating">Постфикс журнала</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="row d-flex justify-content-center mb-3">
                    <div className="col-lg-6 d-flex justify-content-center">
                      <button type="submit" className="btn btn-primary">
                        <i className="icon-floppy-disk"></i> Сохранять
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* alert content */}
            <AlertContent alert={alert} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default React.memo(ChiquvchiElektronKitobContent)