import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select';
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";
import is from 'is_js';
import GetOrganization from "./getOrganization/GetOrganization";

const AddOrganization = ({ currentUser, setAlert, yunalishlar }) => {
  // const [fatherId, setFatherId] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [yunalishTashkilotlar1, setYunalishTashkilotlar1] = useState([]);
  const [openInput, setOpenInput] = useState(false);
  const [yunalishTashkilotlar, setYunalishTashkilotlar] = useState([]);
  const [yunalishTashkilotlarF, setYunalishTashkilotlarF] = useState([]);
  // const [yonalishId, setYonalishId] = useState(0);
  const [iteratinYunalishlar, setIteratinYunalishlar] = useState([]);
  const sitrref = useRef();
  const sitr2ref = useRef();
  const orgNameref = useRef();
  const shortDescref = useRef();
  const addressref = useRef();
  const fullNameref = useRef();
  const phoneref = useRef();
  const emailref = useRef();
  const exatref = useRef();
  const provinceref = useRef();
  const cityref = useRef();
  const directionref = useRef();
  const direction2ref = useRef();
  const direction3ref = useRef();
  const mainOrgref = useRef();
  const passiveOrgref = useRef();
  const direction4ref = useRef();
  const mainOrg2ref = useRef();
  const closeOrgModalref = useRef();

  const clearAllInputData = () => {
    orgNameref.current.value = "";
    shortDescref.current.value = "";
    addressref.current.value = "";
    fullNameref.current.value = "";
    phoneref.current.value = "";
    emailref.current.value = "";
    exatref.current.value = "";
    sitr2ref.current.value = "";
    provinceref.current?.props?.value && provinceref.current.removeValue(provinceref.current.props.value);
    cityref.current?.props?.value && cityref.current.removeValue(cityref.current.props.value);
    directionref.current?.props?.value && directionref.current.removeValue(directionref.current.props.value);
    direction2ref.current?.props?.value && direction2ref.current.removeValue(direction2ref.current.props.value);
    direction3ref.current?.props?.value && direction3ref.current.removeValue(direction3ref.current.props.value);
    direction4ref.current?.props?.value && direction4ref.current.removeValue(direction4ref.current.props.value);
    mainOrgref.current?.props?.value && mainOrgref.current.removeValue(mainOrgref.current.props.value);
    mainOrg2ref.current?.props?.value && mainOrg2ref.current.removeValue(mainOrg2ref.current.props.value);
    passiveOrgref.current?.props?.value && passiveOrgref.current.removeValue(passiveOrgref.current.props.value);
  }

  // yunalishlarni yunalish degan select ga joylashtirish
  useEffect(() => {
    let useEffectCount = true;
    let arr = yunalishlar.map((yun) => (
      { value: yun.id, label: yun.name }
    ))

    if (useEffectCount)
      setIteratinYunalishlar(arr);

    return () => {
      useEffectCount = false;
    }
  }, [yunalishlar]);

  const checked = (e) => {
    setOpenInput(e)
  }

  // const logChange12 = (e) => {
  //   setFatherId(e.value)
  // }

  // yunalishga qarab tashkilotlarni chiqarish
  const logChange123 = async (e) => {
    try {
      const res = await axiosInstance.get('organization/orgType/' + e.value)
      let y1 = [];
      res.data.forEach((y) => {
        y1.push({ value: y.id, label: y.orgName });
      })
      y1.push({ value: null, label: "NONE" });
      setYunalishTashkilotlar1(y1);
    } catch (error) {
      console.log(error?.response);
    }
  }

  // yunalishga qarab tashkilotlarni chiqarish
  const changeYunalish = async (e) => {
    try {
      const res = await axiosInstance.get('organization/orgType/' + e.value)
      let y1 = [];
      res.data.forEach((y) => {
        y1.push({ value: y.id, label: y.orgName });
      })
      setYunalishTashkilotlar(y1);
    } catch (error) {
      console.log(error?.response);
    }
  }

  const changeYunalishF = async (e) => {
    try {
      const res = await axiosInstance.get('organization/orgType/' + e.value)
      let y1 = [];
      res.data.forEach((y) => {
        y1.push({ value: y.id, label: y.orgName });
      })
      setYunalishTashkilotlarF(y1);
    } catch (error) {
      console.log(error?.response);
    }
  }

  // tashkilot qo'shish
  const tashkilotQushish = async (e) => {
    e.preventDefault();
    console.log(mainOrg2ref);
    let korxonaNomi = orgNameref.current.value;
    let qisqachaNomi = shortDescref.current.value;
    let manzil = addressref.current.value;
    let stir = sitr2ref.current.value;
    let fio = fullNameref.current.value;
    let telefon = phoneref.current.value;
    let email = emailref.current.value;
    let exat = exatref.current.value;
    let Viloyat = provinceref.current ? provinceref.current?.props?.value : null;
    let tuman = cityref.current ? cityref.current?.props?.value : null;
    let asosiyBoshTash = mainOrgref.current ? mainOrgref.current?.props?.value : null;
    let qushimchaBoshTash = passiveOrgref.current ? passiveOrgref.current?.props?.value : null;
    let mainDirection = direction3ref.current ? direction3ref.current?.props?.value : null;
    let asosiyBshTashChckbox = mainOrg2ref.current ? mainOrg2ref.current?.props?.value : null;


    if (Viloyat) {
      if (is.email(email)) {
        if (mainDirection) {
          // to do server
          try {
            let sendingData = {
              fake: isChecked,
              stir: stir,
              orgName: korxonaNomi,
              orgShortName: qisqachaNomi,
              orgProvince: Viloyat.label,
              orgDistrict: tuman ? tuman.label : null,
              address: manzil,
              leaderName: fio,
              mobileNumber: telefon,
              orgEmail: email,
              fatherOrganizationId: asosiyBshTashChckbox ? asosiyBshTashChckbox.value : null,
              orgExat: exat || null,
              orgTypeId: mainDirection ? mainDirection.value : [],
              mainOrganizationId: asosiyBoshTash ? asosiyBoshTash.value : null,
              passiveOrganizationId: qushimchaBoshTash ? qushimchaBoshTash.value : null,
            }
            await axiosInstance.post("organization", sendingData)
            Alert(setAlert, "success", "Добавлено успешно");
            clearAllInputData();
            closeOrgModalref.current.click();
          } catch (error) {
            console.log(error)
            if (error?.response?.data) {
              Alert(setAlert, "warning", error?.response?.data);
            }
          }
        } else {
          Alert(setAlert, "warning", "Направление не выбрано");
        }
      } else {
        Alert(setAlert, "warning", "Электронная почта была введена неправильно");
      }
    } else {
      Alert(setAlert, "warning", "Регион не выбран");
    }
  }

  const exit = () => {
    document.querySelector('.goBack').click()
  }

  return (
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title" style={{ textTransform: "capitalize" }}>Добавить организацию</h5>
          <button type="button" className="close" ref={closeOrgModalref} data-dismiss="modal" onClick={exit}>&times;</button>
        </div>

        <div className="modal-body">
          {/* get organization */}
          <GetOrganization
            setAlert={setAlert}
            currentUser={currentUser}
            sitrref={sitrref}
            sitr2ref={sitr2ref}
            orgNameref={orgNameref}
            shortDescref={shortDescref}
            addressref={addressref}
            fullNameref={fullNameref}
            phoneref={phoneref}
            emailref={emailref}
            cityref={cityref}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
            clearAllInputData={clearAllInputData}
          />
          <hr style={{ margin: 0 }} />

          <form onSubmit={tashkilotQushish} className="tashkilotForm2">
            <div className="row mt-3">
              <div className="col-lg-6">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-outline korxonaNomi"
                      placeholder="Placeholder"
                      ref={orgNameref}
                    />
                    <label className="label-floating">Название компании</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-outline qisqachaNomi"
                      placeholder="Placeholder"
                      ref={shortDescref}
                    />
                    <label className="label-floating">Короткое имя</label>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group form-group-floating">
                  <Select
                    isClearable={true}
                    options={[
                      {
                        value: "Viloyat",
                        label: "Viloyat",
                        isDisabled: true
                      },
                      {
                        value: "Andijon viloyati",
                        label: "Andijon viloyati"
                      },
                      {
                        value: "Buxoro viloyati",
                        label: "Buxoro viloyati"
                      },
                      {
                        value: "Fargʻona viloyati",
                        label: "Fargʻona viloyati"
                      },
                      {
                        value: "Jizzax viloyati",
                        label: "Jizzax viloyati"
                      },
                      {
                        value: "Xorazm viloyati",
                        label: "Xorazm viloyati"
                      },
                      {
                        value: "Namangan viloyati",
                        label: "Namangan viloyati"
                      },
                      {
                        value: "Navoiy viloyati",
                        label: "Navoiy viloyati"
                      },
                      {
                        value: "Qashqadaryo viloyati",
                        label: "Qashqadaryo viloyati"
                      },
                      {
                        value: "Qoraqalpogʻiston Respublikasi",
                        label: "Qoraqalpogʻiston Respublikasi"
                      },
                      {
                        value: "Samarqand viloyati",
                        label: "Samarqand viloyati"
                      },
                      {
                        value: "Sirdaryo viloyati",
                        label: "Sirdaryo viloyati"
                      },
                      {
                        value: "Surxondaryo viloyati",
                        label: "Surxondaryo viloyati"
                      },
                      {
                        value: "Toshkent viloyati",
                        label: "Toshkent viloyati"
                      },
                      {
                        value: "Toshkent shahar",
                        label: "Toshkent shahar"
                      }
                    ]}
                    placeholder="Провинция"
                    className="Viloyat"
                    ref={provinceref}
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group form-group-floating">
                  <Select
                    // defaultValue={{ value: "", label: "" }}
                    // options={[
                    //     { value: "Tuman(Shahar)", label: "Tuman(Shahar)", isDisabled: true },
                    //     { value: "Buxor Shahar", label: "Buxor Shahar" },
                    //     { value: "Buxoro Tuman", label: "Buxoro Tuman" },
                    //     { value: "Jondor Tuman", label: "Jondor Tuman" },
                    // ]}
                    // onChange={logChange12}
                    placeholder="Район (Город)"
                    className="tuman"
                    isClearable={true}
                    ref={cityref}
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-outline manzil"
                      placeholder="Placeholder"
                      ref={addressref}
                    />
                    <label className="label-floating">Адрес</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="text"
                      data-mask="999-999-999"
                      className="form-control InputCard form-control-outline stir"
                      placeholder="Placeholder"
                      disabled
                      ref={sitr2ref}
                    />
                    <label className="label-floating">СТИР</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="form-group form-group-floating InputCard">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-outline fio"
                      placeholder="placeholder"
                      ref={fullNameref}
                    />
                    <label className="label-floating">Ф.И.О</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="text"
                      className="form-control form-control-outline InputCard telefon"
                      placeholder="Placeholder"
                      ref={phoneref}
                    />
                    <label className="label-floating">Телефон </label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="email"
                      className="form-control form-control-outline email"
                      placeholder="Placeholder"
                      ref={emailref}
                    />
                    <label className="label-floating">Email</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <input
                      type="email"
                      className="form-control form-control-outline exat"
                      placeholder="Placeholder"
                      ref={exatref}
                    />
                    <label className="label-floating">E-xat</label>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <Select
                      options={iteratinYunalishlar}
                      placeholder="Направление"
                      className="yunalish"
                      onChange={changeYunalish}
                      isClearable={true}
                      ref={directionref}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3 checkedCheckbox">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <Select
                      options={yunalishTashkilotlar}
                      placeholder="Основная организация"
                      className="asosiyBoshTash"
                      isClearable={true}
                      ref={mainOrgref}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 checkedCheckbox">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <Select
                      options={iteratinYunalishlar}
                      onChange={logChange123}
                      isClearable={true}
                      placeholder="Направление"
                      ref={direction2ref}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-3 checkedCheckbox">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <Select
                      options={yunalishTashkilotlar1}
                      placeholder="Дополнительная головная организация"
                      className="qushimchaBoshTash"
                      isClearable={true}
                      ref={passiveOrgref}
                    />
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <Select
                      options={iteratinYunalishlar}
                      placeholder="направление"
                      className="yunalishO"
                      // onChange={orgTypeId}
                      isClearable={true}
                      ref={direction3ref}
                    />
                  </div>
                </div>
              </div>

              {/*checked*/}
              <div className={'col-lg-12'}>
                <div className="d-flex gap-2">
                  <input type="checkbox"
                    onClick={(e) => checked(e.target.checked)}
                    className="checkboxInput cursor-pointer" style={{
                      width: '20px',
                      height: "20px",
                      padding: "20px"
                    }} />
                  <label htmlFor="checkboxInput" style={{ color: "blue", marginLeft: "20px" }}>Основная головная организация</label>
                </div>

                {openInput ?
                  <div className={'checkedBoxInputs row'}>
                    <div className="col-lg-6">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              options={iteratinYunalishlar}
                              placeholder="Направление"
                              className="yunalish"
                              onChange={changeYunalishF}
                              isClearable={true}
                              ref={direction4ref}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 checkedCheckbox">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              options={yunalishTashkilotlarF}
                              placeholder="Основная организация"
                              className="asosiyBoshTashCheckBox"
                              isClearable={true}
                              ref={mainOrg2ref}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> : ""
                }
              </div>
              <div className="col-lg-12 mt-3" id="passposrtMalumotlari" style={{ display: "none" }}>
                <div className="form-group form-group-floating">
                  <div className="position-relative">
                    <Select
                      options={[
                        {
                          value: "Tuman tashkilot",
                          label: "Tuman tashkilot",
                          isDisabled: true
                        },
                        { value: "Buxoro", label: "Buxoro" },
                        { value: "Navoiy", label: "Navoiy" },
                        { value: "Toshkent", label: "Toshkent" },
                        { value: "Andijon", label: "Andijon" },
                      ]}
                      placeholder="Районная организация"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row d-flex justify-content-end">
              <div className="col-lg-2 text-right">
                <button type="submit" className="btn btn-primary">
                  <i className="icon-floppy-disk"></i>Сохранять
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AddOrganization);