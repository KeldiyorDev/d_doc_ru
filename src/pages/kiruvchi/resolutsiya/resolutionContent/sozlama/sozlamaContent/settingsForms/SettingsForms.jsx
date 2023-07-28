import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import Select from 'react-select'
import DatePicker from "react-datepicker";
import { Alert } from "../../../../../../../component/alert/Alert";
import { axiosInstance, url } from "../../../../../../../config";
import ViewAllFilesSettings from "./viewAllFilesSettings/ViewAllFilesSettings";
import { DateFormatSet } from "../../../../../../../component/DateFormat";

const SettingsForms = ({ data, setAlert, currentUser, startDate1, setStartDate1, startDate2, setStartDate2, params, setDeleteModal, journalref, journalNumref, cardTyperef, cardNameref, submissionFormref, confirmerref, korrespondentref, outNumref, pageCountref, shortDescref }) => {
  const history = useHistory();
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [cardsName, setCardsName] = useState([]);
  const [card, setCard] = useState([]);
  const [taqdimForma, setTaqdimForma] = useState([]);
  const [tasdiqlovchi, setTasdiqlovchi] = useState([]);
  const [korrespondent, setKorrespondent] = useState([]);
  const [file, setFile] = useState(null);
  const [jurnallar, setJurnallar] = useState([]);

  // get all cardType
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
        let arr = [];
        // console.log(res.data);
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.uzName })
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

  // card ni tanlamasdan cardname ni ro'yxatini chiqarish
  useEffect(() => {
    let isMounted = true;
    if (notParentsCard.length > 0) {
      let cardTypeName = document.querySelector('.cardTypeId')?.querySelector('.css-qc6sy-singleValue')?.textContent;
      let ctn = notParentsCard.filter((d) => {
        return d.label === cardTypeName;
      })

      const getData = async (e) => {
        try {
          const res = await axiosInstance.get(`organization/showCard/cardType/${e.value}/${JSON.parse(localStorage.getItem('oi'))}`)
          let arr = [];
          res.data.forEach((d) => {
            arr.push({ value: d.id, label: d.cardName });
          })

          if (isMounted)
            setCardsName(arr);
        } catch (error) {
          console.log(error.response);
        }
      }
      getData();
    }

    return () => {
      isMounted = false;
    }
  }, [notParentsCard, data, currentUser]);

  // change cardType
  const notParentsCardClick = useCallback(async (e) => {
    document.querySelector('.cardName').querySelector('.css-qc6sy-singleValue').textContent = "";

    try {
      const res = await axiosInstance.get(`organization/showCard/cardType/${e.value}/${JSON.parse(localStorage.getItem('oi'))}`)
      let arr = [];
      res.data.forEach((d) => {
        arr.push({ value: d.id, label: d.cardName });
      })
      setCardsName(arr);
    } catch (error) {
      console.log(error.response);
    }
  }, [setCardsName]);

  // jurnalni tanlagan payt id sini olish
  // journalNumref.current.value = res.data?.journal?.beginNumber;
  const clickCard = (e) => {
    console.log(e);
    jurnallar.forEach((c) => {
      console.log(c);
      if (e?.value === c.id) {
        document.querySelector('.num').value = c?.beginNumber+c?.journalPostfix;
      }
    })
  }

  // get all submissionForm
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("submissionForm/orgAll/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.name })
        });

        if (isMounted)
          setTaqdimForma(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // get all confirmers
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((d) => {
          let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + "." : d?.firstName?.substring(0, 1) + ".") : "";
          arr.push({
            value: d?.workPlaceId,
            label: `${firstname}${d.lastName}`
          })
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

  // get all korrespondent
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/orgCorrespondent/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.orgName })
        });

        if (isMounted)
          setKorrespondent(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  const newFormFunction = async (e) => {
    e.preventDefault();
    let jurnali = journalref.current?.props?.value;   //no
    let num = journalNumref.current.value;
    let cardTypeId = cardTyperef.current?.props?.value;
    let cardName = cardNameref.current?.props?.value;
    let taqdimEtishForma = submissionFormref.current?.props?.value;
    let tasdiqlovchi1 = confirmerref.current?.props?.value;
    let korrespondent1 = korrespondentref.current?.props?.value;
    let chiquvchiRaqam = outNumref?.current?.value;
    let chiquvchiSana = document.querySelector('.chiquvchiSana').value;
    let ruyxatSana = document.querySelector('.ruyxatSana').value;
    let sahifalarSoni = pageCountref.current.value;
    let qisqachaMalumot = shortDescref.current.value;


    // jurnal tanlangan bulsa id sini olish
    let journalId = card?.filter((c) => {
      return c.label === jurnali?.label;
    })

    // oldingi fayl id larini olish
    let beforeFileId = []
    data.files?.forEach((c) => {
      beforeFileId.push(c.id);
    })

    let fileId = [];
    if (file) {
      for (let i = 0; i < file?.length; i++) {
        const formData = new FormData();
        let fileType = (file[i]?.type === "application/zip" || file[i]?.type === "application/gzip" || file[i]?.type === "application/msword" || file[i]?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || file[i]?.type === "application/vnd.ms-powerpoint" || file[i]?.type === "application/vnd.ms-excel.sheet.macroEnabled.12" || file[i]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file[i]?.type === "application/vnd.ms-excel" || file[i]?.type === "application/x-rar-compressed" || file[i]?.type === "application/pdf" || file[i]?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file[i]?.type === "application/vnd.ms-excel");

        // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
        if (fileType) {
          formData.append("file", file[i]);
          let res = await axiosInstance.post("document/saveDuplicateFile/" + JSON.parse(localStorage.getItem('oi')), formData)
          fileId.push(res.data);
        }
      }
    }

    if (data?.isCameOtherOrg) {
      if (jurnali) {
        if (num) {
          if (cardTypeId) {
            if (cardName) {
              if (tasdiqlovchi1) {
                if (ruyxatSana) {
                  if (sahifalarSoni) {
                    // to do server
                    try {
                      await axiosInstance.patch("document/updateDocument", {
                        id: params.id,
                        cardId: cardName.value,
                        submissionFormId: data?.submissionForm?.id,
                        journalId: journalId[0]?.value,
                        correspondentId: data?.correspondent?.id,
                        confirmerId: tasdiqlovchi1.value,
                        outNumber: data?.outNumber,
                        outDate: data?.outDate,
                        registrationAt: DateFormatSet(ruyxatSana),
                        pageCount: parseInt(sahifalarSoni),
                        shortDescription: qisqachaMalumot,
                        fileId: beforeFileId
                      })
                      Alert(setAlert, "success", "Muvaffaqiyatli o'zgartirildi");
                      setTimeout(() => {
                        params.name === "resolution" ? history.push("/kiruvchi/resolution") : history.push("/kiruvchi/yangi")
                      }, 1500);
                    } catch (error) {
                      console.log(error.response);
                      Alert(setAlert, "warning", error.response?.data);
                    }
                  } else {
                    Alert(setAlert, "warning", "Количество страниц не включено")
                  }
                } else {
                  Alert(setAlert, "warning", "Дата регистрации не выбрана")
                }
              } else {
                Alert(setAlert, "warning", "Валидатор не выбран")
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
    } else {
      if (data.files?.length > 0 || fileId?.length > 0) {
        if (jurnali) {
          if (num) {
            if (cardTypeId) {
              if (cardName) {
                if (taqdimEtishForma) {
                  if (tasdiqlovchi1) {
                    if (korrespondent1) {
                      if (chiquvchiRaqam) {
                        if (chiquvchiSana) {
                          if (ruyxatSana) {
                            if (sahifalarSoni) {
                              // to do server
                              try {
                                await axiosInstance.patch("document/updateDocument", {
                                  id: params.id,
                                  cardId: cardName.value,
                                  submissionFormId: taqdimEtishForma.value,
                                  journalId: journalId[0]?.value,
                                  correspondentId: korrespondent1.value,
                                  confirmerId: tasdiqlovchi1.value,
                                  outNumber: chiquvchiRaqam,
                                  outDate: DateFormatSet(chiquvchiSana),
                                  registrationAt: DateFormatSet(ruyxatSana),
                                  pageCount: parseInt(sahifalarSoni),
                                  shortDescription: qisqachaMalumot,
                                  fileId: beforeFileId.concat(fileId)
                                })
                                Alert(setAlert, "success", "Muvaffaqiyatli o'zgartirildi");
                                setTimeout(() => {
                                  params.name === "resolution" ? history.push("/kiruvchi/resolution") : history.push("/kiruvchi/yangi")
                                }, 1500);
                              } catch (error) {
                                console.log(error.response);
                                Alert(setAlert, "warning", error.response?.data);
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
      } else {
        Alert(setAlert, "warning", "Файл не выбран")
      }
    }
  }

  return (
    <form onSubmit={newFormFunction}>
      <div className="row ">
        <div className="col-lg-4">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              <Select
                options={card}
                onChange={clickCard}
                placeholder="Журнал"
                className='jurnali'
                isClearable={true}
                ref={journalref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-outline num"
                id="number" placeholder="Placeholder"
                disabled
                required
                ref={journalNumref}
              />
              <label className="label-floating">№</label>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating">
            <div className="position-relative">
              <Select
                options={notParentsCard}
                onChange={notParentsCardClick}
                placeholder="Тип карты"
                className="cardTypeId"
                isClearable={true}
                ref={cardTyperef}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating">
            <div className="position-relative">
              <Select
                options={cardsName}
                placeholder="Имя карты"
                className="cardName"
                isClearable={true}
                ref={cardNameref}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              {data?.isCameOtherOrg ? (
                <input
                  type="text"
                  className='taqdimForma form-control'
                  placeholder="Форма представления"
                  defaultValue={data?.submissionForm?.name}
                  disabled
                  style={{ width: "100%", height: "56px", paddingLeft: "10px" }}
                />
              ) : (
                <Select
                  options={taqdimForma}
                  placeholder="Форма представления"
                  className='taqdimForma'
                  isClearable={true}
                  ref={submissionFormref}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              <Select
                options={tasdiqlovchi}
                placeholder="Валидатор"
                className='tasdiqlovchi'
                isClearable={true}
                ref={confirmerref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              {data?.isCameOtherOrg ? (
                <input
                  type="text"
                  className='korrespondent  form-control'
                  placeholder="Корреспондент"
                  defaultValue={data?.correspondent?.orgName}
                  disabled
                  style={{ width: "100%", height: "56px", paddingLeft: "10px" }}
                />
              ) : (
                <Select
                  options={korrespondent}
                  placeholder="Корреспондент"
                  className='korrespondent'
                  isClearable={true}
                  ref={korrespondentref}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-3">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              {data?.isCameOtherOrg ? (
                <>
                  <input
                    type="text"
                    className="form-control form-control-outline chiquvchiRaqam"
                    id="chiquvchiRaqam"
                    placeholder="Исходящий номер"
                    disabled
                    defaultValue={data?.outNumber}
                    style={{ width: "100%", height: "56px", paddingLeft: "10px" }}
                  />
                  <label className="label-floating">Исходящий номер</label>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    className="form-control form-control-outline chiquvchiRaqam"
                    id="chiquvchiRaqam"
                    placeholder="Исходящий номер"
                    ref={outNumref}
                  />
                  <label className="label-floating">Исходящий номер</label>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              {data?.isCameOtherOrg ? (
                <input
                  type="text"
                  disabled
                  className={'chiquvchiSana  form-control'}
                  defaultValue={data?.outDate}
                  style={{ width: "100%", height: "56px", paddingLeft: "10px" }}
                />
              ) : (
                <div className='changeBox' style={{
                  width: '100%',
                  border: "1px solid lightgray",
                  position: "inherit",
                  zIndex: "9"
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
                    placeholderText="Исходящий № /Дата"
                  // showTimeSelect
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              <div className='changeBox' style={{
                width: '100%',
                border: "1px solid lightgray",
                position: "inherit",
                zIndex: "9"
              }}>
                <DatePicker
                  className={'ruyxatSana'}
                  id={'royxatdanOtishSana'}
                  selected={startDate2}
                  onChange={(date) => setStartDate2(date)}
                  dateFormat={'dd.MM.yyyy'}
                  isClearable
                  showYearDropdown
                  scrollableMonthYearDropdown
                  placeholderText="Дата регистрации"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              <input
                type="number"
                className="form-control form-control-outline sahifalarSoni"
                id="sahifalarSoni"
                placeholder="Количество страниц"
                ref={pageCountref}
              />
              <label className="label-floating">Количество страниц</label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-12">
          <div className="form-group form-group-floating">
            <div className="position-relative">
              <textarea cols="30"
                rows="5"
                id="malumot"
                maxLength="300"
                className="form-control form-control-outline qisqachaMalumot"
                placeholder="Количество страниц"
                ref={shortDescref}
              />
              <label className="label-floating">Краткая информация</label>
              <span className="mt-5 text-muted">Краткая информация не превышает 300 символов</span>
            </div>
          </div>
        </div>
        {!data?.isCameOtherOrg && (
          <div className="col-lg-12">
            <div className="form-group form-group-float">
              <span className="text-muted"
                style={{ fontSize: "12px" }}>{data?.files?.length > 0 ? `${data?.files?.length} ta fayl oldin tanlangan` : ""}</span>
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="custom-file-visible"
                  accept='.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .zip, .rar'
                  onClick={(e) => e.target.value = null}
                  onChange={(e) => setFile(e.target.files)}
                  multiple="multiple"
                  style={{ zIndex: "-1" }}
                />
                <label className="custom-file-label text-muted"
                  htmlFor="custom-file-visible">
                  {file?.length > 0 ? `${file?.length} ta fayl tanlandi` : "Faylni tanlash"}
                </label>
              </div>
              <label className="d-block text-muted mb-0">Фиксированные форматы:
                doc, docx, xls,xlsx, ppt, pptx, pdf, .zip, .rar</label>
            </div>
          </div>
        )}
      </div>

      {/* fayllarni ko'rsatish */}
      <div className="row">
        <div className="col-lg-12">
          <ViewAllFilesSettings
            data={data}
            setDeleteModal={setDeleteModal}
          />
        </div>
      </div>
      <div className="row mb-2 d-flex align-items-center justify-content-between">
        <div className="ml-2">
          <button type="submit" className="btn btn-primary mr-2"><i
            className="fa fa-edit mr-2"></i>Изменять
          </button>
          <Link to={`${params.name === "resolution" ? "/kiruvchi/resolution" : "kiruvchi/yangi"}`}>
            <button type="button" className="btn btn-primary"><i
              className="fa fa-arrow-left mr-2"></i>Возвращаться
            </button>
          </Link>
        </div>
      </div>

      {data?.files?.length > 0 && data.files.map((f, index) => (
        f.extention === "application/pdf" && (
          <embed
            src={url + "/api/file/view/" + f?.generatedName}
            type={"application/pdf"}
            width="100%"
            style={{ padding: "0 10px" }}
            height="1630px"
            key={index}
          />
        )
      ))}
    </form>
  )
}

export default React.memo(SettingsForms);