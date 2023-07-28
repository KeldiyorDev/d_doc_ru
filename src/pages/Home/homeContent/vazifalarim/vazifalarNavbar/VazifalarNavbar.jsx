import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './vazifalarNavbar.css';
import { axiosInstance } from "../../../../../config";

const VazifalarNavbar = ({ currentUser }) => {
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
      <li className="nav-item">
        <NavLink exact to="/vazifalar_barchasi" className="nav-link " activeClassName='NavLinkLi' style={{ marginLeft: "20px" }}>
          <i className="icon-plus2 mr-1 sx-none" /> Все
        </NavLink>
        {data.allMyTask !== 0 && data.allMyTask !== null && data.allMyTask !== undefined && (
          <span className="badge1">{data.allMyTask}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/vazifalar_yangi" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-newspaper mr-1 sx-none" /> Новый
        </NavLink>
        {data.newTaskCount !== 0 && data.newTaskCount !== null && data.newTaskCount !== undefined && (
          <span className="badge1">{data.newTaskCount}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/vazifalar_jarayonda" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-user-plus mr-1 sx-none" /> В Процесс
        </NavLink>
        {data.inProcessTaskCount !== 0 && data.inProcessTaskCount !== null && data.inProcessTaskCount !== undefined && (
          <span className="badge1">{data.inProcessTaskCount}</span>
        )}
      </li>
      <li className="nav-item">
        <NavLink to="/vazifalar_nazoratda" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-pen mr-1 sx-none" /> Под контролем
        </NavLink>
        {data.inControlTaskCount !== 0 && data.inControlTaskCount !== null && data.inControlTaskCount !== undefined && (
          <span className="badge1">{data.inControlTaskCount}</span>
        )}
      </li>
    </>
  )
}

export default React.memo(VazifalarNavbar);