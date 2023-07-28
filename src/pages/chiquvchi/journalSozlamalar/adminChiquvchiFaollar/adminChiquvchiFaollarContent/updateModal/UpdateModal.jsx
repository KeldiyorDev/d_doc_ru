import React, { useRef } from "react";
import { Alert } from "../../../../../../component/alert/Alert";
import { axiosInstanceOut } from "../../../../../../config";

export default function UpdateModal({ setUpdateModal, updateModal, setAlert, currentUser, data, setData }) {
  const uznameref = useRef();
  const runameref = useRef();
  const shortDescref = useRef();
  const beginNumberref = useRef();
  const prefixref = useRef();
  const postfixref = useRef();

  // o'zgartirish
  const Uzgartirish = async (dat) => {
    if (uznameref.current.value) {
      if (runameref.current.value) {
        if (shortDescref.current.value) {
          if (beginNumberref.current.value) {
            // to do server
            console.log({
              id: dat.id,
              uzName: uznameref.current.value,
              ruName: runameref.current.value,
              shortDescription: shortDescref.current.value,
              journalPrefix: prefixref.current.value,
              journalPostfix: postfixref.current.value,
              beginNumber: beginNumberref.current.value
            });
            try {
              const res = await axiosInstanceOut.patch("journal", {
                id: dat.id,
                uzName: uznameref.current.value,
                ruName: runameref.current.value,
                shortDescription: shortDescref.current.value,
                journalPrefix: prefixref.current.value,
                journalPostfix: postfixref.current.value,
                beginNumber: beginNumberref.current.value
              })

              let arr = data.content.filter((d) => {
                if (d.id === res.data.id) {
                  d.id = res.data.id;
                  d.journalPostfix = res.data.journalPostfix;
                  d.journalPrefix = res.data.journalPrefix;
                  d.ruName = res.data.ruName;
                  d.shortDescription = res.data.shortDescription;
                  d.uzName = res.data.uzName;
                  d.module = res.data.module;
                  d.closed = res.data.closed;
                  d.beginNumber = res.data.beginNumber;
                  d.archived = res.data.archived;
                  d.deleted = res.data.deleted;
                }
                return d;
              })
              Alert(setAlert, "success", "Информация успешно изменена");
              setUpdateModal({ open: false, obj: {} });
              setData({ ...data, content: arr });
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
        Alert(setAlert, "warning", "Русское имя не указано");
        setUpdateModal({ open: false, obj: {} });
      }
    } else {
      Alert(setAlert, "warning", "Узбекское имя не указано");
      setUpdateModal({ open: false, obj: {} });
    }
    setUpdateModal({ open: false, obj: {} })
  }

  return (
    updateModal.open && (
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
                  <div className="col-lg-4">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline uzbekchaNomiUzgartirish"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.uzName}
                            ref={uznameref}
                          />
                          <label className="label-floating">Русское имя</label>
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
                            className="form-control form-control-outline ruschaNomiUzgartirish"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.ruName}
                            ref={runameref}
                          />
                          <label className="label-floating">Узбекское имя</label>
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
                            className="form-control form-control-outline tasnifUzgartirish"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.shortDescription}
                            ref={shortDescref}
                          />
                          <label className="label-floating">Краткая классификация </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="number"
                            className="form-control form-control-outline boshRaqamUzgartirish1"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.beginNumber}
                            ref={beginNumberref}
                          />
                          <label className="label-floating">Стартовый номер 
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline jurnalPrefiksUzgartirish"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.journalPrefix}
                            ref={prefixref}
                          />
                          <label className="label-floating">Префикс журнала </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="form-group form-group-floating row mb-0">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control form-control-outline form-control-sm jurnalPostfiksUzgartirish"
                            aria-label="form-control-sm example"
                            placeholder="Placeholder"
                            defaultValue={updateModal.obj?.journalPostfix}
                            ref={postfixref}
                          />
                          <label className="label-floating">Постфикс журнала </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <hr />
                <div className="row d-flex justify-content-center">
                  <div className="col-lg-6 d-flex justify-content-center">
                    <button type="button"
                      onClick={() => Uzgartirish(updateModal.obj)}
                      className="btn btn-primary">
                      <i className="icon-floppy-disk"></i> Сохранять
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  )
}