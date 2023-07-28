import React, { useEffect, useState, useRef } from "react";
import Select from 'react-select'
import DatePicker from "react-datepicker";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance, axiosInstanceOut, url, urlOut } from "../../../../../../../config";
import { Link, useHistory } from "react-router-dom";
import AllFilesView from "./allFilesView/AllFilesView";

const NewSettingsForms = ({ data, setAlert, currentUser, params, submissionFormref, korrespondentref, outNumref, outDateref, shortDescref }) => {
  const history = useHistory();
  const [startDate2, setStartDate2] = useState(new Date());
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [cardsName, setCardsName] = useState([]);
  const [card, setCard] = useState([]);
  const [jurnallar, setJurnallar] = useState([]);
  const [tasdiqlovchi, setTasdiqlovchi] = useState([]);

  const journalref = useRef();
  const journalNumref = useRef();
  const cardTyperef = useRef();
  const cardNameref = useRef();
  const confirmerref = useRef();
  const countPageref = useRef();

  const dateFormatDate = (date) => {
    return date?.slice(6, date.length) + '-' + date?.slice(3, 5) + '-' + date?.slice(0, 2)
  }

  // organization/showCardTypeByOrg -> get orgType
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/showCardTypeByOrg/" + JSON.parse(localStorage.getItem('oi')))

        console.log(res.data);
        let arr = [];

        const data = res.data.sort((a, b) => a.orderNumber - b.orderNumber);

        data.forEach((c) => {
          arr.push({ value: c.id, label: c.cardName });
        })

        if (isMounted)
          setNotParentsCard(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // get all card
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("journal/getOrgAll/" + JSON.parse(localStorage.getItem('oi')))
        console.log(res.data);
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.shortDescription, clearableValue: true })
        });

        if (isMounted) {
          setJurnallar(res.data);
          setCard(arr);
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

  const notParentsCardClick = async (e) => {
    if (cardNameref.current.props.value) {
      cardNameref.current.removeValue(cardNameref.current.props.value);
    }
    try {
      const res = await axiosInstance.get(`organization/showCard/cardType/${e.value}/${JSON.parse(localStorage.getItem('oi'))}`)
      console.log(res.data);
      let arr = [];
      res.data.forEach((d) => {
        arr.push({ value: d.id, label: d.cardName });
      })
      setCardsName(arr);
    } catch (error) {
      console.log(error.response);
    }
  }

  // jurnalni tanlagan payt id sini olish
  const clickCard = (e) => {
    jurnallar.forEach((c) => {
      if (e.label === c.uzName) {
        journalNumref.current.value = c.beginNumber;
      }
    })
  }

  // get all confirmers
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.workPlaceId, label: `${(d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : ""}${d.lastName}` })
        });

        if (isMounted)
          setTasdiqlovchi(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // malumotlarni yuborish
  const newFormFunction = async (e) => {
    e.preventDefault();
    let jurnali = journalref.current?.props?.value;
    let num = journalNumref.current.value;
    let cardTypeId = cardTyperef.current?.props?.value;
    let cardName = cardNameref.current?.props?.value;
    let taqdimEtishForma = submissionFormref.current.value;
    let tasdiqlovchi1 = confirmerref.current?.props?.value;
    let korrespondent1 = korrespondentref.current.value;
    let chiquvchiRaqam = outNumref.current.value;
    let chiquvchiSana = outDateref.current.value;
    let ruyxatSana = document.querySelector('.ruyxatSana').value;
    let sahifalarSoni = countPageref.current.value;
    let qisqachaMalumot = shortDescref.current.value;

    // oldingi fayl id larini olish
    let beforeFileId = []
    data.files?.forEach((c) => {
      beforeFileId.push(c.id);
    })

    if (jurnali) {
      if (num) {
        if (cardTypeId) {
          if (cardName) {
            if (taqdimEtishForma) {
              if (tasdiqlovchi1) {
                if (korrespondent1) {
                  if (chiquvchiRaqam) {
                    if (chiquvchiSana) {
                      if (chiquvchiSana) {
                        if (ruyxatSana) {
                          if (sahifalarSoni) {
                            // to do server
                            if (params.docId) {
                              try {
                                const sendData = {
                                  id: params.id,
                                  cardId: cardName.value, //cardId[0]?.value,  //ok
                                  submissionFormId: data.submissionForm?.id,  //ok
                                  journalId: jurnali.value, //journalId[0]?.value,  //ok
                                  correspondentId: data.correspondent?.id,  //ok
                                  confirmerId: tasdiqlovchi1.value, //confirmerId[0]?.value, //ok
                                  outNumber: data?.outNumber,
                                  outDate: data?.outDate,
                                  registrationAt: dateFormatDate(ruyxatSana),
                                  pageCount: parseInt(sahifalarSoni),
                                  shortDescription: qisqachaMalumot,
                                  fileId: beforeFileId,
                                  orgId: localStorage.getItem("oi")
                                }
                                console.log(sendData);
                                await axiosInstance.post("newDoc/" + params.docId, sendData)
                                Alert(setAlert, "success", "Muvaffaqiyatli saqlandi");
                                setTimeout(() => {
                                  history.push("/kiruvchi/yangi")
                                }, 1500);
                              } catch (error) {
                                console.log(error.response);
                                Alert(setAlert, "warning", error.response?.data);
                              }
                            } else {
                              try {
                                const res = await axiosInstance.get("document/saveDuplicateFileOutgoing/" + params.missiveId)
                                console.log(res.data);
                                try {
                                  const sendData = {
                                    missiveId: params.missiveId,
                                    cardId: cardName.value, //cardId[0]?.value,  //ok
                                    submissionFormId: data.submissionForm?.id,  //ok
                                    journalId: jurnali.value, //journalId[0]?.value,  //ok
                                    correspondentId: data.correspondent?.id,  //ok
                                    confirmerId: tasdiqlovchi1.value, //confirmerId[0]?.value, //ok
                                    outNumber: data?.outNumber,
                                    outDate: data?.outDate,
                                    registrationAt: dateFormatDate(ruyxatSana),
                                    pageCount: parseInt(sahifalarSoni),
                                    shortDescription: qisqachaMalumot,
                                    fileId: res.data,
                                    orgId: localStorage.getItem("oi")
                                  }
                                  console.log(sendData);
                                  await axiosInstance.post("document/createDocument", sendData)
                                  Alert(setAlert, "success", "Muvaffaqiyatli saqlandi");
                                  setTimeout(() => {
                                    history.push("/kiruvchi/yangi")
                                  }, 1500);
                                } catch (error) {
                                  console.log(error.response);
                                  Alert(setAlert, "warning", error.response?.data);
                                }
                              } catch (error) {
                                console.log(error.response);
                                Alert(setAlert, "warning", error.response?.data);
                              }
                            }
                          } else {
                            Alert(setAlert, "warning", "Количество страниц не включено")
                          }
                        } else {
                          Alert(setAlert, "warning", "Дата регистрации не выбрана")
                        }
                      } else {
                        Alert(setAlert, "warning", "Дата выезда не выбрана")
                      }
                    } else {
                      Alert(setAlert, "warning", "Дата выпуска не указана")
                    }
                  } else {
                    Alert(setAlert, "warning", "Не введен исходящий номер")
                  }
                } else {
                  Alert(setAlert, "warning", "Корреспондент не выбран")
                }
              } else {
                Alert(setAlert, "warning", "Валидатор не выбран")
              }
            } else {
              Alert(setAlert, "warning", "Форма отправки не выбрана")
            }
          } else {
            Alert(setAlert, "warning", "Имя карты не выбрано")
          }
        } else {
          Alert(setAlert, "warning", "Карта не выбрана")
        }
      } else {
        Alert(setAlert, "warning", "Номер журнала не указан")
      }
    } else {
      Alert(setAlert, "warning", "Журнал не выбран")
    }
  }

  return (
    <form onSubmit={newFormFunction}>
      <div className="row ">
        <div className="col-lg-4">
          <div className="form-group form-group-floating row mb-0">
            <div className="col-lg-12" >
              <Select
                options={card}
                onChange={clickCard}
                placeholder="Журнал"
                className='jurnali'
                ref={journalref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="form-group form-group-floating row mb-0">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  type="number"
                  className="form-control form-control-outline num"
                  id="number" placeholder="Номер"
                  disabled
                  required
                  ref={journalNumref}
                />
                <label className="label-floating">№</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <Select
                  options={notParentsCard}
                  onChange={notParentsCardClick}
                  placeholder="Тип карта"
                  className="cardTypeId"
                  ref={cardTyperef}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <Select
                  options={cardsName}
                  placeholder="Имя карта"
                  className="cardName"
                  ref={cardNameref}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-4">
          <div className="form-group form-group-floating row mb-0">
            <div className="col-lg-12">
              <input
                type="text"
                className="form-control form-control-outline taqdimForma"
                id="number" placeholder="Placeholder"
                disabled
                required
                ref={submissionFormref}
              />
              <label className="label-floating">Форма представления</label>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating row mb-0">
            <div className="col-lg-12">
              <Select
                options={tasdiqlovchi}
                placeholder="Валидатор"
                className='tasdiqlovchi'
                ref={confirmerref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating row mb-0">
            <div className="col-lg-12">
              <input
                type="text"
                className="form-control form-control-outline korrespondent"
                id="number" placeholder="Placeholder"
                disabled
                required
                ref={korrespondentref}
              />
              <label className="label-floating">Корреспондент</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-3">
          <div className="form-group form-group-floating row mb-0">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline chiquvchiRaqam"
                  id="chiquvchiRaqam"
                  placeholder="Placeholder"
                  disabled
                  ref={outNumref}
                />
                <label className="label-floating">Исходящий номер</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating row mb-0">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  type="date"
                  className="form-control daterange-single form-control-outline chiquvchiSana"
                  id="chiquvchiSana"
                  placeholder="Placeholder"
                  disabled
                  style={{ border: "1px solid lightgray" }}
                  ref={outDateref}
                />
                <label className="label-floating">Исходящий № /дата</label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating row mb-0">
            <div className="col-lg-12">
              <div className={'changeBox'} style={{
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
                <DatePicker width="100" height="100"
                  className={'ruyxatSana'} id={'royxatdanOtishSana'}
                  selected={startDate2}
                  onChange={(date) => setStartDate2(date)}
                  dateFormat={'dd.MM.yyyy'}
                  isClearable
                  placeholderText="Дата регистрации"
                  showYearDropdown scrollableMonthYearDropdown
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating row mb-0">
            <div className="col-lg-12">
              <div className="position-relative">
                <input
                  type="number"
                  className="form-control form-control-outline sahifalarSoni"
                  id="sahifalarSoni"
                  placeholder="Placeholder"
                  ref={countPageref}
                />
                <label className="label-floating">Количество страниц</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-lg-12">
          <div className="form-group form-group-floating row">
            <div className="col-lg-12">
              <div className="position-relative">
                <textarea cols="30"
                  rows="5"
                  id="malumot"
                  maxLength="300"
                  className="form-control form-control-outline qisqachaMalumot"
                  placeholder="Placeholder"
                  ref={shortDescref}
                />
                <label className="label-floating">Краткая информация</label>
                <span className="mt-5 text-muted">Краткая информация не превышает 300 символов</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* fayllarni ko'rsatish */}
      <div className="col-lg-12">
        <AllFilesView
          data={data}
        />
      </div>

      <div className="row mt-4 d-flex align-items-center justify-content-between">
        <div className="ml-2">
          <button type="submit" className="btn btn-primary mr-2"><i className="fa fa-save mr-2"></i>Сохранить</button>
          <Link to={`${"/kiruvchi/yangi"}`}>
            <button type="button" className="btn btn-primary"><i className="fa fa-arrow-left mr-2"></i>Возвращаться</button>
          </Link>
        </div>
      </div>
      <div className="col-lg-12 mt-3">
        {data?.files?.length > 0 && (
          params.id ? (
            <embed
              src={url + "/api/document/getDocumentFiles/" + data?.id}
              type={"application/pdf"}
              width="100%"
              height="1630"
            />
          ) : (
            <embed
              src={urlOut + "file/" + data?.files[0]?.originalName}
              type={"application/pdf"}
              width="100%"
              height="1630"
            />
          )
        )}
      </div>
    </form>
  )
}

export default React.memo(NewSettingsForms);