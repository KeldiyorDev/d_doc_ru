import React, { useEffect, useRef, useState } from "react";
import CalendarContent from "./calendarContent/CalendarContent";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
import Loader from "../../../../component/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../../../config";
import { status } from "../../../../component/status/Status";
import { CLICK_DATA } from "../../../../context/AuthReducer";
import { clickDataCalendar, openModalCalendar, pageIdCalendar } from "../../../../redux/actions/actionCalendar";
import './calendar.css';

let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthUz = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];

const Calendar = ({ currentUser }) => {
  const dispatch = useDispatch();
  let loader = useRef();
  // const { user } = useSelector(state => state);
  const { insta: user } = useSelector(state => state.user);
  const [viewEventModal, setViewEventModal] = useState(user.open_modal);
  const [data, setData] = useState([]);
  const [event, setEvent] = useState([]);
  const [selected, setSelected] = useState(user.pageId);

  const fomatDate = (date) => {
    return date.slice(8, date.length) + '.' + date.slice(5, 7) + '.' + date.slice(0, 4)
  }

  // bosh sahifaga kirganda, barcha bir oylik malumotlarni o'qib olish
  useEffect(() => {
    let isMounted = true;

    const getDataCalendar = async () => {
      try {
        const res = await axiosInstance.get(`mainPage/tasksByMonth/${JSON.parse(localStorage.getItem('ids'))}/${new Date().toLocaleDateString().split('.').reverse().join('-')}`);

        let arr = [];
        res.data.forEach((e) => {
          arr.push({
            title: "№ " + e.shortDescription + ` (${status.find((d) => d.englishName === e.status)?.LatinName})`,
            date: e.deadline,
            backgroundColor: status.find((d) => d.englishName === e.status)?.color,
            borderColor: status.find((d) => d.englishName === e.status)?.color,
            textColor: status.find((d) => d.englishName === e.status)?.textColor,
          });
        })
        if (isMounted) {
          setEvent(arr);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getDataCalendar();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // keyingi yoki oldingi oyga o'tganda, barcha sanadagi malumotlarni o'qib olish
  const getByAllDataMonth = async (isMounted, fullDate) => {
    try {
      const res = await axiosInstance.get(`mainPage/tasksByMonth/${JSON.parse(localStorage.getItem('ids'))}/${fomatDate(fullDate)}`);
      if (isMounted) {
        let arr = [];
        res.data.forEach((e) => {
          arr.push({
            title: "№ " + e.shortDescription + ` (${status.find((d) => d.englishName === e.status)?.LatinName})`,
            date: e.deadline,
            backgroundColor: status.find((d) => d.englishName === e.status)?.color,
            borderColor: status.find((d) => d.englishName === e.status)?.color,
            textColor: status.find((d) => d.englishName === e.status)?.textColor,
          });
        })
        setEvent(arr);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // next, prev, today button click
  useEffect(() => {
    let isMounted = true, year, mon, fullDate;
    const getData = async () => {
      if (isMounted) {
        setTimeout(() => {
          document.querySelectorAll('.fc-more-link').forEach((link) => {
            link.addEventListener('click', () => {
              setTimeout(() => {
                document.querySelector('.fc-popover').querySelector('.fc-popover-close').click();
              }, 1);
            })
          })
        }, 100);

        // button next
        document.querySelector('.fc-next-button').addEventListener('click', () => {
          setTimeout(() => {
            let m = document.querySelector('.fc-toolbar-title').textContent.split(' ')[0];
            if (month.indexOf(m, 0) < month.length - 1) {
              year = document.querySelector('.fc-toolbar-title').textContent.split(' ')[1];
              mon = String(month.indexOf(m, 0) + 1).length === 1 ? 0 + String(month.indexOf(m, 0) + 1) : String(month.indexOf(m, 0) + 1);
              fullDate = year + "-" + mon + "-" + 10;
              getByAllDataMonth(isMounted, fullDate);
            } else {
              year = document.querySelector('.fc-toolbar-title').textContent.split(' ')[1];
              mon = String(month.length).length === 1 ? 0 + String(month.length) : String(month.length);
              fullDate = year + "-" + mon + "-" + 10;
              getByAllDataMonth(isMounted, fullDate);
            }
          }, 1);
        })

        // button previous
        document.querySelector('.fc-prev-button').addEventListener('click', async () => {
          setTimeout(() => {
            let m = document.querySelector('.fc-toolbar-title').textContent.split(' ')[0];
            if (month.indexOf(m, 0) < month.length - 1) {
              if (month.indexOf(m, 0) === 0) {
                year = document.querySelector('.fc-toolbar-title').textContent.split(' ')[1];
                mon = String(month.indexOf(m, 0) + 1).length === 1 ? 0 + String(month.indexOf(m, 0) + 1) : String(month.indexOf(m, 0) + 1);
                fullDate = year + "-" + mon + "-" + 10;
                getByAllDataMonth(isMounted, fullDate);
              } else {
                year = document.querySelector('.fc-toolbar-title').textContent.split(' ')[1];
                mon = String(month.indexOf(m, 0) + 1).length === 1 ? 0 + String(month.indexOf(m, 0) + 1) : String(month.indexOf(m, 0) + 1);
                fullDate = year + "-" + mon + "-" + 10;
                getByAllDataMonth(isMounted, fullDate);
              }
            } else {
              year = document.querySelector('.fc-toolbar-title').textContent.split(' ')[1];
              mon = String(month.indexOf(m, 0) + 1).length === 1 ? 0 + String(month.indexOf(m, 0) + 1) : String(month.indexOf(m, 0) + 1);
              fullDate = year + "-" + mon + "-" + 10;
              getByAllDataMonth(isMounted, fullDate);
            }
          }, 1);
        })

        // today button
        document.querySelector('.fc-today-button').addEventListener('click', () => {
          setTimeout(() => {
            let m = document.querySelector('.fc-toolbar-title').textContent.split(' ')[0];
            console.log(document.querySelector('.fc-toolbar-title').textContent.split(' '));
            if (month.indexOf(m, 0) < month.length - 1) {
              year = document.querySelector('.fc-toolbar-title').textContent.split(' ')[1];
              mon = String(month.indexOf(m, 0) + 1).length === 1 ? 0 + String(month.indexOf(m, 0) + 1) : String(month.indexOf(m, 0) + 1);
              fullDate = year + "-" + mon + "-" + 10;
              getByAllDataMonth(isMounted, fullDate);
            } else {
              year = document.querySelector('.fc-toolbar-title').textContent.split(' ')[1];
              mon = String(month.length).length === 1 ? 0 + String(month.length) : String(month.length);
              fullDate = year + "-" + mon + "-" + 10;
              getByAllDataMonth(isMounted, fullDate);
            }
          }, 1);
        })
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // date click
  const handleDateClick = async (DateClickArg) => {
    try {
      const res = await axiosInstance.post(`mainPage/tasksByDay`, {
        correspondentName: "",
        shortDescription: "",
        date: DateClickArg.dateStr,
        out_number: "",
        page: 0,
        workPlaceId: JSON.parse(localStorage.getItem('ids'))
      });

      if (res.data?.content?.length > 0) {
        dispatch(CLICK_DATA(DateClickArg.dateStr));
        setViewEventModal(true);
        setData(res.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  const handleDateClick1 = (e) => {
    handleDateClick({ dateStr: e.event.startStr });
  }

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      if (user.date) {
        try {
          const res = await axiosInstance.post(`mainPage/tasksByDay`, {
            correspondentName: "",
            shortDescription: "",
            date: user.date,
            out_number: "",
            page: selected,
            workPlaceId: JSON.parse(localStorage.getItem('ids'))
          });
          if (res.data?.content?.length > 0 && isMounted) {
            setData(res.data);
            setViewEventModal(true);
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
  }, [currentUser, selected, user.date]);

  const closeModal = () => {
    // dispatch(OPEN_MODAL(false));
    // dispatch(CLICK_DATA(null));
    // dispatch(PAG_ID(0));

    openModalCalendar(false)
    clickDataCalendar(null)
    pageIdCalendar(0)
    setSelected(0);
    setViewEventModal(false);
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        dayMaxEvents={3}
        selectable
        height={"100%"}
        contentHeight={710}
        aspectRatio={1}
        // editable={true}
        // eventLimit={true} // allow "more" link when too many events
        eventClick={handleDateClick1}
        // headerToolbar={{
        //   left: 'prev,next today',
        //   center: 'title',
        //   right: 'dayGridMonth,timeGridWeek,timeGridDay'
        // }}
        // moreLinkClick="day"
        // moreLinkHint={3}
        // weekends={false}
        events={event}
      />

      {viewEventModal && (
        <div className="eventModal">
          <div className="eventModalWrapper">
            <div className="eventModalHeader">
              <h4>{user.date.split('-')[2]}-{monthUz[parseInt(String(user.date.split('-')[1])[0] === 0 ? String(user.date.split('-')[1])[1] : user.date.split('-')[1]) - 1]} {user.date.split('-')[0]}-yil</h4>
              <span onClick={closeModal}>&times;</span>
            </div>
            <div className="eventModalBody">
              <CalendarContent
                currentUser={currentUser}
                loader={loader}
                data={data}
                setData={setData}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </div>
        </div>
      )}

      {/* loader */}
      <Loader loader={loader} />
    </>
  )
}

export default React.memo(Calendar);