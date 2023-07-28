import React, { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { axiosInstance, axiosInstanceFq, urlFq } from "../../../../../config";
import AlertContent, { Alert } from "../../../../../component/alert/Alert";
import NavbarFuqaroMurojat from "../../../navbarFuqaroMurojat/NavbarFuqaroMurojat";
import { useSelector } from "react-redux";
import { IsFileType } from "../../../../../component/IsFilType";
import Loader from "../../../../../component/loader/Loader";
import AllPersonsYangi from "../fuqaroQismi/allPersons/AllPersonsYangi";
import CenterContentYangi from "../hujjatQismi/CenterContentYangi";
import TopRightJournalsYangi from "../hujjatQismi/TopRightJournalsYangi";

const FQM_YangiEdit = ({ currentUser }) => {
  const params = useParams();
  const history = useHistory();
  // const { user } = useSelector(state => state);
  const { insta: user } = useSelector(state => state.user);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [dataKorrespondent, setDataKorrespondent] = useState([]);
  const [objData, setObjData] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [startDateKorres, setStartDateKorres] = useState(new Date());
  const [allexecutorsData, setAllexecutorsData] = useState([]);
  const [files, setFiles] = useState([]);
  const [isPerson, setIsPerson] = useState(null);
  const [murojaatSoni, setMurojaatSoni] = useState(null);
  const [fileUpload, setFileUpload] = useState(false)
  const [file, setFile] = useState(null);
  const [file1, setFile1] = useState(null);
  const [chooseFiles, setChooseFiles] = useState([]);
  // const refs = useRef(arr.map(() => React.createRef()));
  const personRef = useRef();
  const nameRef = useRef();
  const lastNameRef = useRef();
  const middleNameRef = useRef();
  const phoneRef = useRef();
  const ViloyatRef = useRef();
  const TumanRef = useRef();
  const SectorRef = useRef();
  const MahallaRef = useRef();
  const AddressRef = useRef();
  const JurnalRef = useRef();
  const ReceptionTypeRef = useRef();
  const AppealTypeRef = useRef();
  const AppealFormRef = useRef();
  const PageCountRef = useRef();
  const AppealerCountRef = useRef();
  const ExtraAppealerRef = useRef();
  const ConfirmerRef = useRef();
  const korresRef = useRef();
  const chiquvchiRaqamRef = useRef();
  let loader = useRef();
  let orgNameRef = useRef();


  const colourStyles1 = {
    control: (styles) => ({ ...styles, height: '56px' }),
    option: (styles, { isDisabled }) => {
      return {
        ...styles,
        textTransform: 'upperCase',
        fontWeight: isDisabled ? "bold" : " ",
        fontSize: isDisabled ? "16px" : '14px',
        color: isDisabled ? "blue" : "black",
        cursor: isDisabled ? "not-allowed" : "default",

      };
    }
  };
  // id bo'yicha malumotni o'qib olish
  useEffect(() => {
    let isMounted = true;
    loader.current.style.display = "flex";
    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('outExecutor/getNewAppeal/' + params.id)
        setMurojaatSoni(res?.data?.data?.appealerCount)
        setIsPerson(res?.data?.data?.citizenTypeCode)
        setFileUpload(true)
        console.log(res?.data?.data);

        if (isMounted) {
          setObjData([res?.data?.data]);
          loader.current.style.display = "none";
          setChooseFiles(res?.data?.data?.files)
        }
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          loader.current.style.display = "none";
          Alert(setAlert, "warning", "Ma'lumot kelishda xatolik yuz berdi");
        }, 5000);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, params.id]);

  console.log(objData)

  // barcha ma'lumotlarni saqlash
  const saveAllData = async (e) => {
    e.preventDefault();
    let accepted = true, accepted1 = true, num = null, problems = [], objFormData = {};

    // barcha tasnif1, tasnif2, tasnif3, shortDescription larni o'qib olish
    let addNewBoxForm = document.querySelectorAll('.addNewBoxForm');
    let allDataForm = [], fileId = [];
    addNewBoxForm.forEach((elem) => {
      let formsOutlineElements = {};
      user.tasnif1.forEach((d) => {
        if (d?.label === elem.querySelector('.tasnif1').querySelector('.css-qc6sy-singleValue')?.textContent)
          formsOutlineElements.tasnif1 = d.value
      })
      user.tasnif2.forEach((d) => {
        if (d?.label === elem.querySelector('.tasnif2').querySelector('.css-qc6sy-singleValue')?.textContent)
          formsOutlineElements.tasnif2 = d.value
      })
      user.tasnif3.forEach((d) => {
        if (d?.label === elem.querySelector('.tasnif3').querySelector('.css-qc6sy-singleValue')?.textContent)
          formsOutlineElements.tasnif3 = d.value
      })
      formsOutlineElements.shortDescription = elem.querySelector('.shortDescription')?.value;
      formsOutlineElements.id = elem.getAttribute('id');

      if (formsOutlineElements.tasnif1 && formsOutlineElements.tasnif2 && formsOutlineElements.tasnif3 && formsOutlineElements.shortDescription) {
        formsOutlineElements.yes = true
      } else {
        formsOutlineElements.yes = false
      }
      allDataForm.push(formsOutlineElements);
    });

    allDataForm.forEach((d) => {
      if (!(d.yes)) accepted = false;
    })

    allDataForm.forEach((d, index) => {
      let inExecutors = [], outExecutors = [];
      // ichki bajaruvchilarni olish
      if (allexecutorsData[index]?.ichkiBajaruvchilar?.length > 0) {
        allexecutorsData[index]?.ichkiBajaruvchilar?.forEach((user) => {
          let obj = {
            executorCode: user.executorStatusName,
            workPlaceID: user?.workPlaceId,
            responsible: user?.isResponsible,
            description: user?.description,
            deadline: user.deadline
          }
          inExecutors.push(obj);
        })
      }
      // tashqi bajaruvchilarni olish
      if (allexecutorsData[index]?.tashqiBajaruvchilar?.length > 0) {
        allexecutorsData[index]?.tashqiBajaruvchilar?.forEach((user) => {
          let obj = {
            ids: user?.ids,
            id: user?.id,
            value: user?.value
          }
          outExecutors.push(obj);
        })
      }

      objFormData = {
        id: null,
        classfication1ID: objData[0]?.problem?.ac_1ID,
        classfication2ID: objData[0]?.problem?.ac_2ID,
        classfication3ID: objData[0]?.problem?.ac_3ID,
        shortDescription: objData[0]?.problem?.shortDescription,
        inExecutors: inExecutors,
        outExecutors: outExecutors
      }
      problems.push(objFormData);
    })

    // ichki yoki tashqi bajaruvchilar bitta formada bo'lishi
    if (allexecutorsData.length > 0) {
      allexecutorsData.forEach((d) => {
        if (!(d.ichkiBajaruvchilar.length > 0 || d.tashqiBajaruvchilar.length > 0)) {
          accepted1 = false;
        }
      })
    } else {
      accepted1 = false;
    }

    // fayllarni birma bir formatini tekshirish
    if (Object.values(files).length > 0) {
      for (let i = 0; i < Object.values(files).length; i++) {
        const formData = new FormData();
        let fileType = IsFileType(Object.values(files)[i]);

        // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
        if (fileType) {
          formData.append("file", Object.values(files)[i]);
          try {
            let res = await axiosInstanceFq.post(`file/upload/${JSON.parse(localStorage.getItem('oi'))}`, formData)
            console.log(res.data.data)
            fileId.push(res.data.data);
          } catch (error) {
            console.log(error.response);
          }
        }
      }
      // oldingi tanlangan file id larini olish
      chooseFiles.forEach((d) => {
        fileId.push(d.id);
      })

    } else {
      objData[0]?.files.forEach((file) => {
        fileId.push(file.id);
      });
    }

    // duplicat va takroriy burron lar
    let myBtns = document.querySelectorAll('.myBtnn');
    myBtns.forEach((btn) => {
      if (btn.hasAttribute('style')) {
        num = btn.textContent === "T" ? 2 : 1;
      }
    });

    if (personRef.current.props.value) {
      if (nameRef.current.value) {
        if (lastNameRef.current.value) {
          if (middleNameRef.current.value) {
            if (phoneRef.current.value.length === 12) {
              if (ViloyatRef.current.props.value) {
                if (TumanRef.current.props.value) {
                  if (MahallaRef.current.props.value) {
                    if (JurnalRef.current.props.value) {
                      if (startDate) {
                        if (ReceptionTypeRef.current.props.value) {
                          if (AppealTypeRef.current.props.value) {
                            if (AppealFormRef.current.props.value) {
                              if (PageCountRef.current.value) {
                                if (AppealerCountRef.current.value) {
                                  if (murojaatSoni > 1) {
                                    if (ExtraAppealerRef?.current?.value) {
                                      if (accepted1) {
                                        if (ConfirmerRef.current.props.value) {
                                          if (fileId.length > 0) {
                                            try {
                                              console.log({
                                                id: params.id,
                                                citizenTypeCode: personRef.current.props.value?.length > 0 ? personRef.current.props.value[0].value : personRef.current.props.value.value,
                                                firstName: nameRef.current?.value,
                                                lastName: lastNameRef.current?.value,
                                                middleName: middleNameRef.current?.value,
                                                phoneNumber: phoneRef.current?.value,
                                                provinceID: ViloyatRef.current.props.value?.length > 0 ? ViloyatRef.current.props.value[0]?.value : ViloyatRef.current.props.value?.value,
                                                districtID: TumanRef.current.props.value?.length > 0 ? TumanRef.current.props.value[0]?.value : TumanRef.current.props.value.value,
                                                sectorCode: objData[0]?.sectorCode,
                                                neighborhoodID: MahallaRef.current.props.value?.length > 0 ? MahallaRef.current.props.value[0]?.value : MahallaRef.current.props.value.value,
                                                address: AddressRef.current?.value,
                                                journalID: JurnalRef.current.props.value?.length > 0 ? JurnalRef.current.props.value[0]?.value : JurnalRef.current.props.value.value,
                                                regNumber: JurnalRef.current.props.value?.length > 0 ? JurnalRef.current.props.value[0]?.currentNumber : JurnalRef.current.props.value.currentNumber,
                                                regDate: startDate,
                                                receptionTypeID: ReceptionTypeRef.current.props.value?.length > 0 ? ReceptionTypeRef.current.props.value[0]?.value : ReceptionTypeRef.current.props.value.value,
                                                appealTypeID: AppealTypeRef.current.props.value?.length > 0 ? AppealTypeRef.current.props.value[0]?.value : AppealTypeRef.current.props.value.value,
                                                appealFormID: AppealFormRef.current.props.value?.length > 0 ? AppealFormRef.current.props.value[0]?.value : AppealFormRef.current.props.value.value,
                                                pageCount: PageCountRef.current?.value,
                                                appealerCount: AppealerCountRef.current?.value,
                                                extraAppealer: ExtraAppealerRef.current?.value,
                                                problems: problems,
                                                filesID: fileId,
                                                confirmerID: ConfirmerRef.current.props.value?.length > 0 ? ConfirmerRef.current.props.value[0]?.value : ConfirmerRef.current.props.value.value,
                                                correspondentID: korresRef.current.props.value?.length > 0 ? korresRef.current.props.value[0]?.value : korresRef.current.props.value.value,
                                                outNumber: chiquvchiRaqamRef.current?.value,
                                                outDate: startDateKorres,
                                                orgID: JSON.parse(localStorage.getItem('oi')),
                                                appealStatus: num,
                                                senderOrgID: objData[0]?.senderOrgID,
                                                senderProblemID: objData[0]?.problem?.id,
                                              })
                                              const res = await axiosInstanceFq.post("appeal/createForNewPage", {
                                                id: params.id,
                                                citizenTypeCode: personRef.current.props.value?.length > 0 ? personRef.current.props.value[0].value : personRef.current.props.value.value,
                                                firstName: nameRef.current?.value,
                                                lastName: lastNameRef.current?.value,
                                                middleName: middleNameRef.current?.value,
                                                phoneNumber: phoneRef.current?.value,
                                                provinceID: ViloyatRef.current.props.value?.length > 0 ? ViloyatRef.current.props.value[0]?.value : ViloyatRef.current.props.value?.value,
                                                districtID: TumanRef.current.props.value?.length > 0 ? TumanRef.current.props.value[0]?.value : TumanRef.current.props.value.value,
                                                sectorCode: objData[0]?.sectorCode,
                                                neighborhoodID: MahallaRef.current.props.value?.length > 0 ? MahallaRef.current.props.value[0]?.value : MahallaRef.current.props.value.value,
                                                address: AddressRef.current?.value,
                                                journalID: JurnalRef.current.props.value?.length > 0 ? JurnalRef.current.props.value[0]?.value : JurnalRef.current.props.value.value,
                                                regNumber: JurnalRef.current.props.value?.length > 0 ? JurnalRef.current.props.value[0]?.currentNumber : JurnalRef.current.props.value.currentNumber,
                                                regDate: startDate,
                                                receptionTypeID: ReceptionTypeRef.current.props.value?.length > 0 ? ReceptionTypeRef.current.props.value[0]?.value : ReceptionTypeRef.current.props.value.value,
                                                appealTypeID: AppealTypeRef.current.props.value?.length > 0 ? AppealTypeRef.current.props.value[0]?.value : AppealTypeRef.current.props.value.value,
                                                appealFormID: AppealFormRef.current.props.value?.length > 0 ? AppealFormRef.current.props.value[0]?.value : AppealFormRef.current.props.value.value,
                                                pageCount: PageCountRef.current?.value,
                                                appealerCount: AppealerCountRef.current?.value,
                                                extraAppealer: ExtraAppealerRef.current?.value,
                                                problems: problems,
                                                filesID: fileId,
                                                confirmerID: ConfirmerRef.current.props.value?.length > 0 ? ConfirmerRef.current.props.value[0]?.value : ConfirmerRef.current.props.value.value,
                                                correspondentID: korresRef.current.props.value?.length > 0 ? korresRef.current.props.value[0]?.value : korresRef.current.props.value.value,
                                                outNumber: chiquvchiRaqamRef.current?.value,
                                                outDate: startDateKorres,
                                                orgID: JSON.parse(localStorage.getItem('oi')),
                                                appealStatus: num,
                                                senderOrgID: objData[0]?.senderOrgID,
                                                senderProblemID: objData[0]?.problem?.id,
                                              });
                                              if (res.data.data === "Success") {
                                                Alert(setAlert, "success", "Ma'lumot muvaffaqiyatli o'zgartirildi");
                                              }
                                              setTimeout(() => {
                                                history.push(`/fuqaro/murojati/xomaki`)
                                              }, [1000 * 1])
                                            } catch (error) {
                                              console.log(error);
                                            }
                                          } else {
                                            Alert(setAlert, "warning", "Fayl tanlanmagan tanlanmagan");
                                          }
                                        } else {
                                          Alert(setAlert, "warning", "Tasdiqlovchi tanlanmagan");
                                        }
                                      } else {
                                        Alert(setAlert, "warning", "Yangi qo'shilgan formalardan Ichki yoki Tashqi bajaruvchilar tanlanmagan bo'lishi mumkin");
                                      }

                                    } else {
                                      Alert(setAlert, "warning", "Murojaatchilar ismi kiritilmagan");
                                    }

                                  } else {
                                    if (accepted1) {
                                      if (ConfirmerRef.current.props.value) {
                                        if (fileId.length > 0) {
                                          try {
                                            console.log({
                                              id: params.id,
                                              citizenTypeCode: personRef.current.props.value?.length > 0 ? personRef.current.props.value[0].value : personRef.current.props.value.value,
                                              firstName: nameRef.current?.value,
                                              lastName: lastNameRef.current?.value,
                                              middleName: middleNameRef.current?.value,
                                              phoneNumber: phoneRef.current?.value,
                                              provinceID: ViloyatRef.current.props.value?.length > 0 ? ViloyatRef.current.props.value[0]?.value : ViloyatRef.current.props.value?.value,
                                              districtID: TumanRef.current.props.value?.length > 0 ? TumanRef.current.props.value[0]?.value : TumanRef.current.props.value.value,
                                              sectorCode: objData[0]?.sectorCode,
                                              neighborhoodID: MahallaRef.current.props.value?.length > 0 ? MahallaRef.current.props.value[0]?.value : MahallaRef.current.props.value.value,
                                              address: AddressRef.current?.value,
                                              journalID: JurnalRef.current.props.value?.length > 0 ? JurnalRef.current.props.value[0]?.value : JurnalRef.current.props.value.value,
                                              regNumber: JurnalRef.current.props.value?.length > 0 ? JurnalRef.current.props.value[0]?.currentNumber : JurnalRef.current.props.value.currentNumber,
                                              regDate: startDate,
                                              receptionTypeID: ReceptionTypeRef.current.props.value?.length > 0 ? ReceptionTypeRef.current.props.value[0]?.value : ReceptionTypeRef.current.props.value.value,
                                              appealTypeID: AppealTypeRef.current.props.value?.length > 0 ? AppealTypeRef.current.props.value[0]?.value : AppealTypeRef.current.props.value.value,
                                              appealFormID: AppealFormRef.current.props.value?.length > 0 ? AppealFormRef.current.props.value[0]?.value : AppealFormRef.current.props.value.value,
                                              pageCount: PageCountRef.current?.value,
                                              appealerCount: AppealerCountRef.current?.value,
                                              extraAppealer: null,
                                              problems: problems,
                                              filesID: fileId,
                                              confirmerID: ConfirmerRef.current.props.value?.length > 0 ? ConfirmerRef.current.props.value[0]?.value : ConfirmerRef.current.props.value.value,
                                              correspondentID: korresRef.current.props.value?.length > 0 ? korresRef.current.props.value[0]?.value : korresRef.current.props.value.value,
                                              outNumber: chiquvchiRaqamRef.current?.value,
                                              outDate: startDateKorres,
                                              orgID: JSON.parse(localStorage.getItem('oi')),
                                              appealStatus: num,
                                              senderOrgID: objData[0]?.senderOrgID,
                                              senderProblemID: objData[0]?.problem?.id,
                                            })
                                            const res = await axiosInstanceFq.post("appeal/createForNewPage", {
                                              id: params.id,
                                              citizenTypeCode: personRef.current.props.value?.length > 0 ? personRef.current.props.value[0].value : personRef.current.props.value.value,
                                              firstName: nameRef.current?.value,
                                              lastName: lastNameRef.current?.value,
                                              middleName: middleNameRef.current?.value,
                                              phoneNumber: phoneRef.current?.value,
                                              provinceID: ViloyatRef.current.props.value?.length > 0 ? ViloyatRef.current.props.value[0]?.value : ViloyatRef.current.props.value?.value,
                                              districtID: TumanRef.current.props.value?.length > 0 ? TumanRef.current.props.value[0]?.value : TumanRef.current.props.value.value,
                                              sectorCode: objData[0]?.sectorCode,
                                              neighborhoodID: MahallaRef.current.props.value?.length > 0 ? MahallaRef.current.props.value[0]?.value : MahallaRef.current.props.value.value,
                                              address: AddressRef.current?.value,
                                              journalID: JurnalRef.current.props.value?.length > 0 ? JurnalRef.current.props.value[0]?.value : JurnalRef.current.props.value.value,
                                              regNumber: JurnalRef.current.props.value?.length > 0 ? JurnalRef.current.props.value[0]?.currentNumber : JurnalRef.current.props.value.currentNumber,
                                              regDate: startDate,
                                              receptionTypeID: ReceptionTypeRef.current.props.value?.length > 0 ? ReceptionTypeRef.current.props.value[0]?.value : ReceptionTypeRef.current.props.value.value,
                                              appealTypeID: AppealTypeRef.current.props.value?.length > 0 ? AppealTypeRef.current.props.value[0]?.value : AppealTypeRef.current.props.value.value,
                                              appealFormID: AppealFormRef.current.props.value?.length > 0 ? AppealFormRef.current.props.value[0]?.value : AppealFormRef.current.props.value.value,
                                              pageCount: PageCountRef.current?.value,
                                              appealerCount: AppealerCountRef.current?.value,
                                              extraAppealer: null,
                                              problems: problems,
                                              filesID: fileId,
                                              confirmerID: ConfirmerRef.current.props.value?.length > 0 ? ConfirmerRef.current.props.value[0]?.value : ConfirmerRef.current.props.value.value,
                                              correspondentID: korresRef.current.props.value?.length > 0 ? korresRef.current.props.value[0]?.value : korresRef.current.props.value.value,
                                              outNumber: chiquvchiRaqamRef.current?.value,
                                              outDate: startDateKorres,
                                              orgID: JSON.parse(localStorage.getItem('oi')),
                                              appealStatus: num,
                                              senderOrgID: objData[0]?.senderOrgID,
                                              senderProblemID: objData[0]?.problem?.id,
                                            });
                                            if (res.data.data === "Success") {
                                              Alert(setAlert, "success", "Ma'lumot muvaffaqiyatli o'zgartirildi");
                                            }
                                            setTimeout(() => {
                                              history.push(`/fuqaro/murojati/xomaki`)
                                            }, [1000 * 1])
                                          } catch (error) {
                                            console.log(error);
                                          }
                                        } else {
                                          Alert(setAlert, "warning", "Fayl tanlanmagan tanlanmagan");
                                        }
                                      } else {
                                        Alert(setAlert, "warning", "Tasdiqlovchi tanlanmagan");
                                      }
                                    } else {
                                      Alert(setAlert, "warning", "Yangi qo'shilgan formalardan Ichki yoki Tashqi bajaruvchilar tanlanmagan bo'lishi mumkin");
                                    }
                                  }

                                } else {
                                  Alert(setAlert, "warning", "Murojaatchilar soni kiritilmagan");
                                }
                              } else {
                                Alert(setAlert, "warning", "Sahifalar soni kiritilmagan");
                              }
                            } else {
                              Alert(setAlert, "warning", "Murojaat shakli tanlanmagan");
                            }
                          } else {
                            Alert(setAlert, "warning", "Murojaat turi tanlanmagan");
                          }
                        } else {
                          Alert(setAlert, "warning", "Qabul qilish turi tanlanmagan");
                        }
                      } else {
                        Alert(setAlert, "warning", "Registratsiya sanasi kiritilmagan");
                      }
                    } else {
                      Alert(setAlert, "warning", "Jurnal tanlanmagan");
                    }
                  } else {
                    Alert(setAlert, "warning", "Mahalla tanlanmagan");
                  }
                } else {
                  Alert(setAlert, "warning", "Tuman tanlanmagan");
                }
              } else {
                Alert(setAlert, "warning", "Viloyat tanlanmagan");
              }
            } else {
              Alert(setAlert, "warning", "Telefon nomer kiritish majburiy");
            }
          } else {
            Alert(setAlert, "warning", "Otasining ismi kiritilmagan");
          }
        } else {
          Alert(setAlert, "warning", "Familiya kiritish majburiy");
        }
      } else {
        Alert(setAlert, "warning", "Ism kiritish majburiy");
      }
    } else {
      Alert(setAlert, "warning", "Yuridik yoki jismoniy shaxsni tanlash majburiy");
    }
  }

  return (
    <div className="content mb-5 content-mobile">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Sozlash</h3>
      <div className="card-body card-body-mobile pt-2">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <NavbarFuqaroMurojat />
          <li className="nav-item">
            <NavLink exact to={`/fuqaro/murojati/xomaki/yangilash/${params.id}`} className="nav-link"
              activeClassName='NavLinkLi'>
              <i className="fab fa-whmcs mr-1" />Sozlash
            </NavLink>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="row" style={{ backgroundColor: '#F1F1F1' }}>
              <div className="col-lg-6">
                <div className="card">
                  <div className="card-body">
                    {/* 2 kala shaxs uchun */}
                    {
                      objData.length > 0 &&
                      <AllPersonsYangi
                        setIsPerson={setIsPerson}
                        isPerson={isPerson}
                        currentUser={currentUser}
                        colourStyles1={colourStyles1}
                        personRef={personRef}
                        nameRef={nameRef}
                        lastNameRef={lastNameRef}
                        middleNameRef={middleNameRef}
                        phoneRef={phoneRef}
                        ViloyatRef={ViloyatRef}
                        TumanRef={TumanRef}
                        SectorRef={SectorRef}
                        MahallaRef={MahallaRef}
                        AddressRef={AddressRef}
                        objData={objData}
                        orgNameRef={orgNameRef}
                      />
                    }
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                {
                  objData.length > 0 &&
                  <TopRightJournalsYangi
                    setMurojaatSoni={setMurojaatSoni}
                    murojaatSoni={murojaatSoni}
                    currentUser={currentUser}
                    setDataKorrespondent={setDataKorrespondent}
                    setAlert={setAlert}
                    alert={alert}
                    dataKorrespondent={dataKorrespondent}
                    JurnalRef={JurnalRef}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    ReceptionTypeRef={ReceptionTypeRef}
                    AppealTypeRef={AppealTypeRef}
                    AppealFormRef={AppealFormRef}
                    PageCountRef={PageCountRef}
                    AppealerCountRef={AppealerCountRef}
                    ExtraAppealerRef={ExtraAppealerRef}
                    setStartDateKorres={setStartDateKorres}
                    startDateKorres={startDateKorres}
                    korresRef={korresRef}
                    chiquvchiRaqamRef={chiquvchiRaqamRef}
                    objData={objData}
                  />
                }
              </div>
              <div className="col-lg-12">
                {
                  objData.length > 0 &&
                  <CenterContentYangi
                    currentUser={currentUser}
                    colourStyles={colourStyles1}
                    saveAllData={saveAllData}
                    ConfirmerRef={ConfirmerRef}
                    setAllexecutorsData={setAllexecutorsData}
                    allexecutorsData={allexecutorsData}
                    objData={objData}
                    setFile1={setFile1}
                    file1={file1} setFile={setFile}
                    file={file}
                    files={files}
                    setFiles={setFiles}
                    chooseFiles={chooseFiles}
                    setChooseFiles={setChooseFiles}
                  />
                }
              </div>
            </div>
          </div>
        </div>

        {/* loader */}
        <Loader loader={loader} />

        {/* alert */}
        <AlertContent alert={alert} />
      </div>
    </div>
  )
}

export default React.memo(FQM_YangiEdit)