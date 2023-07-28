import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import { axiosInstance, axiosInstanceKadr, urlKadr } from "../../../../config";
import { useRef } from "react";
import Select from "react-select";
import AlertContent, { Alert } from "../../../../component/alert/Alert";
import InputMask from "react-input-mask";
import "../../kadrlar.css"
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteImage, deleteUser, getUsers, updateImage } from "../../../../redux/reducers/kadr";
import { CheckBoxSelection, Inject, MultiSelectComponent } from "@syncfusion/ej2-react-dropdowns";
import NumericInput from "react-numeric-input";

const KadrlarTableContent = ({ currentUser, permission, ranks, activeBranchId, branchs }) => {

  const [totalElements, setTotalElements] = useState(0)
  const [kadrAddData, setKadrAddData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [size, setSize] = useState(10)
  // const [searchModal, setSearchModal] = useState(false)
  const [sending, setSending] = useState(false)
  const [addModal, setAddModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ isShow: false, id: 0 })
  const [editModal, setEditModal] = useState({ isShow: false, kadr: {} })
  const [imageEdit, setImageEdit] = useState({ isShow: false, kadr: {} })
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [sendingUser, setSendingUser] = useState([]);
  const [sendingOrg, setSendingOrg] = useState([]);
  const [allUsers, setAllUsers] = useState([])
  const [branchOption, setBranchOption] = useState([])
  const [checkTash, setCheckTash] = useState(true)
  const [file, setFile] = useState(null)


  const docRef = useRef()
  const dateRef = useRef()
  const lastNameRef = useRef()
  const firstNameRef = useRef()
  const middleNameRef = useRef()
  const birthDateRef = useRef()
  const seriasRef = useRef()
  const pinRef = useRef()
  const sendingUserRef = useRef()
  const sendingOrgRef = useRef()
  const sendingBranchRef = useRef()
  const searchKadrRef = useRef()
  const editNumberRef = useRef()
  const editEmailRef = useRef()
  const addCloseRef = useRef()

  const oi = localStorage.getItem("oi")

  const data = useSelector((state) => state.kadr.users)
  const dispatch = useDispatch()
  const { name } = useParams()

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      axiosInstanceKadr.get(`getAllForBranch/${activeBranchId}/?page=${currentPage}&size=${size}`).then(res => { console.log(res?.data); dispatch(getUsers(res?.data?.content)); setTotalElements(res?.data.totalElements) })

      axiosInstanceKadr.get(`getAllForBranchNotPageable/${activeBranchId}`).then((res) => {
        console.log(res.data);
        setAllUsers(res.data);

        let arr = []
        res.data?.forEach((item) => {
          let label = item.lastName + " " + item.firstName + " " + item.middleName;
          let value = item.id
          arr.push({ value: value, label: label })
        })
        setSendingUser(arr)
      })
    }

    return () => {
      isMounted = false
    }
  }, [currentUser, size, currentPage, activeBranchId, dispatch]);

  console.log(data)

  const handlePageClick = (e) => {
    console.log(e.selected);
    // setCurrentPage(e.selected);
    console.log(`getAll/${oi}?page=${e.selected}&size=${size}`);
    axiosInstanceKadr.get(`getAll/${oi}?page=${e.selected}&size=${size}`, {
      page: e.selected,
      size: size
    }).then(res => {
      dispatch(getUsers(res?.data?.content));
    }
    )
  }

  const searchKadrFunc = () => {
    const data = {
      date: dateRef.current.value.split(".").reverse().join("-"),
      series: docRef.current.value.toUpperCase().split("-").join(""),
    }
    console.log(data, dateRef.current.value.split(".").reverse().join("-"));

    axiosInstanceKadr.post(`auth/getUser`, data).then(res => {
      console.log(res.data);
      setKadrAddData(res.data);
      setAddModal(true)
      // setSearchModal(false)
    }).catch((error) => {
      console.log(error);
      Alert(setAlert, "warning", error?.response?.data);
    })
  }

  console.log(kadrAddData);

  const AddKadrFunc = async () => {
    let newKadrData = {
      lastName: lastNameRef.current.value,
      firstName: firstNameRef.current.value,
      middleName: middleNameRef.current.value,
      birthDate: birthDateRef.current.value.split(".").reverse().join("-"),
      orgId: Number(oi),
      branchId: activeBranchId,
      document: seriasRef.current.value.toUpperCase(),
      pin: Number(pinRef.current.value.split("-").join(""))
    }

    console.log(newKadrData);

    axiosInstanceKadr.post(`create`, newKadrData).then((res) => {
      Alert(setAlert, "success", "User muvofaqqiyatli qo'shildi");
      newKadrData.id = res.data
      addCloseRef.current.click();
      dispatch(addUser(newKadrData))
    }).catch((error) => {
      Alert(setAlert, "warning", error.response.data);
    })
  }

  const deleteFunc = () => {
    axiosInstanceKadr.delete(`delete/${deleteModal.id}`).then((res) => {
      dispatch(deleteUser(deleteModal.id));
      Alert(setAlert, "success", "Muvofaqqiyatli o'chirildi")
    }).catch(err => Alert(setAlert, "warning", err.response.data))
  }

  let fields1 = {
    text: 'label',
    value: 'value'
  };

  const languagesOption = [
    { value: "0", label: "Uzb" },
    { value: "1", label: "Ru" },
    { value: "2", label: "Eng" },
  ]

  const getKadrs = () => {

    axiosInstance.get(`organization/getAllBySentKadrSelect`).then((res) => {
      console.log(res.data);

      let arr = []
      res.data?.forEach((item) => {
        if (Number(oi) !== item.id) {
          let label = item.orgName;
          let value = item.id
          arr.push({ value: value, label: label })
        }
      })

      setSendingOrg(arr)
    })

    let newbranchsOption = []
    branchs?.forEach((item) => {
      if (name !== item.name) {
        let label = item.name;
        let value = item.id
        newbranchsOption.push({ value: value, label: label })
      }
    })

    setBranchOption(newbranchsOption)
  }

  const sendingFunc = () => {
    if (checkTash) {
      const data = {
        ids: sendingUserRef.current.value,
        orgId: sendingOrgRef.current.props.value.value,
        sendOrg: Number(oi)
      }
      console.log(data);
      axiosInstanceKadr.post(`sendKadr`, data).then((res) => {
        console.log(res.data);
        Alert(setAlert, "success", "Muvafaqqiyatli yuborildi!")
      })
        .catch(err => {
          console.log(err);
          Alert(setAlert, "warning", err.response.data)
        })
    } else {
      console.log(sendingBranchRef.current.props.value.value, sendingUserRef.current.value);
      axiosInstanceKadr.put(`changeBranch`, {
        branchId: sendingBranchRef.current.props.value.value,
        users: sendingUserRef.current.value
      }).then((res) => {
        const newUsers = data?.filter((item) => sendingUserRef?.current?.value?.indexOf(item.id) > 0)
        console.log(newUsers);
        dispatch(getUsers(newUsers))
        Alert(setAlert, "success", "Muvafaqqiyatli ko'chirildi!")
      }).catch(err => Alert(setAlert, "warning", err.response.data))


    }

    setSending(false)


  }

  const imageUpdate = async () => {
    const avatar = new FormData()
    avatar.append("image", file)
    console.log(file);

    const fileId = await axiosInstanceKadr.post(`file/upload/${oi}`, avatar);
    console.log(fileId);

    axiosInstanceKadr.patch(`changeAvatar`, {
      kadrId: imageEdit.kadr?.id,
      avatarId: fileId?.data,
    }).then((res) => {
      console.log(res.data);
      dispatch(updateImage(res.data))
      Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi")
      setImageEdit({ isShow: false, kadr: {} })
    }).catch(err => Alert(setAlert, "warning", err.response.data))
  }

  const imageDelete = () => {

    axiosInstanceKadr.delete(`deleteAvatar/${imageEdit.kadr?.id}`).then((res) => {
      Alert(setAlert, "success", "Muvafaqqiyatli o'chirildi")
      dispatch(deleteImage(imageEdit.kadr?.id))
      setImageEdit({ isShow: false, kadr: {} })
    })
  }

  const [searchKadrs, setSearchKadrs] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const searchKadrTableFunc = () => {
    const searchKadr = searchKadrRef.current.value
    console.log(searchKadr);

    console.log(allUsers);

    const newSearchKadrs = allUsers?.filter((item) => searchKadr.indexOf(item.id) >= 0)
    setSearchKadrs(newSearchKadrs)
    console.log(newSearchKadrs);

    const endOffset = itemOffset + 10;
    setCurrentItems(newSearchKadrs.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(newSearchKadrs.length / 10));
  }

  const handlePageClick2 = (event) => {
    const newOffset = (event.selected * 10) % searchKadrs.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const keyDown = (e, type) => {
    if (e.key === "Enter" && type === "searchModal") {
      searchKadrFunc();
    }

    // if (e.key === "Enter" && type === "kadrAdd") {
    //   AddKadrFunc();
    // }
  }

  const EditNumber = () => {
    return (
      <InputMask mask="+\9\9\8\(99)-999-99-99" style={{ textTransform: "uppercase" }} defaultValue={"+99894-123-45-17"}>
        {(inputProps) => <div className="form-group form-group-floating mb-0">
          <div className="position-relative">
            <input
              {...inputProps}
              ref={editNumberRef}
              type="text"
              className="form-control form-control-outline"
            />
            <label
              className="label-floating kadrInp">Telefon raqami:</label>
          </div>
        </div>}
      </InputMask>
    )
  }

  const editKadrFunc = () => {
    console.log(1);
    Alert(setAlert, "success", "Muvafaqqiyatli o'zgartirildi")
    setEditModal({ isShow: false, kadr: {} })
  }

  let sortInput = [];

  const changeInputNumber = async (e) => {
    if (e.code === "Enter") {
      let result = sortInput.sort((a, b) => a.kadrId - b.kadrId);
      let arr = [];
      for (let i = 1; i < result.length; i++) {
        if (!(result[i - 1].kadrId === result[i].kadrId)) {
          arr.push(result[i - 1]);
        }
      }
      arr.push(result[result.length - 1]);
      console.log(arr);
      console.log(currentPage);
      try {
        const changeOrder = await axiosInstanceKadr.patch(`changeOrder`, {
          orders: arr
        })
        console.log(changeOrder.data);
        try {
          const res = await axiosInstanceKadr.get(`getAllForBranch/${activeBranchId}/?page=${currentPage}&size=${size}`)
          console.log(`getAllForBranch/${activeBranchId}/?page=${currentPage}&size=${size}`);
          console.log(res?.data?.content);
          dispatch(getUsers(res?.data?.content))
        } catch (error) {
          console.log(error.response);
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    sortInput.push({ kadrId: id, order: e });
  }

  return (
    <>
      <div className="tab-content">
        <div className="tab-pane fade show active" id="colored-tab1">
          <div className="card p-0">
            <div className="card-body p-3" style={{ padding: "10px 20px" }}>
              <div className="row pb-2" style={{ justifyContent: "space-between", gap: "1rem" }}>

                <div className="d-flex" style={{ gap: "1rem" }}>
                  <div className="multi-kadr">
                    <MultiSelectComponent
                      popupHeight='500px'
                      popupWidth="400px"
                      width="400px"
                      fields={fields1}
                      dataSource={sendingUser}
                      placeholder="Kadrni tanlash"
                      mode="CheckBox"
                      ref={searchKadrRef}
                      enableGroupCheckBox="true"
                      allowFiltering="true"
                      unSelectAllText="Barchasini olib tashlash"
                      selectAllText="Barchasini belgilash"
                      showSelectAll="true"
                      filterBarPlaceholder="Qidirish">
                      <Inject services={[CheckBoxSelection]} />
                    </MultiSelectComponent>
                  </div>


                  <button type="button" onClick={() => searchKadrTableFunc()} title="Qidirish" className="btn btn-primary p-2" style={{ padding: "4px 8px" }}>
                    <i className="fa-solid fa-magnifying-glass mr-1" style={{ fontSize: "18px" }}></i> Qidirish
                  </button>


                </div>

                <div className="d-flex" style={{ gap: "1rem" }}>
                  {/* <button onClick={() => setAddModal(true)} type="button" title="Qo'shish" className="btn btn-success p-2" style={{ padding: "4px 8px" }}>
                    <i className="icon-plus3 mr-1" style={{ fontSize: "18px" }}></i> User qo'shish
                  </button> */}

                  <a href="#1" data-toggle="modal" className="btn btn-success p-2" data-target="#userAdd" style={{ textTransform: "upperCase", padding: "4px 8px" }}>
                    <i className="icon-plus2"></i> User qo'shish</a>

                  <button onClick={() => { setSending(true); getKadrs() }} type="submit" title="Qo'shish" className="btn btn-primary p-2" style={{ padding: "4px 8px" }}>
                    <i className="fa-solid fa-paper-plane mr-1" style={{ fontSize: "18px" }}></i> Yuborish
                  </button>

                </div>


              </div>



              {
                (searchKadrs?.length > 0) ? (
                  <>
                    <table className="table my-1 table-bordered table-striped table-hover Tab">
                      <thead>
                        <tr className="bg-dark text-white NavLink text-center">
                          <th style={{ width: "5%" }}>№</th>
                          <th style={{ width: "15%" }}>Rasm</th>
                          <th style={{ width: "20%" }}>F.I.O</th>
                          <th style={{ width: "20%" }}>Bo'lim</th>
                          <th style={{ width: "20%" }}>Lavozimi</th>
                          <td style={{ width: "5%" }}>Harakatlar</td>
                        </tr>
                      </thead>
                      <tbody>
                        {searchKadrs && searchKadrs?.map((kadr, index) => {
                          return (
                            <tr key={Math.random()} className="text-center">
                              <td>
                                <NumericInput
                                  value={kadr.orderNumber}
                                  onKeyDown={(e) => changeInputNumber(e, kadr.id)}
                                  onChange={(e) => inputChangeHandler(e, kadr.id)}
                                  className="adminSozlamaInput"
                                />
                              </td>
                              <td>
                                <img onClick={() => setImageEdit({ isShow: true, kadr: kadr })} src={kadr?.avatarPath ? `${urlKadr}file/view/${kadr?.id}` : "/assets/user.png"} style={{ width: "50%", minWidth: "100px", cursor: "pointer" }} alt="" />
                              </td>
                              <td>{kadr?.lastName} {kadr?.firstName} {kadr?.middleName}</td>
                              <td>{kadr.department}</td>
                              <td>{kadr.position}</td>
                              <td>
                                <div className="amallar" style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                  <Link tabIndex={index} to={`/kadrlar/${activeBranchId}/${kadr.id}/mehnat_daftarchasi`}>
                                    <i className="icon-eye btn btn-dark" title="Ko'rish" data-animation="false"></i>
                                  </Link>
                                  <Link to={`/kadrlar/${activeBranchId}/${kadr.id}/mehnat_daftarchasi`}>
                                    <i className="icon-pencil5 btn btn-dark" title="Tahrirlash" data-animation="false"></i>
                                  </Link>
                                  <button className="btn btn-dark" onClick={() => setDeleteModal({ isShow: true, id: kadr.id })}>
                                    <i className="icon-bin" title="O'chirish" data-animation="false"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                        }


                      </tbody>
                    </table>

                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=">>"
                      onPageChange={handlePageClick2}
                      pageRangeDisplayed={3}
                      pageCount={pageCount}
                      className="paginate"
                      activeClassName="active"
                      previousLabel="<<"
                      renderOnZeroPageCount={null}
                    />
                  </>) :
                  (<>
                    <table className="table my-1 table-bordered table-striped table-hover Tab" id="myTable">
                      <thead>
                        <tr className="bg-dark text-white NavLink text-center">
                          <th style={{ width: "5%" }}>№</th>
                          <th style={{ width: "15%" }}>Rasm</th>
                          <th style={{ width: "20%" }}>F.I.O</th>
                          <th style={{ width: "20%" }}>Bo'lim</th>
                          <th style={{ width: "20%" }}>Lavozimi</th>
                          <td style={{ width: "5%" }}>Harakatlar</td>
                        </tr>
                      </thead>
                      <tbody>
                        {data && data?.map((kadr, index) => {
                          return (
                            <tr key={Math.random()} className="text-center">
                              <td>
                                <NumericInput
                                  value={kadr.orderNumber}
                                  onKeyDown={(e) => changeInputNumber(e, kadr.id)}
                                  onChange={(e) => inputChangeHandler(e, kadr.id)}
                                  className="adminSozlamaInput"
                                />
                              </td>
                              <td>
                                <img onClick={() => setImageEdit({ isShow: true, kadr: kadr })} src={kadr?.avatarPath ? `${urlKadr}file/view/${kadr?.id}` : "/assets/user.png"} style={{ width: "50%", minWidth: "100px", cursor: "pointer" }} alt="" />
                              </td>
                              <td>{kadr?.lastName} {kadr?.firstName} {kadr?.middleName}</td>
                              <td>{kadr.department}</td>
                              <td>{kadr.position}</td>
                              <td>
                                <div className="amallar" style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                  <Link tabIndex={index} to={`/kadrlar/${activeBranchId}/${kadr.id}/mehnat_daftarchasi`}>
                                    <i className="icon-eye btn btn-dark" title="Ko'rish" data-animation="false"></i>
                                  </Link>
                                  <button className="btn btn-dark" onClick={() => setEditModal({ isShow: true, kadr: kadr })}>
                                    <i className="icon-pencil5" title="Tahrirlash" data-animation="false"></i>
                                  </button>
                                  <button className="btn btn-dark" onClick={() => setDeleteModal({ isShow: true, id: kadr.id })}>
                                    <i className="icon-bin" title="O'chirish" data-animation="false"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )
                        })
                        }


                      </tbody>
                    </table>

                    <ReactPaginate
                      previousLabel="<<"
                      nextLabel=">>"
                      pageCount={totalElements / size}
                      breakLabel="..."
                      className="paginate"
                      activeClassName="active"
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      forcePage={currentPage}
                    />
                  </>)
              }





              {/* <!-- end table --> */}
            </div>
          </div>
          {/* <!-- end Table Components --> */}

        </div>
      </div>
      {/* {searchModal && (
        <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Kadr qidirish</h5>
                <button onClick={() => setSearchModal(false)} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>
              <form>
                <div className="modal-body pb-0 px-2">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-lg-6">
                        <InputMask mask="aa-9999999" style={{ textTransform: "uppercase" }}>
                          {(inputProps) => <div className="form-group form-group-floating mb-0">
                            <div className="position-relative">
                              <input
                                {...inputProps}
                                ref={docRef}
                                type="text"
                                className="form-control form-control-outline"
                                onKeyDown={(e) => keyDown(e, "searchModal")}
                                required
                              />
                              <label
                                className="label-floating kadrInp">Pasport seriasi va raqamini kiriting:</label>
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
                                onKeyDown={(e) => keyDown(e, "searchModal")}
                                type="text"
                                className="form-control form-control-outline"
                                required
                              />
                              <label
                                className="label-floating kadrInp">Tug'ilgan kuninggizni kiriting:</label>
                            </div>
                          </div>}
                        </InputMask>
                      </div>
                    </div>

                  </div>

                </div>

                <div className="modal-footer">
                  <button onClick={() => searchKadrFunc()} type="button" className="btn btn-primary">
                    <i className="fa-solid fa-magnifying-glass"></i> Qidirish</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}

      <div id="userAdd" className="modal fade" tabIndex="-1">
        <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Kadr qo'shish</h5>
                <button type="button" className="close" data-dismiss="modal" ref={addCloseRef} style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>

              <div className="modal-body px-2 pb-0" onKeyDown={(e) => keyDown(e, "kadrAdd")}>
                <div className="form-group">
                  <div className="row mb-3 form-group form-group-floating">
                    <div className="col-lg-4">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline"
                          placeholder="Placeholder"
                          // defaultValue={kadrAddData?.lastName}
                          ref={lastNameRef}
                        />
                        <label
                          className="label-floating">Familiyasi:</label>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline"
                          placeholder="Placeholder"
                          // defaultValue={kadrAddData?.firstName}
                          ref={firstNameRef}
                        />
                        <label
                          className="label-floating">Ismi:</label>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <div className="position-relative">
                        <input
                          type="text"
                          className="form-control form-control-outline"
                          placeholder="Placeholder"
                          // defaultValue={kadrAddData?.middleName}
                          ref={middleNameRef}
                        />
                        <label
                          className="label-floating">Otasining ismi:</label>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-0 form-group form-group-floating">
                    <div className="col-lg-4">
                      <InputMask mask="99.99.9999" style={{ textTransform: "uppercase" }}>
                        {(inputProps) => <div className="form-group form-group-floating mb-0">
                          <div className="position-relative">
                            <input
                              {...inputProps}
                              ref={birthDateRef}
                              type="text"
                              className="form-control form-control-outline"
                            />
                            <label
                              className="label-floating kadrInp">Tug'ilgan kuni:</label>
                          </div>
                        </div>}
                      </InputMask>
                    </div>

                    <div className="col-lg-4">
                      <InputMask mask="aa-9999999" style={{ textTransform: "uppercase" }}>
                        {(inputProps) => <div className="form-group form-group-floating mb-0">
                          <div className="position-relative">
                            <input
                              {...inputProps}
                              ref={seriasRef}
                              type="text"
                              className="form-control form-control-outline"
                            />
                            <label
                              className="label-floating kadrInp">Pasport seriasi:</label>
                          </div>
                        </div>}
                      </InputMask>
                    </div>

                    <div className="col-lg-4">
                      <InputMask mask="9999-9999-9999-99" style={{ textTransform: "uppercase" }}>
                        {(inputProps) => <div className="form-group form-group-floating mb-0">
                          <div className="position-relative">
                            <input
                              {...inputProps}
                              ref={pinRef}
                              type="text"
                              className="form-control form-control-outline"
                            />
                            <label
                              className="label-floating kadrInp">PNFL:</label>
                          </div>
                        </div>}
                      </InputMask>
                    </div>
                  </div>

                  <div className="row mt-3" style={{ display: "flex", justifyContent: "flex-end" }}>
                    <div className=" col-lg-4">
                      <button onClick={() => AddKadrFunc()} type="button" className="w-100 h-100 btn btn-primary py-2">
                        <i className="icon-plus3 mr-1"></i> Qo'shish</button>
                    </div>
                  </div>
                </div>
              </div>

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

      {sending && (
        <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Kadr yuborish</h5>
                <button onClick={() => setSending(false)} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                  &times;
                </button>
              </div>
              <div className="modal-body pb-0 px-3">
                <div className="row">
                  <div className="kadr-multi-select col-lg-12 px-0">
                    <MultiSelectComponent
                      id="mtselement"
                      popupHeight='500px'
                      popupWidth="100%"
                      fields={fields1}
                      dataSource={sendingUser}
                      placeholder="Kadrlarni tanlang"
                      mode="CheckBox"
                      ref={sendingUserRef}
                      enableGroupCheckBox="true"
                      allowFiltering="true"
                      unSelectAllText="Barchasini olib tashlash"
                      selectAllText="Barchasini belgilash"
                      showSelectAll="true"
                      filterBarPlaceholder="Qidirish">
                      <Inject services={[CheckBoxSelection]} />
                    </MultiSelectComponent>
                  </div>
                </div>

                <div className="row px-0">
                  <div className="col-lg-6 mt-3 pl-0">
                    <Select
                      name="colors"
                      options={[{ label: "Tashkilotga jo'natish", value: 0 }, { label: "Guruhga qo'shish", value: 1 }]}
                      value={checkTash ? { label: "Tashkilotga jo'natish", value: 0 } : { label: "Guruhga qo'shish", value: 1 }}
                      classNamePrefix="select"
                      onChange={(e) => setCheckTash(e.value === 0 ? true : false)}
                    />
                  </div>

                  <div className="col-lg-6 mt-3 pr-0">
                    {checkTash ? <Select
                      ref={sendingOrgRef}
                      placeholder="Tashkilot tanlang:"
                      name="colors"
                      options={sendingOrg}
                      classNamePrefix="select"
                      onChange={(e) => console.log(e)}
                    /> : <Select
                      ref={sendingBranchRef}
                      placeholder="Guruhni tanlang:"
                      name="colors"
                      options={branchOption}
                      classNamePrefix="select"
                      onChange={(e) => console.log(e)}
                    />


                    }
                  </div>
                </div>




                <div className="mt-3 mb-2" style={{ display: "flex", justifyContent: "end" }}>
                  <button onClick={() => sendingFunc()} type="button" className="btn btn-primary py-2">
                    <i className="fa-solid fa-paper-plane mr-2" style={{ fontSize: "18px" }}></i> Yuborish</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {editModal.isShow && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Kadr tahrirlash</h5>
              <button onClick={() => setEditModal({ isShow: false, kadr: {} })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                &times;
              </button>
            </div>

            <div className="modal-body px-2 pb-0">
              <div className="form-group">
                <div className="row mb-3 form-group form-group-floating">

                  <div className="col-lg-6">
                    <EditNumber />
                  </div>

                  <div className="col-lg-6">
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control form-control-outline InputCard"
                        placeholder="Placeholder"
                        ref={editEmailRef}
                        defaultValue={"keldiyorraxmatov@gmail.com"}
                      />
                      <label
                        className="label-floating">Email:</label>
                    </div>
                  </div>
                </div>

                <div className="row" style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div className=" col-lg-4">
                    <button onClick={() => editKadrFunc()} type="button" className="w-100 h-100 btn btn-success py-2">
                      <i className="icon-pencil5 mr-1"></i> Tahrirlash</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>}

      {imageEdit.isShow && <div id="modal_large" className="modal fade show" tabindex="-1" aria-modal="true" role="dialog" style={{ display: "flex", alignItems: "center", background: "rgba(0, 0, 0, 0.5)" }}>
        <div className="modal-dialog modal-lg" style={{ width: "100%" }}>
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">Rasm almashtirish</h5>
              <button onClick={() => setImageEdit({ isShow: false, kadr: {} })} type="button" className="close" data-dismiss="modal" style={{ fontSize: "24px" }}>
                &times;
              </button>
            </div>

            <div className="modal-body px-2 pb-0">
              <div className="form-group">
                <div className="row">

                  <div className="col-lg-12">
                    <div className="form-group form-group-float sm-mb-10 mb-2" >
                      <div className="custom-file" style={{ zIndex: "0" }}>
                        <input
                          type="file"
                          className="custom-file-input fileKiruvchi"
                          // id="custom-file-visible"
                          accept='.png, .jpeg, .jpg'
                          onClick={(e) => e.target.value = null}
                          onChange={(e) => { setFile(e.target.files[0]); console.log(e.target.files[0]); }}
                          required
                        />
                        <label className="custom-file-label text-muted"
                          htmlFor="custom-file-visible">
                          {file?.length > 0 ? `Fayl tanlandi` : "Faylni tanlash"}
                        </label>
                      </div>
                      <label className="d-block text-muted mb-0">Ruxsat etilgan formatlar: .png, .jpeg, .jpg</label>
                    </div>
                  </div>

                  <div className="col-lg-12 row px-0" style={{ justifyContent: "end" }}>

                    {
                      imageEdit?.kadr?.avatarPath ? (
                        <>
                          <div className="col-lg-2">
                            <button onClick={() => imageUpdate()} type="button" className="w-100 py-2 btn btn-success">
                              <i className="fa-solid fa-floppy-disk" style={{ fontSize: "18px" }}></i></button>
                          </div>

                          <div className="col-lg-2">
                            <button onClick={() => imageDelete()} type="button" className="w-100 py-2 btn btn-danger">
                              <i className="icon-bin" style={{ fontSize: "18px" }}></i></button>
                          </div>

                        </>
                      ) : (
                        <>
                          <div className="col-lg-2">
                            <button onClick={() => imageUpdate()} type="button" className="w-100 py-2 btn btn-success">
                              <i className="fa-solid fa-floppy-disk" style={{ fontSize: "18px" }}></i></button>
                          </div>
                        </>
                      )
                    }

                  </div>




                </div>

              </div>

            </div>
          </div>

        </div>
      </div>}


      {/* alert */}
      <AlertContent alert={alert} />
    </>

  )
}

export default React.memo(KadrlarTableContent)

