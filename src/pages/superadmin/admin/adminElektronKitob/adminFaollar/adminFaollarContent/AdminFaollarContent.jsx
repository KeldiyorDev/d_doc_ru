import React, { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
import { axiosInstance } from "../../../../../../config";
import AdminElektronKitobNavbar from "../../adminElektronKitobNavbar/AdminElektronKitobNavbar";
import AlertContent from "../../../../../../component/alert/Alert";
import DeleteModal from "../deleteModal/DeleteModal";
import UpdateModal from "../updateModal/UpdateModal";
import TableContent from "../tableContent/TableContent";

const AdminFaollarContent = ({ currentUser }) => {
  const [data, setData] = useState({});
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [deleteModal, setDeleteModal] = useState({ open: false, obj: {} });
  const [updateModal, setUpdateModal] = useState({ open: false, obj: {} });
  const [selected, setSelected] = useState(0);

  // barcha malumotlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("journal/active/" + JSON.parse(localStorage.getItem('oi')))

        if (isMounted)
          setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  const handlePageClick = async (e) => {
    try {
      const res = await axiosInstance.get(`journal/active/${JSON.parse(localStorage.getItem('oi'))}?page=${e.selected}`)
      setData(res.data);
      setSelected(e.selected);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Активный</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <AdminElektronKitobNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                <TableContent
                  data={data}
                  currentUser={currentUser}
                  setData={setData}
                  setUpdateModal={setUpdateModal}
                  setDeleteModal={setDeleteModal}
                  selected={selected}
                />

                {/* delete modal */}
                {deleteModal.open && (
                  <DeleteModal
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                    currentUser={currentUser}
                    data={data}
                    setData={setData}
                    setAlert={setAlert}
                  />
                )}

                {/* update modal */}
                {updateModal.open && (
                  <UpdateModal
                    updateModal={updateModal}
                    setUpdateModal={setUpdateModal}
                    currentUser={currentUser}
                    data={data}
                    setData={setData}
                    setAlert={setAlert}
                  />
                )}

                {/* pagination */}
                {data.content?.length > 0 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={Math.ceil(data.totalElements / 20)}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                    className="paginationUL mb-0"
                    activeClassName="active"
                  // forcePage={selected}
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* alert content */}
        <AlertContent alert={alert} />
      </div>
    </div>
  )
}

export default React.memo(AdminFaollarContent);