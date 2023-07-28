import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import NumericInput from 'react-numeric-input';
import { axiosInstance } from "../../../../../../config";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const TableData = ({ data, currentUser, setData, name, setAlert }) => {
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [selected, setSelected] = useState(0);
  let sortInput = [];

  console.log(data);

  const changeInputNumber = async (e, id) => {
    if (e.code === "Enter") {
      let result = sortInput.sort((a, b) => a.id - b.id);
      let arr = [];
      for (let i = 1; i < result.length; i++) {
        if (!(result[i - 1].id === result[i].id)) {
          arr.push(result[i - 1]);
        }
      }
      arr.push(result[result.length - 1]);
      try {
        await axiosInstance.patch(`user/orderNumber`, {
          orderNumberDtos: arr,
          orgId: JSON.parse(localStorage.getItem('oi'))
        })
        try {
          const res = await axiosInstance.post("user/searchByName", {
            name: "",
            page: selected,
            orgId: JSON.parse(localStorage.getItem('oi'))
          })
          setData(res.data);
        } catch (error) {
          console.log(error.response);
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    sortInput.push({ id: id, orderNumber: e });
  }

  // pagination
  const handlePageClick = async (e) => {
    try {
      const res = await axiosInstance.post("user/searchByName", {
        name: name,
        page: e.selected,
        orgId: JSON.parse(localStorage.getItem('oi'))
      })
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
    setSelected(e.selected);
  }

  console.log(data);
  return (
    <>
      <table className="table mt-2 table-bordered table-striped table-hover Tab">
        <thead>
          <tr className="bg-dark text-white NavLink text-center">
            <th style={{ width: "5%" }}>№</th>
            <th style={{ width: "25%" }}>Отделение</th>
            <th style={{ width: "15%" }}>Позиция</th>
            <th style={{ width: "15%" }}>Ф.И.Ш</th>
            <th style={{ width: "15%" }}>Телефон</th>
            <th style={{ width: "10%" }}>E-mail</th>
            <th style={{ width: "10%" }}>ПНФЛ</th>
            <th style={{ width: "5%" }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.content?.length > 0 && data.content.map((dat) => (
            <tr key={Math.random() * 10000}>
              <td style={{ textAlign: "center" }}>
                <NumericInput
                  value={dat.orderNumber}
                  onKeyDown={(e) => changeInputNumber(e, dat.id)}
                  onChange={(e) => inputChangeHandler(e, dat.id)}
                  className="adminSozlamaInput"
                />
              </td>
              <td>{dat?.departmentName}</td>
              <td>
                {dat?.userPositionNames?.length > 0 && dat?.userPositionNames?.map((d) => (
                  <span key={Math.random() * 10000 + data.content?.length}>{d}</span>
                ))}
              </td>
              <td>{dat?.firstName} {dat?.lastName} {dat?.middleName}</td>
              <td style={{ textAlign: "center" }}>{dat?.mobileNumber}</td>
              <td style={{ textAlign: "center" }}>{dat?.email}</td>
              <td style={{ textAlign: "center" }}>{dat?.pnfl}</td>
              <td>
                <div
                  className="icon d-flex justify-content-center align-items-center ">
                  <a href="#1" className="infoBtn bg-dark"
                    data-bs-toggle="tooltip" data-popup="tooltip"
                    data-bs-placement="top" title="E-imzo"><span><i
                      className="icon-key"></i></span> </a>
                  <a href="#1" onClick={() => setUpdateModal({ open: true, obj: dat })}
                    className="infoBtn bg-dark" data-bs-toggle="tooltip"
                    data-popup="tooltip" data-bs-placement="top"
                    title="O'zgartirish"><span><i
                      className="icon-pencil5"></i></span> </a>
                  <a href="#1" className="infoBtn bg-dark"
                    onClick={() => setDeleteModal({ open: true, obj: dat })}
                    data-bs-toggle="tooltip" data-popup="tooltip"
                    data-bs-placement="top" title="O'chirish"><span><i
                      className="icon-trash"></i></span> </a>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel="<<"
        nextLabel=">>"
        pageCount={Math.ceil(data?.totalElements / 20)}
        breakLabel="..."
        className="paginate"
        activeClassName="active"
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
      // forcePage={selected}
      />

      {/* update modal */}
      {updateModal.open && (
        <UpdateModal
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          setAlert={setAlert}
          currentUser={currentUser}
          setData={setData}
          selected={selected}
        />
      )}

      {/* delete modal */}
      {deleteModal.open && (
        <DeleteModal
          data={data}
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          setAlert={setAlert}
          currentUser={currentUser}
          setData={setData}
          selected={selected}
        />
      )}
    </>
  )
}

export default React.memo(TableData);