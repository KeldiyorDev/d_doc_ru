import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './yaqinNavbar.css';
import { axiosInstance } from "../../../../../config";

const YaqinlashmoqdaNavbar = ({ currentUser }) => {
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
      <li className="nav-item" style={{ marginLeft: "10px" }}>
        <NavLink exact to="/yaqinlashmoqda_barchasi" className="nav-link " activeClassName='NavLinkLi' style={{ marginLeft: "20px" }}>
          <i className="icon-plus2 mr-1 sx-none" /> Все
        </NavLink>
        {data.allNear !== 0 && data.allNear !== null && data.allNear !== undefined && (
          <span className="badge1 m-auto">{data.allNear}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/yaqinlashmoqda_1kun-qoldi" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-newspaper mr-1 sx-none" /> остался 1 день
        </NavLink>
        {data.remainOneDayTask !== 0 && data.remainOneDayTask !== null && data.remainOneDayTask !== undefined && (
          <span className="badge1 m-auto">{data.remainOneDayTask}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/yaqinlashmoqda_2-3kun-qoldi" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-user-plus mr-1 sx-none" /> осталось 2-3 дня
        </NavLink>
        {data.remainTwoThreeDayTask !== 0 && data.remainTwoThreeDayTask !== null && data.remainTwoThreeDayTask !== undefined && (
          <span className="badge1 m-auto">{data.remainTwoThreeDayTask}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/yaqinlashmoqda_4~kun-qoldi" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-pen mr-1 sx-none" /> Осталось 4 (~) дня
        </NavLink>
        {data.remainMoreThanFourTask !== 0 && data.remainMoreThanFourTask !== null && data.remainMoreThanFourTask !== undefined && (
          <span className="badge1 m-auto">{data.remainMoreThanFourTask}</span>
        )}
      </li>
    </>
  )
}

export default React.memo(YaqinlashmoqdaNavbar);