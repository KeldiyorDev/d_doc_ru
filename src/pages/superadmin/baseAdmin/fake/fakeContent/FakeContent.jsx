import React, { useEffect, useState } from 'react';
import { axiosInstance, url } from "../../../../../config";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import AlertContent from '../../../../../component/alert/Alert';
import DeleteData from './DeleteData';

function FakeContent({ currentUser }) {
  const [yunalishQidirishHajmi, setYunalishQidirishHajmi] = useState([]);
  const [selected, setSelected] = useState(0);
  const [openTable, setOpenTable] = useState(false);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [size, setSize] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState({ open: false, id: null });

  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.post("organization/fake", {
          page: 0
        })
        if (useEffectCount) {
          setYunalishQidirishHajmi(res.data)
          setOpenTable(true);
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
    getData();

    return () => {
      useEffectCount = false;
    }
  }, [size, currentUser])

  const handlePageClick = async (e) => {
    setSelected(e.selected)
    try {
      const res = await axiosInstance.post(`organization/fake`, {
        page: e.selected,
      })
      setOpenTable(true)
      setYunalishQidirishHajmi(res.data)
    } catch (error) {
      console.log(error.response);
    }
  }

  const deleteId = (id) => {
    setOpenDeleteModal({ open: true, id: id })
    document.querySelector('.openInT').click()
  }

  return (
    <div className="content" style={{marginBottom: "80px"}}>
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Ложь</h3>
      <div className="card-body p-0">
        <div className="card-body p-0">
          <div>
            {yunalishQidirishHajmi?.content?.length > 0 && openTable && (
              <table className="table datatable-row-full table-bordered table-striped table-hover Tab" id="myTable">
                <thead>
                  <tr className="bg-dark text-white NavLink text-center">
                    <th style={{ width: "3%" }}>№</th>
                    <th style={{ width: "15%" }}>Лого</th>
                    <th style={{ width: "20%" }}>Район 
                    (город)
                    </th>
                    <th style={{ width: "25%" }}>Название
                     организации
                    </th>
                    <th style={{ width: "25%" }}>Директор</th>
                    <td style={{ width: "8%" }}>Действия</td>
                  </tr>
                </thead>
                <tbody
                  id="viloyat">
                  {yunalishQidirishHajmi?.content?.map((dat, index) => (
                    <tr key={index}
                      className={`text-center`}>
                      <td>{index + 1 + selected * 20}</td>
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
                      <td>{dat?.orgName}</td>
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
                            <span><i className="icon-eye2"></i></span>
                          </Link>
                          <button type="button" className="infoBtn bg-dark" onClick={() => deleteId(dat?.id)}> <i className="fa-solid fa-trash-can"></i></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* delete modal */}
            {openDeleteModal.open && (
              <DeleteData
                setOpenDeleteModal={setOpenDeleteModal}
                setAlert={setAlert}
                currentUser={currentUser}
                openDeleteModal={openDeleteModal}
                setSize={setSize}
              />
            )}

            {yunalishQidirishHajmi?.content?.length > 0 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={yunalishQidirishHajmi?.totalElements / 20}
                previousLabel="<<"
                renderOnZeroPageCount={null}
                className="paginationUL mt-2"
                activeClassName="active"
                forcePage={selected}
              />
            )}
          </div>
        </div>

        {/* alert */}
        <AlertContent alert={alert} />
      </div>
    </div>
  );
}

export default FakeContent;