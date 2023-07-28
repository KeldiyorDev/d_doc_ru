import React, { useState, useEffect, useRef } from "react";
import BajarilmaganNavbar from "../../bajarilmaganNavbar/BajarilmaganNavbar";
import { axiosInstance } from "../../../../../../config";
import NotDone23DayData from "./notDone23DayData/NotDone23DayData";
import NotDone23dayInputsElementsHome from "./notDone23DayData/NotDone23dayInputsElementsHome";

const Bajarilmagan23kunKechContent = ({ permission, currentUser }) => {
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
      const res = await axiosInstance.post(`mainPage/lateTwoThreeDay/${localStorage.getItem('ids')}`, {
        correspondentName: '',
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
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "uppercase" }}>Все</h3>
      <div className="card-body card-body-mobile p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px" }}>
          <BajarilmaganNavbar currentUser={currentUser} />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "10px 20px" }}>
                {/* inputs elements */}
                <NotDone23dayInputsElementsHome
                  setData={setData}
                  currentUser={currentUser}
                  dateFormatSet={dateFormatSet}
                  korresref={korresref}
                  shortDescref={shortDescref}
                  regNumref={regNumref}
                />

                {/* barcha o'qilgan ma'lumotlar */}
                <NotDone23DayData
                  data={data}
                  setData={setData}
                  currentUser={currentUser}
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

export default React.memo(Bajarilmagan23kunKechContent);