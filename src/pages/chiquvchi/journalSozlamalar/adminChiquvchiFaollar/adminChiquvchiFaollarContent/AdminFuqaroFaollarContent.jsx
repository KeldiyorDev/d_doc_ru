import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NumericInput from 'react-numeric-input';
import { axiosInstanceOut } from "../../../../../config";
import AlertContent from "../../../../../component/alert/Alert";
import ReactPaginate from "react-paginate";
import DeleteModal from "./deleteModal/DeleteModal";
import UpdateModal from "./updateModal/UpdateModal";
import ChiquvchiElektronKitobNavbar from "../../adminChiquvchiElektronKitobNavbar/AdminChiquvchiElektronKitobNavbar";

const ChiquvchiFaollarContent = ({ currentUser }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  let sortInput = [];

  // barcha hujjat turlarini o'qib olish
  useEffect(() => {
    let isMounted = true;

    // tooltipni o'chirish
    document.querySelector('.tooltip')?.remove();

    const getData = async () => {
      try {
        const res = await axiosInstanceOut.get(`journal/active/${JSON.parse(localStorage.getItem('oi'))}?page=0`)

        if (isMounted)
          setData(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  const changeInputNumber = async (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      try {
        await axiosInstanceOut.patch(`journal/orderNumber`, {
          orders: sortInput
        })
        try {
          const res = await axiosInstanceOut.get(`journal/active/${JSON.parse(localStorage.getItem('oi'))}?page=${selected}`)
          setData(res.data);
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    if (sortInput.find((d) => d.id === id)) {
      if (e) {
        sortInput = sortInput.filter((d) => {
          if (d.id === id) {
            d.id = id;
            d.order = e;
          }
          return d;
        })
      }
    } else {
      sortInput.push({ id: id, order: e });
    }
  }

  // pagination click
  const handlePageClick = async (e) => {
    const res = await axiosInstanceOut.get(`journal/active/${JSON.parse(localStorage.getItem('oi'))}?page=${e.selected}`)
    setData(res.data);
    setSelected(e.selected);
  };

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Активный</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink"
          style={{ borderTopRightRadius: "5px", borderTopLeftRadius: "5px" }}>
          <ChiquvchiElektronKitobNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                {data?.content?.length > 0 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={Math.ceil(data?.totalElements / 20)}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    className="paginationUL"
                    activeClassName="active"
                    forcePage={selected}
                  />
                )}
                <table className="table table-bordered table-striped table-hover Tab my-2">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "25%" }}>Тип/название журнала</th>
                      <th style={{ width: "25%" }}>Краткая классификация</th>
                      <th style={{ width: "10%" }}>Префикс журнала</th>
                      <th style={{ width: "10%" }}>Постфикс журнала</th>
                      <th style={{ width: "10%" }}>Стартовый номер</th>
                      <th style={{ width: "15%" }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.content?.length > 0 && data.content.map((dat, index) => (
                      <tr key={index} style={{ fontSize: "15px" }} className="text-center" id="delete">
                        <td style={{ textAlign: "center" }}>
                          <NumericInput
                            value={dat.orderNumber}
                            onKeyDown={(e) => changeInputNumber(e, dat.id)}
                            onChange={(e) => inputChangeHandler(e, dat.id)}
                            className="adminSozlamaInput"
                          />
                        </td>
                        <td className="text-center">
                          <span className="badge badge-primary">{dat?.module}</span>
                          <hr />
                          <p>{dat?.uzName}</p>
                        </td>
                        <td className="text-left">{dat?.shortDescription}</td>
                        <td>{dat?.journalPrefix}</td>
                        <td>{dat?.journalPostfix}</td>
                        <td>{dat?.beginNumber}</td>
                        <td>
                          <div
                            className="icon d-flex justify-content-center align-items-center">
                            <Link to={`/chiquvchi/elektron-kitob-ko'rish/${dat.id}`}
                              className="infoBtn bg-dark" data-bs-toggle="tooltip"
                              data-popup="tooltip" data-bs-placement="top"
                              title="Ko'rish">
                              <span><i className="icon-eye2"></i></span>
                            </Link>
                            <Link to={`/chiquvchi/elektron-kitob-topshiriqlar/${dat.id}`} className="infoBtn bg-dark" data-popup="tooltip" title="Log">
                              <span><i className="icon-stack2" ></i></span>
                            </Link>
                            <a href="#1"
                              onClick={() => setUpdateModal({ open: true, obj: dat })}
                              className="infoBtn bg-dark" data-bs-toggle="tooltip"
                              data-popup="tooltip" data-bs-placement="top"
                              title="O'zgartirish">
                              <span><i className="icon-pencil5"></i></span>
                            </a>
                            <a href="#1" type="button" className="infoBtn bg-dark"
                              data-bs-toggle="tooltip"
                              onClick={() => setDeleteModal({ open: true, obj: dat })}
                              data-popup="tooltip" data-bs-placement="top"
                              title="O'chirish"><span><i className="icon-trash"></i></span>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {data?.content?.length > 0 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={Math.ceil(data?.totalElements / 20)}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    className="paginationUL"
                    activeClassName="active"
                    forcePage={selected}
                  />
                )}

                {/* delete */}
                <DeleteModal
                  currentUser={currentUser}
                  deleteModal={deleteModal}
                  setDeleteModal={setDeleteModal}
                  setAlert={setAlert}
                  data={data}
                  setData={setData}
                />

                {/* update */}
                <UpdateModal
                  setAlert={setAlert}
                  setUpdateModal={setUpdateModal}
                  updateModal={updateModal}
                  currentUser={currentUser}
                  data={data}
                  setData={setData}
                />

                {/* alert content */}
                <AlertContent alert={alert} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(ChiquvchiFaollarContent)