import React, { useEffect, useState } from "react";
import { axiosInstanceFq } from "../../../../../../config";
import AlertContent, { Alert } from "../../../../../../component/alert/Alert";
import NumericInput from "react-numeric-input";
import SozlamalarNavbar from "../../SozlamalarNavbar/SozlamalarNavbar";

const MurojaatTuriContent = ({ currentUser }) => {
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [data, setData] = useState([]);
  let sortInput = [];

  const sortNullishValues = (arr = []) => {
    const assignValue = val => {
      if (val === null) {
        return Infinity;
      } else {
        return val;
      }
    }
    const sorter = (a, b) => {
      return assignValue(a.orderNumber) - assignValue(b.orderNumber);
    };
    arr.sort(sorter);
  }

  useEffect(() => {
    let load = true;
    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('applicationSort')

        if (load)
          setData(res.data);
      } catch (error) {
        console.log(error.response)
      }
    }
    getData();

    return () => {
      load = false;
    }
  }, [currentUser])

  // update data
  const updatedData = async (obj) => {
    let nom = document.querySelector('.inputNom').value
    try {
      const res = await axiosInstanceFq.patch('applicationSort', {
        id: obj.id,
        name: nom
      })
      let arr = [];
      data.forEach((d) => {
        if (d.id !== obj.id) {
          arr.push(d)
        }

      })
      let arr1 = [...arr, res.data]
      arr1.sort((a, b) => {
        return a - b;
      })
      sortNullishValues(arr1)
      setData(arr1);
      setUpdateModal({ open: false, obj: {} });
    } catch (error) {
      console.log(error.response)
      Alert(setAlert, 'warning', `${error.response.data}`)
    }

  }

  const changeInputNumber = async (e, id) => {
    if (e.key === "Enter") {
      try {
        const res = await axiosInstanceFq.post(`applicationSort/changeOrder`, {
          orderNumber: sortInput[sortInput.length - 1].orderNumber,
          id: sortInput[sortInput.length - 1].id,
        })

        let arr = [];
        data.forEach((d) => {
          if (d.id !== res.data.id) {
            arr.push(d)
          }
        })
        let arr1 = [...arr, res.data];
        sortNullishValues(arr1)
        setData(arr1);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    sortInput.push({ id: id, orderNumber: e });
  }

  // delete data
  const deletedData = async (id) => {
    try {
      const res = await axiosInstanceFq.delete(`applicationSort/` + id)
      let arr = [];
      data.forEach((d) => {
        if (d.id !== res.data.id) arr.push(d)
      })
      setData(arr);
      Alert(setAlert, 'warning', `Вы успешно удалили`)
    } catch (error) {
      console.log(error);
      Alert(setAlert, 'warning', `${error.response.data}`)
    }

  }

  const clickEnter = async () => {
    let name = document.querySelector('.name').value
    try {
      const res = await axiosInstanceFq.post('applicationSort', {
        name: name
      })
      setData(prev => [...prev, res.data]);
    } catch (error) {
      console.log(error.response)
      Alert(setAlert, 'warning', `${error.response.data}`)
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 20px", fontWeight: "bold", textTransform: "upperCase" }}>Тип приложения</h3>
      <div className="card-body">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
          style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <SozlamalarNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "30px" }}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group form-group-floating row">
                      <div className="col-lg-12">
                        <div className="position-relative">
                          <input type="text"
                            className="form-control form-control-outline name"
                            placeholder="Placeholder" />
                          <label className="label-floating"
                          >Именование</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <button type="button" style={{ width: "150px", height: "55px" }}
                      className="btn btn-primary" onClick={() => clickEnter()}><i
                        className="icon-floppy-disk"></i> Сохранять
                    </button>
                  </div>
                </div>
                <table
                  className="table mt-2 table-bordered datatable-select-single table-striped table-hover Tab">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "40%" }}>Именование</th>
                      <th style={{ width: "15%" }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((dat, index) => (
                      <tr key={index} className="text-center">
                        <td>
                          <NumericInput
                            value={dat?.orderNumber}
                            onKeyDown={(e) => changeInputNumber(e, dat.id)}
                            onChange={(e) => inputChangeHandler(e, dat.id)}
                            className="adminSozlamaInput"
                          />
                        </td>
                        <td>{dat?.name}</td>
                        <td>
                          <div className="icon d-flex justify-content-center align-items-center">
                            <button type={'button'}
                              onClick={() => setUpdateModal({ open: true, obj: dat })}
                              className="infoBtn bg-dark" data-popup="tooltip"
                              title="O'zgartirish"><i className="icon-pencil5"></i>
                            </button>
                            <button type={'button'} className="infoBtn bg-dark"
                              data-popup="tooltip"
                              title="O'chirish" data-toggle="modal"
                              data-target="#modal_theme_primary1"
                              onClick={() => deletedData(dat.id)}><i
                                className="icon-trash"></i></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/*<div id="modal_theme_primary1" class="modal fade show" tabIndex="-1"*/}
                {/*     style={{display: "none"}} aria-modal="true" role="dialog">*/}
                {/*    <div className="modal-dialog">*/}
                {/*        <div className="modal-content">*/}
                {/*            <div className="modal-header bg-primary text-white">*/}
                {/*                <h6 className="modal-title">Primary header</h6>*/}
                {/*                <button type="button" className="close" data-dismiss="modal">×</button>*/}
                {/*            </div>*/}

                {/*            <div className="modal-body">*/}
                {/*                <h4>Ma'lumotni o'chirishni xoxlaysizmi?</h4>*/}
                {/*            </div>*/}

                {/*            <div className="modal-footer">*/}
                {/*                <button type="button" className="btn btn-link"*/}
                {/*                        data-dismiss="modal">Bekor qilish*/}
                {/*                </button>*/}
                {/*                <button type="button" className="btn btn-primary">O'chirish</button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/* update */}
                {updateModal.open && (
                  <div className="updateDataWindow">
                    <div className="updateDataWindowWrapper">
                      <form>
                        <div className="updateDataWindowTop">
                          <h3>Изменить окно</h3>
                          <span onClick={() => setUpdateModal({
                            open: false,
                            obj: {}
                          })}>&times;</span>
                        </div>
                        <div className="updateDataWindowCenter">
                          <input
                            type="text"
                            className="form-control inputNom"
                            defaultValue={updateModal.obj.name}
                          />
                        </div>
                        <hr />
                        <div className="updateDataWindowBottom">
                          <button type={'button'} className="btn btn-danger"
                            onClick={() => setUpdateModal({ open: false, obj: {} })}> Отмена
                          </button>
                          <button type={'button'} className="btn btn-primary"
                            onClick={() => updatedData(updateModal.obj)}>Изменять
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {/* delete */}
                {/* {deleteModal.delete && (
                                    <div className="deleteDataWindow">
                                        <div className="deleteDataWindowWrapper">
                                            <div className="form">
                                                <div className="deleteDataWindowTop">
                                                    <h3>O'chirish oynasi</h3>
                                                    <span onClick={() => setDeleteModal({ delete: false, obj: {} })}>&times;</span>
                                                </div>
                                                <div className="deleteDataWindowCenter">
                                                    <h2>Haqiqatdan ham o'chirib tashlamoqchimisiz?</h2>
                                                </div>
                                                <div className="updateDataWindowBottom">
                                                    <button className="btn btn-danger" onClick={() => setDeleteModal({ open: false, obj: {} })}>Bekor qilish</button>
                                                    <button className="btn btn-primary" onClick={() => deletedData(deleteModal.obj.id)}>O'chirish</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* alert */}
      <AlertContent alert={alert} />
    </div>
  )
}

export default React.memo(MurojaatTuriContent);