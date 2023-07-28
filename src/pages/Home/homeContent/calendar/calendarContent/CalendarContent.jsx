import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../../../../config";
import { PAG_ID } from "../../../../../context/AuthReducer";
import CalendarDataContent from "./calendarDataContent/CalendarDataContent";

const CalendarContent = ({ currentUser, loader, data, setData, selected, setSelected }) => {
  // const { user } = useSelector(state => state);
  const { insta: user } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const korresref = useRef();
  const shortDescref = useRef();
  const regNumref = useRef();

  // useEffect(() => {
  //   let isMounted = true;
  //   loader.current.style.display = "flex";
  //   const getData = async () => {
  //     const res = await axiosInstance.post(`mainPage/allDone/${localStorage.getItem('ids')}`, {
  //       correspondentName: "",
  //       shortDescription: "",
  //       out_number: "",
  //       out_date: '',
  //       page: 0
  //     }, {
  //       headers: {
  //         Authorization: "Bearer " + currentUser
  //       }
  //     })

  //     if (isMounted) {
  //       setData(res.data);
  //       loader.current.style.display = "none";
  //     }
  //   }
  //   getData()

  //   return () => {
  //     isMounted = false;
  //   }
  // }, [currentUser, loader]);

  const SearchData = async () => {
    try {
      const res = await axiosInstance.post(`mainPage/tasksByDay`, {
        correspondentName: korresref.current.value,
        shortDescription: shortDescref.current.value,
        out_number: regNumref.current.value,
        page: 0,
        date: user.date,
        workPlaceId: JSON.parse(localStorage.getItem('ids'))
      })
      setData(res.data);
    } catch (error) {
      console.log(error.response);
    }
  }

  const All = async () => {
    try {
      const res = await axiosInstance.post(`mainPage/tasksByDay`, {
        correspondentName: "",
        shortDescription: "",
        out_number: "",
        page: 0,
        date: user.date,
        workPlaceId: JSON.parse(localStorage.getItem('ids'))
      })
      korresref.current.value = "";
      shortDescref.current.value = "";
      regNumref.current.value = "";
      setData(res.data)
    } catch (error) {
      console.log(error.response);
    }
  }

  // pagination
  const handlePageClick = async (e) => {
    try {
      const res = await axiosInstance.post(`mainPage/tasksByDay`, {
        correspondentName: korresref.current.value,
        shortDescription: shortDescref.current.value,
        out_number: regNumref.current.value,
        page: e.selected,
        date: user.date,
        workPlaceId: JSON.parse(localStorage.getItem('ids'))
      });
      dispatch(PAG_ID(e.selected));
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
    setSelected(e.selected);
  };

  return (
    <div className="tab-content">
      <div className="tab-pane fade show active" id="colored-tab1">
        <div className="card">
          <div className="card-body card-body-mobile" style={{ padding: "5px 30px" }}>
            <table className={'table-sm-full'}>
              <thead>
                <tr className={'direction-mobile'}>
                  <th style={{ width: '350px' }}>
                    <div className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="korres"
                        placeholder="Korrespondent"
                        ref={korresref}
                      />
                      <div className="form-control-feedback form-control-feedback-lg">
                        <i className="icon-search4"></i>
                      </div>
                    </div>
                  </th>
                  <th style={{ width: '350px' }} className={'mobile-table-none'}>
                    <div className="form-group form-group-feedback form-group-feedback-left inp-sm-none inp">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="malumotQisqacha"
                        placeholder="Qisqacha Ma'lumot"
                        ref={shortDescref}
                      />
                      <div className="form-control-feedback form-control-feedback-lg">
                        <i className="icon-search4"></i>
                      </div>
                    </div>
                  </th>
                  <th style={{ width: '200px' }}>
                    <div className="form-group form-group-feedback form-group-feedback-left inp inp-sm-none">
                      <div className="inputBox input-border inputBox1">
                        <input
                          type="text"
                          className="first qisqacha1 regN"
                          placeholder="REG №"
                          id="RegNomerInput"
                          ref={regNumref}
                        />
                      </div>
                      <div className="form-control-feedback form-control-feedback-lg">
                        <i className="icon-search4"></i>
                      </div>
                    </div>
                  </th>
                  <th style={{ width: '350px' }}>
                    <div className="form-group form-group-feedback form-group-feedback-left inp buttonsinput inp-sm-none">
                      <button className="btn btn-primary mr-2 table-sm-full" onClick={SearchData}>Search</button>
                      <button className="btn btn-primary mr-2 table-sm-full" onClick={All}>Barchasi</button>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>

            {/* barcha o'qilgan ma'lumotlar */}
            <CalendarDataContent
              data={data}
              currentUser={currentUser}
              handlePageClick={handlePageClick}
              selected={selected}
            // permission={permission}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(CalendarContent);