import React, { useState, useEffect, useRef } from "react";
import VazifalarNavbar from "../../vazifalarNavbar/VazifalarNavbar";
import { axiosInstance } from "../../../../../../config";
import TaskNewData from "./taskNewData/TaskNewData";
import TaskNewInputsElementsHome from "./taskNewData/TaskNewInputsElementsHome";

const VazifalarYangiContent = ({ permission, currentUser }) => {
  const [tableData, setTableData] = useState([]);
  const korresref = useRef();
  const shortDescref = useRef();
  const regNumref = useRef();

  // api ketadigan sanani formatlash
  const dateFormatSet = (date) => {
    return date?.slice(6, date?.length) + '-' + date?.slice(3, 5) + '-' + date?.slice(0, 2)
  }

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.post(`mainPage/newTasks/${JSON.parse(localStorage.getItem('ids'))}`, {
          correspondentName: '',
          shortDescription: '',
          out_number: '',
          out_date: '',
          page: 0
        })

        if (isMounted)
          setTableData(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getData()

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  return (
    <div className="content content-mobile mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Новый</h3>
      <div className="card-body card-body-mobile p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px" }}>
          <VazifalarNavbar currentUser={currentUser} />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "10px 20px" }}>
                {/* inputs elements */}
                <TaskNewInputsElementsHome
                  setTableData={setTableData}
                  currentUser={currentUser}
                  dateFormatSet={dateFormatSet}
                  korresref={korresref}
                  shortDescref={shortDescref}
                  regNumref={regNumref}
                />

                {/* barcha o'qilgan ma'lumotlar */}
                <TaskNewData
                  tableData={tableData}
                  setTableData={setTableData}
                  permission={permission}
                  currentUser={currentUser}
                  dateFormatSet={dateFormatSet}
                  korresref={korresref}
                  shortDescref={shortDescref}
                  regNumref={regNumref}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default React.memo(VazifalarYangiContent);