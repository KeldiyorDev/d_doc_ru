import React, { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import ContentNavbar from '../../contentNavbar/ContentNavbar';
import { axiosInstance } from "../../../../config";
import GetOutOfControlData from "./getOutOfControlData/GetOutOfControlData";
import GetOutOfControlInputsElements from "./getOutOfControlData/GetOutOfControlInputsElements";
import ReactPagination from "../../../../component/ReactPagination";
import { extensiveSearchBackPageId } from "../../../../redux/actions/actionExtensiveSearch";
import { DateFormatSet } from "../../../../component/DateFormat";

const NazoratdanOlishContent = ({ currentUser, permission, ranks }) => {
  const { insta: user } = useSelector(state => state.user);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(user.nazoratdanOlishPageId);

  // malumotni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.post("search/getOutOfControl", {
          correspondentName: '',
          shortDescription: '',
          out_number: '',
          out_date: '',
          page: user.nazoratdanOlishPageId,
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
  }, [currentUser, user.nazoratdanOlishPageId]);


  // pagination
  const handlePageClick = useCallback(async (e) => {
    let sana = document.querySelector('.qisqacha2').value;
    let reg = document.querySelector('.qisqacha1').value;
    let korres = document.querySelector('#xujjat').value;
    let malumot = document.querySelector('#korrespondent2').value;

    try {
      const res = await axiosInstance.post(`search/getOutOfControl`, {
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
    history.push(`/kiruvchi_bajarish_ijro/${id}/nazoratdanOlish`);
    extensiveSearchBackPageId({ selected: selected, pageName: "nazoratdanOlishPageId" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

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
                {/* barcha o'qilgan ma'lumotlar */}
                <GetOutOfControlData
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

export default React.memo(NazoratdanOlishContent);