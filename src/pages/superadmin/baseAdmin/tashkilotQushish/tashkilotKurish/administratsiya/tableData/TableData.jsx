import React, { useRef, useState } from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";
import Select from 'react-select';
import is from "is_js";

const TableData = ({ organization, currentUser, setAlert, organizationId, params, purpose, setOrganization }) => {
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const nameref = useRef();
  const lastNameref = useRef();
  const middleNameref = useRef();
  const phoneref = useRef();
  const emailref = useRef();
  const exatref = useRef();
  const purposeref = useRef();
  const commentref = useRef();
  // const resetForm = useRef();
  console.log(organization)
  // malumotni o'chirish
  const Uchirish = async (dat) => {
    try {
      const res=await axiosInstance.delete(`organization/adminstrator/${dat.id}/${params.id}`)
      console.log(res)
      let arr = organization.filter((o) => {
        return o.id !== dat.id;
      })
      setOrganization(arr);
    } catch (error) {
      console.log(error.response);
    }
    setDeleteModal({ open: false, obj: {} });
  }

  const uzgartirish = (dat) => {
    setUpdateModal({ open: true, obj: dat });
    if (updateModal.open) {
      dat.purpose?.purpose && purposeref.current.props.onChange({ value: dat.purpose.id, label: dat.purpose.purpose });
      nameref.current.value = dat.firstName;
      lastNameref.current.value = dat.lastName;
      middleNameref.current.value = dat.middleName;
      phoneref.current.value = dat.mobileNumber;
      emailref.current.value = dat.email;
      exatref.current.value = dat.exat;
      commentref.current.value = dat.comment;
      // document.querySelector('.faoliyatStatusiUzgartirish').querySelector('.css-qc6sy-singleValue').textContent = dat.purpose?.purpose
    }
  }

  // malumotlarni o'zgartirish
  const malumotlarniUzgartirish = async (dat) => {
    let ismUzgartirish = nameref.current.value;
    let familiyaUzgartirish = lastNameref.current.value;
    let otasiNomiUzgartirish = middleNameref.current.value;
    let telefonUzgartirish = phoneref.current.value;
    let emailUzgartirish = emailref.current.value;
    let exatUzgartirish = exatref.current.value;
    let faoliyatStatusiUzgartirish = purposeref.current?.props?.value;  //document.querySelector('.faoliyatStatusiUzgartirish').querySelector('.css-qc6sy-singleValue')?.textContent;
    let izohUzgartirish = commentref.current.value;

    let soni = 0;
    for (let i = 0; i < telefonUzgartirish.length; i++) {
      if (parseInt(telefonUzgartirish[i]) > 0) {
        soni++;
      }
    }

    if (ismUzgartirish) {
      if (ismUzgartirish.length > 3) {
        if (familiyaUzgartirish) {
          if (otasiNomiUzgartirish) {
            if (soni === 12) {
              if (is.email(emailUzgartirish)) {
                if (faoliyatStatusiUzgartirish) {
                  try {
                    // let arr1 = purpose.filter((p) => {
                    //   return p.label === faoliyatStatusiUzgartirish;
                    // })
                    const res = await axiosInstance.patch("organization/adminstrator", {
                      id: dat.id,
                      comment: izohUzgartirish || null,
                      firstName: ismUzgartirish,
                      lastName: familiyaUzgartirish,
                      middleName: otasiNomiUzgartirish,
                      mobileNumber: telefonUzgartirish,
                      email: emailUzgartirish,
                      exat: exatUzgartirish || null,
                      purposeId: faoliyatStatusiUzgartirish ? faoliyatStatusiUzgartirish.value : null  // arr1[0].value
                    })
                    let arr = organization.filter((o) => {
                      if (o.id === res.data.id) {
                        o.id = res.data.id;
                        o.comment = res.data.comment;
                        o.firstName = res.data.firstName;
                        o.lastName = res.data.lastName;
                        o.middleName = res.data.middleName;
                        o.mobileNumber = res.data.mobileNumber;
                        o.email = res.data.email;
                        o.exat = res.data.exat;
                        o.purpose = res.data.purpose;
                      }
                      return o;
                    })
                    Alert(setAlert, "success", "Информация успешно изменена");
                    setOrganization(arr);
                    purposeref.current?.props?.value && purposeref.current.removeValue(purposeref.current.props.value);
                    nameref.current.value = "";
                    lastNameref.current.value = "";
                    middleNameref.current.value = "";
                    phoneref.current.value = "";
                    emailref.current.value = "";
                    exatref.current.value = "";
                    commentref.current.value = "";
                    setUpdateModal({ open: false, obj: {} });
                  } catch (error) {
                    console.log(error.response);
                    setUpdateModal({ open: false, obj: {} });
                    Alert(setAlert, "warning", error?.response?.data);
                  }
                } else {
                  Alert(setAlert, "warning", "Статус активности не выбран");
                  setUpdateModal({ open: false, obj: {} });
                }
              } else {
                Alert(setAlert, "warning", "Электронная почта не введена");
                setUpdateModal({ open: false, obj: {} });
              }
            } else {
              Alert(setAlert, "warning", "Номер телефона был введен неверно");
              setUpdateModal({ open: false, obj: {} });
            }
          } else {
            Alert(setAlert, "warning", "Имя отца не указано");
            setUpdateModal({ open: false, obj: {} });
          }
        } else {
          Alert(setAlert, "warning", "Фамилия не введена ");
          setUpdateModal({ open: false, obj: {} });
        }
      } else {
        Alert(setAlert, "warning", "Имя должно содержать не менее 3 букв");
        setUpdateModal({ open: false, obj: {} });
      }
    } else {
      Alert(setAlert, "warning", "Имя не введено");
      setUpdateModal({ open: false, obj: {} });
    }
  }

  const Refresh = async (id, organizationId) => {
    try {
      await axiosInstance.post("organization/adminstrator/syn", {
        id: id,
        organizationId: organizationId
      })
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, "warning", error?.response?.data);
    }
  }

  return (
    <>
      <table className="table mt-2 table-bordered  table-striped table-hover Tab" >
        <thead>
          <tr className="bg-dark text-white NavLink text-center">
            <th style={{ width: "5%" }}>№</th>
            <th style={{ width: "45%" }}>ФИШ</th>
            <th style={{ width: "45%" }}>Номер телефона</th>
            <th style={{ width: "5%" }} className="text-center">Действия</th>
          </tr>
        </thead>
        <tbody>
          {organization?.length > 0 && organization?.map((dat, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{dat?.firstName} {dat?.lastName} {dat?.middleName}</td>
              <td>{dat?.mobileNumber}</td>
              <td>
                <div className="icon d-flex justify-content-center align-items-center">
                  <span className="infoBtn bg-dark cursor-pointer" data-popup="tooltip" title="O'zgartirish" onClick={() => uzgartirish(dat)}><i className="icon-pencil5"></i> </span>
                  <span className="infoBtn bg-dark cursor-pointer" data-popup="tooltip" title="O'chirish" onClick={() => setDeleteModal({ open: true, obj: dat })}><i className="icon-trash"></i> </span>
                  {/*{dat?.userRoles[0]?.orgId === null ? <button type="button" className="bg-dark infoBtn"*/}
                  {/*  onClick={() => Refresh(dat?.id, organizationId)}>*/}
                  {/*  <i className="fa-solid fa-arrows-rotate"></i>*/}
                  {/*</button> : ''*/}
                  {/*}*/}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* o'chirish modal */}
      {deleteModal.open && (
        <div className="adminWindow">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h6 className="modal-title">Удалить окно</h6>
                <button type="button" className="close" onClick={() => setDeleteModal({ open: false, obj: {} })}>×</button>
              </div>
              <div className="modal-body text-center">
                <h3 style={{ textTransform: "upperCase", fontWeight: "bold" }} className="text-danger">Будьте в курсе!</h3>
                <h5>Вы хотите удалить эту информацию? </h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-link bekorQilish" onClick={() => setDeleteModal({ open: false, obj: {} })}>Отмена</button>
                <button type="button" className="btn btn-primary" onClick={() => Uchirish(deleteModal.obj)}>Удалить</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* o'zgartirish */}
      {updateModal.open && (
        <div className="adminWindow">
          <div className="modal-dialog modal-lg ">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h1 className="modal-title">Изменять</h1>
                <button type="button" className="close" onClick={() => setUpdateModal({ open: false, obj: {} })} >&times;</button>
              </div>
              <div className="modal-body">
                <form className="formaMalumotlariUzgartirish">
                  <div className="col-lg-12 px-0">
                    <div className="row m-0">
                      <div className="col-lg-4">
                        <div className="form-group form-group-floating row">
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline ismUzgartirish"
                                placeholder="Placeholder"
                                // defaultValue={updateModal.obj?.firstName}
                                ref={nameref}
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
                                className="form-control form-control-outline familiyaUzgartirish"
                                placeholder="Placeholder"
                                // defaultValue={updateModal.obj?.lastName}
                                ref={lastNameref}
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
                                className="form-control form-control-outline otasiNomiUzgartirish"
                                placeholder="Placeholder"
                                // defaultValue={updateModal.obj?.middleName}
                                ref={middleNameref}
                              />
                              <label className="label-floating">Отчество</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12 px-0">
                    <div className="row m-0">
                      <div className="col-lg-4">
                        <div className="form-group form-group-floating row">
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <input
                                type="text"
                                data-mask="+998(99) 999-99-99"
                                className="form-control form-control-outline telefonUzgartirish"
                                placeholder="Placeholder"
                                // defaultValue={updateModal.obj?.mobileNumber}
                                required
                                ref={phoneref}
                              />
                              <label className="label-floating">Номер телефона</label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4">
                        <div className="form-group form-group-floating row">
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <input
                                type="email"
                                className="form-control form-control-outline emailUzgartirish"
                                placeholder="Placeholder"
                                required
                                // defaultValue={updateModal.obj?.email}
                                ref={emailref}
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
                                type="email"
                                className="form-control form-control-outline exatUzgartirish"
                                placeholder="Placeholder"
                                required
                                // defaultValue={updateModal.obj?.exat}
                                ref={exatref}
                              />
                              <label className="label-floating">E-xat</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="text-center NavLink text-color">Супер админ</h1> <br />
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group form-group-floating row">
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <Select
                                // defaultValue={{ value: updateModal?.obj?.purpose?.purpose, label: updateModal?.obj?.purpose?.purpose }}
                                options={purpose}
                                placeholder="Статус активности"
                                className="faoliyatStatusiUzgartirish"
                                ref={purposeref}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="form-group form-group-floating row">
                          <div className="col-lg-12">
                            <div className="position-relative">
                              <textarea
                                className="form-control form-control-outline izohUzgartirish"
                                placeholder="Placeholder"
                                rows={2}
                                // defaultValue={updateModal.obj?.comment}
                                ref={commentref}
                              />
                              <label className="label-floating">Комментарий</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* e-imzo */}
                  {/* <div className="row mt-2 d-flex justify-content-end" >
                    <div className="col-lg-6">
                      <div className="card mr-2">
                        <div className="form-group text-color d-flex align-items-end p-2">
                          <i className="fas fa-key mr-1 fa-2x mb-2"></i>
                          <div className="w-100" style={{ fontSize: "12px", textTransform: "capitalize" }}>
                            <label className="color-black">Elektron kalitni tanlang</label>
                            <Select
                              // defaultValue={options[1]}
                              options={[
                                { value: "Elektron kalitni tanlang", label: "Elektron kalitni tanlang", isDisabled: true },
                                { value: "To'rayev Hikmatullo Hamroyevich", label: "To'rayev Hikmatullo Hamroyevich" },
                                { value: "I.Istamov", label: "I.Istamov" },
                                { value: "D.Sodiqov", label: "D.Sodiqov" },
                              ]}
                              // onChange={logChange}
                              placeholder="Elektron kalitni tanlang"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <hr />
                  <div className="col-lg-12">
                    <div className="form-group">
                      <button type="button" onClick={() => malumotlarniUzgartirish(updateModal.obj)} className="btn btn-primary" style={{ width: "100%" }}>
                        <i className="fas fa-save mr-1"></i>Сохранять
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default React.memo(TableData);