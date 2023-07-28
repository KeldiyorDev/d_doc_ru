import React, { useEffect, useState } from "react";
import ContentNavbar from "../../contentNavbar/ContentNavbar";
import { axiosInstance } from "../../../../config";
import AlertContent from '../../../../component/alert/Alert';
import NewAllData from "./newAllData/NewAllData";
import { useSelector } from "react-redux";
import NewInputsElements from "./newAllData/NewInputsElements";
import "react-datepicker/dist/react-datepicker.css";

const YangiContent = ({ currentUser, permission, ranks }) => {
  const { insta: user } = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({ open: false, color: "", text: "" });
  const [select, setSelect] = useState(user.yangiPageId);

  const dateFormatSet = (date) => {
    return date?.slice(6, date?.length) + '-' + date?.slice(3, 5) + '-' + date?.slice(0, 2)
  }

  // barcha documentni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.post("search/new", {
          correspondentName: '',
          shortDescription: '',  
          out_number: '',
          out_date: '',
          page: user.yangiPageId,
          workPlaceId: JSON.parse(localStorage.getItem('ids')),
          orgId: JSON.parse(localStorage.getItem('oi'))
        })

        console.log(res.data);
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
  }, [currentUser, user.yangiPageId]);

  return (
    <div className="content mb-5 content-mobile">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Новый </h3>
      <div className="card-body card-body-mobile pt-0 px-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "10px 20px" }}>
                {/* inputs elements */}
                <NewInputsElements
                  setData={setData}
                  dateFormatSet={dateFormatSet}
                  setSelected={setSelect}
                  setAlert={setAlert}
                />

                {/* barcha o'qilgan ma'lumotlar */}
                <NewAllData
                  data={data}
                  setData={setData}
                  dateFormatSet={dateFormatSet}
                  selected={select}
                  setSelected={setSelect}
                />
              </div>
            </div>
          </div>

          {/* alert */}
          <AlertContent alert={alert} />
        </div>
      </div>
    </div>
  )
}

export default React.memo(YangiContent);