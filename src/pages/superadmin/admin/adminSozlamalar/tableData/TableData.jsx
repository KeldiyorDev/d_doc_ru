import React, { useState } from "react";
import NumericInput from 'react-numeric-input';
import { axiosInstance } from "../../../../../config";
import DeleteModal from "./deleteModal/DeleteModal";
import UpdateModal from "./updateModal/UpdateModal";

const TableData = ({ data, currentUser, setData, allBulimSelect, setAllBulimSelect, setAlert }) => {
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
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
        await axiosInstance.patch(`department/orderNumber`, {
          orderNumberDtos: arr,
          orgId: JSON.parse(localStorage.getItem('oi'))
        })
        axiosInstance.get('department/all/' + JSON.parse(localStorage.getItem('oi')))
          .then(res => {
            setData(res.data);
          })
          .catch(err => {
            console.log(err.response);
          })
      } catch (error) {
        console.log(error?.response);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    sortInput.push({ id: id, orderNumber: e });
  }

  return (
    <>
      <table className="table mt-2 table-bordered table-striped table-hover Tab">
        <thead>
          <tr className="bg-dark text-white NavLink text-center">
            <th style={{ width: "5%" }}>№</th>
            <th style={{ width: "30%" }}>Именование</th>
            <th style={{ width: "30%" }}>Главная категория</th>
            <th style={{ width: "25%" }}>Переводы</th>
            <th style={{ width: "5%" }}>Сотрудники</th>
            <th style={{ width: "5%" }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 && data.map((dat, index) => (
            <tr key={index} className="text-left">
              <td style={{ textAlign: "center" }}>
                <NumericInput
                  value={dat?.orderNumber}
                  onKeyDown={(e) => changeInputNumber(e, dat.id)}
                  onChange={(e) => inputChangeHandler(e, dat.id)}
                  className="adminSozlamaInput"
                />
              </td>
              <td>{dat?.uzName}</td>
              <td>{dat?.upperDepartmentName}</td>
              <td>{dat?.ruName}</td>
              <td style={{ textAlign: "center" }}>{dat?.employeeCount}</td>
              <td className=''>
                <div className='d-flex justify-content-center'>
                  <span className="infoBtn bg-dark cursor-pointer"
                    onClick={() => setUpdateModal({ open: true, obj: dat })}
                    data-bs-toggle="tooltip" data-popup="tooltip"
                    data-bs-placement="top" title="Изменять"><i
                      className="icon-pencil5"></i> </span>
                  <span className="infoBtn bg-dark cursor-pointer"
                    onClick={() => setDeleteModal({ open: true, obj: dat })}
                    data-bs-toggle="tooltip" data-popup="tooltip"
                    data-bs-placement="top" title="Выключать"><i
                      className="icon-trash"></i> </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* <!-- update --> */}
      {updateModal.open && (
        <UpdateModal
          setUpdateModal={setUpdateModal}
          updateModal={updateModal}
          allBulimSelect={allBulimSelect}
          setAlert={setAlert}
          currentUser={currentUser}
          data={data}
          setData={setData}
        />
      )}

      {/* delete */}
      {deleteModal.open && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          deleteModal={deleteModal}
          setAlert={setAlert}
          currentUser={currentUser}
          data={data}
          setData={setData}
        />
      )}
    </>
  )
}

export default React.memo(TableData);