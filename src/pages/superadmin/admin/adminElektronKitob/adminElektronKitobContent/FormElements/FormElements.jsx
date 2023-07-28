import React, { useEffect, useRef, useState } from "react";
import Select from 'react-select'
import AlertContent, { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";

const FormElements = ({ currentUser }) => {
  const [modul, setModul] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const cardNameref = useRef();
  const uzbekNameref = useRef();
  const russianNameref = useRef();
  const shortDescriptionref = useRef();
  const journalPrefix = useRef();
  const journalPostfix = useRef();
  const numberref = useRef();

  // barcha hujjat turlarini o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        // const res = await axiosInstance.get("module/all/org/" + JSON.parse(localStorage.getItem('oi')))
        const res = await axiosInstance.get("module/v2/getAll/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        if (res.data.length > 0) {
          res.data.forEach((c) => {
            arr.push({ value: c.id, label: c.name })
          })
        }
        if (isMounted)
          setModul(arr);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // malumotni saqlash
  const submitHandler = async (e) => {
    e.preventDefault();

    if (cardNameref.current.props.value) {
      if (uzbekNameref.current.value) {
        if (shortDescriptionref.current.value) {
          if (numberref.current.value) {
            // to do server
            try {
              console.log({
                moduleId: cardNameref.current.props.value.value,
                uzName: uzbekNameref.current.value,
                ruName: russianNameref.current.value,
                shortDescription: shortDescriptionref.current.value,
                journalPrefix: journalPrefix.current.value,
                journalPostfix: journalPostfix.current.value,
                beginNumber: numberref.current.value,
                orgId: JSON.parse(localStorage.getItem('oi'))
              });
              await axiosInstance.post("journal", {
                moduleId: cardNameref.current.props.value.value,
                uzName: uzbekNameref.current.value,
                ruName: russianNameref.current.value,
                shortDescription: shortDescriptionref.current.value,
                journalPrefix: journalPrefix.current.value,
                journalPostfix: journalPostfix.current.value,
                beginNumber: numberref.current.value,
                orgId: JSON.parse(localStorage.getItem('oi'))
              })
              Alert(setAlert, "success", "Информация успешно добавлена")
              document.querySelector('.formClear').reset();
            } catch (error) {
              console.log(error?.response);
              Alert(setAlert, "warning", error?.response?.data)
            }
          } else {
            Alert(setAlert, "warning", "Не введен стартовый номер");
          }
        } else {
          Alert(setAlert, "warning", "Краткая классификация не включена");
        }
      } else {
        Alert(setAlert, "warning", "Русское имя не выбрано");
      }
    } else {
      Alert(setAlert, "warning", "Модуль не выбран");
    }
  }

  return (
    <>
      <form className="mt-2 formClear" onSubmit={submitHandler}  >
        <div className="row">
          <div className="col-lg-3">
            <div className="form-group text-left">
              <Select
                options={modul}
                placeholder="Модули"
                className="карта"
                ref={cardNameref}
                isClearable={true}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group form-group-floating">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline uzbekchaNomi"
                  placeholder="Placeholder"
                  ref={uzbekNameref}
                />
                <label className="label-floating">Русское имя</label>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group form-group-floating">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline ruschaNomi"
                  placeholder="Placeholder"
                  ref={russianNameref}
                />
                <label className="label-floating">Англиское имя</label>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="form-group form-group-floating">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline tasnif"
                  placeholder="Placeholder"
                  ref={shortDescriptionref}
                />
                <label className="label-floating">Краткая классификация</label>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="form-group form-group-floating mb-0">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline jurnalPrefiks w-100"
                  placeholder="Placeholder"
                  ref={journalPrefix}
                />
                <label className="label-floating">Префикс журнала</label>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group form-group-floating mb-0 my-3 my-sm-3 my-md-3 my-lg-0 my-xl-0">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control form-control-outline form-control-sm jurnalPostfiks"
                  aria-label="form-control-sm example"
                  placeholder="Placeholder"
                  ref={journalPostfix}
                />
                <label className="label-floating">Постфикс журнала</label>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-group form-group-floating mb-0">
              <div className="position-relative">
                <input
                  type="number"
                  className="form-control form-control-outline raqam"
                  placeholder="Placeholder"
                  ref={numberref}
                />
                <label className="label-floating">Стартовый номер</label>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row d-flex justify-content-center m-2">
          <div className="col-lg-6 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary"><i className="icon-floppy-disk"></i> Сохранять</button>
          </div>
        </div>
      </form>

      {/* alert */}
      <AlertContent alert={alert} />
    </>
  )
}

export default React.memo(FormElements);