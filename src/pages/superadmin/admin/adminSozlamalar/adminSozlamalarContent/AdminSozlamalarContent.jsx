import React, { useEffect, useState } from 'react';
import './adminSozlamalarContent.css';
import AdminContentNavbar from '../../adminContent/adminContentNavbar/AdminContentNavbar';
import { axiosInstance } from '../../../../../config';
import AlertContent from '../../../../../component/alert/Alert';
import FormElements from '../formElements/FormElements';
import TableData from '../tableData/TableData';

const AdminSozlamalarContent = ({ currentUser }) => {
  const [data, setData] = useState([]);
  const [allBulimSelect, setAllBulimSelect] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });

  // barcha nomlanishlarni select ichiga joylashtirish
  useEffect(() => {
    let isMounted = true;
    let arr = [];
    data.forEach((d) => {
      arr.push({ value: d.id, label: d.uzName });
    })

    if (isMounted)
      setAllBulimSelect(arr);

    return () => {
      isMounted = false;
    }
  }, [data]);

  // barcha bulimni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getAllBulim = async () => {
      try {
        const res = await axiosInstance.get('department/all/' + JSON.parse(localStorage.getItem('oi')))

        if (isMounted)
          setData(res.data);
      } catch (error) {
        console.log(error?.response);
      }
    }
    getAllBulim();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Отделение</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <AdminContentNavbar />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px", overflowX: 'auto' }}>
                {/* form elements */}
                <FormElements
                  currentUser={currentUser}
                  setData={setData}
                  data={data}
                  setAlert={setAlert}
                  allBulimSelect={allBulimSelect}
                />

                {/* table data */}
                <TableData
                  currentUser={currentUser}
                  data={data}
                  setData={setData}
                  setAllBulimSelect={setAllBulimSelect}
                  allBulimSelect={allBulimSelect}
                  setAlert={setAlert}
                />

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

export default React.memo(AdminSozlamalarContent);