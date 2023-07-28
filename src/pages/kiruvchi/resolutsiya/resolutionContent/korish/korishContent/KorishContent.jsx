import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import ContentNavbar from "../../../../contentNavbar/ContentNavbar";
import { NavLink } from 'react-router-dom';
import { axiosInstance } from "../../../../../../config";
import AlertContent, { Alert } from '../../../../../../component/alert/Alert';
import FishkaKurish from "./fishkaKurish/FishkaKurish";
import KiruvchiKurish from "./kiruvchiKurish/KiruvchiKurish";
import TezRezolutsiyaMazmuni from "./tezRezolutsiyaMazmuni/TezRezolutsiyaMazmuni";
import TashqiBajaruvchilarKurish from "./tashqiBajaruvchilarKurish/TashqiBajaruvchilarKurish";
import Bajaruvchilar from "./bajaruvchilar/Bajaruvchilar";
import Asosiy from "./asosiy/Asosiy";
import { ShortUser } from "../../../../../../component/ShortUser";
import './korishContent.css';
// import ElektronKalit from "../../../../bajarish/bajarishContent/ijro/ijroContent/elektronKalit/ElektronKalit";
let idCheckbox = null;

const KorishContent = ({ currentUser, permission, ranks }) => {
  const params = useParams();
  const history = useHistory();
  const [startDate1, setStartDate1] = useState('');
  const [data, setData] = useState([]);
  const [xodimlar, setXodimlar] = useState([]);
  const [qaytaIjro, setQaytaIjro] = useState([]);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [imzo] = useState([]);
  const [results, setResults] = useState([]);
  const [yunalishlar, setYunalishlar] = useState([]);
  const [nazorat, setNazorat] = useState(false)

  // ekran full
  const [full, setFull] = useState(false)

  // id ga mos malumotni olish
  useEffect(() => {
    let isMounted = true;
    // tooltipni o'chirish
    document.querySelector('.tooltip')?.remove();

    const getData = async () => {
      try {
        const res = await axiosInstance.get("document/showInResolutionDoc/" + params.id)
        if (isMounted) {
          console.log(res.data);
          setData([res.data]);
          setNazorat(res.data?.document?.inControl)
          setStartDate1(new Date(res.data.document?.deadline))
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, params.id]);

  // xodimlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`executor/inExecutors/${params.id}/${JSON.parse(localStorage.getItem('ids'))}/${params.name ? true : false}/${JSON.parse(localStorage.getItem('oi'))}`)
        let arr = [];
        res.data.forEach((dat) => {
          arr.push({ value: dat?.departmentShortName, label: dat?.departmentShortName, isDisabled: "true" });
          if (dat.users?.length > 0) {
            dat.users.forEach((d) => {
              arr.push({
                value: d?.id,
                label: ShortUser(d.firstName.trim(), d.lastName.trim()).toUpperCase(),
                isClearable: true,
                pl: d?.workPlaceId,
                name: dat?.deparmentName
              });
            })
          }
        })

        if (isMounted) {
          console.log(arr);
          setXodimlar(arr);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, params.id, params.name]);

  // qayta ijroni olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("repeatExecutePeriod")
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.period, label: d.description, isClearable: true })
        })
        // arr.push({ value: "Boshqa", label: "Boshqa" });

        if (isMounted)
          setQaytaIjro(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // hamma malumotlarni saqlash
  const saveAllData = async () => {
    let hujjatTuri = document.querySelector('.hujjatTuri')?.value;
    let sanaAsosiy = document.querySelector('.sanaAsosiy')?.value;
    let XodimBajaruvchi = document.querySelectorAll('.XodimBajaruvchi');
    let bajaruvchiSana = document.querySelectorAll('.bajaruvchiSana');

    let xodimBool = true, checkedXodim = [];
    XodimBajaruvchi.forEach((xodim) => {
      if (!xodim.querySelector('.css-qc6sy-singleValue')?.textContent) {
        xodimBool = false;
      }
    })

    // eslint-disable-next-line no-unused-vars
    let sanaBool = true;
    bajaruvchiSana.forEach((date) => {
      if (!date.value) {
        sanaBool = false;
      }
    })

    // ichki topshiriqlardagi chckbox ni faqat bittasini tanlash
    let selectCheckbox = false;
    let checkboxSelect = document.querySelectorAll('.checkboxSelect');
    for (let i = 0; i < checkboxSelect.length; i++) {
      if (checkboxSelect[i].checked) {
        selectCheckbox = true;
        idCheckbox = i;
        break;
      }
    }

    if (hujjatTuri) {
      if (sanaAsosiy) {
        if (xodimBool) {
          if (selectCheckbox || results.length > 0) {
            // tashqi bajaruvchi va forma ni massiv ichga olish
            let inExecutorResolution = [];
            let forms = document.querySelectorAll('.bajaruvchiForm');
            forms.forEach((form, index1) => {
              let letter = "";
              let checkBoxCol1 = form.querySelector('.col1').querySelectorAll('.chb');
              checkBoxCol1.forEach((check) => {
                if (check.querySelector('.iconCheck').hasAttribute('style')) {
                  letter = check.querySelector('.iconCheck').textContent;
                }
              })
              let Xodim = form.querySelector('.XodimBajaruvchi')?.querySelector('.css-qc6sy-singleValue')?.textContent;
              let izohCol1 = form.querySelector('.izohCol1').value;
              let deadLine = form.querySelector('.bajaruvchiSana').value;
              let qaytaIjro1 = form.querySelector('.col1QaytaIjro')?.querySelector('.css-qc6sy-singleValue')?.textContent;


              let period = [];
              // qayta ijro bosilganda uning periodini berish
              if (qaytaIjro1 === "Boshqa") {
                period.push({ value: parseInt(form.querySelector('.boshqa').value), label: "Boshqa" })
              } else if (typeof parseInt(qaytaIjro1) > 0) {
                period.push({ value: parseInt(qaytaIjro1), label: parseInt(qaytaIjro1) })
              } else {
                qaytaIjro?.forEach((d) => {
                  if (d.label === qaytaIjro1) {
                    period.push(d);
                  }
                })
              }

              let workPlace = [];
              // xodimni tanlagan payt workplaceId sini olish
              for (let i = 0; i < xodimlar.length; i++) {
                if (xodimlar[i].label === Xodim.toUpperCase()) {
                  workPlace.push(xodimlar[i]);
                  // if (!checkedXodim.includes(xodimlar[i].pl)) {
                  //   workPlace.push(xodimlar[i]);
                  //   checkedXodim.push(xodimlar[i].pl);
                  //   break;
                  // }
                }
              }

              let obj = {
                workPlaceId: workPlace[0]?.pl,
                repeatExecutePeriod: period?.length > 0 ? period[0]?.value : null,
                deadline: deadLine ? deadLine : sanaAsosiy.split('.')[2] + "-" + sanaAsosiy.split('.')[1] + "-" + sanaAsosiy.split('.')[0],
                description: izohCol1,
                executorStatusName: letter === "N" ? "Nazorat uchun" : letter === "U" ? "Umumlashtiruvchi" : letter === "M" ? "Ma'lumot uchun" : "Bajarish uchun",
                isResponsible: index1 === idCheckbox ? true : false
              }
              inExecutorResolution.push(obj);
            })

            try {
              await axiosInstance.post(`document/resolution`, {
                id: params.id,
                inControl: nazorat ? true : false,
                workPlaceId: JSON.parse(localStorage.getItem('ids')),
                resolutionContent: document.querySelector('.rezTezkor')?.value,
                inExecutorResolution: inExecutorResolution,
                outExecutorResolution: results, //outExecutorResolution,
                deadline: sanaAsosiy.split('.')[2] + "-" + sanaAsosiy.split('.')[1] + "-" + sanaAsosiy.split('.')[0],
                esignature: {
                  fullName: imzo[2]?.name,
                  orgName: imzo[3]?.name,
                  lavozim: imzo[4]?.name,
                  inn: imzo[1]?.name,
                  validFrom: imzo[5]?.name?.split('-')[0]?.trim(),
                  validTo: imzo[5]?.name?.split('-')[1]?.trim(),
                  serialNumber: imzo[0]?.name
                },
                orgId: JSON.parse(localStorage.getItem('oi'))
              })
              Alert(setAlert, 'success', "Данные успешно сохранены");
              setTimeout(() => {
                history.push("/kiruvchi/resolution");
              }, 1500);
            } catch (error) {
              console.log(error.response);
              if (error?.response?.data === true) {
                Alert(setAlert, 'warning', "Документ подписан");
                setTimeout(() => {
                  history.push("/kiruvchi/resolution");
                }, 1500);
              } else {
                Alert(setAlert, 'warning', error?.response?.data);
              }
            }
          } else {
            Alert(setAlert, 'warning', "Документ должен быть прикреплен к кому-то");
          }
        } else {
          Alert(setAlert, 'warning', "Сотрудник в исполнительный отдел не выбран");
        }
      } else {
        Alert(setAlert, 'warning', "Дата в основном разделе не выбрана");
      }
    } else {
      Alert(setAlert, 'warning', "Дата в основном разделе не выбрана");
    }
  }

  console.log(data);

  return (
    <div className="content content-mobile" style={{ marginBottom: "130px" }}>
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Вид</h3>
      <div className="card-body card-body-mobile p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
          <li className="nav-item">
            <NavLink to={`/kiruvchi_resolution_kurish/${params.id}`} className="nav-link"
              activeClassName='NavLinkLi'>
              <i className="icon-eye2 mr-1"></i> Вид
            </NavLink>
          </li>
        </ul>

        <div className="card">
          <div className="row">
            <div className={`${full ? "col-lg-12" : "col-lg-5"}`}>
              <div className="card-body card-body-mobile w-100 ccc px-2 px-0">
                <button className="btn btn-primary m-0 mb-3 w-100"
                  onClick={() => setFull(!full)}>
                  {full ? "Ekranni qisqartirish" : "To'liq ekran"}
                </button>
                {(data[0]?.document?.files?.length > 0 && data[0].document?.files?.find((a) => a?.extention?.split('/')[a?.extention?.split('/').length - 1] === "pdf")) && (
                  <FishkaKurish
                    data={data}
                  />
                )}
              </div>
            </div>
            <div className="col-lg-7" style={{ display: full ? "none" : "block" }}>
              <div className="card-block mt-3">
                {/* asosiy */}
                <Asosiy
                  data={data}
                  startDate1={startDate1}
                  setStartDate1={setStartDate1}
                />

                {/* kiruvchi */}
                <KiruvchiKurish
                  data={data}
                />

                {/* tezkor rezolutsiya va rezolutsiya mazmuni va  */}
                <TezRezolutsiyaMazmuni
                  data={data}
                  currentUser={currentUser}
                  setAlert={setAlert}
                />

                {/* bajaruvchilar */}
                <Bajaruvchilar
                  data={data}
                  xodimlar={xodimlar}
                  qaytaIjro={qaytaIjro}
                  confirmerWorkPlaceId={data[0]?.document?.confirmerWorkPlaceId}
                />
              </div>

              {/* <!-- tashqi bajaruvchilar --> */}
              <div className="card-body px-0">
                <TashqiBajaruvchilarKurish
                  setResults={setResults}
                  results={results}
                  data={data}
                  setAlert={setAlert}
                  currentUser={currentUser}
                  setYunalishlar={setYunalishlar}
                  yunalishlar={yunalishlar}
                />

                {/* e imzo */}
                {/* <ElektronKalit
                                    setImzo={setImzo}
                                /> */}

                <div className="card-box mt-2">
                  <div className="col-lg-12 w-100 d-flex justify-content-between align-items-center">
                    {(ranks.includes(1) || ranks.includes(2) || ranks.includes(3)) ? (
                      <div className="form-check d-flex align-items-center"
                        onClick={() => setNazorat(!nazorat)}>
                        {nazorat ? <input className="form-check-input" type="checkbox"
                          id="flexCheckDefault"
                          style={{ width: "30px", height: "20px" }} checked />
                          : <input className="form-check-input" type="checkbox"
                            id="flexCheckDefault" style={{ width: "30px", height: "20px" }} />
                        }
                        <label className="form-check-label"
                          style={{ fontSize: "20px" }}>
                         Для контроля
                        </label>
                      </div>
                    ) : <p></p>}

                    <button
                      type="button"
                      className="btn btn-primary ml-1"
                      onClick={saveAllData}
                    >
                     Сохранять
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* alert */}
            <AlertContent alert={alert} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(KorishContent);