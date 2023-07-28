import React, { useEffect, useRef, useState } from "react";
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance, axiosInstanceKadr } from "../../../../../../config";
// import DatePicker from "react-datepicker";
// import InputMask from "react-input-mask";
import Select from "react-select";
// import is from 'is_js';

const AddUser = ({ currentUser, setAlert, setData, data, setName }) => {
  const [openModal, setOpenModal] = useState(false);
  // const [startDate1, setStartDate1] = useState(new Date());
  // const [startDateBirth, setStartDateBirth] = useState(new Date());
  const [son, setSon] = useState(0);
  const [kadrOption, setKadrOption] = useState([])
  const [kadrData, setKadrData] = useState([])
  const [showKadrInfo, setShowKadrInfo] = useState({ isShow: true, id: 0 })
  // const [qidirishData, setQidirishData] = useState({});
  const seriaref = useRef();
  const firstnameref = useRef();
  const lastnameref = useRef();
  const middlenameref = useRef();
  const phoneref = useRef();
  const pinflref = useRef();
  const emailref = useRef();
  const exatref = useRef();
  const birthRef = useRef();
  // const formresetref = useRef();
  // const birthPlaceRef = useRef();

  const oi = localStorage.getItem("oi")

  // reload
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("user/checkSyn")

        if (isMounted)
          setSon(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  //Select option
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstanceKadr.get(`getAllInMainBranch/${oi}`)

        if (isMounted) {
          setKadrData(res.data)

          const arr = res.data?.map((item) => {
            let newOption = {
              value: item.id,
              label: `${item.firstName} ${item.lastName} ${item.middleName}`,
            }
            return newOption
          })

          console.log(arr);
          setKadrOption(arr)

        }
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, oi]);

  const openModalFun = async () => {
    try {
      await axiosInstance.get("user/checkEmployeePlan/" + JSON.parse(localStorage.getItem('oi')))
      setOpenModal(true);
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, "warning", error?.response?.data);
    }
  }

  // refresh
  const Refresh = async () => {
    try {
      await axiosInstance.get("user/syn")
      setSon(0);
    } catch (error) {
      console.log(error.response);
      setAlert({ open: true, text: `${error?.response?.data}`, color: 'warning' })
    }
  }

  // // seria va pinfl bo'yicha malumotlarni qidirish
  // const qidirish = async () => {
  //   // to do server
  //   let date = startDate2.toLocaleDateString().split('.').reverse().join('-');
  //   if (seriaref.current.value) {
  //     if (seriaref.current.value?.length === 10) {
  //       if (date) {
  //         try {
  //           const res = await axiosInstance.post("user/getUserDetailFromApi", {
  //             birthDate: date,
  //             series: seriaref.current.value.toUpperCase(),
  //           })
  //           nameref.current.value = res.data?.nameLatin;
  //           lastnameref.current.value = res.data?.surnameLatin;
  //           middlenameref.current.value = res.data?.fatherNameLatin;
  //           setStartDate1(new Date(res.data?.birth_date));
  //           setQidirishData(res.data);
  //         } catch (error) {
  //           console.log(error.response);
  //           if (error.response.status === 404) {
  //             Alert(setAlert, "warning", "Seria nomer xato yoki tug'ilgan kun kiritilmagan");
  //           } else {
  //             Alert(setAlert, "warning", error.response?.data);
  //           }
  //           setOpenModal(false);
  //         }
  //       } else {
  //         Alert(setAlert, "warning", "Tug'ilgan kun kiritilmagan");
  //         setOpenModal(false);
  //       }
  //     } else {
  //       Alert(setAlert, "warning", "Passport seria xato kiritilgan");
  //       setOpenModal(false);
  //     }
  //   } else {
  //     Alert(setAlert, "warning", "Passport seria kiritilmagan");
  //     setOpenModal(false);
  //   }
  // }

  // add user
  const malumotlarniSaqlash = async () => {
    setOpenModal(false)

    let arr = [];
    for (let i = 0; i < phoneref.current.value?.length; i++) {
      if (parseInt(phoneref.current.value[i]) >= 0) {
        arr.push(phoneref.current.value[i]);
      }
    }

    try {
      let kadr = kadrData?.filter((item) => item.id === showKadrInfo.id)[0]
      console.log(kadr);

      const sendData = {
        birthPlace: kadr.birthPlace,
        birthDate: kadr.birthDate,
        document: kadr.document,
        mobileNumber: kadr.mobileNumber,
        email: kadr.email,
        exat: exatref.current?.value || null,
        birthCountry: "Uzbekistan",
        livestatus: 1,
        isActive: true,
        pnfl: kadr.pin,
        orgId: JSON.parse(localStorage.getItem('oi')),
        surnameLatin: lastnameref.current?.value?.trim().toUpperCase(),
        surnameEngl: lastnameref.current?.value?.trim().toUpperCase(),
        middleName: middlenameref.current?.value?.trim().toUpperCase(),
        nameLatin: firstnameref.current?.value?.trim().toUpperCase(),
      }

      // console.log(sendData);

      const res = await axiosInstance.post("user/createUser", sendData)
      console.log(res.data);
      // kadrga jo`natish
      const resKadr = await axiosInstanceKadr.patch(`connect/${kadr.id}/${res.data.id}`, sendData)
      console.log(resKadr.data);
      Alert(setAlert, "success", "Информация успешно добавлена");
      setData({ ...data, content: [...data.content, res.data] });
    } catch (error) {
      console.log(error);
      Alert(setAlert, "warning", error?.response?.data);
    }

  }

  // search
  const searchName = async (e) => {
    setName(e);
    try {
      const res = await axiosInstance.post("user/searchByName", {
        name: e,
        page: 0,
        orgId: JSON.parse(localStorage.getItem('oi'))
      })
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }



  const changeOptions = (e) => {
    const kadrdata1 = kadrData?.filter((item) => item.id === e.value)[0];
    console.log(kadrdata1);
    // console.log(kadrData?.filter((item) => item.id === e.value)[0]);
    birthRef.current.value = kadrdata1?.birthDate?.split("-").reverse().join(".");
    seriaref.current.value = kadrdata1?.document;
    emailref.current.value = kadrdata1?.email;
    lastnameref.current.value = kadrdata1?.lastName
    firstnameref.current.value = kadrdata1?.firstName;
    middlenameref.current.value = kadrdata1?.middleName;
    phoneref.current.value = kadrdata1?.mobileNumber
    pinflref.current.value = kadrdata1?.pin;
    // birthPlaceRef.current.value = kadrdata1?.birthPlace;
    setShowKadrInfo({ isShow: true, id: e.value });
  }

  return (
    <div className="row">
      <div className="col-lg-6">
        <div>
          <button type="button" className="btn btn-primary" onClick={() => openModalFun()}>
            <i className="icon-user-plus mr-1"></i>Добавить пользователя
          </button>

          {son > 0 && <button type="button" className="btn btn-primary ml-4" onClick={() => Refresh()}>
            Reload
          </button>
          }

        </div>

        {openModal && <div id="modal_large" className="modal fade show" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "flex", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="" style={{ width: "90%", margin: "0 auto" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Добавить пользователя</h5>
                <button onClick={() => { setOpenModal(false); setShowKadrInfo({ isShow: false, id: 0 }) }} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>

              <div className="modal-body">
                <div className="row px-0 mb-3" style={{ justifyContent: "space-between" }}>
                  <div className="col-lg-4">
                    <div className="position-relative">
                      <Select
                        placeholder="Выберите кадр:"
                        options={kadrOption}
                        onChange={e => changeOptions(e)}
                      />
                    </div>
                  </div>

                  <div className=" col-lg-4">
                    <button onClick={malumotlarniSaqlash} type="button" className="w-100 h-100 btn btn-primary py-2"
                      disabled={showKadrInfo ? false : true}>
                      <i className="icon-plus3 mr-1"></i> Добавлять</button>
                  </div>
                </div>

                {
                  showKadrInfo && (
                    <>
                      <hr className="mx-2" />
                      <div className="form-group mt-3">
                        <div className="row mb-3 form-group form-group-floating px-0">
                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline"
                                placeholder="Placeholder"
                                ref={lastnameref}
                                disabled={true}
                              />
                              <label
                                className="label-floating">Фамилия:</label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline"
                                placeholder="Placeholder"
                                ref={firstnameref}
                                disabled={true}
                              />
                              <label
                                className="label-floating">имя:</label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline"
                                placeholder="Placeholder"
                                ref={middlenameref}
                                disabled={true}
                              />
                              <label
                                className="label-floating">Очество:</label>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3 form-group form-group-floating px-0">
                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline"
                                placeholder="Placeholder"
                                ref={seriaref}
                                disabled={true}
                              />
                              <label
                                className="label-floating">Паспорт серии:</label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline"
                                placeholder="Placeholder"
                                ref={pinflref}
                                disabled={true}
                              />
                              <label
                                className="label-floating">ПНФЛ:</label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline"
                                placeholder="Placeholder"
                                ref={birthRef}
                                disabled={true}
                              />
                              <label
                                className="label-floating">Дата рождения:</label>
                            </div>
                          </div>
                        </div>

                        <div className="row mb-0 form-group form-group-floating">
                          <div className="col-lg-6">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline"
                                placeholder="Placeholder"
                                ref={phoneref}
                                // disabled={true}
                                required
                              />
                              <label
                                className="label-floating">Номер телефона:</label>
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard"
                                placeholder="Placeholder"
                                ref={emailref}
                                // disabled={true}
                                required
                              />
                              <label
                                className="label-floating">Email:</label>
                            </div>
                          </div>


                        </div>
                      </div>
                    </>
                  )
                }




              </div>

            </div>
          </div>
        </div>}

      </div>
      <div className="col-6 d-flex justify-content-end">
        <input type="text" className={'form-control form-control-outline'} style={{ width: '300px' }} placeholder="Search..." onChange={(e) => searchName(e.target.value)} />
      </div>
    </div>
  )
}

export default React.memo(AddUser);

{/* <div>
{openModal && (
  <div className="adminWindow" tabIndex="-1">
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header bg-primary text-white">
          <h6 className="modal-title">Foydalanuvchi qo'shish</h6>
          <button type="button" className="close" onClick={() => setOpenModal(false)}>&times;</button>
        </div>

        <div className="modal-body pb-0">
          <form onSubmit={malumotlarniSaqlash} ref={formresetref}>
            <h1 className="text-center NavLink text-color">Foydalanuvchi Qo'shish</h1>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-4">
                  <div className="form-group form-group-floating ">
                    <div className="">
                      <input
                        type="text"
                        data-mask="aa-9999999"
                        maxLength="10"
                        style={{ textTransform: "upperCase" }}
                        className="form-control form-control-outline seria"
                        placeholder="Placeholder"
                        ref={seriaref}
                      />
                      <label className="label-floating">Pasport seria va raqami</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group form-group-floating mb-0">
                    <div className={'changeBox'}
                     
                      <input
                        type="text"
                        className="form-control form-control-outline pinfl"
                        data-mask="9999-9999-9999-99"
                        maxLength="17"
                        placeholder="Placeholder"
                        ref={pinflref}
                      />
                      <label className="label-floating">PinFl</label>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group form-group-floating ">
                    <div className=""  style={{
                          width: '100%',
                          border: '1px solid lightgray',
                          borderRadius: '5px', '&>input': {
                            border: 'none !important',
                            outline: 'none !important'
                          }, '&:hover': {
                            border: 'none !important',
                            outline: 'none !important'
                          }
                        }}>
                        <DatePicker
                          className={'chiquvchiSana'} id={'chiquvchiSana'}
                          selected={startDateBirth}
                          onChange={(date) => setStartDateBirth(date)}
                          dateFormat={'dd.MM.yyyy'}
                          isClearable
                          showYearDropdown
                          scrollableMonthYearDropdown
                          placeholderText="Tug'ilgan sana"
                        />
                    </div>
                  </div>
                </div>
              
              </div>
            </div>
            <hr />
            <br />
            <div className="col-lg-12 px-0">
              <div className="row m-0">
                <div className="col-lg-4">
                  <div className="form-group form-group-floating row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline ism"
                          style={{ textTransform: "capitalize" }}
                          placeholder="Placeholder"
                          ref={nameref}
                        />
                        <label className="label-floating">Ism</label>
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
                          className="form-control form-control-outline familiya"
                          style={{ textTransform: "capitalize" }}
                          placeholder="Placeholder"
                          ref={lastnameref}
                        />
                        <label
                          className="label-floating">Familiya</label>
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
                          className="form-control form-control-outline otasi"
                          style={{ textTransform: "capitalize" }}
                          placeholder="Placeholder"
                          ref={middlenameref}
                        />
                        <label className="label-floating">Otasini ismi</label>
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
                          className="form-control form-control-outline telefon"
                          placeholder="Placeholder"
                          required
                          ref={phoneref}
                        />
                        <label className="label-floating">Telefon raqami</label>
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
                          className="form-control form-control-outline email"
                          placeholder="Placeholder"
                          required
                          ref={emailref}
                        />
                        <label
                          className="label-floating">Email</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group form-group-floating  row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <input
                          type="email"
                          className="form-control form-control-outline exat"
                          placeholder="Placeholder"
                          ref={exatref}
                        />
                        <label
                          className="label-floating">E-xat</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group form-group-floating  row">
                    <div className="col-lg-12">
                      <div className="position-relative">
                        <input
                            type="text"
                            className="form-control form-control-outline exat"
                            placeholder="Placeholder"
                            ref={birthRef}
                        />
                        <label
                            className="label-floating">Tug'ilgan joyi</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="form-group form-group-floating mb-0">
                    <div className={'changeBox'}
                      style={{
                        width: '100%',
                        border: '1px solid lightgray',
                        borderRadius: '5px', '&>input': {
                          border: 'none !important',
                          outline: 'none !important'
                        }, '&:hover': {
                          border: 'none !important',
                          outline: 'none !important'
                        }
                      }}>
                      <DatePicker
                        className={'chiquvchiSana'}
                        id={'chiquvchiSana'}
                        selected={startDate1}
                        onChange={(date) => setStartDate1(date)}
                        dateFormat={'dd.MM.yyyy'}
                        isClearable
                        showYearDropdown
                        scrollableMonthYearDropdown
                        placeholderText="Chiquvchi sana"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="col-lg-12 px-0 mt-1">
              <div className="form-group form-group-floating row">
                <div className="col-lg-12">
                  <div className="position-relative">
                    <button type="submit" className="btn btn-primary form-control form-control-outline">
                      <i className="fas fa-plus mr-1"></i>Qo'shish
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
)}</div> */}