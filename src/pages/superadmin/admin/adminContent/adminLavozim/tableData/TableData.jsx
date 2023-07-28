import React, { useState } from "react";
import NumericInput from 'react-numeric-input';
import { axiosInstance } from "../../../../../../config";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import ReactPaginate from "react-paginate";

const TableData = ({ data, currentUser, setData, setAlert, selectBulimlar }) => {
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [selected, setSelected] = useState(0);
  let sortInput = [];

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
        await axiosInstance.patch(`user_position/orderNumber`, {
          orderNumberDtos: arr
        })
        try {
          const res1 = await axiosInstance.get("user_position/" + JSON.parse(localStorage.getItem('oi')) + "?page=" + selected)
          setData(res1?.data);
        } catch (error) {
          console.log(error?.response);
        }
      } catch (error) {
        console.log(error?.response);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    sortInput.push({ id: id, orderNumber: e });
  }

  const handlePageClick = async (e) => {
    try {
      const res = await axiosInstance.get("user_position/" + JSON.parse(localStorage.getItem('oi')) + "?page=" + e.selected)
      setData(res?.data);
    } catch (error) {
      console.log(error?.response);
    }
    setSelected(e.selected);
  }

  return (
    <>
      <table className="table table-bordered table-striped table-hover Tab table-responsive table-toggleable" data-breakpoints="xs sm md">
        <thead>
          <tr className="bg-dark text-white NavLink text-center">
            <th style={{ width: "5%" }}>№</th>
            <th style={{ width: "30%" }}>Прикрепленный раздел</th>
            <th style={{ width: "30%" }}>Позиция</th>
            <th style={{ width: "25%" }}> Ф.И.Ш</th>
            <th style={{ width: "5%" }}>Рол</th>
            <th style={{ width: "5%" }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data?.content?.length > 0 && data?.content?.map((dat, index) => (
            <tr key={index} className="text-left">
              <td style={{ textAlign: "center" }}>
                <NumericInput
                  value={dat?.orderNumber}
                  onKeyDown={(e) => changeInputNumber(e, dat.id)}
                  onChange={(e) => inputChangeHandler(e, dat.id)}
                  className="adminSozlamaInput"
                />
              </td>
              <td>{dat?.departmentName}</td>
              <td>{dat?.name}</td>
              <td>{dat?.firstName} {dat?.lastName} {dat?.middleName}</td>
              <td style={{ textAlign: "center" }}>
                {dat?.roles?.length > 0 && dat?.roles?.map((d, i) => (
                  <span key={Math.random * 10000 + data.content?.length}>{d?.rank}</span>
                ))}
              </td>
              <td>
                <div
                  className="icon d-flex justify-content-center align-items-center ">
                  <a href="#1" className="infoBtn bg-dark"
                    data-bs-toggle="tooltip"
                    onClick={() => setUpdateModal({ open: true, obj: dat })} data-popup="tooltip"
                    data-bs-placement="top" title="O'zgartirish"><span><i
                      className="icon-pencil5"></i></span> </a>
                  <a href="#1" className="infoBtn bg-dark"
                    data-bs-toggle="tooltip"
                    onClick={() => setDeleteModal({ open: true, obj: dat })}
                    data-popup="tooltip" data-bs-placement="top"
                    title="O'chirish"><span><i
                      className="icon-trash"></i></span> </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* paginate */}
      <ReactPaginate
        previousLabel="<<"
        nextLabel=">>"
        pageCount={data?.totalElements / 20}
        breakLabel="..."
        className="paginate"
        activeClassName="active"
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
      // forcePage={selected}
      />

      {/* delete modal */}
      {deleteModal?.open && (
        <DeleteModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          currentUser={currentUser}
          setAlert={setAlert}
          setData={setData}
          data={data}
        />
      )}

      {/* update modal */}
      {updateModal?.open && (
        <UpdateModal
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          currentUser={currentUser}
          setAlert={setAlert}
          setData={setData}
          data={data}
          selectBulimlar={selectBulimlar}
          selected={selected}
        />
      )}
    </>
  )
}

export default React.memo(TableData);