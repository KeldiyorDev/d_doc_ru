import React, { useEffect, useState } from 'react';
import { axiosInstance } from "../../../../../config";
import ReactPaginate from "react-paginate";
import AlertContent, { Alert } from '../../../../../component/alert/Alert';
import DeleteData from './DeleteData';

const OrgContent = ({ currentUser }) => {
  const [yunalishQidirishHajmi, setYunalishQidirishHajmi] = useState([]);
  const [selected, setSelected] = useState(0);
  const [sizeEl, setSizeEl] = useState(0);
  const [openTable, setOpenTable] = useState(false);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [size, setSize] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState({ open: false, id: null });

  useEffect(() => {
    let useEffectCount = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.post("organization/adminstrators", {
          page: 0
        })

        if (useEffectCount) {
          setSizeEl(res.data.totalElements)
          setYunalishQidirishHajmi(res.data.content)
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

  // pagenition
  const handlePageClick = async (e) => {
    setSelected(e.selected)
    try {
      const res = await axiosInstance.post(`organization/adminstrators`, {
        page: e.selected,
      })
      setOpenTable(true)
      setSizeEl(res.data.totalElements)
      setYunalishQidirishHajmi(res.data.content)
    } catch (error) {
      console.log(error.response);
    }
  }

  const refOrg = async (dat) => {
    try {
      const res = await axiosInstance.post(`user/synRole`, {
        id: dat.id,
        organizationId: dat.organizationId
      })
      try {
        const res = await axiosInstance.post("organization/adminstrators", {
          page: 0
        })
        setSizeEl(res.data.totalElements)
        setYunalishQidirishHajmi(res.data.content)
        setOpenTable(true);
      } catch (error) {
        console.log(error?.response);
      }

      Alert(setAlert, "success", `${res.data}`)
    } catch (error) {
      console.log(error.response);
      Alert(setAlert, "warning", `${error.response.data}`)
    }
  }

  //o'chirish
  const deleteIds = (dat) => {
    setOpenDeleteModal({ open: true, id: dat })
    document.querySelector('.openInT')?.click()
  }

  return (
    <div className="content" style={{ marginBottom: "80px" }}>
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Администраторы</h3>
      <div className="card-body p-0">
        <div className="card-body p-0" >
          <div>
            {(yunalishQidirishHajmi.length > 0 && openTable) && (
              <table className="table datatable-row-full table-bordered table-striped table-hover Tab" id="myTable">
                <thead>
                  <tr className="bg-dark text-white NavLink text-center">
                    <th style={{ width: "3%" }}>№</th>
                    <th style={{ width: "15%" }}>Фамилия</th>
                    <th style={{ width: "15%" }}>Имя</th>
                    <th style={{ width: "15%" }}>Паспорт серия</th>
                    <th style={{ width: "25%" }}>Название организации</th>
                    <th style={{ width: "15%" }}>СТИР</th>
                    <th style={{ width: "8%" }}>Действия</th>
                  </tr>
                </thead>
                <tbody
                  id="viloyat">
                  {yunalishQidirishHajmi.map((dat, index) => (
                    <tr key={index}
                      className={`text-center`}>
                      <td>{index + 1 + selected * 20}</td>
                      <td>{dat?.lastName}</td>
                      <td>{dat?.firstName}</td>
                      <td>{dat?.passportSerialNumber}</td>
                      <td>{dat?.orgName}</td>
                      <td>{dat?.stir}</td>
                      <td>
                        <div
                          className="icon d-flex justify-content-center align-items-center">
                          {dat?.userRoles.map((role) => (
                            role.orgId === null ? (
                              <span style={{ cursor: 'pointer' }}
                                onClick={() => refOrg(dat)}
                                className={'infoBtn bg-dark'}><i
                                  className="fa-solid fa-arrows-rotate"></i></span>
                            ) : ''
                          ))}
                          <button type="button" className="infoBtn bg-dark"
                            onClick={() => deleteIds(dat)}><i
                              className="fa-solid fa-trash-can"></i></button>

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
                openDeleteModal={openDeleteModal}
                currentUser={currentUser}
                setAlert={setAlert}
                setYunalishQidirishHajmi={setYunalishQidirishHajmi}
                yunalishQidirishHajmi={yunalishQidirishHajmi}
                setSize={setSize}
              />
            )}

            {/* {openDeleteModal && <div id="modal_mini" className="adminWindow mt-5" tabIndex="-1">
              <div className="modal-dialog modal-sm">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title text-danger">O'chirmoqchimisiz?</h5>
                    <button type="button" className="close" data-dismiss="modal"
                      onClick={() => setOpenDeleteModal(false)}>&times;</button>
                  </div>

                  <div className="modal-body">

                  </div>

                  <div className="modal-footer">
                    <button type="button" className="btn btn-link" data-dismiss="modal"
                      onClick={() => setOpenDeleteModal(false)}>Bekor qilish
                    </button>
                    <button type="button" className="btn btn-primary"
                      onClick={() => deleteDataId()}>O'chirish
                    </button>
                  </div>
                </div>
              </div>
            </div>
            } */}
            {yunalishQidirishHajmi.length > 0 && (
              <ReactPaginate
                breakLabel="..."
                nextLabel=">>"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={sizeEl / 20}
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

export default React.memo(OrgContent);