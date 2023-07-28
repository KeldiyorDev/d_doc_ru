import React, { useEffect, useState } from "react";
import AdminContentNavbar from "../../adminContentNavbar/AdminContentNavbar";
import { axiosInstance } from "../../../../../../config";
import AlertContent from "../../../../../../component/alert/Alert";
import FormElements from "../formElements/FormElements";
import TableData from "../tableData/TableData";
import './adminLavozimContent.css';

const AdminLavozimContent = ({ currentUser }) => {
  const [selectBulimlar, setSelectBulimlar] = useState([]);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });

  // barcha bo'limlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getAllBulim = async () => {
      try {
        const res = await axiosInstance.get('department/all/' + JSON.parse(localStorage.getItem('oi')))
        let arr = [];
        res.data.forEach((d) => {
          arr.push({ value: d.id, label: d.uzName });
        })

        if (isMounted)
          setSelectBulimlar(arr);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getAllBulim();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // barcha malumotlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    let getAllLavozim = async () => {
      try {
        const res = await axiosInstance.get("user_position/" + JSON.parse(localStorage.getItem('oi')))

        if (isMounted)
          setData(res.data);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getAllLavozim();

    return () => {
      isMounted = false;
    }
  }, [currentUser])

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Позиция</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <AdminContentNavbar />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                {/* form elements */}
                <FormElements
                  currentUser={currentUser}
                  selectBulimlar={selectBulimlar}
                  setAlert={setAlert}
                  setData={setData}
                  data={data}
                />

                {/* table data */}
                <TableData
                  data={data}
                  setData={setData}
                  currentUser={currentUser}
                  setAlert={setAlert}
                  selectBulimlar={selectBulimlar}
                />

                {/* alert content */}
                <AlertContent alert={alert} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(AdminLavozimContent);