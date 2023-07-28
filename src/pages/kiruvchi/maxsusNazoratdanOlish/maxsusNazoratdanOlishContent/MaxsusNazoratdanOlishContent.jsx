import React, { useEffect, useState } from "react";
import ContentNavbar from '../../contentNavbar/ContentNavbar';
import { axiosInstance } from "../../../../config";
import { useSelector } from "react-redux";
import GetOutOfControlData from "./getOutOfControlData/GetOutOfControlData";
import GetOutOfControlInputsElements from "./getOutOfControlData/GetOutOfControlInputsElements";

const MaxsusNazoratdanOlishContent = ({ currentUser, permission, ranks }) => {
  const { insta: user } = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(user.nazoratdanOlishPageId);

  // api ketadigan sanani formatlash
  const dateFormatSet = (date) => {
    return date?.slice(6, date?.length) + '-' + date?.slice(3, 5) + '-' + date?.slice(0, 2)
  }

  // malumotni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      if (permission?.includes("RECEPTION")) {
        try {
          const res = await axiosInstance.post(`superVisor/getTakeControlForReception?inProcess=${true}`, {
            correspondentName: '',
            shortDescription: '',
            out_number: '',
            out_date: '',
            page: user.nazoratdaPageId,
            workPlaceId: JSON.parse(localStorage.getItem('ids')),
            // orgId: JSON.parse(localStorage.getItem('oi')),
          })

          if (isMounted) {
            setData(res.data);
            console.log(res.data);
          }
        } catch (error) {
          console.log(error.response);
        }
      } else {
        try {
          const res = await axiosInstance.post(`search/inControlForDirector?isDone=${true}`, {
            correspondentName: '',
            shortDescription: '',
            out_number: '',
            out_date: '',
            page: user.nazoratdaPageId,
            workPlaceId: JSON.parse(localStorage.getItem('ids'))
          })

          if (isMounted) {
            setData(res.data);
            console.log(res.data);
          }
        } catch (error) {
          console.log(error.response);
        }
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, user.nazoratdanOlishPageId]);

  return (
    <div className="content mb-5 content-mobile">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Взять под контроль</h3>
      <div className="card-body card-body-mobile pt-0 px-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "10px 20px" }}>
                {/* inputs elements */}
                <GetOutOfControlInputsElements
                  setData={setData}
                  dateFormatSet={dateFormatSet}
                  setSelected={setSelected}
                />

                {/* barcha o'qilgan ma'lumotlar */}
                <GetOutOfControlData
                  data={data}
                  setData={setData}
                  dateFormatSet={dateFormatSet}
                  selected={selected}
                  setSelected={setSelected}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default React.memo(MaxsusNazoratdanOlishContent);