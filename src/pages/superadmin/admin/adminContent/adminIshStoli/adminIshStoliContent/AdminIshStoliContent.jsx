import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../../../../config";
import AdminContentNavbar from "../../adminContentNavbar/AdminContentNavbar";
import AlertContent from '../../../../../../component/alert/Alert';
import './adminIshStoliContent.css';
import FormData from "../formData/FormData";
import TableData from "../tableData/TableData";

const AdminIshStoliContent = ({ currentUser }) => {
  const [selectBulimlar, setSelectBulimlar] = useState([]);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({ open: false, text: "", color: "" });
  const [selected, setSelected] = useState(0);

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
        console.log(error);
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
    const getAllData = async () => {
      try {
        const res = await axiosInstance.get(`workplace?orgId=${JSON.parse(localStorage.getItem('oi'))}&page=` + selected)

        if (isMounted)
          setData(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getAllData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, selected]);
  console.log(data);

  // const searchIshStol = async (e) => {
  //   try {
  //     const res = await axiosInstance.post("workplace/searchByName", {
  //       name: e,
  //       page: 0,
  //     }, {
  //       headers: {
  //         Authorization: "Bearer " + currentUser
  //       }
  //     })
  //     setData(res.data);
  //   } catch (error) {
  //     console.log(error.response);
  //   }
  // }

  return (
    <div className="content mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Рабочий стол</h3>
      <div className="">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink">
          <AdminContentNavbar />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body" style={{ padding: "20px" }}>
                {/* form data */}
                <FormData
                  currentUser={currentUser}
                  setAlert={setAlert}
                  setData={setData}
                  data={data}
                  setSelectBulimlar={setSelectBulimlar}
                  selectBulimlar={selectBulimlar}
                />

                {/* search */}
                {/* <div className={'d-block'}>
                  <input type="text" style={{ height: "56px" }}
                    className={'form-control form-control-outline'} placeholder="Search..."
                    onChange={(e) => searchIshStol(e.target.value)} />
                </div> */}

                {/* table data */}
                <TableData
                  currentUser={currentUser}
                  setSelected={setSelected}
                  selected={selected}
                  setData={setData}
                  data={data}
                  setSelectBulimlar={setSelectBulimlar}
                  selectBulimlar={selectBulimlar}
                  setAlert={setAlert}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* alert content  */}
      <AlertContent alert={alert} />
    </div>
  )
}

export default React.memo(AdminIshStoliContent);