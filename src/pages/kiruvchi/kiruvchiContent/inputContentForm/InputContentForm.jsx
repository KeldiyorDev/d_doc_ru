import React, { useEffect, useRef, useState, useCallback } from "react";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import { axiosInstance } from "../../../../config";
import PdfFileView from "./pdfFileView/PdfFileView";
import ViewModal from "./viewModal/ViewModal";
import AddModal from "./AddModal";

const InputContentForm = ({ file, setFile, currentUser, setAlert, deleteFile, uploadFile }) => {
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [startDate1, setStartDate1] = useState(null);
  const [startDate2, setStartDate2] = useState(null);
  const [ids, setIds] = useState(null);
  const [notParentsCard, setNotParentsCard] = useState([]);
  const [cardsName, setCardsName] = useState([]);
  const [card, setCard] = useState([]);
  const [jurnallar, setJurnallar] = useState([]);
  const [taqdimForma, setTaqdimForma] = useState([]);
  const [tasdiqlovchi, setTasdiqlovchi] = useState([]);
  const [korrespondent, setKorrespondent] = useState([]);
  const [isDisebled, setIsDisebled] = useState(false);

  const jurnalref = useRef();
  const cardTyperef = useRef();
  const cardNameref = useRef();
  const taqdimFormaref = useRef();
  const userref = useRef();
  const korresref = useRef();
  const outNumref = useRef();
  const countPageref = useRef();
  const shortDescref = useRef();
  const journalNumref = useRef();

  // add modal
  const [addModal, setAddModal] = useState(false)

  // barcha cardlar ni o'qib olish
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
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // barcha card (jurnallarni) larni o'qib olish
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
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, reload]); //change

  // card typeni tanlagan payt
  const notParentsCardClick = useCallback(async (e) => {
    if (cardNameref.current.props.value) {
      cardNameref.current.removeValue(cardNameref.current.props.value);
    }
    try {
      const res = await axiosInstance.get(`organization/showCard/cardType/${e.value}/${JSON.parse(localStorage.getItem('oi'))}`)
      let arr = [];

      console.log(res.data);

      res.data.forEach((d) => {
        arr.push({ value: d.id, label: d.cardName, title: d.cardName });
      })
      setCardsName(arr);
    } catch (error) {
      console.log(error.response);
    }
  }, [setCardsName]);

  // jurnalni tanlagan payt id sini olish
  const clickCard = (e) => {
    console.log(e);
    jurnallar.forEach((c) => {
      console.log(c);
      if (e?.label === c.shortDescription) {
        document.querySelector('.num').value = c.beginNumber;
      }
    })
  }

  // barcha taqdim etish formasini o'qib olish
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

  // barcha tasdiqlovchilarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      // barcha tasdiqlovchilarni o'qib olish
      try {
        const res = await axiosInstance.get("user/confirmers/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((d) => {
          let firstname = (d?.firstName && d?.firstName?.length > 1) ? ((((d?.firstName[0].toUpperCase() === "S" || d?.firstName[0].toUpperCase() === "C") && d?.firstName[1].toUpperCase() === "H")) ? d?.firstName?.substring(0, 2) + ". " : d?.firstName?.substring(0, 1) + ". ") : "";
          arr.push({ value: d?.workPlaceId, label: `${firstname} ${d?.lastName ? d?.lastName : ""}` })
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

  // barcha korrespondentlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      // barcha korrespondentlarni o'qib olish
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

  // hujjat qo'shish
  const hujjatQushish = useCallback(async () => {
    setIsDisebled(true)
    let jurnali = jurnalref.current?.props?.value;
    let card1 = cardNameref.current?.props?.value;
    let taqdimForma1 = taqdimFormaref.current?.props?.value;
    let tasdiqlovchi1 = userref.current?.props?.value;
    let korrespondent1 = korresref.current?.props?.value;
    let chiquvchiRaqam = outNumref.current?.value;
    let chiquvchiSana = document.querySelector('.chiquvchiSana').value;
    let ruyxatSana = document.querySelector('.ruyxatSana').value;
    let sahifalarSoni = countPageref.current?.value;
    let qisqachaMalumot = shortDescref.current?.value;
    if (file?.length > 0) {
      console.log(file);
      let fileId = [];
      for (let i = 0; i < file.length; i++) {
        const formData = new FormData();
        // let fileType = (file[i]?.type === "application/zip" || file[i]?.type === "application/gzip" || file[i]?.type === "application/msword" || file[i]?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || file[i]?.type === "application/vnd.openxmlformats-officedocument.presentationml.presentation" || file[i]?.type === "application/vnd.ms-powerpoint" || file[i]?.type === "application/vnd.ms-excel.sheet.macroEnabled.12" || file[i]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || file[i]?.type === "application/vnd.ms-excel" || file[i]?.type === "application/x-rar-compressed" || file[i]?.type === "application/pdf");

        // agar fayl berilgan kengaytmada bo'lsa, so'rov yuborish
        // if (fileType) {
        formData.append("file", file[i]);
        try {
          let res = await axiosInstance.post(`document/saveDuplicateFile/${JSON.parse(localStorage.getItem('oi'))}`, formData)
          fileId.push(res.data);
        } catch (error) {
          console.log(error.response);
          setIsDisebled(false)
        }
        // }
      }

      if (fileId?.length > 0) {
        if (jurnali) {
          if (card1) {
            if (taqdimForma1) {
              if (tasdiqlovchi1) {
                if (korrespondent1) {
                  if (chiquvchiRaqam) {
                    if (chiquvchiSana) {
                      if (ruyxatSana) {
                        if (sahifalarSoni) {
                          if (qisqachaMalumot?.length > 0) {
                            try {
                              const sendData = {
                                cardId: card1.value,
                                submissionFormId: taqdimForma1.value,
                                journalId: jurnali.value,
                                correspondentId: korrespondent1.value,
                                confirmerId: tasdiqlovchi1.value,
                                outNumber: chiquvchiRaqam,
                                outDate: chiquvchiSana.split('.')[2] + "-" + chiquvchiSana.split('.')[1] + "-" + chiquvchiSana.split('.')[0],
                                registrationAt: ruyxatSana.split('.')[2] + "-" + ruyxatSana.split('.')[1] + "-" + ruyxatSana.split('.')[0],
                                pageCount: sahifalarSoni,
                                shortDescription: qisqachaMalumot,
                                fileId: fileId,
                                orgId: JSON.parse(localStorage.getItem('oi'))
                              }
                              console.log(sendData);
                              const res = await axiosInstance.post("document/createDocument", sendData)
                              Alert(setAlert, "success", "Malumot rezalutsiyaga muvaffaqiyatli yuborildi");
                              setIds(res.data);
                              setOpenModal(true);
                              setReload(!reload);
                              setFile(null);
                              setIsDisebled(false)
                            } catch (error) {
                              console.log(error);
                              setIsDisebled(false)
                              Alert(setAlert, "warning", error?.response?.data);
                            }
                          } else {
                            Alert(setAlert, "warning", "Краткая информация не включена");
                            setIsDisebled(false)
                          }
                        } else {
                          Alert(setAlert, "warning", "Количество страниц не включено");
                          setIsDisebled(false)
                        }
                      } else {
                        Alert(setAlert, "warning", "Дата списка не выбрана");
                        setIsDisebled(false)
                      }
                    } else {
                      setIsDisebled(false)
                      Alert(setAlert, "warning", "Исходящий дата не выбрана");
                    }
                  } else {
                    setIsDisebled(false)
                    Alert(setAlert, "warning", "Не введен исходящий номер");
                  }
                } else {
                  setIsDisebled(false)
                  Alert(setAlert, "warning", "Корреспондент не включен");
                }
              } else {
                setIsDisebled(false)
                Alert(setAlert, "warning", "Валидатор не выбран");
              }
            } else {
              setIsDisebled(false)
              Alert(setAlert, "warning", "Форма отправки не выбрана");
            }
          } else {
            setIsDisebled(false)
            Alert(setAlert, "warning", "Имя карты не выбрано");
          }
        } else {
          setIsDisebled(false)
          Alert(setAlert, "warning", "Журнал не выбран");
        }
      } else {
        setIsDisebled(false)
        Alert(setAlert, "warning", "Формат файла должен быть в указанном формате");
      }
    } else {
      setIsDisebled(false)
      Alert(setAlert, "warning", "Файл не выбран");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file, setAlert, setFile]);

  return (
    <div>
      <div className="row mt-3">
        <div className="col-lg-4">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              <Select
                options={card}
                onChange={clickCard}
                placeholder="Журнал"
                className='jurnali'
                isClearable={true}
                ref={jurnalref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-2">
          <div className="form-group form-group-floating mb-0">
            <div className="position-relative">
              <input
                type="number"
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
        <div className="col-lg-2">
          <div className="form-group sm-mb-10 form-group-floating">
            <div className="position-relative">
              <Select
                options={notParentsCard}
                onChange={notParentsCardClick}
                placeholder="Тип Card"
                className="cardTypeId"
                isClearable={true}
                ref={cardTyperef}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group sm-mb-10 form-group-floating">
            <div className="position-relative relative1">
              <Select
                options={cardsName}
                placeholder="Имя Card"
                className="card1 ssss"
                isClearable={true}
                ref={cardNameref}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group form-group-floating sm-mb-10">
            <div className="position-relative">
              <Select
                options={taqdimForma}
                placeholder="Форма представления"
                className='taqdimForma'
                isClearable={true}
                ref={taqdimFormaref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group form-group-floating sm-mb-10">
            <div className="position-relative">
              <Select
                options={tasdiqlovchi}
                placeholder="Валидатор"
                className='tasdiqlovchi'
                isClearable={true}
                ref={userref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating sm-mb-10">
            <div className="position-relative">
              <Select
                options={korrespondent}
                placeholder="Корреспондент"
                className='korrespondent'
                isClearable={true}
                ref={korresref}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-1">
          <button className="btn btn-primary w-100"
            onClick={() => setAddModal(true)}
            type="button"
            style={{ height: "56px" }}>
           Добавлять
          </button>
        </div>

      </div>

      <div className="row">
        <div className="col-lg-3">
          <div className="form-group form-group-floating sm-mb-10">
            <div className="position-relative">
              <input
                type="text"
                className="form-control form-control-outline chiquvchiRaqam"
                id="chiquvchiRaqam"
                placeholder="Исходящий номер"
                required
                ref={outNumref}
              />
              <label className="label-floating">Исходящий номер</label>
            </div>
          </div>
        </div>
        <div className="col-lg-3 sm-mb-10">
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
              placeholderText="Исходящий дата"
              scrollableMonthYearDropdown
              name="datechiqSanaKiruvchi"
            />
          </div>
        </div>
        <div className="col-lg-3 sm-mb-10">
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
            <DatePicker
              className={'ruyxatSana'}
              id={'royxatdanOtishSana'}
              selected={startDate2}
              onChange={(date) => setStartDate2(date)}
              dateFormat={'dd.MM.yyyy'}
              isClearable
              placeholderText="Дата регистрации"
              showYearDropdown
              scrollableMonthYearDropdown
              name="dateruyxatSanaKiruvchi"
            />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group form-group-floating sm-mb-10">
            <div className="position-relative">
              <input
                type="number"
                className="form-control form-control-outline sahifalarSoni"
                id="sahifalarSoni"
                placeholder="Количество страниц"
                required
                ref={countPageref}
              />
              <label className="label-floating">Количество страниц</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <p id="errorLength" style={{ color: "red", height: "auto", padding: 0, margin: 0 }}
            className="text-center"></p>
          <div className="form-group form-group-floating sm-mb-10">
            <div className="position-relative">
              <textarea cols="30" rows="5" id="malumot"
                maxLength="300"
                className="form-control form-control-outline qisqachaMalumot"
                placeholder="Краткая информация"
                required
                ref={shortDescref}
              />
              <label className="label-floating">Краткая информация</label>
              <span className="mt-5 text-muted">Краткая информация не превышает 300 символов</span>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-group form-group-float sm-mb-10 mb-2" >
            <div className="custom-file" style={{ zIndex: "0" }}>
              <input
                type="file"
                className="custom-file-input fileKiruvchi"
                id="custom-file-visible"
                accept='.doc, .docx, .xls, .xlsx, .ppt, .pptx, .pdf, .zip, .rar'
                onClick={(e) => e.target.value = null}
                onChange={(e) => uploadFile(e)}
                multiple="multiple"
                required
              />
              <label className="custom-file-label text-muted"
                htmlFor="custom-file-visible">
                {file?.length > 0 ? `${file?.length} ta fayl tanlandi` : "Faylni tanlash"}
              </label>
            </div>
            <label className="d-block text-muted mb-0">Поддерживаемые форматы: doc, docx, xls,xlsx, ppt, pptx, pdf, .zip, .rar</label>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between ml-2">
        <button type="button" className="btn btn-primary hujQush"
          onClick={() => hujjatQushish()} disabled={isDisebled}
        >Добавить документ</button>
      </div>

      {openModal && (
        <ViewModal
          setOpenModal={setOpenModal}
          ids={ids}
          jurnalref={jurnalref}
          cardNameref={cardNameref}
          taqdimFormaref={taqdimFormaref}
          userref={userref}
          korresref={korresref}
          outNumref={outNumref}
          countPageref={countPageref}
          shortDescref={shortDescref}
          cardTyperef={cardTyperef}
          journalNumref={journalNumref}
          setStartDate1={setStartDate1}
          setStartDate2={setStartDate2}
        />
      )}

      {
        addModal && (
          <AddModal
            setAddModal={setAddModal}
            currentUser={currentUser}
            setAlert={setAlert}
            korrespondent={korrespondent}
            setKorrespondent={setKorrespondent}
          />
        )
      }

      <div className="col-lg-12 px-0 pt-2">
        <PdfFileView
          deleteFile={deleteFile}
          file={file}
        />
      </div>
    </div>
  )
}

export default React.memo(InputContentForm);