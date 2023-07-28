import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ContentNavbar from "../../contentNavbar/ContentNavbar";
import { axiosInstance } from '../../../../config';
import ResolutionAllData from "./resolutionAllData/ResolutionAllData";
import ResolutionInputsElements from "./resolutionAllData/ResolutionInputsElements";
import ReactPagination from "../../../../component/ReactPagination";
import { DateFormatSet } from "../../../../component/DateFormat";
import { extensiveSearchBackPageId } from "../../../../redux/actions/actionExtensiveSearch";
import "react-datepicker/dist/react-datepicker.css";

const ResolutionContent = ({ currentUser, ranks, permission }) => {
  console.log(currentUser);
  console.log(ranks);
  console.log(permission);
  const { insta: user } = useSelector(state => state.user);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(user.rezolutsiyaPageId);

  // malumotni o'qib olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.post("search/resolution", {
          correspondentName: '',
          shortDescription: '',
          out_number: '',
          out_date: '',
          page: user.rezolutsiyaPageId,
          workPlaceId: JSON.parse(localStorage.getItem('ids'))
        })
        if (isMounted) {
          console.log(res.data);    
          setData(res.data);
        }
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser, user.rezolutsiyaPageId]);

  // pagination
  const handlePageClick = useCallback(async (e) => {
    let sana = document.querySelector('.qisqacha2')?.value;
    let reg = document.querySelector('.qisqacha1')?.value;
    let korres = document.querySelector('#xujjat')?.value;
    let malumot = document.querySelector('#korrespondent2')?.value;

    try {
      const res = await axiosInstance.post(`search/resolution`, {
        correspondentName: korres ? korres : null,
        shortDescription: malumot ? malumot : null,
        out_number: reg ? reg : '',
        out_date: sana ? DateFormatSet(sana) : '',
        page: e.selected,
        workPlaceId: JSON.parse(localStorage.getItem('ids'))
      })
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
    setSelected(e.selected);
  }, [setData, setSelected]);

  // redirect other page
  const linkFunc = useCallback((id) => {
    history.push(`/kiruvchi_resolution_kurish/${id}`);
    extensiveSearchBackPageId({ selected: selected, pageName: "rezolutsiyaPageId" })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <div className="content mb-5 content-mobile">
      <h3 style={{ margin: "10px 0 0 0", fontWeight: "bold", textTransform: "upperCase" }}>Резолюция</h3>
      <div className="card-body card-body-mobile pt-0 px-0">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-solid-custom bg-primary NavLink" style={{ paddingTop: "2px", minHeight: "52px" }}>
          <ContentNavbar currentUser={currentUser} ranks={ranks} permission={permission} />
        </ul>
        <div className="tab-content">
          <div className="tab-pane fade show active" id="colored-tab1">
            <div className="card">
              <div className="card-body card-body-mobile" style={{ padding: "10px 20px" }}>
                {/* inputs elements */}
                <ResolutionInputsElements
                  setData={setData}
                  setSelected={setSelected}
                />

                {/*pagination*/}
                {data.content?.length > 0 && (
                  <ReactPagination
                    handlePageClick={handlePageClick}
                    data={data}
                    selected={selected}
                  />
                )}
                {/* barcha o'qilgan ma'lumotlar */}
                <ResolutionAllData
                  data={data}
                  ranks={ranks}
                  linkFunc={linkFunc}
                />
                {/*pagination*/}
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

export default React.memo(ResolutionContent);