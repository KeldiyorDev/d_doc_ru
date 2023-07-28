import React, { useEffect, useRef, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import TashkilotKurishNavbar from "../tashkilotKurishNavbar/TashkilotKurishNavbar";
import Select from 'react-select';
import { axiosInstance, url } from "../../../../../../config";
import './tashkilotKurishContent.css';
import is from 'is_js';
import AlertContent, { Alert } from '../../../../../../component/alert/Alert';

const TashkilotKurishContent = ({ currentUser }) => {
  const [file, setFile] = useState(null);
  const params = useParams();
  const history = useHistory();
  const [organization, setOrganization] = useState([]);
  const [yunalishlar, setYunalishlar] = useState([]);
  const [yunalishTashkilotlar, setYunalishTashkilotlar] = useState([]);
  const [yunalishTashkilotlarF, setYunalishTashkilotlarF] = useState([]);
  const [yunalishTashkilotlar1, setYunalishTashkilotlar1] = useState([]);
  const [status, setStatus] = useState([]);
  const [employeePlan, setEmployeePlan] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  let fileType = (file?.type === "image/jpg" || file?.type === "image/jpeg" || file?.type === "image/png");

  // via checkbox
  const mainOrgChecked = useRef();
  const mainDirectionNameCheckboxref = useRef();
  const mainOrgNameCheckboxref = useRef();

  const orgNameref = useRef();
  const orgShortNameref = useRef();
  const statusref = useRef();
  const provinceref = useRef();
  const orgDistrictref = useRef();
  const addressref = useRef();
  const stirref = useRef();
  const fullNameref = useRef();
  const phoneref = useRef();
  const emailref = useRef();
  const exatref = useRef();
  const direction1ref = useRef();
  const urlref = useRef();
  const direction2ref = useRef();
  const mainOrgref = useRef();
  const direction3ref = useRef();
  const passiveMainOrgref = useRef();
  const employeeCountref = useRef();

  // id bo'yicha malumotlarni o'qib olish
  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get('organization/' + params.id)

        if (useEffectCount) {
          console.log(res.data);
          orgNameref.current.value = res.data?.orgName;
          exatref.current.value = res.data?.orgExat;
          addressref.current.value = res.data?.address;
          orgShortNameref.current.value = res.data?.orgShortName;
          statusref.current.props.onChange({ value: res.data?.organizationStatus?.id, label: res.data?.organizationStatus?.name });
          provinceref.current.props.onChange({ value: res.data?.orgProvince, label: res.data?.orgProvince });
          stirref.current.value = res.data?.stir;
          fullNameref.current.value = res.data?.leaderName;
          phoneref.current.value = res.data?.mobileNumber;
          emailref.current.value = res.data?.orgEmail;
          direction1ref.current.props.onChange({ value: res.data?.orgType?.id, label: res.data?.orgType?.name });
          urlref.current.value = res.data?.orgSiteUrl;
          res.data?.mainOrganization?.orgType?.name && direction2ref.current.props.onChange({ value: res.data?.mainOrganization?.orgType?.id, label: res.data?.mainOrganization?.orgType?.name });
          res.data?.mainOrganization?.orgName && mainOrgref.current.props.onChange({ value: res.data?.mainOrganization?.orgId, label: res.data?.mainOrganization?.orgName });
          res.data?.passiveOrganization?.orgType?.name && direction3ref.current.props.onChange({ value: res.data?.passiveOrganization?.orgType?.id, label: res.data?.passiveOrganization?.orgType?.name });
          res.data?.passiveOrganization?.orgName && passiveMainOrgref.current.props.onChange({ value: res.data?.passiveOrganization?.orgId, label: res.data?.passiveOrganization?.orgName });
          res.data?.orgEmployeePlan?.name && employeeCountref.current.props.onChange({ value: res.data?.orgEmployeePlan?.id, label: res.data?.orgEmployeePlan?.name });
          if (res.data.fatherOrganization) {
            res.data?.fatherOrganization?.orgName && mainOrgNameCheckboxref.current.props.onChange({ value: res.data?.fatherOrganization?.id, label: res.data?.fatherOrganization?.orgName });
            res.data?.fatherOrganization?.orgType?.name && mainDirectionNameCheckboxref.current.props.onChange({ value: res.data?.fatherOrganization?.orgType?.id, label: res.data?.fatherOrganization?.orgType?.name });
            mainOrgChecked.current.style.display = "flex";
          } else {
            mainOrgChecked.current.style.display = "none";
          }
          setOrganization(res.data);
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser, params.id]);

  // organizatsiyalar soni
  useEffect(() => {
    let useEffectCount = true;
    // tooltipni o'chirish
    document.querySelector('.tooltip')?.remove();
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/employeePlan")
        let arr = [];
        res.data.forEach((d, i) => {
          arr.push({ value: d.id, label: d.name });
        })

        if (useEffectCount)
          setEmployeePlan(arr);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser]);

  // asosiy bosh tashkilot (checkbox) dagi yo'nalishni bosganda
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

  // barcha yunalishlarni o'qib olish
  useEffect(() => {
    let useEffectCount = true;
    const getallYunalish = async () => {
      const res = await axiosInstance.get('orgType/all');
      let arr = [];
      res.data.forEach((d) => {
        arr.push({ value: d.id, label: d.name });
      })

      if (useEffectCount) {
        setYunalishlar(arr);
      }
    }
    getallYunalish();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser]);

  // yo'nalish1 ga mos tashkilotni chiqarish
  const changeYunalish = async (e) => {
    try {
      const res = await axiosInstance.get('organization/orgType/' + e.value)
      let y1 = [];
      res.data.forEach((y) => {
        if (y.orgName !== orgNameref.current?.value) {
          y1.push({ value: y.id, label: y.orgName });
        }
      })
      if (y1?.length > 0)
        setYunalishTashkilotlar(y1);
      // y1.push({ value: null, label: "NONE" });
    } catch (error) {
      console.log(error?.response);
    }
  }

  // yo'nalish2 ga mos tashkilotni chiqarish
  const changeYunalish1 = async (e) => {
    try {
      const res = await axiosInstance.get('organization/orgType/' + e.value)
      let y1 = [];
      res.data.forEach((y) => {
        if (y.orgName !== document.querySelector('.korxonaNomi').value) {
          y1.push({ value: y.id, label: y.orgName });
        }
      })
      y1.push({ value: null, label: "NONE" });
      setYunalishTashkilotlar(y1);
    } catch (error) {
      console.log(error?.response);
    }
  }

  // yo'nalish3 ga mos tashkilotni chiqarish
  const logChange123 = async (e) => {
    try {
      const res = await axiosInstance.get('organization/orgType/' + e.value)
      let y1 = [];
      res.data.forEach((y) => {
        if (y.orgName !== document.querySelector('.korxonaNomi').value) {
          y1.push({ value: y.id, label: y.orgName });
        }
      })
      y1.push({ value: null, label: "NONE" });
      setYunalishTashkilotlar1(y1);
    } catch (error) {
      console.log(error?.response);
    }
  }

  // barcha statuslarni o'qib olish
  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organizationStatus")
        let arr = [];
        res.data?.forEach((d) => {
          arr.push({ value: d.id, label: d.name })
        })
        if (useEffectCount)
          setStatus(arr);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser]);

  // checkbox checked
  const checked = (e) => {
    if (e) {
      mainOrgChecked.current.style.display = "flex";
    } else {
      mainOrgChecked.current.style.display = "none";
    }
  }

  // malumotlarni oz'gartirish uchun 
  const submitHandler = async (e) => {
    e.preventDefault();
    let korxonaNomi = orgNameref.current?.value;
    let qisqachaNomi = orgShortNameref.current?.value;
    let viloyat = provinceref.current?.props?.value;
    let tumanShahar = orgDistrictref.current?.value;
    let manzil = addressref.current?.value;
    let stir = stirref.current?.value;
    let fio = fullNameref.current?.value;
    let telefon = phoneref.current?.value;
    let email = emailref.current?.value;
    let exat = exatref.current?.value;
    let status2 = statusref.current?.props?.value;
    let url = urlref.current?.value;
    let yunalish = direction1ref.current?.props?.value;
    let asosiyTash = mainOrgref.current?.props?.value;
    let qushimchaTash = passiveMainOrgref.current?.props?.value;
    let employeePlan1 = employeeCountref.current?.props?.value;
    let asosiyBoshTashCheckBox = mainOrgNameCheckboxref.current?.props?.value;
    let fileId = null;

    if (fileType) {
      const formData = new FormData();
      formData.append('logo', file);
      const res = await axiosInstance.post("organization/uploadLogo/-1", formData)
      fileId = res.data;
    } else {
      fileId = organization?.logo ? organization?.logo?.id : null;
    }
    console.log(viloyat);
    if (yunalish) {
      if (viloyat.value) {
        if (is.email(email)) {
          if (is.email(exat)) {
            try {
              const response = await axiosInstance.patch("organization", {
                id: params.id,
                stir: stir,
                orgName: korxonaNomi,
                orgShortName: qisqachaNomi,
                orgProvince: viloyat ? viloyat.label : "",
                orgDistrict: tumanShahar,
                address: manzil,
                leaderName: fio,
                mobileNumber: telefon,
                orgEmail: email,
                orgExat: exat || null,
                logoId: fileId,
                orgTypeId: yunalish ? yunalish.value : organization?.orgType ? organization?.orgType?.id : null,
                statusId: status2 ? status2.value : organization?.organizationStatus ? organization?.organizationStatus?.id : null,
                mainOrganizationId: asosiyTash ? asosiyTash.value : organization?.mainOrganization ? organization?.mainOrganization?.id : null,
                passiveOrganizationId: qushimchaTash ? qushimchaTash.value : organization?.passiveOrganization ? organization?.passiveOrganization?.id : null,
                orgSiteUrl: url,
                fatherOrganizationId: asosiyBoshTashCheckBox ? asosiyBoshTashCheckBox.value : organization?.fatherOrganization ? organization?.fatherOrganization?.id : null,
                employeePlanId: employeePlan1 ? employeePlan1.value : organization?.orgEmployeePlan ? organization?.orgEmployeePlan?.id : null,
              })
              if (response.data === "Update organization") {
                Alert(setAlert, "success", "Ваша информация была успешно изменена!");
                setTimeout(() => {
                  history.push("/super_base_admin_tashkilot-qushish");
                }, 1000);
              }
            } catch (error) {
              console.log(error.response);
              Alert(setAlert, "warning", error?.response?.data);
            }
          } else {
            Alert(setAlert, "warning", "Введена ошибка Exat");
          }
        } else {
          Alert(setAlert, "warning", "Электронная почта была введена неправильно");
        }
      } else {
        Alert(setAlert, "warning", "Регион не выбран");
      }
    } else {
      Alert(setAlert, "warning", "Направление не выбрано");
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Структура организации</h3>
      <div className="card-body p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <TashkilotKurishNavbar params={params.id} />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px", paddingBottom: "10px" }}>
                <form onSubmit={submitHandler} className="formUpdate">
                  <div className="row ">
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
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
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control form-control-outline qisqachaNomi"
                              placeholder="Placeholder"
                              ref={orgShortNameref}
                            />
                            <label className="label-floating">Короткое имя</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <Select
                            options={status}
                            placeholder="Статус"
                            className="status"
                            isClearable={true}
                            ref={statusref}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              isClearable={true}
                              options={[
                                { value: "Viloyat", label: "Viloyat", isDisabled: true },
                                { value: "Andijon viloyati", label: "Andijon viloyati" },
                                { value: "Buxoro viloyati", label: "Buxoro viloyati" },
                                {
                                  value: "Fargʻona viloyati",
                                  label: "Fargʻona viloyati"
                                },
                                { value: "Jizzax viloyati", label: "Jizzax viloyati" },
                                { value: "Xorazm viloyati", label: "Xorazm viloyati" },
                                {
                                  value: "Namangan viloyati",
                                  label: "Namangan viloyati"
                                },
                                { value: "Navoiy viloyati", label: "Navoiy viloyati" },
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
                              ]}
                              placeholder="Провинция"
                              className="viloyat"
                              ref={provinceref}
                            />
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
                              className="form-control form-control-outline tumanShahar"
                              placeholder="Placeholder"
                              ref={orgDistrictref}
                            />
                            <label className="label-floating">Район (Город)</label>
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
                              className="form-control form-control-outline manzil"
                              placeholder="Placeholder"
                              ref={addressref}
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
                              type="text"
                              className="form-control InputCard form-control-outline stir"
                              maxLength="9"
                              placeholder="Placeholder"
                              disabled={!organization.fake}
                              ref={stirref}
                            />
                            <label className="label-floating">СТИР</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="form-group form-group-floating row InputCard">
                        <div className="col-lg-12">
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
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating  row">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <input
                              type="text"
                              className="form-control form-control-outline InputCard telefon"
                              placeholder="Placeholder"
                              ref={phoneref}
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
                              type="email"
                              className="form-control form-control-outline email"
                              placeholder="Placeholder"
                              ref={emailref}
                            />
                            <label className="label-floating">Email</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group form-group-floating  row">
                        <div className="col-lg-12">
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
                    </div>
                    <div className="col-lg-1">
                      <div className="form-group form-group-floating row mb-0"
                        style={{ height: "56px" }}>
                        <div className="col-lg-12">
                          <label className="custom-file">
                            {file ? (
                              <img src={URL.createObjectURL(file)} alt=""
                                className="tashKurishImg" />
                            ) : (
                              <img
                                src={url + "/api/file/view/" + organization?.logo?.id}
                                alt="" className="tashKurishImg"
                              />
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              options={yunalishlar}
                              onChange={changeYunalish}
                              placeholder="Направление"
                              className="yunalish"
                              isClearable={true}
                              ref={direction1ref}
                            />
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
                              className="form-control form-control-outline url"
                              placeholder="http(s)://example.com"
                              ref={urlref}
                            />
                            <label className="label-floating">URL</label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group form-group-floating row mb-0"
                        style={{ height: "56px" }}>
                        <div className="col-lg-12">
                          <label className="custom-file">
                            <input
                              type="file"
                              className="custom-file-input"
                              accept=".png, .jpg, .jpeg"
                              onClick={(e) => e.target.value = null}
                              onChange={(e) => setFile(e.target.files[0])}
                            />
                            <span
                              className="custom-file-label text-muted"
                              style={{ height: "56px", padding: "auto", width: '100%' }}
                            >
                              {fileType ? file?.name : organization?.logo ? organization.logo?.originalName : "Logotip"}
                            </span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              options={yunalishlar}
                              onChange={changeYunalish1}
                              placeholder="Направление"
                              className="yunalish11"
                              isClearable={true}
                              ref={direction2ref}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              options={yunalishTashkilotlar}
                              placeholder="Основные организации"
                              className="asosiyTash"
                              isClearable={true}
                              ref={mainOrgref}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              options={yunalishlar}
                              onChange={logChange123}
                              placeholder="Направление"
                              className="yunalish1"
                              isClearable={true}
                              ref={direction3ref}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              options={yunalishTashkilotlar1}
                              placeholder="Дополнительная головная организация"
                              className="qushimchaTash"
                              isClearable={true}
                              ref={passiveMainOrgref}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-2">
                      <div className="form-group form-group-floating row mb-0">
                        <div className="col-lg-12">
                          <div className="position-relative">
                            <Select
                              options={employeePlan}
                              placeholder="Количество рабочих"
                              className="employeePlan"
                              isClearable={true}
                              ref={employeeCountref}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*checked*/}
                  <div className={'col-lg-12 px-0'}>
                    <div className="d-flex gap-2 mt-2">
                      <input type="checkbox"
                        onClick={(e) => checked(e.target.checked)}
                        className="checkboxInput cursor-pointer "
                        style={{ width: '20px', height: "20px", padding: "20px" }} />
                      <label htmlFor="checkboxInput" style={{ color: "blue", marginLeft: "20px" }}>Основная головная организация</label>
                    </div>

                    {/* checkbox checked */}
                    <div className={'checkedBoxInputs row px-0'} ref={mainOrgChecked} style={{ display: "flex" }}>
                      <div className="col-lg-6">
                        <div className="form-group form-group-floating mb-0">
                          <div className="position-relative">
                            <Select
                              options={yunalishlar}
                              placeholder="Направление"
                              className="yunalishCheckBox"
                              onChange={changeYunalishF}
                              isClearable={true}
                              ref={mainDirectionNameCheckboxref}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 checkedCheckbox">
                        <div className="form-group form-group-floating mb-0">
                          <div className="position-relative">
                            <Select
                              options={yunalishTashkilotlarF}
                              placeholder="Основная организация"
                              className="asosiyBoshTashCheckBox"
                              isClearable={true}
                              ref={mainOrgNameCheckboxref}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-end">
                    <div className="col-lg-2 text-right">
                      <button type="submit" className="btn btn-primary mt-1"><i
                        className="icon-floppy-disk mr-1"></i> Сохранять
                      </button>
                    </div>
                  </div>
                </form>

                {/* alert */}
                <AlertContent alert={alert} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(TashkilotKurishContent);