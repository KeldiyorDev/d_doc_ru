import React, { useState } from "react";
import { axiosInstance, url } from "../../../../config";
import { Alert } from "../../../alert/Alert";
import { useDispatch } from "react-redux";
import { LOGIN_SUCCESS } from "../../../../context/AuthReducer";
import { logInSuccess } from "../../../../redux/actions/actionSingInSingOut";

const OpenModal = ({ updateModal, setUpdateModal, currentUser, setAlert, userData }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const fileType = (file?.type === "image/png" || file?.type === "image/jpg" || file?.type === "image/jpeg");

  const saveUser = async (e) => {
    e.preventDefault();
    // to do server
    let ism = document.querySelector('.ism').value;
    let familiya = document.querySelector('.familiya').value;
    let otasi = document.querySelector('.otasi').value;
    let email = document.querySelector('.email').value;
    let telefon = document.querySelector('.telefon').value;
    let tugilganKun = document.querySelector('.tugilganKun').value;
    let shahar = document.querySelector('.shahar').value;

    if (fileType) {
      const formData = new FormData();
      formData.append("logo", file);

      try {
        // faylni o'zini yuborish
        const fileId = await axiosInstance.post("document/saveDuplicateFile/" + JSON.parse(localStorage.getItem('oi')), formData)
        try {
          const res = await axiosInstance.patch("user/editProfile", {
            id: userData.id,
            firstName: ism ? ism : "",
            lastName: familiya ? familiya : "",
            middleName: otasi ? otasi : "",
            email: email ? email : "",
            mobileNumber: telefon ? telefon : "",
            birthDate: tugilganKun ? tugilganKun : "",
            birthCountry: shahar ? shahar : "",
            fileId: fileId.data
          })
          Alert(setAlert, "success", "Информация успешно изменена");
          // const userData1 = JSON.parse(jwtDecode(res.data)?.supperAdmin);
          // setUserData(userData1);
          setUpdateModal(false);
          dispatch(LOGIN_SUCCESS(res.data));
          logInSuccess(res?.data)
          // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (error) {
          console.log(error.response);
          Alert(setAlert, "warning", error?.response?.data);
        }
      } catch (error) {
        console.log(error.response);
        Alert(setAlert, "warning", error?.response?.data);
      }
    } else {
      try {
        const res = await axiosInstance.patch("user/updateUser", {
          id: userData.id,
          firstName: ism,
          lastName: familiya,
          middleName: otasi,
          email: email,
          mobile_number: telefon,
          birthDate: tugilganKun,
          birthCountry: shahar
        })
        Alert(setAlert, "success", "Информация успешно изменена");
        // const userData1 = JSON.parse(jwtDecode(res.data)?.supperAdmin);
        // setUserData(userData1);
        setUpdateModal(false);
        // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        dispatch(LOGIN_SUCCESS(res.data));
        logInSuccess(res.data)
      } catch (error) {
        console.log(error.response);
        Alert(setAlert, "warning", error?.response?.data);
      }
      setUpdateModal(false);
    }
  }

  return (
    updateModal && (
      <div className='adminWindow1'>
        <div className='adminWindow1Wrapper'>
          <div className="modal-dialog modal-xl customDialog">
            <div className="modal-content">
              <div className="modal-header bg-primary " style={{ color: "#fff" }}>
                <h5 className="modal-title">Пользовательские настройки</h5>
                <button type="button" className="close" onClick={() => setUpdateModal(false)}>×
                </button>
              </div>
              <form onSubmit={saveUser}>
                <div className="modal-body">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group form-group-floating row">
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <input
                                type="text"
                                disabled={true}
                                style={{ textTransform: "capitalize" }}
                                className="form-control form-control-outline ism"
                                placeholder="Placeholder"
                                defaultValue={userData?.firstName}
                              />
                              <label className="label-floating">Имя</label>
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
                                disabled={true}
                                style={{ textTransform: "capitalize" }}
                                className="form-control form-control-outline familiya"
                                placeholder="Placeholder"
                                defaultValue={userData?.lastName}
                              />
                              <label className="label-floating">Фамилия</label>
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
                                disabled={true}
                                style={{ textTransform: "capitalize" }}
                                className="form-control form-control-outline otasi"
                                placeholder="Placeholder"
                                defaultValue={userData?.middleName}
                              />
                              <label className="label-floating">Очество</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-group form-group-floating row">
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <input
                                type="text"
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
                                // disabled={true}
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
                      <div className="col-lg-4">
                        <div className="form-group form-group-floating row">
                          {file ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt=""
                              style={{
                                aspectRatio: 3 / 3
                              }}
                              className='supAdminImg' />
                          ) : (
                            userData?.file ? (
                              <img
                                src={url + "/api/file/view/" + userData?.file?.id}
                                alt=""
                                style={{
                                  aspectRatio: 3 / 3
                                }}
                                className='supAdminImg' />
                            ) : (
                              <img
                                src={"/assets/user.png"}
                                alt=""
                                style={{
                                  aspectRatio: 3 / 3
                                }}
                                className='supAdminImg' />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-lg-4 w-100">
                        <div className="form-group form-group-floating row">
                          <div className="col-lg-12">
                            <div className="position-relative w-100">
                              <input
                                type="text"
                                disabled={true}
                                style={{ textTransform: "capitalize" }}
                                className="form-control form-control-outline shahar"
                                placeholder="Placeholder"
                                defaultValue={userData?.birthCountry}
                              />
                              <label className="label-floating w-100">Город</label>
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
                                // disabled={true}
                                className="form-control form-control-outline tugilganKun"
                                // id="chiquvchiSana"
                                placeholder="Placeholder"
                                defaultValue={userData?.birthDate}
                              />
                              <label className="label-floating">Дата рождения</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12">
                          <label className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              accept=".png, .jpg, .jpeg"
                              onClick={(e) => e.target.value = null}
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                            <span className="custom-file-label text-muted w-100"
                              style={{ padding: "auto" }}>
                              {fileType ? file?.name : "Фото пользователя"}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 pr-0">
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

export default React.memo(OpenModal);