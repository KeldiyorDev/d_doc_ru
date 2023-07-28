import React, { useState } from "react";
import NumericInput from 'react-numeric-input';
import ReactPaginate from "react-paginate";
import { ShortUser } from "../../../../../../component/ShortUser";
import { axiosInstance } from "../../../../../../config";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";

const TableData = ({ data, currentUser, setData, setSelected, selected, setSelectBulimlar, selectBulimlar, setAlert }) => {
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [qushimchaUpdate, setQushimchaUpdate] = useState({});
  const [biriktirilganIjrochilar, setBiriktirilganIjrochilar] = useState([]);
  const [lavozimlar, setLavozimlar] = useState([]);
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
        await axiosInstance.patch(`workplace/orderNumber`, {
          orderNumberDtos: arr,
          orgId: JSON.parse(localStorage.getItem('oi'))
        })
        try {
          const res1 = await axiosInstance.get(`workplace?orgId=${JSON.parse(localStorage.getItem('oi'))}&page=` + selected)
          setData(res1.data);
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

  // click paginate
  const handlePageClick = async (e) => {
    setSelected(e.selected);
    try {
      const res = await axiosInstance.get(`workplace?orgId=${JSON.parse(localStorage.getItem('oi'))}&page=` + e.selected)
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  // for update
  const viewUpdateModal = async (dat) => {
    setUpdateModal({ open: true, obj: dat });

    document.querySelector('.tooltip')?.remove();
    // biriktirilgan ijrochilarni o'qib olish
    try {
      const res = await axiosInstance.get("user/users/" + JSON.parse(localStorage.getItem('oi')))
      let arr = [];
      console.log(res.data);
      res.data.forEach((d) => {
        arr.push({
          value: d.id,
          label: ShortUser(d.firstName, d.lastName).toUpperCase()
        });
      })
      setBiriktirilganIjrochilar(arr);
    } catch (error) {
      console.log(error.response);
    }

    // bulim ichidan tanlangan bo'lim bo'yicha id sini topish
    let arr = selectBulimlar.filter((d) => {
      return d.label === dat.departmentName;
    })

    // bo'lim id si orqali lavozimlarni o'qib olish
    try {
      const res = await axiosInstance.get("department/user_position/" + arr[0]?.value)
      let arr1 = [];
      res.data.forEach((d) => {
        arr1.push({ value: d.id, label: d.name });
      })
      setLavozimlar(arr1);
    } catch (error) {
      console.log(error.response);
    }

    // qushimchasi
    try {
      const res = await axiosInstance.get("workplace/" + dat.nextWorkPlaceId)
      setQushimchaUpdate(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  // bushatish
  const bushatish = async (dat) => {
    try {
      const res = await axiosInstance.patch("workplace/removeUser", {
        departmentId: dat.departmentId,
        id: dat.id,
        orgId: JSON.parse(localStorage.getItem('oi'))
      })
      let arr = data.content?.filter((d) => {
        if (d.id === res.data.id) {
          d.id = res.data.id;
          d.departmentName = res.data.departmentName;
          d.departmentId = res.data.departmentId;
          d.nextWorkPlaceId = res.data.nextWorkPlaceId;
          d.isAttached = res.data.isAttached;
          d.orderNumber = res.data.orderNumber;
          d.uniqueCode = res.data.uniqueCode;
          d.user = res.data.user;
          d.userPositions = res.data.userPositions;
          d.userRoles = res.data.userRoles;
        }
        return d;
      })
      setData({ ...data, content: arr });
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
      <table className="table table-bordered table-striped table-hover Tab">
        <thead>
          <tr className="bg-dark text-white NavLink text-center">
            <th style={{ width: "5%" }}>№</th>
            <th style={{ width: "25%" }}>Отделение</th>
            <th style={{ width: "20%" }}>Позиция</th>
            <th style={{ width: "20%" }}>Ф.И.Ш</th>
            <th style={{ width: "10%" }}>РАНК</th>
            <th style={{ width: "10%" }}>Unik-kod</th>
            <th style={{ width: "5%" }}>Уникальный код</th>
            <td style={{ width: "5%" }}>Действия</td>
          </tr>
        </thead>
        <tbody>
          {data.content?.length > 0 && data.content.map((dat) => (
            <tr key={Math.ceil(Math.random() * 10000)}>
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
                {dat?.userPositions?.map((u) => (
                  <span key={Math.ceil(Math.random() * 10000 + data.content?.length)}>{u?.name},&nbsp;</span>
                ))}
              </td>
              <td>{dat?.user?.lastName} {dat?.user?.firstName} {dat?.user?.middleName} </td>
              <td style={{ textAlign: "center" }}>
                {dat?.userRoles?.map((r) => (
                  <span key={Math.ceil(Math.random() * 10000 + data.content?.length + dat?.userRoles?.length)}>{r?.rank},&nbsp;</span>
                ))}
              </td>
              <td style={{ textAlign: "center" }}>{dat?.uniqueCode}</td>
              <td style={{ textAlign: "center" }}>
                {dat?.isAttached ? (
                  <i className="fas fa-check text-success"
                    style={{ fontSize: "22px" }}></i>
                ) : (
                  <i className="icon-cross2 text-danger"
                    style={{ fontSize: "22px" }}></i>
                )}
              </td>
              <td>
                <div className="icon d-flex justify-content-center align-items-center ">
                  <a href="#1" data-toggle="modal" data-target="#uangilash"
                    onClick={() => viewUpdateModal(dat)} className="infoBtn bg-dark"
                    data-bs-toggle="tooltip" data-popup="tooltip"
                    data-bs-placement="top" title="O'zgartirish"><span><i
                      className="icon-pencil5"></i></span> </a>
                  <a href="#1" className="infoBtn bg-dark" data-bs-toggle="tooltip"
                    onClick={() => setDeleteModal({ open: true, obj: dat })}
                    data-popup="tooltip" data-bs-placement="top"
                    title="O'chirish"><span><i className="icon-trash"></i></span>
                  </a>
                  <a href="#1" className="infoBtn bg-dark" data-bs-toggle="tooltip"
                    onClick={() => bushatish(dat)} data-popup="tooltip"
                    data-bs-placement="top" title="Xodimni bo'shatish"><span><i
                      className="icon-minus2"></i></span> </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* pagination */}
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

      {/* update */}
      {updateModal.open && (
        <UpdateModal
          setUpdateModal={setUpdateModal}
          updateModal={updateModal}
          qushimchaUpdate={qushimchaUpdate}
          biriktirilganIjrochilar={biriktirilganIjrochilar}
          lavozimlar={lavozimlar}
          setAlert={setAlert}
          currentUser={currentUser}
          selectBulimlar={selectBulimlar}
          setData={setData}
          selected={selected}
          data={data}
        />
      )}

      {/* o'chirish */}
      {deleteModal.open && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          deleteModal={deleteModal}
          currentUser={currentUser}
          setAlert={setAlert}
          setData={setData}
          data={data}
        />
      )}
    </>
  )
}

export default React.memo(TableData);