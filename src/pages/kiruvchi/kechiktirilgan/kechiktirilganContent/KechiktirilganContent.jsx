import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentNavbar from "../../contentNavbar/ContentNavbar";
import { axiosInstance } from "../../../../config";
import DelayAllData from "./delayAllData/DelayAllData";
import DeleyInputsElements from "./delayAllData/DeleyInputsElements";
import ReactPagination from "../../../../component/ReactPagination";
import { DateFormatSet } from "../../../../component/DateFormat";
import { extensiveSearchBackPageId } from "../../../../redux/actions/actionExtensiveSearch";
import "react-datepicker/dist/react-datepicker.css";
import '../../resolutsiya/resolutsiya.css'

const KechiktirilganContent = ({ currentUser, permission, ranks }) => {
  const { insta: user } = useSelector(state => state.user);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(user.bajarilmaganPageId);

  // malumotni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.post("search/notDone", {
          correspondentName: '',
          shortDescription: '',
          out_number: '',
          out_date: '',
          page: user.bajarilmaganPageId,
          workPlaceId: JSON.parse(localStorage.getItem('ids'))
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
  }, [currentUser, user.bajarilmaganPageId]);

  // pagination click
  const handlePageClick = useCallback(async (e) => {
    let sana = document.querySelector('.qisqacha2').value;
    let reg = document.querySelector('.qisqacha1').value;
    let korres = document.querySelector('#xujjat').value;
    let malumot = document.querySelector('#korrespondent2').value;

    try {
      const res = await axiosInstance.post(`search/notDone`, {
        correspondentName: korres,
        shortDescription: malumot,
        out_number: reg ? reg : '',
        out_date: sana ? DateFormatSet(sana) : '',
        page: e.selected,
        workPlaceId: JSON.parse(localStorage.getItem('ids'))
      })
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
    setSelected(e.selected);
  }, [setData, setSelected]);

  const linkFunc = useCallback((id) => {
    history.push(`/kiruvchi_bajarish_ijro/${id}/bajarilmagan`);
    extensiveSearchBackPageId({ selected: selected, pageName: "bajarilmaganPageId" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <div className="content mb-5 content-mobile">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Не выполнено</h3>
      <div className="card-body card-body-mobile pt-0 px-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "10px 20px" }}>
                {/* inputs elements */}
                <DeleyInputsElements
                  setData={setData}
                  setSelected={setSelected}
                />

                {/* pagination */}
                {data.content?.length > 0 && (
                  <ReactPagination
                    handlePageClick={handlePageClick}
                    data={data}
                    selected={selected}
                  />
                )}
                {/* barcha o'qilgan malumotlar */}
                <DelayAllData
                  data={data}
                  linkFunc={linkFunc}
                />
                {/* pagination */}
                {data.content?.length > 0 && (
                  <ReactPagination
                    handlePageClick={handlePageClick}
                    data={data}
                    selected={selected}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default React.memo(KechiktirilganContent);