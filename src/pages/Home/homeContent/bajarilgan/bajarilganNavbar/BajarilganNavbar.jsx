import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './bajarilganNavbar.css';
import { axiosInstance } from "../../../../../config";

const BajarilganNavbar = ({ currentUser }) => {
  const [data, setData] = useState([])

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
        <NavLink exact to="/bajarilgan_barchasi" className="nav-link " activeClassName='NavLinkLi' style={{ marginLeft: "20px" }}>
          <i className="icon-plus2 mr-1 sx-none" /> Все
        </NavLink>
        {data.allDone !== 0 && data.allDone !== null && data.allDone !== undefined && (
          <span className="badge1 m-auto">{data.allDone}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/bajarilgan_bajarilganlar" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-newspaper mr-1 sx-none" /> Сделанный
        </NavLink>
        {data.doneCount !== 0 && data.doneCount !== null && data.doneCount !== undefined && (
          <span className="badge1 m-auto">{data.doneCount}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/bajarilgan_kechiktirib-berilgan" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-user-plus mr-1 sx-none" /> Сделано поздно
        </NavLink>

        {data.defferedDone !== 0 && data.defferedDone !== null && data.defferedDone !== undefined && (
          <span className="badge1 m-auto">{data.defferedDone}</span>
        )}
      </li>
    </>
  )
}

export default React.memo(BajarilganNavbar);