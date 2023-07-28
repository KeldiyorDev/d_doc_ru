import React, { useRef } from "react";
import "../../kadrlar.css"
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import KadrlarNavbar from "../../kadrlarNavbar/KadrlarNavbar";
import Select from "react-select";
// import { selsectOption } from "../../components/SelectOption";
// import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import { beginyillarOption, endyillarOption } from "../../components/Years";
import { axiosInstanceKadr } from "../../../../config";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addEmpBook, addEmpEditBook, deleteEmpBook, editEmpBook, swapFunc } from "../../../../redux/reducers/kadr";



const MehnatDaftarchasiContent = ({ currentUser, permission, ranks }) => {
  // const [empBook, setEmpBook] = useState([])
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const { id } = useParams()

  const orderRefs = useRef([])
  const startRefs = useRef([])
  const endRefs = useRef([])
  const workRefs = useRef([])
  const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })

  const dispatch = useDispatch()


  const empBook = useSelector((state) => state.kadr.empBook)
  console.log(empBook);

  const addFunc = () => {
    const emp = {
      // id: Number(Math.randam() * 1000000),
      orderNumber: empBook[empBook.length - 1]?.orderNumber + 1 || 1,
      startDate: "",
      endDate: "",
      companyName: "",
      isEdit: true,
      isNew: true,
    }
    dispatch(addEmpBook(emp))
  }

  const addPostFunc = (emp, index) => {
    console.log(empBook);

    let data = {
      isNew: false,
      orderNumber: empBook[empBook.length - 1]?.orderNumber,
      kadrId: id,
      companyName: workRefs.current[index].value,
      startDate: startRefs.current[index]?.props?.value?.value,
      endDate: endRefs.current[index]?.props?.value?.value
    }

    console.log(data);

    axiosInstanceKadr.post(`work/book/create`, data)
    .then((res) => { dispatch(swapFunc(emp.id)); dispatch(addEmpEditBook(res.data)); Alert(setAlert, "success", "Muvofaqqiyatli qo'shildi!") })
    .catch((error) => Alert(setAlert, "warning", error.response.data))

  }

  const deleteFunc = () => {
    console.log(deleteModal);
    axiosInstanceKadr.delete(`work/book/deleteById/${deleteModal.id}`).then((res) => {
      console.log(res.data);
      Alert(setAlert, "warning", "Muvofaqqiyatli o`chirildi!");
      const arr = empBook.filter((emp) => emp.id !== deleteModal.id)
      dispatch(deleteEmpBook(arr))
    }).catch((error) => Alert(setAlert, "warning", error.response.data))
  }

  const editPutFunc = (empId, index) => {
    console.log(startRefs.current[index]?.props?.value?.value);
    console.log(endRefs.current[index]?.props?.value?.value);
    // if ((((startRefs.current[index]?.props?.value?.value <= endRefs.current[index]?.props?.value?.value) ||
    //   (endRefs.current[index]?.props?.value?.value == -1)) || (startRefs.current[index]?.props?.value?.value == -1))) 

    let data = {
      id: empId,
      orderNumber: index + 1,
      companyName: workRefs.current[index].value,
      startDate: startRefs.current[index]?.props?.value?.value,
      endDate: endRefs.current[index]?.props?.value?.value
    }

    // let arr = empBook.filter((emp) => {
    //   if (emp.id === empId) {
    //     emp.id = data.id;
    //     emp.orderNumber = data.orderNumber;
    //     emp.companyName = data.companyName;
    //     emp.startDate = data.startDate;
    //     emp.endDate = data.endDate;
    //   }
    //   return emp
    // })
    // arr.sort(function (a, b) {
    //   return a?.orderNumber - b?.orderNumber;
    // });
    // console.log(arr);

    // setEmpBook(arr)

    // const updateData = arr.find(s => s.id === empId);
    axiosInstanceKadr.put(`work/book/update`, data).then((res) => {
      console.log(res.data);
      dispatch(swapFunc(empId))
      dispatch(editEmpBook(data))
      Alert(setAlert, "success", "Muvofaqqiyatli o'zgartirildi!");

      // axiosInstanceKadr.get(`work/book/getByUser/${id}`).then((res) => {
      //   console.log(res.data);
      //   // const arr = []
      //   const arr = res.data.filter((emp) => {
      //     emp.isEdit = false;
      //     return emp;
      //   })
      //   // console.log(res.data);
      //   dispatch(editEmpBook(arr))
      // })
    }).catch((error) => Alert(setAlert, "warning", error.response.data))
  }

  return (
    <div className="card-body p-0 pt-3">
      <div className="card">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <KadrlarNavbar />
        </ul>

        <div className="tab-pane fade show active bg-white" id="colored-tab1">
          <div className="card-body card-body-mobile">
            <div className="d-flex mb-2" style={{ justifyContent: "space-between" }}>
              <h3 style={{ marginBottom: "10px", fontWeight: "bold", textTransform: "uppercase" }}>Mehnat faoliyati</h3>
            </div>

            {
              empBook?.map((emp, index) => {
                return (
                  <div className="row" key={index} id={`emp${index}`}>
                    <div className="col-lg-5 form-group form-group-floating px-0" style={{ display: "flex" }}>

                      {/* {emp.isEdit && <div className="form-group form-group-floating pr-3" style={{ width: "10%", minWidth: "80px" }}>
                        <div className="px-0" >
                          <div className="position-relative">
                            <input
                              ref={(element) => {
                                orderRefs.current[index] = element;
                              }}
                              type="text"
                              className="form-control form-control-outline InputCard text-center"
                              placeholder="Placeholder"
                              defaultValue={emp?.orderNumber}
                            />
                          </div>
                        </div>
                      </div>} */}

                      <div style={{ width: !emp?.isEdit ? "45%" : "45%" }}>
                        <Select
                          className="start"
                          options={beginyillarOption}
                          ref={(element) => {
                            startRefs.current[index] = element;
                          }}
                          defaultValue={emp.startDate ? { value: emp.startDate, label: emp.startDate } : { value: null, label: 'Yilni tanlash' }}
                          isDisabled={!emp?.isEdit}
                        />
                      </div>

                      <div style={{ width: "5%", display: "flex", justifyContent: "center" }}>
                        <p style={{ fontSize: "42px", color: "#ccc" }}>-</p>
                      </div>

                      <div style={{ width: !emp?.isEdit ? "45%" : "45%" }}>
                        <Select
                          className="end"
                          // styles={selsectOption}
                          options={endyillarOption}
                          ref={(element) => {
                            endRefs.current[index] = element;
                          }}
                          defaultValue={emp.endDate ? (emp.endDate !== "-1" ? { value: emp.endDate, label: emp.endDate } : { value: emp.endDate, label: "Hozirgi vaqtgacha" }) : { value: null, label: 'Yilni tanlash' }}
                          isDisabled={!emp?.isEdit}
                        />
                      </div>
                    </div>

                    <div className="col-lg-7 row form-group form-group-floating px-0" style={{ display: "flex", gap: "2rem" }}>
                      <div className="px-0" style={{ width: "calc(100% - 10rem)" }}>
                        <div className="position-relative">
                          <input
                            ref={(element) => {
                              workRefs.current[index] = element;
                            }}
                            type="text"
                            className="form-control form-control-outline InputCard"
                            placeholder="Placeholder"
                            defaultValue={emp?.companyName}
                            disabled={!emp?.isEdit}
                          />
                          <label
                            className="label-floating">Ish joyi nomi:</label>
                        </div>
                      </div>

                      <div className="px-0" style={{ display: "flex", gap: "1rem" }}>
                        <div className="px-0" style={{ display: "flex", justifyContent: "flex-end" }}>
                          {emp.isNew ? (<button onClick={() => { addPostFunc(emp, index); }} className="btn btn-success" title={"Qo'shish"} style={{ height: "56px", width: "56px" }}><i className="fa-solid fa-floppy-disk" style={{ fontSize: "18px" }}></i></button>)
                            : (!emp?.isEdit ? <button onClick={() => dispatch(swapFunc(emp.id))} className="btn btn-primary" title="O'zgartirish" style={{ height: "56px", width: "56px" }}><i className="icon-pencil5" style={{ fontSize: "18px" }}></i></button>
                              : <button onClick={() => { editPutFunc(emp.id, index); console.log("edit"); }} className="btn btn-success" title={"O'zgartirish"} style={{ height: "56px", width: "56px" }}><i className="fa-solid fa-floppy-disk" style={{ fontSize: "18px" }}></i></button>)
                          }
                        </div>

                        <div className="px-0" style={{ display: "flex", justifyContent: "flex-end" }}>
                          <button type="submit" title="O'chirish" onClick={() => setDeleteModal({ isShow: true, id: emp.id })} className="btn btn-danger" style={{ height: "56px", width: "56px" }}>
                            <i className="icon-bin" style={{ fontSize: "18px" }}></i>
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                )
              })
            }



            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
              <button onClick={() => addFunc()} type="submit" title="Qo'shish" className="btn btn-primary" style={{ height: "56px", width: "56px" }}>
                <i className="icon-plus3" style={{ fontSize: "18px" }}></i>
              </button>
            </div>

          </div>
        </div>
      </div>

      {deleteModal.isShow && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">O'chirish</h5>
              <button onClick={() => setDeleteModal({ isShow: false, id: 0 })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                &times;
              </button>
            </div>

            <form action="#">
              <div className="modal-body pb-0">
                <div className="form-group">
                  <h5> Ushbu ma'lumotlarni
                    <span className="text-danger" style={{ fontWeight: "600" }}> o'chirishni </span> tasdiqlaysizmi?
                  </h5>
                </div>

              </div>

              <div className="modal-footer" style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={() => { deleteFunc(); setDeleteModal({ isShow: false, id: 0 }) }} type="button" style={{ minWidth: "80px" }} className="btn btn-danger">Ha</button>
                <button onClick={() => setDeleteModal({ isShow: false, id: 0 })} type="button" style={{ minWidth: "80px" }} className="btn btn-primary">Yo'q</button>
              </div>
            </form>
          </div>
        </div>
      </div>}


      {/* alert */}
      <AlertContent alert={alert} />
    </div>
  )
}

export default React.memo(MehnatDaftarchasiContent)