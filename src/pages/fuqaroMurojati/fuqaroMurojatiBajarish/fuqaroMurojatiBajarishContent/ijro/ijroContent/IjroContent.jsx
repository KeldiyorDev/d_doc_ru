import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { axiosInstance, axiosInstanceFq } from "../../../../../../config";
import { Alert } from "../../../../../../component/alert/Alert";
import { colourStyles } from "../../../../../../App";
import HujjatAylanishYuli from "./hujjatAylanishYuli/HujjatAylanishYuli";
import IjroKiruvchi from "./ijroKiruvchi/IjroKiruvchi";
import IchkiTopshiriqlar from "./ichkiTopshiriqlar/IchkiTopshiriqlar";
import TashqiTopshiriqlar from "./tashqiTopshiriqlar/TashqiTopshiriqlar";
import Fishka from "./fishka/Fishka";
import TezRezolutsiyaMazIjro from "./tezRezolutsiyaMazIjro/TezRezolutsiyaMazIjro";
import NavbarFuqaroMurojat from "../../../../navbarFuqaroMurojat/NavbarFuqaroMurojat";
import FuqaroMuommosiContent from "../../fuqaroMuommosi/fuqaroMuommosiContent";
import QushimchaBajaruvchilar
  from "../../../../../kiruvchi/bajarish/bajarishContent/ijro/ijroContent/qushimchaBajaruvchilar/QushimchaBajaruvchilar";
import TashqiBajaruvchilar
  from "../../../../../kiruvchi/bajarish/bajarishContent/ijro/ijroContent/tashqiBajaruvchilar/TashqiBajaruvchilar";
import { statusName } from "../../../../../../component/status/Status";

let idCheckbox = null;


let xodimFilter = [];

const FuqaroIjroContent = ({ currentUser, permission1, ranks }) => {
  const params = useParams();
  const history = useHistory();
  const [yangiQushish, setYangiQushish] = useState([]);
  const [data, setData] = useState({});
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  // const [ranks, setRanks] = useState([]);
  const [tezkorRezolutsiya, setTezkorRezolutsiya] = useState([]);
  const [xodimlar, setXodimlar] = useState([]);
  const [qaytaIjro, setQaytaIjro] = useState([]);
  const [change, setChange] = useState(false);
  const [imzo, setImzo] = useState([]);
  const [visibleIconIjro, setVIsibleIconIjro] = useState(false);
  const [results, setResults] = useState([]);
  const [objData, setObjData] = useState([]);
  const [bajaruvchi, setBajaruvchi] = useState(false)
  const [save, setSave] = useState(true)
  const [openIjroniYuklash, setOpenIjroniYuklash] = useState({ open: false, obj: {}, index: null });
  const [openButtonCLick, setOpenButtonClick] = useState({ open: false, obj: {}, index: null });
  const [refresh, setRefresh] = useState(false);
  // console.log(JSON.parse(localStorage.getItem('user')))

  const resolutionContent = useRef();

  // berilgan id ga mos documentni olish
  useEffect(() => {
    let isMounted = true;
    // if (params?.name === "bajarish" || params.name === "ma'lumot-uchun" || params.name === "umumlashtiruvchi" || params.name === "nazoratda") {
    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get(`/problem/view/${params?.id}/${JSON.parse(localStorage.getItem('ids'))}`);
        console.log(res?.data?.data)
        if (isMounted)
          setData(res?.data?.data);
      } catch (error) {
        console.log(error?.response?.data);
        setAlert({ open: true, text: `${error?.response?.data?.message}`, color: 'warning' })
      }
    }
    getData();
    // }
    // if (params.name === "nazoratda") {
    //     const getData = async () => {
    //         try {
    //             const res = await axiosInstance.get(`superVisor/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`, {
    //                 headers: {
    //                     Authorization: "Bearer " + currentUser
    //                 }
    //             });
    //             if (isMounted)
    //                 setData(res.data);
    //         } catch (error) {
    //             console.log(error.response);
    //         }
    //     }
    //     getData();
    // }
    // if (params.name === "malumot") {
    //     const getData = async () => {
    //         try {
    //             const res = await axiosInstance.get(`forInfo/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`, {
    //                 headers: {
    //                     Authorization: "Bearer " + currentUser
    //                 }
    //             });
    //             if (isMounted)
    //                 setData(res.data);
    //         } catch (error) {
    //             console.log(error.response);
    //         }
    //     }
    //     getData();
    // }
    // if (params.name === "bajarilmagan") {
    //     const getData = async () => {
    //         try {
    //             const res = await axiosInstance.get(`notDoneDocs/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`, {
    //                 headers: {
    //                     Authorization: "Bearer " + currentUser
    //                 }
    //             });
    //             if (isMounted)
    //                 setData(res.data);
    //         } catch (error) {
    //             console.log(error.response);
    //         }
    //     }
    //     getData();
    // }
    // if (params.name === "radEtilgan") {
    //     const getData = async () => {
    //         try {
    //             const res = await axiosInstance.get(`rejectedDocs/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`, {
    //                 headers: {
    //                     Authorization: "Bearer " + currentUser
    //                 }
    //             });
    //             if (isMounted)
    //                 setData(res.data);
    //         } catch (error) {
    //             console.log(error.response);
    //         }
    //     }
    //     getData();
    // }
    // if (params.name === "bajarilgan") {
    //     const getData = async () => {
    //         try {
    //             const res = await axiosInstance.get(`doneDocs/${params.id}/${JSON.parse(localStorage.getItem('ids'))}`, {
    //                 headers: {
    //                     Authorization: "Bearer " + currentUser
    //                 }
    //             });
    //             if (isMounted)
    //                 setData(res.data);
    //         } catch (error) {
    //             console.log(error.response);
    //         }
    //     }
    //     getData();
    // }
    // if (params.name === "nazoratdanOlish") {
    //     const getData = async () => {
    //         try {
    //             const res = await axiosInstance.get(`document/inProcessDoc/${params.id}`, {
    //                 headers: {
    //                     Authorization: "Bearer " + currentUser
    //                 }
    //             });
    //             if (isMounted)
    //                 setData(res.data);
    //         } catch (error) {
    //             console.log(error.response);
    //         }
    //     }
    //     getData();
    // }

    return () => {
      isMounted = false;
    }
  }, [currentUser, change, params.name, params.id, refresh]);

  // console.log(data);

  // sanani formatlash
  const dateFormat = (date) => {
    if (date !== null) return date?.slice(8, date.length) + '.' + date?.slice(5, 7) + '.' + date?.slice(0, 4)
  }

  console.log(dateFormat('2022-09-10'))

  // xodimlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`executor/inExecutors/${JSON.parse(localStorage.getItem('ids'))}`)
        console.log(res?.data)
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.departmentShortName, label: d.departmentShortName, isDisabled: "true" });
          if (d?.users?.length > 0) {
            d?.users.forEach((d) => {
              let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName.substring(0, 2) + ". " : d?.firstName.substring(0, 1) + ". ") : "";
              arr.push({
                value: d.id, label: `${firstname}${d?.lastName}`, isClearable: true, pl: d?.workPlaceId
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

    return () => {
      isMounted = false;
    }
  }, [currentUser, params.id, params.name]);


  // ichki topshiriqlardagi chckbox ni faqat bittasini tanlash
  useEffect(() => {
    let isMounted = true;
    let checkboxSelect = document.querySelectorAll('.checkboxSelect');

    if (isMounted) {
      checkboxSelect.forEach((checkbox) => {
        checkbox.addEventListener('click', () => {
          if (checkbox.checked) {
            checkboxSelect.forEach((d) => {
              d.checked = false;
            })
            checkbox.checked = true;
          }
        })
      })
    }

    return () => {
      checkboxSelect.forEach((checkbox) => {
        checkbox.removeEventListener('click', () => {
          if (checkbox.checked) {
            checkboxSelect.forEach((d) => {
              d.checked = false;
            })
            checkbox.checked = true;
          }
        })
      })
      isMounted = false;
    }
  }, [yangiQushish])


  // hamma malumotlarni saqlash
  const saveAllData = async () => {
    let XodimBajaruvchi = document.querySelectorAll('.XodimBajaruvchi');
    let checkedXodim = [];

    let xodimBool = true;
    XodimBajaruvchi.forEach((xodim) => {
      if (!xodim.querySelector('.css-qc6sy-singleValue')?.textContent) {
        xodimBool = false;
      }
    })

    // ichki topshiriqlardagi chckbox ni faqat bittasini tanlash
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
      let forms = document.querySelectorAll('.bajaruvchiForm'); //3
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
        for (let i = 0; i < xodimlar?.length; i++) {
          if (xodimlar[i].label === Xodim) {
            if (!checkedXodim.includes(xodimlar[i].pl)) {
              workPlace.push(xodimlar[i]);
              checkedXodim.push(xodimlar[i].pl);
              break;
            }
          }
        }

        let obj = {
          workPlaceID: workPlace[0]?.pl,
          // repeatExecutePeriod: period[0]?.value,
          deadline: deadLine,
          description: izohCol1,
          executorCode: letter === "N" ? 4 : letter === "U" ? 3 : letter === "M" ? 2 : 1,
          responsible: index1 === idCheckbox ? true : false
        }
        inExecutorResolution.push(obj);
      })

      let inExecutorID = null
      data.inExecutorViewDTOS.forEach((s) => {
        if (parseInt(s?.workplaceID) === JSON.parse(localStorage.getItem('ids'))) {
          inExecutorID = s?.id
        }
      })


      try {
        if (params?.name === "bajarishUchun") {
          const res = await axiosInstanceFq.post(`inExecutor/direct`, {
            orgID: JSON.parse(localStorage.getItem('oi')),
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            inExecutorID: inExecutorID,
            resolutionContent: document.querySelector('.izoh')?.value,
            problem: {
              problemID: data?.id,
              inExecutors: inExecutorResolution,
              outExecutors: results,
            }
          })
          console.log(res.data.data)
          Alert(setAlert, 'success', `${res.data.data}`);
          history.push('/fuqaro/murojati/nazorat')
        }
        if (params.name === "umumlashtiruvchi") {
          await axiosInstanceFq.post(`inExecutor/direct`, {
            orgID: JSON.parse(localStorage.getItem('oi')),
            workPlaceID: JSON.parse(localStorage.getItem('ids')),
            inExecutorID: inExecutorID,
            resolutionContent: document.querySelector('.izoh')?.value,
            problem: {
              problemID: data?.id,
              inExecutors: inExecutorResolution,
              outExecutors: results,
            }
          })
          history.push('/fuqaro/murojati/nazorat')
        }
        if (params.name === "bajarilmagan") {
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
        }
        if (params.name === "nazorat") {
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
        }
        if (params.name === "radEtilgan") {
          await axiosInstance.post(`rejectedDocs/direct/${JSON.parse(localStorage.getItem('ids'))
            } `, {
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
        }
        Alert(setAlert, 'success', "Ma'lumot muvaffaqiyatli saqlandi");
        // setTimeout(() => {
        //     history.push("/kiruvchi/resolution");
        // }, 1500);
      } catch (error) {
        console.log(error.response);
        // Alert(setAlert, 'warning', error?.response?.data?.error.message ? error?.response?.data?.error.message : error?.response?.data);
        // if (error.response.data === true && error.response.status === 409) {
        //     history.push(`/kiruvchi/${params.name}`);
        // } else {
        //     Alert(setAlert, 'warning', error?.response?.data?.message ? error?.response?.data?.message : error?.response?.data);
        // }
      }
    } else {
      Alert(setAlert, 'warning', "Bajaruvchi bo'limdagi xodim tanlanmagan");
    }
  }

  // update va upload icon larini chiqarish
  useEffect(() => {
    let isMounted = true;
    let bool = false;

    if (isMounted) {
      data?.inExecutorInformationList?.forEach((d) => {
        if (d?.executeDocument && d?.workPlaceId === JSON.parse(localStorage.getItem('ids'))) {
          bool = true;
        }
      })
      if (bool) {
        setVIsibleIconIjro(true);
      } else {
        setVIsibleIconIjro(false);
      }
    }

    return () => {
      isMounted = false;
    }
  }, [data]);


  console.log(ranks)
  return (
    <div className="content content-mobile" style={{ marginBottom: "130px" }}>
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "uppercase" }}>Ko'rish</h3>
      <div className="card-body card-body-mobile pt-2">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
          style={{ paddingTop: "2px", minHeight: "52px" }}>
          <NavbarFuqaroMurojat currentUser={currentUser} permission={permission1} ranks={ranks} />
          <li className="nav-item">
            <NavLink to={`/fuqaro/murojati/bajarish_ijro/${params.id}/${params.name}`} className="nav-link"
              activeClassName="NavLinkLi">
              <i className="icon-eye2 mr-1"></i>Topshiriqlar
            </NavLink>
          </li>
        </ul>

        <div className="card">
          <div className="row">
            <Fishka
              data={data}
              params={params}
            />

            <div className="col-lg-7">
              <div className="card-block mt-3">
                {/*hujjat aylanish yo'li */}
                <div className="card-box">
                  <HujjatAylanishYuli
                    data={data}
                    dateFormat={dateFormat}
                  />
                </div>

                {/*kiruvchi */}
                <IjroKiruvchi
                  data={data}
                  params={params}
                />

                <div className="card-box">
                  <FuqaroMuommosiContent currentUser={currentUser} objData={objData} data={data} />
                </div>


                {/*ichki topshiriqlar */}
                {data?.inExecutorViewDTOS?.length > 0 && (
                  <IchkiTopshiriqlar
                    data={data}
                    setRefresh={setRefresh}
                    ranks={ranks}
                    statusName={statusName}
                    dateFormat={dateFormat}
                    params={params}
                    setData={setData}
                    setAlert={setAlert}
                    currentUser={currentUser}
                    history={history}
                    setChange={setChange}
                    change={change}
                    colourStyles={colourStyles}
                    setSave={setSave}
                    save={save}
                    setOpenIjroniYuklash={setOpenIjroniYuklash}
                    openIjroniYuklash={openIjroniYuklash}
                    openButtonCLick={openButtonCLick}
                    setOpenButtonClick={setOpenButtonClick}
                  />
                )}

                {/*rezalutsiya mazmuni va tezkor rezolutsiya */}
                {
                  ((ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || ranks.includes(4)) && (params.name === "bajarishUchun" || params.name === "bajarilmagan" || params.name === "umumlashtiruvchi" || params.name === "radEtilgan" || params.name === "nazorat")) && (data?.inExecutorViewDTOS?.filter((d) => parseInt(d?.workplaceID) === JSON.parse(localStorage.getItem('ids')))[0]?.executeDocument === null)
                  &&
                  <TezRezolutsiyaMazIjro
                    data={data}
                    currentUser={currentUser}
                    setAlert={setAlert}
                  />
                }


                {/*tashqi topshiriqlar */}
                {data.outExecutorViewDTOS?.length > 0 && (
                  <TashqiTopshiriqlar
                    data={data}
                    dateFormat={dateFormat}
                  />
                )}

                {/* qo'shimcha bajaruvchilar */}
                {((ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || ranks.includes(4)) && (params.name === "bajarishUchun" || params.name === "bajarilmagan" || params.name === "umumlashtiruvchi" || params.name === "radEtilgan" || params.name === "nazorat")) && (data?.inExecutorViewDTOS?.filter((d) => parseInt(d?.workplaceID) === JSON.parse(localStorage.getItem('ids')))[0]?.executeDocument === null)
                  &&
                  <QushimchaBajaruvchilar
                    data={data}
                    setYangiQushish={setYangiQushish}
                    yangiQushish={yangiQushish}
                    xodimlar={xodimlar}
                    colourStyles={colourStyles}
                    qaytaIjro={qaytaIjro}
                    setBajaruvchi={setBajaruvchi}
                    bajaruvchi={bajaruvchi}
                  />}

                {/* tashqi bajaruvchilar */}
                {((ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || ranks.includes(4)) && (params.name === "bajarishUchun" || params.name === "bajarilmagan" || params.name === "umumlashtiruvchi" || params.name === "radEtilgan" || params.name === "nazorat")) && (data?.inExecutorViewDTOS?.filter((d) => parseInt(d?.workplaceID) === JSON.parse(localStorage.getItem('ids')))[0]?.executeDocument === null)
                  &&
                  <div className="card-box"
                  >
                    <TashqiBajaruvchilar
                      results={results}
                      setAlert={setAlert}
                      setResults={setResults}
                      currentUser={currentUser}
                    />
                    {/* <ElektronKalit setImzo={setImzo} /> */}
                  </div>
                }

                {/* umumiy saqlash tugmasi */}
                {
                  ((ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || ranks.includes(4)) && data?.inExecutorViewDTOS?.filter((d) => parseInt(d?.workplaceID) === JSON.parse(localStorage.getItem('ids')))[0]?.executeDocument === null)
                  &&
                  <div className="card-box my-2"
                    style={{ display: ((params.name === "bajarishUchun" || params.name === "umumlashtiruvchi" || params.name === "bajarilmagan" || params.name === "radEtilgan" || params.name === "nazorat")) ? "block" : "none" }}>
                    <div className="col-lg-12 w-100 d-flex justify-content-end">
                      {/* <button className="btn btn-danger" onClick={cancelEimzo}>Bekor qilish</button> */}
                      <button className="btn btn-primary ml-1" onClick={saveAllData}>Saqlash
                      </button>
                    </div>
                  </div>
                }

                {/*)}*/}
              </div>
            </div>
          </div>

          {/* alert */}
          {alert.open && (
            <div className={`alert alert-${alert.color} alertNotice alert-styled-left alert-dismissible`}>
              <span className="font-weight-semibold">{alert.text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default React.memo(FuqaroIjroContent)

