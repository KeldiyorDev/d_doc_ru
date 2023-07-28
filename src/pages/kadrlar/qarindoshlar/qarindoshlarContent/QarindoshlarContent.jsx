import React from "react";
import { useState } from "react";
import '../../kadrlar.css';
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import KadrlarNavbar from "../../kadrlarNavbar/KadrlarNavbar";
import InputMask from "react-input-mask";
import { axiosInstanceKadr } from "../../../../config";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addRelative, deleteRelative, editRelative, } from "../../../../redux/reducers/kadr";

const QarindoshlarContent = ({ currentUser, permission, ranks }) => {
  const [editModal, setEditModal] = useState({ isEdit: false, date: [] })
  const [deleteModal, setDeleteModal] = useState({ isModal: false, id: 0 })
  const [newAddModal, setNewAddModal] = useState(false)
  const [check, setCheck] = useState(false)
  const [disebled, setDisebled] = useState(true)
  const [relativeSelect, setRelativeSelect] = useState({ value: '1', label: "O'zbekiston fuqarosi" })
  const [addData, setAddData] = useState({})
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  const docRef = useRef()
  const dateRef = useRef()

  const editLocusRef = useRef()
  const editWorkPlaceRef = useRef()
  const editkinshipRef = useRef()
  const editLastNameRef = useRef()
  const editFirstNameRef = useRef()
  const editMiddleNameRef = useRef()
  const editBirthDateRef = useRef()
  const editBirthPlaceRef = useRef()

  const locusRef = useRef()
  const workPlaceRef = useRef()
  const kinshipRef = useRef()
  const lastNameRef = useRef()
  const firstNameRef = useRef()
  const middleNameRef = useRef()
  const birthDateRef = useRef()
  const birthPlaceRef = useRef()

  const vySeria1Ref = useRef()
  const vySeria2Ref = useRef()
  const vyNumRef = useRef()


  const qarindoshlarOption = [
    { value: 'Otasi', label: 'Otasi' },
    { value: 'Onasi', label: 'Onasi' },
    { value: 'Akasi', label: 'Akasi' },
    { value: 'Ukasi', label: 'Ukasi' },
    { value: 'Opasi', label: 'Opasi' },
    { value: 'Singlisi', label: 'Singlisi' },
    { value: "Turmush o'rtog'i", label: "Turmush o'rtog'i" },
    { value: 'Qaynotasi', label: 'Qaynotasi' },
    { value: 'Qaynonasi', label: 'Qaynonasi' },
  ]

  const seriaOption = [
    { value: 'I', label: 'I' },
    { value: 'II', label: 'II' },
    { value: 'III', label: 'III' }
  ]

  const shaxsOption = [
    { value: '1', label: "O'zbekiston fuqarosi" },
    // { value: '2', label: 'Fuqaroligi bo`lmagan shaxs' },
    { value: '3', label: 'Voyaga yetmagan shaxs' },
    { value: '4', label: 'Chet el fuqarosi' },
    { value: '5', label: 'Vafot etgan fuqaro' }
  ]

  const { id } = useParams()
  const dispatch = useDispatch()

  const relativeData = useSelector((state) => state.kadr.relativeData)

  const addPostFunc = () => {

    let data = {}

    switch (relativeSelect.value) {
      case "1":
      case "5":
        data = {
          date: dateRef.current.value.split(".").reverse().join("-"),
          series: docRef.current.value.toUpperCase().split("-").join(""),
        }

        axiosInstanceKadr.post(`auth/getUser`, data).then(res => {
          setAddData(res.data);
          lastNameRef.current.value = res.data.lastName;
          firstNameRef.current.value = res.data.firstName;
          middleNameRef.current.value = res.data.middleName;
          lastNameRef.current.value = res.data.lastName;
          birthDateRef.current.value = res.data.birthDate?.split("-").reverse().join(".");
          birthPlaceRef.current.value = res.data.birthPlace;
          setDisebled(false)
        })
        break;
      case "2":
        console.log("Apples are $0.32 a pound.");
        break;
      case "3":
        data = {
          series: vySeria1Ref.current.props.value.value + "-" + vySeria2Ref.current.value.toUpperCase(),
          number: vyNumRef.current.value.split(" ")[1].trim(),
        }

        console.log(data);

        axiosInstanceKadr.post(`auth/getUserByBirthSeries`, data).then(res => {
          setAddData(res.data?.items[0]);
          lastNameRef.current.value = res.data?.items[0]?.surname;
          firstNameRef.current.value = res.data?.items[0]?.name;
          middleNameRef.current.value = res.data?.items[0]?.patronym;
          birthDateRef.current.value = res.data?.items[0]?.birth_date;
          console.log(res.data);
          setDisebled(false)
        }).catch((err) => {
          Alert(setAlert, "warning", "Bunay ma'lumot mavjud emas");
        })
        break;
      case "4":
        console.log("Cherries are $3.00 a pound.");
        break;
      default:
        console.log("Sorry, we are out of ");
    }

  }

  const addSaveFunc = () => {
    const data = {
      kadrId: id,
      kinship: kinshipRef.current.props.value.value,
      locus: locusRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      middleName: middleNameRef.current.value,
      birthDate: birthDateRef.current.value,
      birthPlace: birthPlaceRef.current.value,
      // document:  docRef.current.value.toUpperCase().split("-").join(""),
      workplace: workPlaceRef.current.value,
    }

    axiosInstanceKadr.post("relative/create", data).then(res => {
      dispatch(addRelative(res.data));
      Alert(setAlert, "success", "Muvofaqqiyatli qo'shildi!");
      setNewAddModal(false);
      setDisebled(true);
      setCheck(false);
      setRelativeSelect({ value: '1', label: "O'zbekiston fuqarosi" });
      setAddData({})
    })
  }

  const editFunc = () => {
    let data = {
      id: editModal?.data?.id,
      kinship: editkinshipRef.current.props.value.value,
      locus: editLocusRef.current.value,
      workplace: editWorkPlaceRef.current.value,
      lastName: editLastNameRef.current.value,
      firstName: editFirstNameRef.current.value,
      middleName: editMiddleNameRef.current.value,
      birthDate: editBirthDateRef.current.value,
      birthPlace: editBirthPlaceRef.current.value,
    }

    console.log(data);

    axiosInstanceKadr.put("relative/update", data).then((res) => {

      dispatch(editRelative(data))

      setEditModal({ isEdit: false, date: [] });
      Alert(setAlert, "success", "Muvofaqqiyatli o`zgartirildi!");
    })
  }

  const deleteFunc = () => {

    axiosInstanceKadr.delete(`relative/delete/${deleteModal.id}`).then(res => {
      Alert(setAlert, "warning", "Muvofaqqiyatli o`chirildi!")


      dispatch(deleteRelative(deleteModal.id))

    })
  }

  const disebledFunc = (e) => {
    lastNameRef.current.value = ""
    firstNameRef.current.value = ""
    middleNameRef.current.value = ""
    birthDateRef.current.value = ""
    birthPlaceRef.current.value = ""
    locusRef.current.value = ""
    workPlaceRef.current.value = ""
    kinshipRef.current.removeValue(kinshipRef.current?.props?.value)

    if (e.value === "2") {
      setDisebled(true)
    }

  }

  const NumberMask = () => {
    return (
      <InputMask mask="99.99.9999" defaultValue={birthDateRef?.current?.value ? birthDateRef?.current?.value : ""}>
        {(inputProps) => <div className="form-group form-group-floating mb-0">
          <div className="position-relative">
            <input
              {...inputProps}
              ref={birthDateRef}
              type="text"
              disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
              className="form-control form-control-outline "
            />
            <label
              className="label-floating kadrInp">Tug'ilgan kuni:</label>
          </div>
        </div>}
      </InputMask>
    )
  }


  const NumberMaskEdit = () => {
    return (
      <InputMask mask="99.99.9999" defaultValue={editModal?.data?.birthDate ? editModal?.data?.birthDate?.split("-").reverse().join(".") : ""}>
        {(inputProps) => <div className="form-group form-group-floating mb-0">
          <div className="position-relative">
            <input
              {...inputProps}
              ref={editBirthDateRef}
              type="text"
              className="form-control form-control-outline "
            />
            <label
              className="label-floating kadrInp">Tug'ilgan kuni:</label>
          </div>
        </div>}
      </InputMask>
    )
  }


  return (
    <div className="card-body p-0 pt-3">
      <div className="card">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <KadrlarNavbar />
        </ul>

        <div className="tab-pane fade show active bg-white" id="colored-tab1">
          <div className="card-body">
            <div className="d-flex" style={{ alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ margin: "10px 0", fontWeight: "bold", textTransform: "uppercase" }}>Qarindoshlar</h3>
              <button onClick={() => setNewAddModal(true)} type="submit" className="btn btn-primary">
                <i className="icon-plus3 mr-1" style={{ fontSize: "18px" }}></i>Qarindosh qo'shish
              </button>
            </div>

            <table id="myTable" className="table table-bordered mb-3 table-striped table-hover Tab">
              <thead>
                <tr className="bg-dark text-white NavLink text-center">
                  <th id='tabRow' style={{ width: "5%" }} className="id">№</th>
                  <th style={{ width: "10%" }} className="qabul">qarindoshligi</th>
                  <th style={{ width: "15%" }} className="reg">familiyasi, ismi, otasining ismi</th>
                  <th style={{ width: "20%" }} className="ijrochi">tug'ilgan sanasi va joyi</th>
                  <th style={{ width: "15%" }} className="ijrochi">ish joyi va lavozimi</th>
                  <th style={{ width: "20%" }} className="ijrochi">yashash joyi</th>
                  <th style={{ width: "15%" }} className="ijrochi">amal</th>
                </tr>
              </thead>
              <tbody>

                {
                  relativeData.length > 0 && relativeData?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{item.kinship}</td>
                        <td className={'text-center'}>{item.lastName} {item.firstName} {item.middleName}</td>
                        <td className="text-center"> {item.birthDate} <br /> {item.birthPlace} </td>
                        {
                          item.workplace !== "Vafot etgan" ? <>
                            <td className="text-center"> {item.workplace} </td>
                            <td className="text-center"> {item.locus}</td>
                          </> : <td className="text-center" colSpan={2}> {item.workplace}</td>
                        }

                        <td className="text-center">
                          <button onClick={() => setEditModal({ isEdit: true, data: item })} type="submit" title="O'zgartirish" className="btn btn-primary mr-1" style={{ padding: "4px 8px" }}>
                            <i className="icon-pencil5" style={{ fontSize: "18px" }}></i>
                          </button>
                          <button onClick={() => { setDeleteModal({ isModal: true, id: item.id }); }} type="submit" className="btn btn-danger ml-1" title="O'chirish" style={{ padding: "4px 8px" }}>
                            <i className="icon-bin" style={{ fontSize: "18px" }}></i>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }



              </tbody>
            </table>

            {newAddModal && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
              <div className="" style={{ width: "90%", margin: "0 auto" }}>
                <div className="modal-content">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title">Qarindosh qo'shish</h5>
                    <button onClick={() => { setNewAddModal(false); setDisebled(true); setCheck(false); setRelativeSelect({ value: '1', label: "O'zbekiston fuqarosi" }); setAddData({}) }} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                      &times;
                    </button>
                  </div>

                  <form>
                    <div className="modal-body px-2 pb-0">
                      <div className="form-group">

                        <div className="row mb-3 form-group form-group-floating">
                          <div className="col-lg-6">
                            <div className="position-relative">
                              <Select
                                options={qarindoshlarOption}
                                placeholder={"Qarindoshni tanlang"}
                                isClearable={true}
                                autoFocus
                                ref={kinshipRef}
                              // isDisabled={(check) ? true : false}
                              // isDisabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                              />
                            </div>

                          </div>

                          <div className="col-lg-6">
                            <Select
                              onChange={(e) => { setRelativeSelect(e); setDisebled((e?.value === "2" || e?.value === "4" || e?.value === "5") ? false : true) }}
                              value={relativeSelect}
                              isClearable={true}
                              options={shaxsOption}
                              // ref={ReceptionTypeRef}
                              placeholder="Shaxs turi"
                            // isDisabled={(check) ? true : false}
                            />
                          </div>
                        </div>

                        <div className="row mb-3 form-group form-group-floating">
                          <div className="col-lg-3" style={{ display: "flex", alignContent: "center", margin: "auto" }}>
                            <div className="custom-control custom-checkbox custom-control-success" style={{ fontSize: "1rem", display: "flex", alignContent: "center" }}
                              disabled={(!disebled) ? true : false}
                            >
                              <input type="checkbox" className="custom-control-input" id="chek" checked={check} onChange={() => setCheck(!check)}
                                disabled={(!disebled) ? true : false}
                              />
                              <label className="custom-control-label" for="chek" style={{ textTransform: "uppercase" }}>Hujjatsiz kiritish</label>
                            </div>
                          </div>

                          <div className="col-lg-6 row px-0">
                            {
                              (relativeSelect.value !== "3") && <>
                                <div className="col-lg-6">
                                  <InputMask mask="aa-9999999" style={{ textTransform: "uppercase" }}>
                                    {(inputProps) => <div className="form-group form-group-floating mb-0">
                                      <div className="position-relative">
                                        <input
                                          {...inputProps}
                                          ref={docRef}
                                          type="text"
                                          disabled={(check || !disebled) ? true : false}
                                          className="form-control form-control-outline"
                                        />
                                        <label
                                          className="label-floating kadrInp">Pasport seriasi va raqami:</label>
                                      </div>
                                    </div>}
                                  </InputMask>
                                </div>

                                <div className="col-lg-6">
                                  <InputMask mask="99.99.9999">
                                    {(inputProps) => <div className="form-group form-group-floating mb-0">
                                      <div className="position-relative">
                                        <input
                                          {...inputProps}
                                          ref={dateRef}
                                          type="text"
                                          disabled={(check || !disebled) ? true : false}
                                          className="form-control form-control-outline "
                                        />
                                        <label
                                          className="label-floating kadrInp">Tug'ilgan kuni:</label>
                                      </div>
                                    </div>}
                                  </InputMask>
                                </div>
                              </>
                            }

                            {
                              relativeSelect.value === "3" && <>
                                <div className="col-lg-3">
                                  <Select
                                    isDisabled={(check || !disebled) ? true : false}
                                    options={seriaOption}
                                    defaultValue={{ value: "I", label: "I" }}
                                    // placeholder={"Qarindoshni tanlang"}
                                    // menuPlacement="top"    
                                    ref={vySeria1Ref}
                                  // isDisabled={(addData?s.lastName || check) ? false : true}
                                  />
                                </div>

                                {/* <div className="col-lg-1" style={{ display: "flex", justifyContent: "center" }}>
                                  <p style={{ fontSize: "42px", color: "#ccc" }}>-</p>
                                </div> */}

                                <div className="col-lg-3">
                                  <InputMask mask="aa" style={{ textTransform: "uppercase" }}>
                                    {(inputProps) => <div className="form-group form-group-floating mb-0">
                                      <div className="position-relative">
                                        <input
                                          {...inputProps}
                                          ref={vySeria2Ref}
                                          type="text"
                                          disabled={(check || !disebled) ? true : false}
                                          className="form-control form-control-outline"
                                        />
                                        <label
                                          className="label-floating kadrInp">Seriasi:</label>
                                      </div>
                                    </div>}
                                  </InputMask>
                                </div>

                                <div className="col-lg-6">
                                  <InputMask mask="\№ 9999999">
                                    {(inputProps) => <div className="form-group form-group-floating mb-0">
                                      <div className="position-relative">
                                        <input
                                          {...inputProps}
                                          ref={vyNumRef}
                                          type="text"
                                          disabled={(check || !disebled) ? true : false}
                                          className="form-control form-control-outline "
                                        />
                                        <label
                                          className="label-floating kadrInp">Raqami:</label>
                                      </div>
                                    </div>}
                                  </InputMask>
                                </div>
                              </>
                            }

                          </div>

                          <div className="col-lg-3" style={{ display: "flex", gap: "1rem" }}>
                            <button type="button" className="btn btn-success w-100" onClick={() => addPostFunc()}
                              disabled={(check || !disebled) ? true : false}
                            >
                              <i className="fa-solid fa-magnifying-glass mr-1" style={{ fontSize: "18px" }}></i>
                              Qidirish
                            </button>
                          </div>

                        </div>


                        <hr className="mx-2 my-3" style={{ borderTop: "1px dashed rgb(0, 0, 0)" }} />

                        <div className="row mb-3 form-group form-group-floating">

                          <div className="col-lg-3 mb-3">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                ref={lastNameRef}
                                disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                              />
                              <label
                                className="label-floating kadrInp">Familiyasi:</label>
                            </div>
                          </div>

                          <div className="col-lg-3 mb-3">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                ref={firstNameRef}
                                disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                              />
                              <label
                                className="label-floating kadrInp">Ismi:</label>
                            </div>
                          </div>


                          <div className="col-lg-3 mb-3">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                ref={middleNameRef}
                                disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                              />
                              <label
                                className="label-floating kadrInp">Otasining ismi:</label>
                            </div>
                          </div>



                          <div className="col-lg-3 mb-3">
                            <NumberMask />
                            {/* <InputMask mask="99.99.9999">
                              {(inputProps) => <div className="form-group form-group-floating mb-0">
                                <div className="position-relative">
                                  <input
                                    {...inputProps}
                                    ref={birthDateRef}
                                    type="text"
                                    disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                                    className="form-control form-control-outline "
                                  />
                                  <label
                                    className="label-floating kadrInp">Tug'ilgan kuni:</label>
                                </div>
                              </div>}
                            </InputMask> */}
                          </div>

                          <div className="col-lg-3 mb-3">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                ref={birthPlaceRef}
                                disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                              />
                              <label
                                className="label-floating kadrInp">Tug'ilgan joyi:</label>
                            </div>
                          </div>

                          {/* <div className="col-lg-3 mb-3">
                            <Select
                              options={qarindoshlarOption}
                              placeholder={"Qarindoshni tanlang"}
                              isClearable={true}
                              autoFocus
                              ref={kinshipRef}
                              isDisabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                            />
                          </div> */}

                          {
                            (relativeSelect.value !== "5") ? (
                              <>
                                <div className="col-lg-3 mb-3">
                                  <div className="position-relative">
                                    <input
                                      type="text"
                                      className="form-control form-control-outline InputCard "
                                      placeholder="Placeholder"
                                      defaultValue={""}
                                      ref={workPlaceRef}
                                      disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                                    />
                                    <label
                                      className="label-floating kadrInp">Ishlash joyi va lavozimi:</label>
                                  </div>
                                </div>

                                <div className="col-lg-3 mb-3">
                                  <div className="position-relative">
                                    <input
                                      type="text"
                                      className="form-control form-control-outline InputCard "
                                      placeholder="Placeholder"
                                      defaultValue={""}
                                      ref={locusRef}
                                      disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                                    />
                                    <label
                                      className="label-floating kadrInp">Yashash joyi:</label>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="col-lg-6 mb-3">
                                  <div className="position-relative">
                                    <input
                                      type="text"
                                      className="form-control form-control-outline InputCard "
                                      placeholder="Placeholder"
                                      value={"Vafot etgan"}
                                      ref={workPlaceRef}
                                      disabled={true}
                                    />
                                    <label
                                      className="label-floating kadrInp">Vafot etgan:</label>
                                  </div>
                                </div>

                                <div className="col-lg-3 mb-3 d-none">
                                  <div className="position-relative">
                                    <input
                                      type="text"
                                      className="form-control form-control-outline InputCard "
                                      placeholder="Placeholder"
                                      value={"Vafot etgan"}
                                      ref={locusRef}
                                      disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                                    />
                                    <label
                                      className="label-floating kadrInp">Yashash joyi:</label>
                                  </div>
                                </div>

                              </>
                            )
                          }

                          <div className="col-lg-3 mb-3 form-group form-group-floating mb-0">
                            <button onClick={() => addSaveFunc()} type="button" className="btn btn-primary w-100 h-100"
                              disabled={(Object.values(addData).length > 0 || check || !disebled) ? false : true}
                            >
                              <i className="fa-solid fa-floppy-disk mr-1"></i>Saqlash</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>}

            {editModal.isEdit && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
              <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
                <div className="modal-content">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title">Qarindoshni tahrirlash</h5>
                    <button onClick={() => setEditModal({ isEdit: false, date: [] })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                      &times;
                    </button>
                  </div>

                  <form>
                    <div className="modal-body px-2 pb-0">
                      <div className="form-group">
                        <div className="row mb-3 form-group form-group-floating">

                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                defaultValue={editModal?.data?.lastName}
                                // disabled={true}
                                ref={editLastNameRef}
                              />
                              <label
                                className="label-floating kadrInp">Fuqaroning familiyasi:</label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                defaultValue={editModal?.data?.firstName}
                                // disabled={true}
                                ref={editFirstNameRef}
                              />
                              <label
                                className="label-floating kadrInp">Fuqaroning ismi:</label>
                            </div>
                          </div>


                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                defaultValue={editModal?.data?.middleName}
                                // disabled={true}
                                ref={editMiddleNameRef}
                              />
                              <label
                                className="label-floating kadrInp">Fuqaroning otasining ismi:</label>
                            </div>
                          </div>


                        </div>

                        <div className="row mb-3 form-group form-group-floating">
                          <div className="col-lg-4">
                            <NumberMaskEdit />
                          </div>

                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                defaultValue={editModal?.data?.birthPlace}
                                // disabled={true}
                                ref={editBirthPlaceRef}
                              />
                              <label
                                className="label-floating kadrInp">Tug'ilgan joyi:</label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="position-relative">
                              <Select
                                options={qarindoshlarOption}
                                // menuPlacement="top"
                                ref={editkinshipRef}
                                defaultValue={{ value: editModal?.data?.kinship, label: editModal?.data?.kinship }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="row mb-3 form-group form-group-floating">
                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                defaultValue={editModal?.data?.workplace}
                                ref={editWorkPlaceRef}
                              />
                              <label
                                className="label-floating kadrInp">Ishlash joyi va lavozimi:</label>
                            </div>
                          </div>

                          <div className="col-lg-4">
                            <div className="position-relative">
                              <input
                                type="text"
                                className="form-control form-control-outline InputCard "
                                placeholder="Placeholder"
                                defaultValue={editModal?.data?.locus}
                                ref={editLocusRef}
                              />
                              <label
                                className="label-floating kadrInp">Yashash joyi:</label>
                            </div>
                          </div>

                          <div className="col-lg-4 form-group form-group-floating mb-0">
                            <button onClick={() => editFunc()} type="button" className="btn btn-primary w-100 h-100" >
                              <i className="fa-solid fa-floppy-disk mr-1"></i>Saqlash</button>
                          </div>
                        </div>

                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>}

            {deleteModal.isModal && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header bg-primary text-white">
                    <h5 className="modal-title">O'chirish</h5>
                    <button onClick={() => setDeleteModal({ isModal: false, id: 0 })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
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
                      <button onClick={() => { setDeleteModal({ isModal: false, id: 0 }); deleteFunc() }} type="button" style={{ minWidth: "80px" }} className="btn btn-danger">Ha</button>
                      <button onClick={() => setDeleteModal({ isModal: false, id: 0 })} type="button" style={{ minWidth: "80px" }} className="btn btn-primary">Yo'q</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>}
          </div>

          {/* alert */}
          <AlertContent alert={alert} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(QarindoshlarContent)