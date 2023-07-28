import React from "react";
import { Link } from "react-router-dom";
import NumericInput from 'react-numeric-input';
import { axiosInstance } from "../../../../../../config";

const TableContent = ({ data, currentUser, setData, setUpdateModal, setDeleteModal, selected }) => {
  let sortInput = [];

  const changeInputNumber = async (e) => {
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
        await axiosInstance.patch(`journal/orderNumber`, {
          orderNumberDtos: arr
        })
        try {
          const res = await axiosInstance.get(`journal/active/${JSON.parse(localStorage.getItem('oi'))}?page=` + selected)
          setData(res.data);
        } catch (error) {
          console.log(error.response);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const inputChangeHandler = (e, id) => {
    sortInput.push({ id: id, orderNumber: e });
  }

  return (
    <table className="table table-bordered table-striped table-hover Tab mb-2" >
      <thead>
        <tr className="bg-dark text-white NavLink text-center">
          <th style={{ width: "5%" }}>№</th>
          <th style={{ width: "25%" }}>Название журнала</th>
          <th style={{ width: "25%" }}>Краткая классификация</th>
          <th style={{ width: "10%" }}>Префикс журнала</th>
          <th style={{ width: "10%" }}>Начальный номер</th>
          <th style={{ width: "10%" }}>Журнал Постфикс</th>
          <th style={{ width: "15%" }}>Действия</th>
        </tr>
      </thead>
      <tbody>
        {data.content?.length > 0 && data.content.map((dat, index) => (
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
              {/* <span className="badge badge-primary">{dat?.generalModule?.name}</span>
              <hr /> */}
              <p>{dat?.uzName}</p>
            </td>
            <td className="text-left">{dat?.shortDescription}</td>
            <td>{dat?.journalPrefix}</td>
            <td>{dat?.beginNumber}</td>
            <td>{dat?.journalPostfix}</td>
            <td>
              <div className="icon d-flex justify-content-center align-items-center">
                <Link to={`/super_admin_elektron-kitob-ko'rish/${dat.id}`} className="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="Видеть">
                  <span><i className="icon-eye2"></i></span>
                </Link>
                <Link to={`/super_admin_elektron-kitob-topshiriqlar/${dat.id}`} className="infoBtn bg-dark" data-popup="tooltip" title="Log">
                  <span><i className="icon-stack2" ></i></span>
                </Link>
                <a href="#1" onClick={() => setUpdateModal({ open: true, obj: dat })} className="infoBtn bg-dark" data-bs-toggle="tooltip" data-popup="tooltip" data-bs-placement="top" title="Изменять">
                  <span><i className="icon-pencil5"></i></span>
                </a>
                <a href="#1" type="button" className="infoBtn bg-dark" data-bs-toggle="tooltip" onClick={() => setDeleteModal({ open: true, obj: dat })} data-popup="tooltip" data-bs-placement="top" title="Выключать"><span><i className="icon-trash"></i></span> </a>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default React.memo(TableContent);