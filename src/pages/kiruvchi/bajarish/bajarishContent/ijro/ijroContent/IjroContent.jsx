import React, { useEffect, useState } from "react";
import { NavLink, useParams, useHistory } from 'react-router-dom';
import ContentNavbar from "../../../../contentNavbar/ContentNavbar";
import { axiosInstance } from "../../../../../../config";
import AlertContent, { Alert } from "../../../../../../component/alert/Alert";
import { colourStyles } from "../../../../../../App";
import HujjatAylanishYuli from "./hujjatAylanishYuli/HujjatAylanishYuli";
import IjroKiruvchi from "./ijroKiruvchi/IjroKiruvchi";
import IchkiTopshiriqlar from "./ichkiTopshiriqlar/IchkiTopshiriqlar";
import TashqiTopshiriqlar from "./tashqiTopshiriqlar/TashqiTopshiriqlar";
import TashqiBajaruvchilar from "./tashqiBajaruvchilar/TashqiBajaruvchilar";
import Fishka from "./fishka/Fishka";
import TezRezolutsiyaMazIjro from "./tezRezolutsiyaMazIjro/TezRezolutsiyaMazIjro";
import QushimchaBajaruvchilar from "./qushimchaBajaruvchilar/QushimchaBajaruvchilar";
import { Control, Done, Generalizing, Information, NotDone, Perform, Rejected, SpecialControl, SpecialTakeControl, TakeControl } from "./UrlQuery";
import { ShortUser } from "../../../../../../component/ShortUser";
import './IjroContent.css';
import OpenAllReject from "./ichkiTopshiriqlar/OpenAllReject";
import OpenAllAccept from "./ichkiTopshiriqlar/OpenAllAccept";
let idCheckbox = null;

const IjroContent = ({ currentUser, permission, ranks }) => {
  const params = useParams();
  const history = useHistory();
  const [yangiQushish, setYangiQushish] = useState([]);
  const [data, setData] = useState({});
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [xodimlar, setXodimlar] = useState([]);
  const [qaytaIjro, setQaytaIjro] = useState([]);
  const [change, setChange] = useState(false);
  const [imzo] = useState([]);
  const [visibleIconIjro, setVIsibleIconIjro] = useState(false);
  const [results, setResults] = useState([]);

  // hokim 
  const [hokimRadEtish, setHokimRadEtish] = useState(false)
  const [hokimTasdiqlash, setHokimTasdiqlash] = useState(false)

  // ekran full
  const [full, setFull] = useState(false)

  // sanani formatlash
  const dateFormat = (date) => {
    return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
  }

  // berilgan id ga mos documentni olish
  useEffect(() => {
    let isMounted = true;
    if (params.name === "bajarish") {
      Perform(setData, isMounted, params);
    }
    if (params.name === "nazorat") {
      Control(setData, isMounted, params);
    }
    if (params.name === "umumlashtiruvchi") {
      Generalizing(setData, isMounted, params);
    }
    if (params.name === "malumot") {
      Information(setData, isMounted, params);
    }
    if (params.name === "bajarilmagan") {
      NotDone(setData, isMounted, params);
    }
    if (params.name === "radEtilgan") {
      Rejected(setData, isMounted, params);
    }
    if (params.name === "bajarilgan") {
      Done(setData, isMounted, params);
    }
    if (params.name === "nazoratdanOlish") {
      TakeControl(setData, isMounted, params);
    }
    if (params.name === "maxsusNazorat") {
      SpecialControl(setData, isMounted, params);
    }
    if (params.name === "maxsusNazoratdanOlish") {
      SpecialTakeControl(setData, isMounted, params);
    }

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, change, params.name, params.id]);

  // barcha card (jurnallarni) larni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("journal/getOrgAll/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        if (isMounted) {
          res.data.forEach((d) => {
            arr.push({ value: d.id, label: d.uzName, clearableValue: true })
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // xodimlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    if (currentUser) {
      const getData = async () => {
        try {
          const res = await axiosInstance.get(`executor/inExecutors/${JSON.parse(localStorage.getItem('ids'))}`)
          let arr = [];
          // console.log(res.data);
          res.data.forEach((d) => {
            arr.push({ value: d?.departmentShortName, label: d?.departmentShortName, isDisabled: "true" });
            if (d?.users?.length > 0) {
              d.users.forEach((d) => {
                arr.push({
                  value: d.id, label: ShortUser(d.firstName.trim(), d.lastName.trim()).toUpperCase(), isClearable: true, pl: d?.workPlaceId
                });
              })
            }
          })
          if (isMounted)
            setXodimlar(arr);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }
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
    let XodimBajaruvchi = document.querySelectorAll('.XodimBajaruvchi');
    let extraExistDate = document.querySelectorAll('.bajaruvchiSana');
    let checkedXodim = [];

    // qo'shimcha bajaruvchilardagi sanani tanlash majburiy
    let extraExistDateBool = true;
    extraExistDate.forEach((date) => {
      if (!date.value) {
        extraExistDateBool = false;
      }
    })

    // xodimlarni tanlash majburiy
    let xodimBool = true;
    XodimBajaruvchi.forEach((xodim) => {
      if (!xodim.querySelector('.css-qc6sy-singleValue')?.textContent) {
        xodimBool = false;
      }
    })

    // ichki topshiriqlardagi checkbox ni faqat bittasini tanlash
    let checkboxSelect = document.querySelectorAll('.checkboxSelect');
    for (let i = 0; i < checkboxSelect.length; i++) {
      if (checkboxSelect[i].checked) {
        idCheckbox = i;
        break;
      }
    }

    if (xodimBool) {
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
          if (xodimlar[i].label === Xodim) {
            if (!checkedXodim.includes(xodimlar[i].pl)) {
              workPlace.push(xodimlar[i]);
              checkedXodim.push(xodimlar[i].pl);
              break;
            }
          }
        }

        // let user = data.inExecutorInformationList.find(user => user.workPlaceId === JSON.parse(localStorage.getItem('ids')))?.deadline;
        let obj = {
          workPlaceId: workPlace[0]?.pl,
          repeatExecutePeriod: period[0]?.value,
          deadline: deadLine ? deadLine : data.inExecutorInformationList.find((item) => item.workPlaceId === Number(localStorage.getItem("ids"))).deadline,
          description: izohCol1,
          executorStatusName: letter === "N" ? "Для контроля" : letter === "U" ? "Генерализатор" : letter === "M" ? "Для справки" : "Для выполнения",
          isResponsible: index1 === idCheckbox ? true : false
        }
        inExecutorResolution.push(obj);
      })

      // console.log(inExecutorResolution);

      try {
        if (params.name === "bajarish") {
          try {
            await axiosInstance.post(`forDoing/direct`, {
              id: params.id,
              workPlaceId: JSON.parse(localStorage.getItem('ids')),
              resolutionContent: document.querySelector('.izoh')?.value,
              inExecutorResolution: inExecutorResolution,
              outExecutorResolution: results,
              deadline: data?.document?.deadline,
              esignature: {
                fullName: imzo[2]?.name,
                orgName: imzo[3]?.name,
                lavozim: imzo[4]?.name,
                inn: imzo[1]?.name,
                validFrom: imzo[5]?.name?.split('-')[0].trim(),
                validTo: imzo[5]?.name?.split('-')[1].trim(),
                serialNumber: imzo[0]?.name
              }
            })
            Alert(setAlert, 'success', "Данные успешно сохранены");
            setTimeout(() => {
              history.push("/kiruvchi/resolution");
            }, 1500);
          } catch (error) {
            Alert(setAlert, 'warning', error.response.data);
          }
        }
        if (params.name === "umumlashtiruvchi") {
          try {
            await axiosInstance.post(`gen/direct`, {
              id: params.id,
              workPlaceId: JSON.parse(localStorage.getItem('ids')),
              resolutionContent: document.querySelector('.izoh')?.value,
              inExecutorResolution: inExecutorResolution,
              outExecutorResolution: results,
              deadline: data?.document?.deadline,
              esignature: {
                fullName: imzo[2]?.name,
                orgName: imzo[3]?.name,
                lavozim: imzo[4]?.name,
                inn: imzo[1]?.name,
                validFrom: imzo[5]?.name?.split('-')[0].trim(),
                validTo: imzo[5]?.name?.split('-')[1].trim(),
                serialNumber: imzo[0]?.name
              }
            })
            Alert(setAlert, 'success', "Данные успешно сохранены");
            setTimeout(() => {
              history.push("/kiruvchi/resolution");
            }, 1500);
          } catch (error) {
            Alert(setAlert, 'warning', error.response.data);
          }
        }
        if (params.name === "bajarilmagan") {
          if (extraExistDateBool) {
            try {
              await axiosInstance.post(`notDoneDocs/direct`, {
                id: params.id,
                workPlaceId: JSON.parse(localStorage.getItem('ids')),
                resolutionContent: document.querySelector('.izoh')?.value,
                inExecutorResolution: inExecutorResolution,
                outExecutorResolution: results,
                deadline: data?.document?.deadline,
                esignature: {
                  fullName: imzo[2]?.name,
                  orgName: imzo[3]?.name,
                  lavozim: imzo[4]?.name,
                  inn: imzo[1]?.name,
                  validFrom: imzo[5]?.name?.split('-')[0].trim(),
                  validTo: imzo[5]?.name?.split('-')[1].trim(),
                  serialNumber: imzo[0]?.name
                }
              })
              Alert(setAlert, 'success', "Данные успешно сохранены");
              setTimeout(() => {
                history.push("/kiruvchi/resolution");
              }, 1500);
            } catch (error) {
              Alert(setAlert, 'warning', error.response.data);
            }
          } else {
            Alert(setAlert, 'warning', "Дата по дополнительным исполнителям может быть не выбрана");
          }
        }
        if (params.name === "nazorat") {
          try {
            await axiosInstance.post(`superVisor/direct`, {
              id: params.id,
              workPlaceId: JSON.parse(localStorage.getItem('ids')),
              resolutionContent: document.querySelector('.izoh')?.value,
              inExecutorResolution: inExecutorResolution,
              outExecutorResolution: results,
              deadline: data?.document?.deadline,
              esignature: {
                fullName: imzo[2]?.name,
                orgName: imzo[3]?.name,
                lavozim: imzo[4]?.name,
                inn: imzo[1]?.name,
                validFrom: imzo[5]?.name?.split('-')[0].trim(),
                validTo: imzo[5]?.name?.split('-')[1].trim(),
                serialNumber: imzo[0]?.name
              }
            })
            Alert(setAlert, 'success', "Данные успешно сохранены");
            setTimeout(() => {
              history.push("/kiruvchi/resolution");
            }, 1500);
          } catch (error) {
            Alert(setAlert, 'warning', error.response.data);
          }
        }
        if (params.name === "radEtilgan") {
          try {
            await axiosInstance.post(`rejectedDocs/direct/${JSON.parse(localStorage.getItem('ids'))} `, {
              id: params.id,
              workPlaceId: JSON.parse(localStorage.getItem('ids')),
              resolutionContent: document.querySelector('.izoh')?.value,
              inExecutorResolution: inExecutorResolution,
              outExecutorResolution: results,
              deadline: data?.document?.deadline,
              esignature: {
                fullName: imzo[2]?.name,
                orgName: imzo[3]?.name,
                lavozim: imzo[4]?.name,
                inn: imzo[1]?.name,
                validFrom: imzo[5]?.name?.split('-')[0].trim(),
                validTo: imzo[5]?.name?.split('-')[1].trim(),
                serialNumber: imzo[0]?.name
              }
            })
            Alert(setAlert, 'success', "Данные успешно сохранены");
            setTimeout(() => {
              history.push("/kiruvchi/resolution");
            }, 1500);
          } catch (error) {
            Alert(setAlert, 'warning', error.response.data);
          }
        }
      } catch (error) {
        console.log(error.response);
        if (error.response.data === true && error.response.status === 409) {
          history.push(`/kiruvchi/${params.name}`);
        } else {
          Alert(setAlert, 'warning', error?.response?.data?.message ? error?.response?.data?.message : error?.response?.data);
        }
      }
    } else {
      Alert(setAlert, 'warning', "Сотрудник в исполнительный отдел не выбран");
    }
  }

  // update va upload icon larini chiqarish
  useEffect(() => {
    let isMounted = true;
    let bool = false;

    data?.inExecutorInformationList?.forEach((d) => {
      if (d?.executeDocument && d?.workPlaceId === JSON.parse(localStorage.getItem('ids'))) {
        bool = true;
      }
    })
    if (bool) {
      if (isMounted)
        setVIsibleIconIjro(true);
    } else {
      if (isMounted)
        setVIsibleIconIjro(false);
    }

    return () => {
      isMounted = false;
    }
  }, [data]);

  // maxsus nazoratdan olish
  const TakeControlFunc = async () => {
    try {
      const res = await axiosInstance.patch(`superVisor/takeControlOfTheLeader/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`)
      if (res.data) {
        Alert(setAlert, 'success', "Вышел из-под контроля");
      }
      // setTimeout(() => {
      //   history.push(`/kiruvchi/resolution`);
      // }, 2000);
    } catch (error) {
      Alert(setAlert, 'warning', error.response.data);
    }
  }

  // console.log(data.inExecutorInformationList.find((item) => item.workPlaceId === Number(localStorage.getItem("ids"))));

  console.log(permission);
  console.log(data);

  const receptionSuccess = () => {
    axiosInstance.put(`superVisor/super-visor-for-director-success?documentId=${params?.id}`)
      .then((res) => {
        Alert(setAlert, 'success', "Успешно проверено");
        setTimeout(() => {
          history.push(`/kiruvchi/maxsusNazoratdanOlish`);
        }, 2000);
      })
  }


  return (
    <div className="content content-mobile" style={{ marginBottom: "130px" }}>
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "uppercase" }}>Вид</h3>
      <div className="card-body card-body-mobile p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar currentUser={currentUser} permission={permission} ranks={ranks} />
          <li className="nav-item">
            <NavLink to={`/kiruvchi_bajarish_ijro/${params.id}/${params.name}`} className="nav-link" activeClassName="NavLinkLi">
              <i className="icon-eye2 mr-1"></i>Задания
            </NavLink>
          </li>
        </ul>

        <div className="card">
          <div className="row">
            <div className={`${full ? "col-lg-12" : "col-lg-5"}`}>
              <div className="card-body card-body-mobile w-100 ccc mx-0 px-2">
                <button className="btn btn-primary mb-3 w-100"
                  onClick={() => setFull(!full)}>
                  {full ? "Свернуть экран" : "Полноэкранный"}
                </button>
                <Fishka
                  data={data}
                  params={params}
                />
              </div>
            </div>

            <div className="col-lg-7 m-0" style={{ display: full ? "none" : "block" }}>
              <div className="card-block mt-3">
                {/* hujjat aylanish yo'li */}
                <div className="card-box">
                  <HujjatAylanishYuli
                    data={data}
                    dateFormat={dateFormat}
                  />
                </div>

                {/* kiruvchi */}
                <IjroKiruvchi
                  data={data}
                  params={params}
                />

                {/* ichki topshiriqlar */}
                {data?.inExecutorInformationList?.length > 0 && (
                  <IchkiTopshiriqlar
                    data={data}
                    dateFormat={dateFormat}
                    params={params}
                    setData={setData}
                    setAlert={setAlert}
                    currentUser={currentUser}
                    history={history}
                    setChange={setChange}
                    change={change}
                    colourStyles={colourStyles}
                    permission={permission}
                  />
                )}

                {/* rezalutsiya mazmuni va tezkor rezolutsiya */}
                <TezRezolutsiyaMazIjro
                  data={data}
                  ranks={ranks}
                  params={params}
                  visibleIconIjro={visibleIconIjro}
                  currentUser={currentUser}
                />

                {/* qo'shimcha bajaruvchilar */}
                {((params.name === "bajarish" || params.name === "umumlashtiruvchi" || params.name === "bajarilmagan" || params.name === "radEtilgan" || params.name === "nazorat") && (data?.hasPermissionForDirect) && !visibleIconIjro && params.name !== "nazoratdanOlish") && (
                  (ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || ranks.includes(4)) && (
                    <QushimchaBajaruvchilar
                      // date={data.inExecutorInformationList.find((item) => item.workPlaceId === Number(localStorage.getItem("ids"))).deadline}
                      setYangiQushish={setYangiQushish}
                      yangiQushish={yangiQushish}
                      xodimlar={xodimlar}
                      colourStyles={colourStyles}
                    />
                  )
                )}

                {/* tashqi bajaruvchilar */}
                {((ranks.includes(1) || ranks.includes(2) || ranks.includes(3)) && !visibleIconIjro && params.name !== "nazoratdanOlish") && (
                  <div className="card-box" style={{ display: ((params.name === "bajarish" || params.name === "bajarilmagan" || params.name === "umumlashtiruvchi" || params.name === "radEtilgan" || params.name === "nazorat") && (data?.hasPermissionForDirect)) ? "block" : "none" }}>
                    <TashqiBajaruvchilar
                      results={results}
                      setAlert={setAlert}
                      setResults={setResults}
                      currentUser={currentUser}
                    />

                    {/* <ElektronKalit setImzo={setImzo} /> */}
                  </div>
                )}

                {/* umumiy saqlash tugmasi */}
                {((ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || ranks.includes(4)) && !visibleIconIjro && params.name !== "nazoratdanOlish") && (
                  <div className="card-box my-2" style={{ display: ((params.name === "bajarish" || params.name === "umumlashtiruvchi" || params.name === "bajarilmagan" || params.name === "radEtilgan" || params.name === "nazorat") && (data?.hasPermissionForDirect)) ? "block" : "none" }}>
                    <div className="col-lg-12 w-100 d-flex justify-content-end">
                      {/* <button className="btn btn-danger" onClick={cancelEimzo}>Bekor qilish</button> */}
                      <button className="btn btn-primary ml-1" onClick={saveAllData}>Сохранять</button>
                    </div>
                  </div>
                )}

                {/* maxsus nazoratdan olish
                {((ranks.includes(1)) && params.name === "maxsusNazoratdanOlish") && (
                  <div className="card-box my-2">
                    <div className="col-lg-12 w-100 d-flex justify-content-end">
                      <button className="btn btn-primary ml-1" onClick={() => TakeControlFunc()}>Nazoratdan olish</button>
                    </div>
                  </div>
                )} */}

                {/* tashqi topshiriqlar */}
                {data.outExecutorInformationList?.length > 0 && (
                  <TashqiTopshiriqlar
                    data={data}
                    dateFormat={dateFormat}
                  />
                )}

                {/* maxsusNazorat Hokim */}
                {((ranks.includes(1) || ranks.includes(2) || ranks.includes(3)) && params.name === "maxsusNazoratdanOlish") && (
                  <div className="card-box my-2 mb-3">
                    <div className="col-lg-12 w-100 d-flex justify-content-end">
                      <button className="btn btn-danger"
                        onClick={() => setHokimRadEtish(true)}>
                        Отклонить все
                      </button>
                      <button className="btn btn-success ml-1"
                        onClick={() => setHokimTasdiqlash(true)}>
                        Подтвердить все
                      </button>
                    </div>
                  </div>
                )}

                {/* maxsusNazorat RECEPTION */}
                {((permission.includes("RECEPTION")) && params.name === "maxsusNazoratdanOlish") && (
                  <div className="card-box my-2 mb-3">
                    <div className="col-lg-12 w-100 d-flex justify-content-end">
                      <button className="btn btn-danger"
                        onClick={() => setHokimRadEtish(true)}>
                       Отклонить все
                      </button>
                      <button className="btn btn-success ml-1"
                        onClick={() => receptionSuccess()}>
                        Подтверждение
                      </button>
                    </div>
                  </div>
                )}


              </div>
            </div >

          </div >

          {/* hokim */}
          {
            hokimRadEtish && (
              <OpenAllReject
                setHokimRadEtish={setHokimRadEtish}
                Alert={Alert}
                setAlert={setAlert}
                data={data}
                setData={setData}
              />
            )
          }

          {
            hokimTasdiqlash && (
              <OpenAllAccept
                setHokimTasdiqlash={setHokimTasdiqlash}
                Alert={Alert}
                setAlert={setAlert}
                data={data}
                setData={setData}
              />
            )
          }



          {/* alert */}
          <AlertContent alert={alert} />
        </div >
      </div >
    </div >
  )
}

export default React.memo(IjroContent);