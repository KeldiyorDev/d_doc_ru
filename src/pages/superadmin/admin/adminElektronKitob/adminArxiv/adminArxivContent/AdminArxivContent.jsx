import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import AdminElektronKitobNavbar from "../../adminElektronKitobNavbar/AdminElektronKitobNavbar";
import { axiosInstance } from "../../../../../../config";

const AdminArxivContent = ({ currentUser }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);

  // barcha malumotlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get(`journal/archiveds/${JSON.parse(localStorage.getItem('oi'))}?page=` + selected)
        if (isMounted)
          setData(res.data);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, selected]);

  // pagination
  const handlePageClick = async (e) => {
    try {
      const res = await axiosInstance.get("journal/archiveds/?page=" + e.selected)
      setData(res.data);
    } catch (error) {
      console.log(error?.response);
    }
    setSelected(e.selected);
  }

  return (
    <div className="content">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Архив</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <AdminElektronKitobNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <table className="table table-bordered  table-striped table-hover Tab mb-1" >
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "25%" }}>Тип/название журнала</th>
                      <th style={{ width: "25%" }}>Краткая классификация</th>
                      <th style={{ width: "10%" }}>Префикс журнала</th>
                      <th style={{ width: "10%" }}>Журнал Постфикс</th>
                      <th style={{ width: "10%" }}>Начальный номер</th>
                      <th style={{ width: "15%" }}>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.content?.length > 0 && data.content?.map((dat, index) => (
                      <tr key={index} style={{ fontSize: "15px" }} className="text-center">
                        <td>{dat?.id}</td>
                        <td className="text-center">
                          <span className="badge badge-primary">{dat?.card?.cardName}</span>
                          <hr />
                          <p>{dat?.uzName}</p>
                        </td>
                        <td>{dat?.shortDescription}</td>
                        <td>{dat?.journalPrefix}</td>
                        <td>{dat?.journalPostfix}</td>
                        <td>{dat?.beginNumber}</td>
                        <td>
                          <div className="icon d-flex justify-content-center align-items-center">
                            <Link to={`/super_admin_elektron-kitob-arxiv-ko'rish/${dat?.id}`} className="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="Вид">
                              <span><i className="icon-eye2"></i></span>
                            </Link>
                            <Link to={`/super_admin_elektron-kitob-topshiriqlar/${dat?.id}`} className="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="Лог">
                              <span><i className="icon-stack2" ></i></span>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* pagination */}
                {data.content?.length > 0 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={Math.ceil(data.totalElements / 10)}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    className="paginationUL"
                    activeClassName="active"
                  // forcePage={selected}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AdminArxivContent);