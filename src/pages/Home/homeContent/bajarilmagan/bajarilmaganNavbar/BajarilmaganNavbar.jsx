import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import './bajarilmaganNavbar.css';
import { axiosInstance } from "../../../../../config";

const BajarilmaganNavbar = ({ currentUser }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const res = await axiosInstance.get(`mainPage/taskCount/${localStorage.getItem('ids')}`)

      if (isMounted)
        setData(res.data)
    }
    fetchData()

    return () => {
      isMounted = false;
    }
  }, [currentUser])

  return (
    <>
      <li className="nav-item" >
        <NavLink exact to="/bajarilmagan_barchasi" className="nav-link " activeClassName='NavLinkLi' style={{ marginLeft: "20px" }}>
          <i className="icon-plus2 mr-1 sx-none" /> Все
        </NavLink>
        {data.allLate !== 0 && data.allLate !== null && data.allLate !== undefined && (
          <span className="badge1 m-auto">{data.allLate}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/bajarilmagan_1kun-kechikkan" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-newspaper mr-1 sx-none" /> Опоздание на 1 день
        </NavLink>
        {data.lateOneDayTask !== 0 && data.lateOneDayTask !== null && data.lateOneDayTask !== undefined && (
          <span className="badge1 m-auto">{data.lateOneDayTask}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/bajarilmagan_2-3kun-kechikkan" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-user-plus mr-1 sx-none" /> Опоздание на 2-3 дня
        </NavLink>
        {data.lateTwoThreeDayTask !== 0 && data.lateTwoThreeDayTask !== null && data.lateTwoThreeDayTask !== undefined && (
          <span className="badge1 m-auto">{data.lateTwoThreeDayTask}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/bajarilmagan_4~kun-kechikkan" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-pen mr-1 sx-none" /> Опоздание на 4 (~) дня
        </NavLink>
        {data.lateMoreThanFourDayTask0 !== 0 && data.lateMoreThanFourDayTask !== null && data.lateMoreThanFourDayTask !== undefined && (
          <span className="badge1 m-auto">{data.lateMoreThanFourDayTask}</span>
        )}----
      </li>
    </>
  )
}

export default React.memo(BajarilmaganNavbar);