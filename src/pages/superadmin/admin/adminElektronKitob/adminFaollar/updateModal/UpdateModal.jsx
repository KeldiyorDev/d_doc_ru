import React, { useEffect, useRef, useState } from "react";
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstance } from "../../../../../../config";
import Select from 'react-select';

const UpdateModal = ({ updateModal, setUpdateModal, currentUser, data, setData, setAlert }) => {
  const [modul, setModul] = useState([]);
  const modulref = useRef();
  const uzbekNameref = useRef();
  const russianNameref = useRef();
  const shortDescref = useRef();
  const prefixref = useRef();
  const postfixref = useRef();
  const beginNumref = useRef();

  // barcha hujjat turlarini o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("module/v2/getAll/" + JSON.parse(localStorage.getItem('oi')))
        let arr = [];

        if (res.data?.length > 0) {
          res.data.forEach((c) => {
            arr.push({ value: c.id, label: c.name })
          })
        }

        if (isMounted)
          setModul(arr);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // o'zgartirish
  const Uzgartirish = async (dat) => {
    if (modulref.current.props.value) {
      if (uzbekNameref.current.value) {
        if (shortDescref.current.value) {
          if (beginNumref.current.value) {
            // to do server
            try {
              const res = await axiosInstance.patch("journal", {
                id: dat.id,
                moduleId: modulref.current.props.value.value,
                uzName: uzbekNameref.current.value,
                ruName: russianNameref.current.value,
                shortDescription: shortDescref.current.value,
                journalPrefix: prefixref.current.value,
                journalPostfix: postfixref.current.value,
                beginNumber: beginNumref.current.value
              })
              let arr1 = data.content.filter((d) => {
                if (d.id === res.data.id) {
                  d.id = res.data.id;
                  d.generalModule = res.data.generalModule;
                  d.uzName = res.data.uzName;
                  d.ruName = res.data.ruName;
                  d.shortDescription = res.data.shortDescription;
                  d.journalPrefix = res.data.journalPrefix;
                  d.journalPostfix = res.data.journalPostfix;
                  d.beginNumber = res.data.beginNumber;
                }
                return d;
              })
              setData({ ...data, content: arr1 });
              Alert(setAlert, "success", "Информация успешно изменена");
              setUpdateModal({ open: false, obj: {} });
            } catch (error) {
              Alert(setAlert, "warning", error.response?.data);
              setUpdateModal({ open: false, obj: {} });
            }
          } else {
            Alert(setAlert, "warning", "Не введен стартовый номер");
            setUpdateModal({ open: false, obj: {} });
          }
        } else {
          Alert(setAlert, "warning", "Краткая классификация не включена")
          setUpdateModal({ open: false, obj: {} });
        }
      } else {
        Alert(setAlert, "warning", "Узбекское имя не указано");
        setUpdateModal({ open: false, obj: {} });
      }
    } else {
      Alert(setAlert, "warning", "Тип карты не выбран");
      setUpdateModal({ open: false, obj: {} });
    }
  }

  return (
    <>
      <div className="adminWindow">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h6 className="modal-title">Изменять</h6>
              <button type="button" className="close" onClick={() => setUpdateModal({ open: false, obj: {} })}>&times;</button>
            </div>

            <div className="modal-body">
              <form className="">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="form-group text-left">
                      <Select
                        defaultValue={{ value: updateModal.obj?.generalModule?.name, label: updateModal.obj?.generalModule?.name }}
                        options={modul}
                        isClearable={true}
                        placeholder="Выберите тип карты"
                        ref={modulref}
                      />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.uzName}
                            ref={uzbekNameref}
                          />
                          <label className="label-floating">Русское имя</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.ruName}
                            ref={russianNameref}
                          />
                          <label className="label-floating">Узбекское имя</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.shortDescription}
                            ref={shortDescref}
                          />
                          <label className="label-floating">Краткая классификация</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-4">
                    <div className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.journalPrefix}
                            ref={prefixref}
                          />
                          <label className="label-floating">Префикс журнала</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline form-control-sm"
                            aria-label="form-control-sm example"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.journalPostfix}
                            ref={postfixref}
                          />
                          <label className="label-floating">Постфикс журнала</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="number"
                            className="form-control form-control-outline"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.beginNumber}
                            ref={beginNumref}
                          />
                          <label className="label-floating">Стартовый номер</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-6 d-flex justify-content-center">
                    <button type="button" onClick={() => Uzgartirish(updateModal.obj)} className="btn btn-primary">
                      <i className="icon-floppy-disk"></i> Сохранять
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default React.memo(UpdateModal);