import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FuqaroElektronKitobNavbar from "../../adminFuqaroElektronKitobNavbar/AdminFuqaroElektronKitobNavbar";
import { axiosInstanceFq } from "../../../../../config";
import ReactPaginate from "react-paginate";

const FuqaroArxivContent = ({ currentUser }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);

  // barcha malumotlarni o'qib olish
  useEffect(() => {
    let isMounted = true;

    // tooltipni o'chirish
    document.querySelector('.tooltip')?.remove();

    const getData = async () => {
      try {
        const res = await axiosInstanceFq.get(`journal/archiveds/${JSON.parse(localStorage.getItem('oi'))}?page=0`)
        if (isMounted)
          setData(res.data)
      } catch (error) {
        console.log(error.response)
      }
    }
    getData()

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  const handlePageClick = (e) => {
    setSelected(e.selected);
  }

  return (
    <div className="content">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Arxiv</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <FuqaroElektronKitobNavbar />
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
                <table className="table table-bordered  table-striped table-hover Tab">
                  <thead>
                    <tr className="bg-dark text-white NavLink text-center">
                      <th style={{ width: "5%" }}>№</th>
                      <th style={{ width: "25%" }}>Jurnal turi/nomi</th>
                      <th style={{ width: "25%" }}>Qisqacha tasnifi</th>
                      <th style={{ width: "10%" }}>Jurnal Prefiksi</th>
                      <th style={{ width: "10%" }}>Jurnal Postfiksi</th>
                      <th style={{ width: "10%" }}>Boshlang'ich Raqam</th>
                      <th style={{ width: "15%" }}>Xarakatlar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.content?.length > 0 && data.content.map((dat) => (
                      <tr style={{ fontSize: "15px" }} className="text-center">
                        <td>{dat?.orderNumber}</td>
                        <td className="text-center">
                          <span className="badge badge-primary">{dat?.module}</span>
                          <hr />
                          <p>{dat?.uzName}</p>
                        </td>
                        <td>{dat?.shortDescription}</td>
                        <td>{dat?.journalPrefix}</td>
                        <td>{dat?.journalPostfix}</td>
                        <td>{dat?.beginNumber}</td>
                        <td>
                          <div className="icon d-flex justify-content-center align-items-center">
                            <Link to={`/fuqaro/murojat/elektron-kitob-arxiv-ko'rish/${dat?.id}`}
                              className="infoBtn bg-dark" data-bs-toggle="tooltip"
                              data-popup="tooltip" data-bs-placement="top" title="Ko'rish">
                              <span><i className="icon-eye2"></i></span>
                            </Link>
                            {/*<Link to={`/fuqaro/murojat/elektron-kitob-topshiriqlar/${dat?.id}`} className="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="Log">*/}
                            {/*    <span><i className="icon-stack2" ></i></span>*/}
                            {/*</Link>*/}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(FuqaroArxivContent)