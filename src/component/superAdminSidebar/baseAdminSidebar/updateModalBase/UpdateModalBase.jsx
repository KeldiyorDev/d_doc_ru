import React, { useState } from "react";
import { axiosInstance, url } from "../../../../config";
import { Alert } from "../../../alert/Alert";
import { uploaded } from "../../../../redux/actions/actionSingInSingOut";

const UpdateModalBase = ({ setAlert, userData, setUpdateModal }) => {
  const [file, setFile] = useState(null);
  const fileType = (file?.type === "image/png" || file?.type === "image/jpg" || file?.type === "image/jpeg");

  const saveUser = async (e) => {
    e.preventDefault();

    // to do server
    let telefon = document.querySelector('.telefon').value;
    let email = document.querySelector('.email').value;
    let userName = document.querySelector('.userName').value;

    if (fileType) {
      let formData = new FormData();
      formData.append("file", file);

      // faylni o'zini yuborish
      try {
        const fileId = await axiosInstance.post("document/saveDuplicateFile", formData);
        try {
          const res = await axiosInstance.patch("superAdmin", {
            id: userData.id,
            mobileNumber: telefon || null,
            email: email,
            fileId: fileId.data,
            userName: userName,
          })
          uploaded(res.data)
          Alert(setAlert, "success", "Ваша информация была успешно изменена");
          setUpdateModal(false);
        } catch (error) {
          Alert(setAlert, "warning", `${error.response?.data}`);
        }
      } catch (error) {
        Alert(setAlert, "warning", `${error.response?.data}`);
      }
    } else {
      try {
        const res = await axiosInstance.patch("superAdmin", {
          id: userData.id,
          mobileNumber: telefon || null,
          email: email,
          userName: userName,
        })
        uploaded(res.data)
        Alert(setAlert, "success", "Ваша информация была успешно изменена");
        setUpdateModal(false);
      } catch (error) {
        Alert(setAlert, "warning", `${error.response?.data}`);
      }
    }
  }

  return (
    <div className='adminWindow1'>
      <div className='adminWindow1Wrapper adminWindow1Wrapper1'>
        <div className="modal-dialog modal-xl customDialog">
          <div className="modal-content" style={{
            boxShadow: '0 .5rem 1rem rgba(0,0,0,.5)'
          }} >
            <div className="modal-header bg-primary " style={{ color: "#fff" }}>
              <h5 className="modal-title">Пользовательские настройки</h5>
              <button type="button" className="close" onClick={() => setUpdateModal(false)}>×</button>
            </div>
            <form onSubmit={saveUser}>
              <div className="modal-body" style={{
                overflowY: "hidden"
              }}>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-9">
                          <div className="position-relative">
                            <input
                              type="text"
                              style={{ textTransform: "capitalize" }}
                              className="form-control form-control-outline fio"
                              placeholder="Placeholder"
                              disabled={true}
                              defaultValue={userData?.fullName}
                            />
                            <label className="label-floating">Ф.И.О</label>
                          </div>
                        </div>
                        <div className="col-lg-3">
                          {file ? (
                            <img
                              src={URL.createObjectURL(file)} alt=""
                              style={{
                                aspectRatio: 3 / 3
                              }}
                              className='imgSettings' />
                          ) : (
                            userData?.file ? (
                              <img
                                style={{
                                  aspectRatio: 3 / 3
                                }}
                                src={url + "/api/file/view/" + userData?.file?.id} alt=""
                                className='imgSettings'
                              />
                            ) : (
                              <img
                                style={{
                                  aspectRatio: 3 / 3
                                }}
                                src={"/assets/user.png"} alt=""
                                className='imgSettings'
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <div className="row">
                    <div className="col-lg-4 ">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="email"
                              // style={{ textTransform: "capitalize" }}
                              className="form-control form-control-outline email"
                              placeholder="Placeholder"
                              defaultValue={userData?.email}
                            />
                            <label className="label-floating">Е-маил</label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="text"
                              style={{ textTransform: "capitalize" }}
                              data-mask="+998 (99) 999-99-99"
                              name={'mobileNumber'}
                              className="form-control form-control-outline telefon"
                              placeholder="Placeholder"
                              defaultValue={userData?.phoneNumber}
                            />
                            <label className="label-floating">Номер телефона</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={'row'}>
                  <div className="col-lg-9 ">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            // style={{ textTransform: "capitalize" }}
                            className="form-control form-control-outline userName"
                            placeholder="Placeholder"
                            defaultValue={userData?.username}
                          />
                          <label className="label-floating">Имя пользователя</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-9">
                    <div className="form-group form-group-floating row mb-0" >
                      <div className="col-lg-12">
                        <label className="custom-file text-muted" htmlFor={'select'}>
                          <div className={'custom-file-label'}>
                            {fileType ? file?.name : "Фото пользователя"}
                          </div>
                        </label>
                        <input
                          type="file"
                          id={'select'}
                          className="custom-file-input avatar d-none"
                          accept=".png, .jpg, .jpeg"
                          onClick={(e) => e.target.value = null}
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-lg-9">
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary">
                      Сохранять
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(UpdateModalBase);