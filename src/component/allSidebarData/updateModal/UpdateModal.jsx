import React, { useState } from "react";
import { axiosInstance, url } from "../../../config";
import { Alert } from "../../alert/Alert";
import { uploaded } from "../../../redux/actions/actionSingInSingOut";

const UpdateModal = ({ userData, setUpdateModal, setAlert, updateModal }) => {
  console.log(userData);
  const [file, setFile] = useState(null);
  const fileType = (file?.type === "image/png" || file?.type === "image/jpg" || file?.type === "image/jpeg");

  const saveUser = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", file);

    // to do server
    let telefon = document.querySelector('.telefon').value;
    let email = document.querySelector('.email').value;

    console.log(userData);

    if (fileType) {
      // faylni o'zini yuborish
      try {
        const res = await axiosInstance.post("document/saveDuplicateFile/" + JSON.parse(localStorage.getItem('oi')), formData);

        console.log({
          id: userData.id,
          mobileNumber: telefon ? telefon : "",
          email: email ? email : "",
          fileId: res.data
        });
        try {
          const sendData = {
            id: userData.id,
            mobileNumber: telefon ? telefon : "",
            email: email ? email : "",
            fileId: res.data
          }
          console.log(sendData);
          const res1 = await axiosInstance.patch("user/editProfile", sendData)
          uploaded(res1.data)
          Alert(setAlert, 'success', "Ваша информация была успешно изменена");
          setUpdateModal(false);
        } catch (error) {
          console.log(error);
          Alert(setAlert, 'warning', error?.response?.data);
        }
      } catch (error) {
        console.log(error.response);
        Alert(setAlert, 'warning', error?.response?.data);
      }
    } else {
      try {
        const sendData = {
          id: userData.id,
          mobileNumber: telefon ? telefon : "",
          email: email ? email : "",
        }
        console.log(sendData);
        const res = await axiosInstance.patch("user/editProfile", sendData)
        uploaded(res.data)
        Alert(setAlert, 'success', "Ваша информация была успешно изменена");
        setUpdateModal(false);
      } catch (error) {
        console.log(error);
        Alert(setAlert, 'warning', error?.response?.data);
      }
    }
    setUpdateModal(false)
  }

  return (
    updateModal && (
      <div className='adminWindow1'>
        <div className='adminWindow1Wrapper adminWindow1Wrapper1'>
          <div className="modal-dialog modal-xl customDialog">
            <div className="modal-content" style={{
              boxShadow: '0 .5rem 1rem rgba(0,0,0,.5)'
            }}>
              <div className="modal-header bg-primary "
                style={{ color: "#fff" }}>
                <h5 className="modal-title">Пользовательские настройки</h5>
                <button type="button" className="close" onClick={() => setUpdateModal(false)}>×
                </button>
              </div>
              <form onSubmit={saveUser}>
                <div className="modal-body" style={{
                  overflowY: "scroll"
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
                                defaultValue={userData?.firstName + ' ' + userData?.lastName + ' ' + userData?.middleName}
                              />
                              <label className="label-floating">Ф.И.О</label>
                            </div>
                          </div>
                          <div className="col-lg-3">
                            {file ? (
                              <img src={URL.createObjectURL(file)} alt=""
                                className='imgSettings' />
                            ) : (
                              userData?.file ? (
                                <img
                                  src={url + "/api/file/view/" + userData?.file?.id}
                                  alt="" className='imgSettings' />
                              ) : (
                                <img src={"/assets/user.png"}
                                  alt="" className='imgSettings' />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-lg-5 ">
                        <div className="form-group form-group-floating row">
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <input
                                type="email"
                                disabled={true}
                                className="form-control form-control-outline email"
                                placeholder="Placeholder"
                                defaultValue={userData?.email}
                              />
                              <label className="label-floating">Email</label>
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
                                style={{ textTransform: "capitalize" }}
                                data-mask="+998 (99) 999-99-99"
                                className="form-control form-control-outline telefon"
                                placeholder="Placeholder"
                                defaultValue={userData?.mobileNumber}
                              />
                              <label className="label-floating">Телефон номер</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-9">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12 w-100">
                          <label className="custom-file text-muted w-100"
                            htmlFor={'select'}>
                            <div className={'custom-file-label'}>
                              {fileType ? file?.name : "Фото пользователя"}
                            </div>
                          </label>
                          <input
                            type="file"
                            id={'select'}
                            className="custom-file-input avatar d-none w-100"
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
                      <button type="submit" className="btn btn-primary">Сохранять</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default React.memo(UpdateModal);