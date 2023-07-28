import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../config";
import './notifications.css';

const Notifications = ({ currentUser }) => {
  const [notice, setNotice] = useState([]);
  const [visibleNotice, setVisibleNotice] = useState(false);

  // // pastdan chiqadigan notification
  useEffect(() => {
    let isMounted = true, interval;

    if (currentUser && JSON.parse(localStorage.getItem('ids'))) {
      const getData = async () => {
        try {
          setVisibleNotice(true);
          await new Audio("/assets/mixkit-clear-announce-tones-2861.wav").play();
          const res = await axiosInstance.get(`/notification/${JSON.parse(localStorage.getItem('ids'))}`)
          let arr = [];
          arr.push({
            count: res.data[0].count,
            message: res.data[0].message,
            url: res.data[0].url,
            workPlaceId: res.data[0].workPlaceId,
            hrefURL: "/vazifalar_barchasi",
            color: "green"
          });
          arr.push({
            count: res.data[1].count,
            message: res.data[1].message,
            url: res.data[1].url,
            workPlaceId: res.data[1].workPlaceId,
            hrefURL: "/yaqinlashmoqda_barchasi",
            color: "orange"
          });
          arr.push({
            count: res.data[2].count,
            message: res.data[2].message,
            url: res.data[2].url,
            workPlaceId: res.data[2].workPlaceId,
            hrefURL: "/bajarilmagan_barchasi",
            color: "crimson"
          });

          if (isMounted) {
            setNotice(arr);
            setTimeout(() => {
              setVisibleNotice(false);
            }, 30000);
          }
        } catch (error) {
          // console.log(error.response);
          setVisibleNotice(false);
        }
      };
      getData();
    }

    if (currentUser && JSON.parse(localStorage.getItem('ids'))) {
      interval = setInterval(() => {
        const getData = async () => {
          try {
            setVisibleNotice(true);
            await new Audio("/assets/mixkit-clear-announce-tones-2861.wav").play();
            const res = await axiosInstance.get(`/notification/${JSON.parse(localStorage.getItem('ids'))}`)
            let arr = [];
            arr.push({
              count: res.data[0].count,
              message: res.data[0].message,
              url: res.data[0].url,
              workPlaceId: res.data[0].workPlaceId,
              hrefURL: "/vazifalar_barchasi",
              color: "green"
            });
            arr.push({
              count: res.data[1].count,
              message: res.data[1].message,
              url: res.data[1].url,
              workPlaceId: res.data[1].workPlaceId,
              hrefURL: "/yaqinlashmoqda_barchasi",
              color: "orange"
            });
            arr.push({
              count: res.data[2].count,
              message: res.data[2].message,
              url: res.data[2].url,
              workPlaceId: res.data[2].workPlaceId,
              hrefURL: "/bajarilmagan_barchasi",
              color: "crimson"
            });

            if (isMounted) {
              setNotice(arr);
              setTimeout(() => {
                setVisibleNotice(false);
              }, 30000);
            }
          } catch (error) {
            // console.log(error.response);
            setVisibleNotice(false);
          }
        };
        getData();
      }, 30 * 60 * 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      isMounted = false;
      clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className='notice' style={{ display: visibleNotice ? "block" : "none" }}>
      <div className="noticeWrapper">
        <div className='noticeWrapper_left'>
          <img src="/assets/doc.png" alt="" />
          <h3>По электронной <br /> программе</h3>
        </div>
        <ul className='noticeWrapper_right'>
          {notice?.length > 0 && notice.map((dat) => (
            <li>
              <span className='badge123' style={{ color: dat.color }}>{dat?.count}</span>
              <Link to={dat?.hrefURL}>
                <span>{dat?.message}</span>
              </Link>
            </li>
          ))}
        </ul>
        <i className="material-icons closeNotice" onClick={() => setVisibleNotice(false)}>&#xe5cd;</i>
      </div>
    </div>
  )
}

export default React.memo(Notifications);