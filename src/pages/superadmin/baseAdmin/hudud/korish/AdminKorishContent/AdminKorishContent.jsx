import React, { useEffect, useState } from "react";
import './AdminKorishContent.css';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance, axiosInstanceFq } from "../../../../../../config";
import { url } from "../../../../../../config";
import { Alert } from "../../../../../../component/alert/Alert";
import NumericInput from 'react-numeric-input';
import ReactPaginate from "react-paginate";
import HududNavbar from "../../hududNavbar/HududNavbar";

const AdminKorishContent = ({ currentUser }) => {
  // const [fatherId, setFatherId] = useState(0);
  const [yunalishlar, setYunalishlar] = useState([]);
  const [iteratinYunalishlar, setIteratinYunalishlar] = useState([]);
  const [selected, setSelected] = useState(0);
  // const { user: currentUser } = useContext(AuthContext);
  const [tashkilotlar, setTashkilotlar] = useState([]);
  const [boshTashkilotlar, setBoshTashkilotlar] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [updateYunalish, setUpdateYunalish] = useState({});
  // const [yonalishId, setYonalishId] = useState(0);
  const [yonalishDel, setYonalishDel] = useState(0);
  const [deleteData, setDeleteData] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openTable, setOpenTable] = useState('');
  const [notParentsCard1, setNotParentsCard1] = useState([]);
  const [notParentsCard3, setNotParentsCard3] = useState([]);
  let sortInput = [];


  const [viloyat, setViloyat] = useState([]);
  const [tumanlar, setTumanlar] = useState([]);
  const [sectorlar, setSectorlar] = useState([]);
  const [mahallalar, setMahallalar] = useState([]);
  let params = useParams()

  // const sortNullishValues = (arr = []) => {
  //   const assignValue = val => {
  //     if (val === null) {
  //       return Infinity;
  //     } else {
  //       return val;
  //     }
  //   }
  //   const sorter = (a, b) => {
  //     return assignValue(a.orderNumber) - assignValue(b.orderNumber);
  //   };
  //   arr.sort(sorter);
  // }

  //sector oqib olish
  useEffect(() => {
    let load = true;
    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('sector')
        setSectorlar(res.data)
        let arr = [];
        res.data.forEach((item) => {
          arr.push({ value: item.id, label: item.name });
        })
        if (load)
          setNotParentsCard3(arr);
      } catch (error) {
        console.log(error.response)
      }
    }
    getData();

    return () => {
      load = false;
    }
  }, [currentUser])

  useEffect(() => {
    let useEffectCount = true;
    if (useEffectCount) {
      if (params.stir) {
        document.querySelector('.atAuto').click();
        document.querySelector('.putStir').value = params.stir.substring(0, 3) + "-" + params.stir.substring(3, 6) + "-" + params.stir.substring(6, 9);
        document.querySelector('.buttonStir').click();
      }
    }

    return () => {
      useEffectCount = false;
    }
  }, [params.stir])


  const handlePageClick = async (e) => {
    try {
      const res = await axiosInstance.post("organization/search", {
        orgName: openTable,
        page: e.selected,
      })
      setBoshTashkilotlar(res.data)
    } catch (error) {
      console.log(error.response);
    }
    setSelected(e.selected);
  }

  const changeInputNumber = async (e) => {
    if (e.key === "Enter") {
      let result = sortInput.sort((a, b) => a.id - b.id);
      let arr = [];
      for (let i = 1; i < result.length; i++) {
        if (!(result[i - 1].id === result[i].id)) {
          arr.push(result[i - 1]);
        }
      }
      arr.push(result[result.length - 1]);
      try {
        const res = await axiosInstance.post(`organization/updateOrderNumber`, {
          orderNumber: arr[0].orderNumber,
          id: arr[0].id,
        })
        try {
          const res1 = await axiosInstance.get("organization/orgType/" + res.data.orgType?.id)
          setTashkilotlar(res1.data);
        } catch (error) {
          console.log(error?.response);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    sortInput.push({ id: id, orderNumber: e });
  }

  // yunalishlarni yunalish degan select ga joylashtirish
  useEffect(() => {
    let useEffectCount = true;
    let arr = yunalishlar.map((yun) => (
      { value: yun.id, label: yun.name }
    ))
    if (useEffectCount)
      setIteratinYunalishlar(arr);

    return () => {
      useEffectCount = false;
    }
  }, [yunalishlar]);

  // const logChange12 = (e) => {
  //   setFatherId(e.value)
  // }

  // yunalishni bosganda tashkilot chiqishi
  useEffect(() => {
    let useEffectCount = true;
    let orgNames = document.querySelectorAll('.cardAccordion');
    if (useEffectCount) {
      orgNames.forEach((org) => {
        org.querySelector('.orgname').addEventListener('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
    }

    return () => {
      useEffectCount = false;
    }
  }, [yunalishlar]);

  //orgTypeId
  // const orgTypeId = (e) => {
  //   setYonalishId(e.value)
  // }

  const deleteId = (id) => {
    setDeleteData(id)
    setOpenDeleteModal(true)
    document.querySelector('.openInT').click();
  }

  const deleteDataId = async () => {
    try {
      const res = await axiosInstance.post(`organization/delete`, {
        id: deleteData,
      })
      setYonalishDel(deleteData)
      Alert(setAlert, 'success', `${res.data}`)
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, 'warning', `${error?.response?.data}`)
    }
    setOpenDeleteModal(false)
  }

  //viloyat oqib olish
  useEffect(() => {
    let load = true;
    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get('province')
        let arr = [];
        res.data.forEach((item) => {
          arr.push({ value: item.id, label: item.name });
        })
        if (load) {
          setMahallalar(res.data)
          setNotParentsCard1(arr);
        }
      } catch (error) {
        console.log(error.response)
      }
    }
    getData();

    return () => {
      load = false;
    }
  }, [currentUser])

  const yunalishUzgartirish = async (dat) => {
    let yunalishName = document.querySelector('.yunalishName').value;
    if (yunalishName) {
      try {
        const res = await axiosInstance.patch("orgType", {
          id: dat.id,
          name: yunalishName
        })
        let arr = yunalishlar.filter((d) => {
          if (d.id === res.data.id) {
            d.id = res.data.id;
            d.name = res.data.name;
            d.isActive = res.data.isActive;
          }
          return d;
        })
        Alert(setAlert, "success", "Маршрутизация успешно переименована")
        setYunalishlar(arr);
        setUpdateYunalish({ open: false, obj: {} });
        let orgNames = document.querySelectorAll('.cardAccordion');
        orgNames.forEach((org) => {
          org.querySelector('.orgname').addEventListener('click', () => {
            if (org.querySelector('.openTash').style.display === "none") {
              org.querySelector('.openTash').style.display = "block";
            } else {
              org.querySelector('.openTash').style.display = "none";

            }
          })
        })
      } catch (error) {
        console.log(error?.response);
      }
    } else {
      Alert(setAlert, "warning", "Необходимо ввести имя пункта назначения")
    }
  }

  const setSearch = async (e) => {
    if (e) {
      try {
        const res = await axiosInstanceFq.post("mahalla/searchByName", {
          orgId: JSON.parse(localStorage.getItem('oi')),
          page: 0,
          name: e
        })
        setBoshTashkilotlar(res.data)
      } catch (error) {
        console.log(error.response);
      }
    }
    setOpenTable(e)
  }
  const put = () => {
    // document.querySelector('.putBtn').click()
    // document.querySelector('.putBtn').click()
  }
  const getTumanlar = async (id) => {
    try {
      const res = await axiosInstanceFq.get(`district/provinceId/${id}`)
      setTumanlar(res.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  const getTashBoshTashkilot = async (id, datId) => {
    try {
      const res = await axiosInstanceFq.get(`mahalla/${datId}/${id}`)
      setViloyat(res.data)
    } catch (error) {
      console.log(error.response)
    }
  }

  // const deleteVil = async (id) => {
  //   try {
  //     const res = await axiosInstanceFq.delete(`province/` + id, {
  //       headers: {
  //         Authorization: 'Bearer ' + currentUser
  //       }
  //     })
  //     let arr = [], arr1 = [];
  //     arr = mahallalar
  //     arr.forEach((d) => {
  //       if (d.id !== res.data.id) {
  //         arr1.push(d)
  //       }
  //     })
  //     setMahallalar(arr1)

  //   } catch (error) {
  //     console.log(error.response)
  //     Alert(setAlert, 'warning', `${error.response.data}`)
  //   }
  // }

  // yunalishni bosganda tashkilot chiqishi
  useEffect(() => {
    let useEffectCount = true;
    let orgNames = document.querySelectorAll('.cardAccordion');
    if (useEffectCount) {
      orgNames.forEach((org) => {
        org.querySelector('.orgname').addEventListener('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
    }

    return () => {
      orgNames.forEach((org) => {
        org.querySelector('.orgname').removeEventListener('click', () => {
          if (org.querySelector('.openTash').style.display === "none") {
            org.querySelector('.openTash').style.display = "block";
          } else {
            org.querySelector('.openTash').style.display = "none";

          }
        })
      })
      useEffectCount = false;
    }
  }, [yunalishlar]);


  return (
    <div className="content mb-5 ">
      <h3 style={{ margin: "10px 0 20px 20px", fontWeight: "bold", textTransform: "upperCase" }}>Вид</h3>
      <Link to={`/super_base_admin_tashkilot-qushish`} className={'goBack d-none'}></Link>
      <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
        style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px", marginLeft: "20px" }}>
        <HududNavbar />
      </ul>

      <div className="card-body" style={{ marginLeft: "20px", padding: 0 }}>
        <div className={`card-body p-0`} style={{ borderRadius: "0" }}>
          <div className="tab-content">
            <div id={`accordion-styled colored-tab1`} className={"tab-pane fade show active"}>
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                      <div className="col-3">
                        <input
                          type="text"
                          className="form-control form-control-outline mb-2"
                          placeholder="Имя или СТИР"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    {
                      openTable !== '' && <table
                        className="table datatable-row-full  mt-3 table-bordered table-striped table-hover Tab"
                        id="myTable">
                        <thead>
                          <tr className="bg-dark text-white NavLink text-center">
                            <th style={{ width: "3%" }}>№</th>
                            <th style={{ width: "15%" }}>Имя</th>
                            <th style={{ width: "15%" }}>Район
                              (Город)
                            </th>
                            <th style={{ width: "25%" }}>Короткое 
                            имя
                            </th>
                            <th style={{ width: "25%" }}>Директор</th>
                            <th style={{ width: "10%" }}>СТИР</th>
                            <td style={{ width: "8%" }}>Действия</td>
                          </tr>
                        </thead>
                        <tbody
                          id="viloyat">
                          {boshTashkilotlar?.content?.length > 0 && boshTashkilotlar?.content?.map((dat, index) => (
                            <tr key={index}
                              className="text-center">
                              <td>{index + 1 + selected * 10}</td>
                              {/* userData?.avatar ? `${url}/file/download/${userData?.avatar?.id} */}
                              <td>
                                {dat.name}
                              </td>
                              <td>{dat?.orgDistrict}</td>
                              <td>{dat?.orgShortName}</td>
                              <td>{dat?.leaderName}</td>
                              <td>{dat?.stir}</td>
                              <td className="">
                                <div
                                  className="icon d-flex justify-content-center align-items-center">
                                  <Link
                                    to={`/super_base_admin_tashkilotlar-tuzilishi/${dat?.id}`}
                                    className="infoBtn bg-dark"
                                    data-bs-toggle="tooltip"
                                    data-popup="tooltip"
                                    data-bs-placement="top"
                                    title="Ko'rish">
                                    <span><i
                                      className="icon-eye2"></i></span>
                                  </Link>
                                  <button
                                    type="button"
                                    className="infoBtn bg-dark"
                                    onClick={() => deleteId(dat?.id, index)}
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </button>

                                </div>


                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    }
                    {openTable !== '' && boshTashkilotlar?.content?.length > 0 && (
                      <ReactPaginate
                        breakLabel="..."
                        nextLabel=">>"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        pageCount={Math.ceil(boshTashkilotlar?.totalElements / 10)}
                        previousLabel="<<"
                        renderOnZeroPageCount={null}
                        className="paginationUL mt-2"
                        activeClassName="active"
                        forcePage={selected}
                      />
                    )}
                  </div>

                  {
                    openTable === '' && <div id="accordion-default">
                      {/* yunalishlar */}
                      {mahallalar?.map((dat, index1) => (
                        <div key={index1} className="d-flex align-items-center"
                          style={{ position: "relative" }}>
                          {/*<i className="fas fa-pen cursor-pointer mr-2" style={{*/}
                          {/*    fontSize: "18px",*/}
                          {/*    position: "absolute",*/}
                          {/*    top: "20px",*/}
                          {/*    left: "0"*/}
                          {/*}}*/}
                          {/*    // onClick={() => setUpdateYunalish({open: true, obj: dat})}*/}
                          {/*></i>*/}
                          <div className="card cardAccordion mb-0 mt-2 w-100 ml-4">
                            <div
                              className={'d-flex align-items-center justify-content-between pr-2'}>
                              <div className={'d-flex align-items-center pl-2'}>
                                {/*<NumericInput*/}
                                {/*    value={dat?.orderNumber}*/}
                                {/*    onKeyDown={(e) => changeInputNumber(e)}*/}
                                {/*    onChange={(e) => inputChangeHandler(e, dat.id)}*/}
                                {/*    className="adminSozlamaInput"*/}
                                {/*/>*/}

                                <div className="card-header orgname"
                                  style={{ height: "40px" }}
                                  onClick={() => getTumanlar(dat?.id)}>
                                  <h6 className="card-title d-flex justify-content-between align-items-center">
                                    <a className="text-body NavLink "
                                      style={{ color: "#0056B8 !important" }}
                                      href={`#1`}>{dat?.name}</a>
                                  </h6>
                                </div>
                              </div>
                              {/*<i className="fa-solid fa-trash-can"*/}
                              {/*   style={{cursor: 'pointer', fontSize: '20px'}}*/}
                              {/*   onClick={() => deleteVil(dat.id)}*/}
                              {/*></i>*/}
                            </div>

                            <div className="openTash" style={{ display: 'none' }}>
                              {tumanlar.length > 0 && tumanlar?.map((tash, index) => (
                                <div key={index}>
                                  {tash?.province?.name === dat?.name && (
                                    <div>
                                      {(
                                        <div className="">
                                          <div className="card-body pb-1 pt-2">
                                            <div className="card mb-1">
                                              <div
                                                className="card-header d-flex align-items-center">
                                                <NumericInput
                                                  value={tash?.orderNumber}
                                                  onKeyDown={(e) => changeInputNumber(e, tash.id)}
                                                  onChange={(e) => inputChangeHandler(e, tash.id)}
                                                  className="adminSozlamaInput"
                                                />

                                                <h6 className="card-title"
                                                  onClick={() => put()}>

                                                  <a className="collapsed text-body NavLink ml-2 openInT"
                                                    data-toggle="collapse"
                                                    href={`#vHokimlik${index}`}>{tash?.name}</a>
                                                </h6>
                                              </div>


                                              <div id={`vHokimlik${index}`}
                                                className="card-body collapse "
                                                data-parent={`#accordion-default`}>
                                                <div className="accordion"
                                                  id="accordionExample">
                                                  {
                                                    sectorlar?.map((sec, index1) => (
                                                      <div
                                                        key={index1}>

                                                        {
                                                          viloyat?.sector?.name === sectorlar?.name &&
                                                          <div
                                                            className="card"
                                                          >
                                                            <div
                                                              className="card-header"
                                                              id={`heading${index}${index1}${sec?.id}${tash?.id}`}>
                                                              <h2 className="mb-0">
                                                                <button
                                                                  className="btn btn-link btn-block text-left putBtn"
                                                                  type="button"
                                                                  data-toggle="collapse"
                                                                  data-target={`#collapse1${index}${index1}${sec?.id}${tash?.id}`}
                                                                  aria-expanded="true"
                                                                  aria-controls={`collapse1${index}${index1}${sec?.id}${tash?.id}`}
                                                                  onClick={() => getTashBoshTashkilot(sec.id, tash.id)}>
                                                                  {sec?.name}
                                                                </button>
                                                              </h2>
                                                            </div>

                                                            <div
                                                              id={`collapse1${index}${index1}${sec?.id}${tash?.id}`}
                                                              className="collapse"
                                                              aria-labelledby={`heading${index}${index1}${sec?.id}${tash?.id}`}
                                                              data-parent="#accordionExample">
                                                              {
                                                                viloyat.length > 0 &&
                                                                <div
                                                                  className="card-body">
                                                                  <table
                                                                    className="table datatable-row-full  mt-3 table-bordered table-striped table-hover Tab"
                                                                    id="myTable">
                                                                    <thead>
                                                                      <tr className="bg-dark text-white NavLink text-center">
                                                                        <th style={{ width: "3%" }}>№</th>
                                                                        <th style={{ width: "15%" }}>Лого</th>
                                                                        <th style={{ width: "20%" }}>Район
                                                                          (Город)
                                                                        </th>
                                                                        <th style={{ width: "25%" }}>Короткое
                                                                          Имя
                                                                        </th>
                                                                        <th style={{ width: "25%" }}>Директор</th>
                                                                        <td style={{ width: "8%" }}>Действия</td>
                                                                      </tr>
                                                                    </thead>
                                                                    <tbody
                                                                      id="viloyat">
                                                                      {viloyat?.length > 0 && viloyat?.map((dat, index) => (
                                                                        <>
                                                                          {
                                                                            dat?.sector?.id === sec?.id &&
                                                                            <tr key={index}
                                                                              className="text-center">
                                                                              <td>{index + 1}</td>
                                                                              <td>
                                                                                <img
                                                                                  src={dat?.logo ? `${url}/api/file/download/${dat.logo.id}` : "assets/user.png"}
                                                                                  style={{
                                                                                    width: "120px",
                                                                                    height: "120px"
                                                                                  }}
                                                                                  alt="" />
                                                                              </td>
                                                                              <td>{dat?.name}</td>
                                                                              <td>{dat?.orgShortName}</td>
                                                                              <td>{dat?.leaderName}</td>
                                                                              <td className="">
                                                                                <div
                                                                                  className="icon d-flex justify-content-center align-items-center">
                                                                                  <Link
                                                                                    to={`/super_base_admin_tashkilotlar-tuzilishi/${dat?.id}`}
                                                                                    className="infoBtn bg-dark"
                                                                                    data-bs-toggle="tooltip"
                                                                                    data-popup="tooltip"
                                                                                    data-bs-placement="top"
                                                                                    title="Ko'rish">
                                                                                    <span><i
                                                                                      className="icon-eye2"></i></span>
                                                                                  </Link>
                                                                                  <button
                                                                                    type="button"
                                                                                    className="infoBtn bg-dark"
                                                                                  // onClick={() => deleteId(dat?.id, index)}
                                                                                  >
                                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                                  </button>

                                                                                </div>


                                                                              </td>
                                                                            </tr>
                                                                          }
                                                                        </>

                                                                      ))}
                                                                    </tbody>
                                                                  </table>
                                                                </div>

                                                              }

                                                            </div>
                                                          </div>
                                                        }

                                                      </div>

                                                    ))
                                                  }

                                                </div>

                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))
                              }
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        openDeleteModal && <div className="adminWindow mt-5" tabIndex="-1">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">Вы хотите удалить?</h5>
                <button type="button" className="close close123" onClick={() => setOpenDeleteModal(false)}
                  data-dismiss="modal">&times;</button>
              </div>

              <div className="modal-body">

              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-link" onClick={() => setOpenDeleteModal(false)}>Отмена
                </button>
                <button type="button" className="btn btn-primary" onClick={() => deleteDataId()}>Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      {updateYunalish.open && (
        <div className="adminWindow">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header btn-primary p-2">
                <h5 className="modal-title">Изменить окно</h5>
                <button type="button" className="close"
                  onClick={() => setUpdateYunalish({ open: false, obj: {} })}>×
                </button>
              </div>

              <form className="modal-body form-inline justify-content-center">
                <label>Yo'nalish:</label>
                <input type="text" placeholder="Название маршрута"
                  className="form-control mb-2 mr-sm-2 ml-sm-2 mb-sm-0 w-75 yunalishName"
                  defaultValue={updateYunalish.obj?.name} />
                <button type="button" onClick={() => yunalishUzgartirish(updateYunalish.obj)}
                  className="btn btn-primary ml-sm-2 mb-sm-0"
                  style={{ textTransform: "capitalize" }}>Изменять
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* alert */}
      {alert.open && (
        <div className={`alert alert-${alert.color} alert-styled-left alert-dismissible`}>
          {/* <button type="button" className="close" data-dismiss="alert"><span>×</span></button> */}
          <span className="font-weight-semibold">{alert.text}</span>
        </div>
      )
      }
    </div>
  )
}

export default React.memo(AdminKorishContent);