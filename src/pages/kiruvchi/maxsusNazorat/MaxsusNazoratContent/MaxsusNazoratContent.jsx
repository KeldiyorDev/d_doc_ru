import React, { useEffect, useState } from "react";
import ContentNavbar from '../../contentNavbar/ContentNavbar';
import { axiosInstance } from "../../../../config";
import ControlAllData from "./controlAllData/ControlAllData";
import { useSelector } from "react-redux";
import ControlInputsElements from "./controlAllData/ControlInputsElements";
import "react-datepicker/dist/react-datepicker.css";

const MaxsusNazoratContent = ({ currentUser, permission, ranks }) => {
  const { insta: user } = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(user.nazoratdaPageId);
  console.log(user);
  console.log(permission);

  const dateFormatSet = (date) => {
    return date?.slice(6, date?.length) + '-' + date?.slice(3, 5) + '-' + date?.slice(0, 2)
  }

  // malumotni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      if (permission?.includes("RECEPTION")) {
        try {
          const res = await axiosInstance.post(`superVisor/getTakeControlForReception?inProcess=${false}`, {
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
          const res = await axiosInstance.post(`search/inControlForDirector?isDone=${false}`, {
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
  }, [currentUser, permission, user.nazoratdaPageId]);

  return (
    <div className="content mb-5 content-mobile">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Контроль</h3>
      <div className="card-body card-body-mobile pt-0 px-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "10px 20px" }}>
                {/* inputs elements */}
                <ControlInputsElements
                  setData={setData}
                  dateFormatSet={dateFormatSet}
                  setSelected={setSelected}
                />

                {/* barcha o'qilgan ma'lumotlar */}
                <ControlAllData
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
    </div>
  )
}

export default React.memo(MaxsusNazoratContent);