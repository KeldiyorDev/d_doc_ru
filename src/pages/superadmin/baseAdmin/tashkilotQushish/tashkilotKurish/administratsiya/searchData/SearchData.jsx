import React, { useEffect, useRef, useState } from "react";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../../config";
import Select from 'react-select';
import is from "is_js";

const SearchData = ({ currentUser, setAlert, params, purpose, setPurpose, setOrganization }) => {
  const [user, setUser] = useState({});
  const [check, setCheck] = useState(true)
  const seriaref = useRef();
  const pinflref = useRef();
  const birthref = useRef();
  const nameref = useRef();
  const lastNameref = useRef();
  const middleNameref = useRef();
  const phoneref = useRef();
  const emailref = useRef();
  const exatref = useRef();
  const purposeref = useRef();
  const commentref = useRef();
  const resetForm = useRef();

  // faoliyat statuslarini olish
  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("purpose")
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.purpose });
        })

        if (useEffectCount)
          setPurpose(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // pinpp va seria orqali malumotlarni qidirish
  const qidirish = async () => {
    let passport1 = seriaref.current.value;
    let pinfl = pinflref.current.value;

    if (passport1.length === 10) {
      if (pinfl.length === 17) {
        try {
          const res = await axiosInstance.post("user/getUserDetailFromApi", {
            seria: passport1.toUpperCase(),
            pinpp: pinfl
          })
          setUser(res.data.data);
        } catch (error) {
          console.log(error.response);
          Alert(setAlert, "warning", "Информация не найдена");
        }
      } else {
        Alert(setAlert, "warning", "ПИНФЛ не включен");
      }
    } else {
      Alert(setAlert, "warning", "Серия паспорта не включена");
    }
  }

  // malumotlarni saqlash
  const malumotlarniSaqlash = async (e) => {
    e.preventDefault();
    let passport1 = seriaref.current.value;
    let pinfl = pinflref.current.value;
    let birthDate = birthref.current.value;
    let ism = nameref.current.value;
    let familiya = lastNameref.current.value;
    let otasiNomi = middleNameref.current.value;
    let telefon = phoneref.current.value;
    let email = emailref.current.value;
    let exat = exatref.current.value;
    let faoliyatStatusi = purposeref.current?.props?.value;
    let izoh = commentref.current.value;

    // let soni = 0;
    // for (let i = 0; i < telefon.length; i++) {
    //   if (parseInt(telefon[i]) > 0) {
    //     soni++;
    //   }
    // }

    if (ism) {
      if (ism.length >= 3) {
        if (familiya) {
          if (otasiNomi) {

            if (is.email(email)) {
              if (faoliyatStatusi) {
                // to do server
                const sendingData = {
                  comment: izoh,
                  passportSerialNumber: passport1.toUpperCase(),
                  pnfl: pinfl.split("-").join(""),
                  firstName: ism,
                  lastName: familiya,
                  middleName: otasiNomi,
                  birthDay: birthDate.split(".").reverse().join("-"),
                  birthPlace: user?.birthPlace,
                  birthCountry: user?.birthCountry,
                  lifeStatus: user?.livestatus,
                  nationality: user?.nationality,
                  personality: null,
                  citizenship: user?.citizenship,
                  gender: user?.sex,
                  pport_issue_place: null,
                  pport_issue_date: null,
                  pport_expire_date: null,
                  mobileNumber: telefon,
                  email: email,
                  exat: exat,
                  ownInn: null,
                  organizationId: params.id,
                  purposeId: faoliyatStatusi ? faoliyatStatusi.value : null
                }

                console.log(sendingData);
                try {
                  const res = await axiosInstance.post("organization/adminstrator", sendingData)
                  Alert(setAlert, "success", "Информация успешно добавлена!");
                  resetForm.current.reset();
                  setUser({});
                  document.querySelector('.close4').click();
                  setOrganization(prev => [...prev, res.data]);
                } catch (error) {
                  console.log(error.response);
                  Alert(setAlert, "warning", error?.response?.data);
                  resetForm.current.reset();
                  setUser({});
                }
              } else {
                Alert(setAlert, "warning", "Статус активности не выбран");
              }
            } else {
              Alert(setAlert, "warning", "Электронная почта не введена");
            }
          } else {
            Alert(setAlert, "warning", "Имя отца не указано");
          }
        } else {
          Alert(setAlert, "warning", "Фамилия не введена");
        }
      } else {
        Alert(setAlert, "warning", "Имя должно содержать не менее 3 букв");
      }
    } else {
      Alert(setAlert, "warning", "Имя не введено");
    }
  }

  return (
    <form onSubmit={malumotlarniSaqlash} className="formaMalumotlari" ref={resetForm}>
      <h1 className="text-center NavLink text-color">Администратор организации</h1> <br />
      {/* search */}
      {/* <div className="col-lg-12">
        <div className="row">
          <div className="col-lg-3" style={{ display: "flex", alignContent: "center", marginTop: "16px" }}>
            <div className="custom-control custom-checkbox custom-control-primary" style={{ fontSize: "1rem", display: "flex", alignContent: "center" }}
            >
              <input type="checkbox" className="custom-control-input" id="chek" defaultChecked={check} onChange={() => setCheck(!check)} />
              <label className="custom-control-label" for="chek" style={{ textTransform: "uppercase" }}>Hujjatsiz kiritish</label>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group form-group-floating">
              <div className="position-relative">
                <input
                  type="text"
                  data-mask="aa-9999999"
                  maxLength="10"
                  style={{ textTransform: "upperCase" }}
                  className="form-control form-control-outline passport1"
                  placeholder="Placeholder"
                  ref={seriaref}
                  disabled={check}
                />
                <label className="label-floating">Pasport seria va raqami</label>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group form-group-floating mb-0">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline pinfl"
                  data-mask="9999-9999-9999-99"
                  maxLength="17"
                  placeholder="Placeholder"
                  ref={pinflref}
                  disabled={check}
                />
                <label className="label-floating">PinFl</label>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group form-group-floating row">
              <div className="col-lg-12">
                <div className="position-relative">
                  <button
                    type="button"
                    disabled={check}
                    onClick={qidirish}
                    className="btn btn-primary form-control form-control-outline">
                    Qidirish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr style={{ margin: "0" }} /><br /> */}

      {/* all found data */}
      <div className="col-lg-12 px-0">
        <div className="row m-0">
          <div className="col-lg-4">
            <div className="form-group form-group-floating row">
              <div className="col-lg-12">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control form-control-outline ism"
                    placeholder="Placeholder"
                    defaultValue={user?.nameLatin}
                    ref={nameref}
                    disabled={!check}
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
                    className="form-control form-control-outline familiya"
                    placeholder="Placeholder"
                    defaultValue={user?.surnameLatin}
                    ref={lastNameref}
                    disabled={!check}
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
                    className="form-control form-control-outline otasiNomi"
                    placeholder="Placeholder"
                    defaultValue={user?.patronymLatin}
                    ref={middleNameref}
                    disabled={!check}
                  />
                  <label className="label-floating">очество</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {check && (
        <div className="col-lg-12 px-0">
          <div className="row m-0">
            <div className="col-lg-4">
              <div className="form-group form-group-floating row">
                <div className="col-lg-12">
                  <div className="position-relative">
                    <input style={{ textTransform: "uppercase" }}
                      type="text"
                      data-mask="aa-9999999"
                      className="form-control form-control-outline telefon"
                      placeholder="Placeholder"
                      required
                      ref={seriaref}
                      disabled={!check}
                    />
                    <label className="label-floating">Серия паспорта</label>
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
                      data-mask="9999-9999-9999-99"
                      className="form-control form-control-outline telefon"
                      placeholder="Placeholder"
                      required
                      ref={pinflref}
                      disabled={!check}
                    />
                    <label className="label-floating">ПИНФЛ</label>
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
                      data-mask="99.99.9999"
                      className="form-control form-control-outline telefon"
                      placeholder="Placeholder"
                      required
                      ref={birthref}
                      disabled={!check}
                    />
                    <label className="label-floating">Дата рождения</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    disabled={!check}
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
                    className="form-control form-control-outline email"
                    placeholder="Placeholder"
                    required
                    ref={emailref}
                    disabled={!check}
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
                    className="form-control form-control-outline exat"
                    placeholder="Placeholder"
                    ref={exatref}
                    disabled={!check}
                  />
                  <label className="label-floating">E-xat</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-center NavLink text-color">Супер админ</h1> <br />
      <div className="col-lg-12 px-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="form-group form-group-floating row">
              <div className="col-lg-12">
                <div className="position-relative">
                  <Select
                    options={purpose}
                    placeholder="Статус активности"
                    className="faoliyatStatusi"
                    isClearable={true}
                    ref={purposeref}
                    isDisabled={!check}
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
                    className="form-control form-control-outline izoh"
                    placeholder="Placeholder"
                    rows={2}
                    ref={commentref}
                    disabled={!check}
                  />
                  <label className="label-floating">Комментарий</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* e-imzo => o'chirilmasin */}
      {/* <div className="row mt-2 d-flex justify-content-end" >
        <div className="col-lg-6">
          <div className="card mr-2">
            <div className="form-group text-color d-flex align-items-end p-2">
              <i className="fas fa-key mr-1 fa-2x mb-2"></i>
              <div className="w-100" style={{ fontSize: "12px", textTransform: "capitalize" }}>
                <label className="color-black">Elektron kalitni tanlang</label>
                <Select
                  options={[
                    { value: "Elektron kalitni tanlang", label: "Elektron kalitni tanlang", isDisabled: true },
                    { value: "To'rayev Hikmatullo Hamroyevich", label: "To'rayev Hikmatullo Hamroyevich" },
                    { value: "I.Istamov", label: "I.Istamov" },
                    { value: "D.Sodiqov", label: "D.Sodiqov" },
                  ]}
                  // onChange={logChange}
                  placeholder="Elektron kalitni tanlang"
                  isClearable={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <hr />
      <div className="col-lg-12">
        <div className="form-group mb-1">
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            <i className="fas fa-save mr-1"></i>Сохранять
          </button>
        </div>
      </div>
    </form>
  )
}

export default React.memo(SearchData);