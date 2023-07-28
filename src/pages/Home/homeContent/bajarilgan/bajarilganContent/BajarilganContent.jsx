import React, { useState, useEffect, useRef } from "react";
import BajarilganNavbar from "../bajarilganNavbar/BajarilganNavbar";
import { axiosInstance } from "../../../../../config";
import DoneAllContentData from "./doneAllContentData/DoneAllContentData";
import DoneInputsElementsHome from "./doneAllContentData/DoneInputsElementsHome";

const BajarilganContent = ({ permission, currentUser }) => {
  const [data, setData] = useState([]);
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
      const res = await axiosInstance.post(`mainPage/allDone/${localStorage.getItem('ids')}`, {
        correspondentName: "",
        shortDescription: "",
        out_number: "",
        out_date: '',
        page: 0
      })

      if (isMounted)
        setData(res.data)
    }
    getData()

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  return (
    <div className="content content-mobile mb-5">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Все</h3>
      <div className="card-body card-body-mobile p-0 px-0" >
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px" }}>
          <BajarilganNavbar currentUser={currentUser} />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "10px 20px" }}>
                {/* inputs elements */}
                <DoneInputsElementsHome
                  setData={setData}
                  currentUser={currentUser}
                  dateFormatSet={dateFormatSet}
                  korresref={korresref}
                  shortDescref={shortDescref}
                  regNumref={regNumref}
                />

                {/* barcha o'qilgan ma'lumotlar */}
                <DoneAllContentData
                  data={data}
                  setData={setData}
                  currentUser={currentUser}
                  dateFormatSet={dateFormatSet}
                  permission={permission}
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

export default React.memo(BajarilganContent);