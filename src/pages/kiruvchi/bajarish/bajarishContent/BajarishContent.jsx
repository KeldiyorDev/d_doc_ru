import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../../config";
import { useHistory } from "react-router-dom";
import ContentNavbar from "../../contentNavbar/ContentNavbar";
import CompleteAllData from "./completeAllData/CompleteAllData";
import CompleteInputsElements from "./completeAllData/CompleteInputsElements";
import { DateFormatSet } from "../../../../component/DateFormat";
import ReactPagination from "../../../../component/ReactPagination";
import { extensiveSearchBackPageId } from "../../../../redux/actions/actionExtensiveSearch";
import "react-datepicker/dist/react-datepicker.css";
import './BajarishContent.css'

const BajarishContent = ({ currentUser, permission, ranks }) => {
  const { insta: user } = useSelector(state => state.user);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(user.bajarishPageId);
  const history = useHistory();

  // barcha malumotlarni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.post("search/forDoing", {
          correspondentName: '',
          shortDescription: '',
          out_number: '',
          out_date: '',
          page: user.bajarishPageId,
          workPlaceId: JSON.parse(localStorage.getItem('ids'))
        })

        if (isMounted)
          setData(res.data)
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, user.bajarishPageId]);

  // pagination click
  const handlePageClick = useCallback(async (e) => {
    let sana = document.querySelector('.qisqacha2').value;
    let reg = document.querySelector('.qisqacha1').value;
    let korres = document.querySelector('#xujjat').value;
    let malumot = document.querySelector('#korrespondent2').value;

    try {
      const res = await axiosInstance.post(`search/forDoing`, {
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

  // redirect other page
  const linkFunc = useCallback((id) => {
    history.push(`/kiruvchi_bajarish_ijro/${id}/bajarish`);
    extensiveSearchBackPageId({ selected: selected, pageName: "bajarishPageId" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <div className="content mb-5 content-mobile">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Для выполнения</h3>
      <div className="card-body card-body-mobile p-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar permission={permission} ranks={ranks} currentUser={currentUser} />
        </ul>

        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "10px 20px" }}>
                {/* inputs elements */}
                <CompleteInputsElements
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
                {/* all data */}
                <CompleteAllData
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
    </div>
  )
}

export default React.memo(BajarishContent);