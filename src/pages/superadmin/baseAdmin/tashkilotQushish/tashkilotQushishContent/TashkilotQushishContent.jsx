import React, { useEffect, useState } from "react";
import './tashkilotQushishContent.css';
import { Link, useParams } from 'react-router-dom';
import { axiosInstance } from "../../../../../config";
import { url } from "../../../../../config";
import AlertContent, { Alert } from '../../../../../component/alert/Alert';
import NumericInput from 'react-numeric-input';
import ReactPaginate from "react-paginate";
import HududNavbar from "../../hudud/hududNavbar/HududNavbar";
import AddDirection from "./addDirection/AddDirection";
import AddOrganization from "./addOrganization/AddOrganization";
import DeleteModal from "./deleteModal/DeleteModal";
import UpdateDirection from "./updateDirection/UpdateDirection";

const TashkilotQushishContent = ({ tab, currentUser }) => {
  const [yunalishlar, setYunalishlar] = useState([]);
  const [selected, setSelected] = useState(0);
  const [tashkilotlar, setTashkilotlar] = useState([]);
  const [tashkilotlar1, setTashkilotlar1] = useState([]);
  const [boshTashkilotlar, setBoshTashkilotlar] = useState([]);
  const [quyiTashkilotlar, setQuyiTashkilotlar] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [updateYunalish, setUpdateYunalish] = useState({});
  const [getTashkilotlarId, setGetTashkilotlarId] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState({ open: false, id: null });
  const [openTable, setOpenTable] = useState('');
  let sortInput = [];
  let sortInput1 = [];
  let params = useParams()

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
    let useEffectCount = true;
    if (params.stir && useEffectCount) {
      document.querySelector('.atAuto').click();
      document.querySelector('.putStir').value = params.stir.substring(0, 3) + "-" + params.stir.substring(3, 6) + "-" + params.stir.substring(6, 9);
      document.querySelector('.buttonStir').click();
    }

    return () => {
      useEffectCount = false
    }
  }, [params.stir])

  // barcha yo'nalishlarni o'qib olish
  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("orgType/all")
        if (useEffectCount) {
          sortNullishValues(res.data)
          setYunalishlar(res.data);
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser, tashkilotlar1]);

  const handlePageClick = async (e) => {
    try {
      const res = await axiosInstance.post("organization/search", {
        orgName: openTable,
        page: e.selected,
      })
      setBoshTashkilotlar(res.data)
    } catch (error) {
      console.log(error?.response);
    }
    setSelected(e.selected);
  }

  // id bo'yicha tashkilotlarni o'qib olish
  const getTashkilot = async (id) => {
    setGetTashkilotlarId(id)
    try {
      const res = await axiosInstance.get("organization/orgType/" + id)
      setTashkilotlar(res.data);
    } catch (error) {
      console.log(error?.response);
    }
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

  const changeInputNumber1 = async (e) => {
    if (e.key === "Enter") {
      try {
        const res = await axiosInstance.post(`orgType/order`, {
          orderNumber: sortInput1[0].orderNumber,
          id: sortInput1[0].id,
        })
        setTashkilotlar1(res.data);
      } catch (error) {
        console.log(error);
      }
    }
  }

  const inputChangeHandler1 = (e, id) => {
    sortInput1.push({ id: id, orderNumber: e });
  }

  const deleteTash = async (id) => {
    try {
      const res = await axiosInstance.delete("orgType/" + id)
      setTashkilotlar1(res.data)
      Alert(setAlert, 'success', `${res.data}`)
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, 'warning', `${error?.response?.data}`)
    }
  }

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

  const getTashBoshTashkilot = async (id) => {
    try {
      await axiosInstance.get("organization/mainOrganization/" + id)
      try {
        const res1 = await axiosInstance.get("organization/by/" + id)
        setBoshTashkilotlar(res1.data);
      } catch (error) {
        console.log(error?.response);
      }
    } catch (error) {
      console.log(error?.response);
    }
  }

  const getTashQuyiTashkilot = async (id) => {
    try {
      const res = await axiosInstance.get('organization/childOrganization/' + id)
      setQuyiTashkilotlar(res.data);
    } catch (error) {
      console.log(error?.response);
    }
  }

  const deleteDataId = async (id) => {
    try {
      const res = await axiosInstance.post(`organization/delete`, {
        id: id,
      })
      // setYonalishDel(deleteData)
      Alert(setAlert, 'success', `${res.data}`)
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, 'warning', `${error?.response?.data}`)
    }
    setOpenDeleteModal({ open: false, id: null });
  }

  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("organization/orgType/" + getTashkilotlarId)

        if (useEffectCount)
          setTashkilotlar(res.data);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [currentUser, getTashkilotlarId])

  const setSearch = async (e) => {
    setOpenTable(e)
    if (e) {
      try {
        const res = await axiosInstance.post("organization/search", {
          orgName: e,
          page: 0,
        })
        setBoshTashkilotlar(res.data)
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  return (
    <div className="content mb-5">
      <Link to={`/super_base_admin_tashkilot-qushish`} className={'goBack d-none'}></Link>

      {tab ? (
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <HududNavbar />
        </ul>
      ) : (
        <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", 
        textTransform: "upperCase" }}>Добавить организацию</h3>
      )}

      <div className="card-body p-0" style={{ marginTop: !tab && "-20px", padding: tab && 0 }}>
        <div className={`card-body p-0 ${!tab && "mt-3"}`} style={{ borderRadius: "0" }}>
          {!tab && (
            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink d-flex align-items-center justify-content-between">
              <li className="nav-item">
                <h5 style={{
                  margin: "10px 0 0 20px",
                  fontWeight: "bold",
                  textTransform: "upperCase",
                  color: "#fff",
                  padding: "0 5px 5px 0"
                }}>
                  Панель управления организациями
                </h5>
              </li>
              <li className="nav-item mr-3">
                <a href="#1" data-toggle="modal" className="" data-target="#yonalish" style={{ fontWeight: "bold", textTransform: "upperCase", color: "#fff" }}>
                  <i className="icon-plus2"></i> Добавить направление</a>
                <a href="#1" data-toggle="modal" className="ml-4 atAuto" data-target="#modal_theme_primary" style={{ fontWeight: "bold", textTransform: "upperCase", color: "#fff" }}>
                  <i className="icon-plus2"></i> Добавить организацию
                </a>

                {/* yunalish qushish modali */}
                <div id="yonalish" className="modal fade" tabIndex="-1">
                  {/* add direction */}
                  <AddDirection
                    currentUser={currentUser}
                    setAlert={setAlert}
                    setYunalishlar={setYunalishlar}
                  />
                </div>

                {/* add organization */}
                <div id="modal_theme_primary" className="modal fade" tabIndex="-1">
                  <AddOrganization
                    currentUser={currentUser}
                    setAlert={setAlert}
                    yunalishlar={yunalishlar}
                  />
                </div>
              </li>
            </ul>
          )}

          <div className="tab-content">
            <div id={`accordion-styled ${tab && 'colored-tab1'}`} className={tab ? "tab-pane fade show active" : ""}>
              <div className="card">
                <div className="card-body">
                  <div className="row d-flex justify-content-end">
                    <div className="col-lg-3 position-relative">
                      <input
                        type="text"
                        className="form-control form-control-outline"
                        style={{ paddingLeft: "25px" }}
                        placeholder="Имя или СТИР"
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <i className="fas fa-search" style={{ position: "absolute", top: "15px", left: "18px" }}></i>
                    </div>
                  </div>
                  <div>
                    {openTable !== '' && <table className="table datatable-row-full table-bordered table-striped table-hover Tab" id="myTable">
                      <thead>
                        <tr className="bg-dark text-white NavLink text-center">
                          <th style={{ width: "3%" }}>№</th>
                          <th style={{ width: "15%" }}>Лого</th>
                          <th style={{ width: "15%" }}>Район
                            (Город)
                          </th>
                          <th style={{ width: "25%" }}>Короткое имя
                          </th>
                          <th style={{ width: "25%" }}>Директор</th>
                          <th style={{ width: "10%" }}>СТИР</th>
                          <td style={{ width: "8%" }}>Действия</td>
                        </tr>
                      </thead>
                      <tbody
                        id="viloyat">
                        {boshTashkilotlar?.content?.length > 0 && boshTashkilotlar?.content?.map((dat, index) => (
                          <tr key={index} className="text-center">
                            <td>{index + 1 + selected * 10}</td>
                            <td>
                              <img
                                src={dat?.logo ? `${url}/api/file/download/${dat.logo.id}` : "assets/user.png"}
                                style={{
                                  width: "120px",
                                  height: "120px"
                                }}
                                alt="" />
                            </td>
                            <td>{dat?.orgDistrict}</td>
                            <td>{dat?.orgShortName}</td>
                            <td>{dat?.leaderName}</td>
                            <td>{dat?.stir}</td>
                            <td className="">
                              <div className="icon d-flex justify-content-center align-items-center">
                                <Link
                                  to={`/super_base_admin_tashkilotlar-tuzilishi/${dat?.id}`}
                                  className="infoBtn bg-dark"
                                  data-bs-toggle="tooltip"
                                  data-popup="tooltip"
                                  data-bs-placement="top"
                                  title="Ko'rish">
                                  <span><i className="icon-eye2"></i></span>
                                </Link>
                                <button
                                  type="button"
                                  className="infoBtn bg-dark"
                                  onClick={() => setOpenDeleteModal({ open: true, id: dat.id })}  // deleteId(dat?.id, index)
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
                  {openTable === '' && <div id="accordion-default">
                    {/* yunalishlar */}
                    {yunalishlar.map((dat, index1) => (
                      <div key={index1} className="d-flex align-items-center"
                        style={{ position: "relative" }}>
                        <i className="fas fa-pen cursor-pointer mr-2" style={{
                          fontSize: "18px",
                          position: "absolute",
                          top: "20px",
                          left: "0"
                        }} onClick={() => setUpdateYunalish({ open: true, obj: dat })}></i>
                        <div className="card cardAccordion mb-0 mt-2 w-100 ml-4">
                          <div className={'d-flex align-items-center justify-content-between pr-2'}>
                            <div className={'d-flex align-items-center pl-2'}>
                              <NumericInput
                                value={dat?.orderNumber}
                                onKeyDown={(e) => changeInputNumber1(e)}
                                onChange={(e) => inputChangeHandler1(e, dat.id)}
                                className="adminSozlamaInput"
                              />
                              <div className="card-header orgname" style={{ height: "40px" }} onClick={() => getTashkilot(dat.id)}>
                                <h6 className="card-title d-flex justify-content-between align-items-center">
                                  <a className="text-body NavLink "
                                    style={{ color: "#0056B8 !important" }}
                                    href={`#1`}>{dat?.name}</a>
                                </h6>
                              </div>
                            </div>
                            <i className="fa-solid fa-trash-can" style={{ cursor: 'pointer', fontSize: '20px' }} onClick={() => deleteTash(dat.id)}></i>
                          </div>
                          <div className="openTash" style={{ display: "none" }}>
                            {tashkilotlar.length > 0 && tashkilotlar.map((tash, index) => (
                              tash?.orgType?.name === dat?.name && (
                                <div key={index}>
                                  <div className="card-body pb-1 py-0">
                                    <div className="card mb-1">
                                      <div
                                        className="card-header d-flex align-items-center">
                                        <NumericInput
                                          value={tash?.orderNumber}
                                          onKeyDown={(e) => changeInputNumber(e, tash.id)}
                                          onChange={(e) => inputChangeHandler(e, tash.id)}
                                          className="adminSozlamaInput"
                                        />
                                        <h6 className="card-title">
                                          <a className="collapsed text-body NavLink ml-2 openInT" data-toggle="collapse"
                                            href={`#vHokimlik${index}`}>{tash.orgName}</a>
                                        </h6>
                                      </div>

                                      <div id={`vHokimlik${index}`}
                                        className="card-body collapse pb-2"
                                        data-parent={`#accordion-default`}>
                                        <div id="accordion-child2">
                                          <div className="card" style={{ marginBottom: "8px" }}>
                                            <div className="card-header bg-dark" onClick={() => getTashBoshTashkilot(tash.id)}>
                                              <h6 className="card-title">
                                                <a data-toggle="collapse"
                                                  className="text-white"
                                                  href={`#bTashkilot${index}`}>Основная 
                                                  организация</a>
                                              </h6>
                                            </div>

                                            <div
                                              id={`bTashkilot${index}`}
                                              className="collapse"
                                              data-parent={`#bTashkilot${index}`}>
                                              <div className="card-body p-2">
                                                <table
                                                  className="table datatable-row-full table-bordered table-striped table-hover Tab"
                                                  id="myTable">
                                                  <thead>
                                                    <tr className="bg-dark text-white NavLink text-center">
                                                      <th style={{ width: "3%" }}>№</th>
                                                      <th style={{ width: "15%" }}>Лого</th>
                                                      <th style={{ width: "20%" }}>Район
                                                      </th>
                                                      <th style={{ width: "25%" }}>Короткое имя
                                                      </th>
                                                      <th style={{ width: "25%" }}>Директор</th>
                                                      <td style={{ width: "8%" }}>Действия</td>
                                                    </tr>
                                                  </thead>
                                                  <tbody
                                                    id="viloyat">
                                                    {boshTashkilotlar.length > 0 && boshTashkilotlar?.map((dat, index) => (
                                                      <tr key={index}
                                                        className="text-center">
                                                        <td>{index + 1}</td>
                                                        {/* userData?.avatar ? `${url}/file/download/${userData?.avatar?.id} */}
                                                        <td>
                                                          <img
                                                            src={dat?.logo ? `${url}/api/file/download/${dat.logo.id}` : "assets/user.png"}
                                                            style={{
                                                              width: "120px",
                                                              height: "120px"
                                                            }}
                                                            alt="" />
                                                        </td>
                                                        <td>{dat?.orgDistrict}</td>
                                                        <td>{dat?.orgShortName}</td>
                                                        <td>{dat?.leaderName}</td>
                                                        <td>
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
                                                              onClick={() => setOpenDeleteModal({ open: true, id: dat.id })}  // deleteId(dat?.id, index)
                                                            >
                                                              <i className="fa-solid fa-trash-can"></i>
                                                            </button>
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    ))}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="card mb-0">
                                            <div className="card-header bg-dark" onClick={() => getTashQuyiTashkilot(tash.id)}>
                                              <h6 className="card-title">
                                                <a className="collapsed text-white" data-toggle="collapse" href={`#qTashkilot${index}`}>Низшие организации</a>
                                              </h6>
                                            </div>
                                            <div id={`qTashkilot${index}`} className="collapse" data-parent={`#qTashkilot${index}`}>
                                              <div className="card-body p-2">
                                                <table className="table datatable-row-full table-bordered table-striped table-hover Tab" id="myTable">
                                                  <thead>
                                                    <tr className="bg-dark text-white NavLink text-center">
                                                      <th style={{ width: "3%" }}>№</th>
                                                      <th style={{ width: "15%" }}>Лого</th>
                                                      <th style={{ width: "20%" }}>Район
                                                        (город)
                                                      </th>
                                                      <th style={{ width: "25%" }}> Короткое
                                                       имя
                                                      </th>
                                                      <th style={{ width: "25%" }}>Директор</th>
                                                      <td style={{ width: "8%" }}>Действия</td>
                                                    </tr>
                                                  </thead>
                                                  <tbody id="viloyat">
                                                    {quyiTashkilotlar.length > 0 && quyiTashkilotlar.map((dat, index) => (
                                                      <tr key={index} className="text-center">
                                                        <td>{index + 1}</td>
                                                        <td>
                                                          <img src={dat?.logo?.id ? `${url}/api/file/download/${dat.logo.id}` : "/assets/user.png"}
                                                            style={{
                                                              width: "120px",
                                                              height: "120px"
                                                            }}
                                                            alt="" />
                                                        </td>
                                                        <td>{dat?.orgDistrict}</td>
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
                                                          </div>
                                                        </td>
                                                      </tr>
                                                    ))}
                                                  </tbody>
                                                </table>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            ))}
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

      {openDeleteModal.open && (
        <DeleteModal
          openDeleteModal={openDeleteModal}
          deleteDataId={deleteDataId}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}

      {updateYunalish.open && (
        <UpdateDirection
          setUpdateYunalish={setUpdateYunalish}
          updateYunalish={updateYunalish}
          currentUser={currentUser}
          yunalishlar={yunalishlar}
          setYunalishlar={setYunalishlar}
          setAlert={setAlert}
        />
      )}

      {/* alert */}
      <AlertContent alert={alert} />
    </div >
  )
}

export default React.memo(TashkilotQushishContent);