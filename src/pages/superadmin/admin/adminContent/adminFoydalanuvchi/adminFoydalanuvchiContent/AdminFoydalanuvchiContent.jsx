import React, { useEffect, useState } from "react";
import './adminFoydalanuvchiContent.css';
import { axiosInstance } from "../../../../../../config";
import AdminContentNavbar from "../../adminContentNavbar/AdminContentNavbar";
import AlertContent from '../../../../../../component/alert/Alert';
import AddUser from "../addUser/AddUser";
import TableData from "../tableData/TableData";

const AdminFoydalanuvchiContent = ({ currentUser }) => {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });

  // barcha malumotlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.post("user/searchByName", {
          name: "",
          page: 0,
          orgId: JSON.parse(localStorage.getItem('oi'))
        })

        if (isMounted)
          setData(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Пользователь</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <AdminContentNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                {/* add user */}
                <AddUser
                  currentUser={currentUser}
                  setAlert={setAlert}
                  setData={setData}
                  data={data}
                  setName={setName}
                />

                {/* table data */}
                <TableData
                  data={data}
                  setData={setData}
                  currentUser={currentUser}
                  name={name}
                  setAlert={setAlert}
                />

                {/* alert */}
                <AlertContent alert={alert} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AdminFoydalanuvchiContent);