import React, { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';
import { axiosInstance } from "../../../config";
import './contentNavbar.css';

const ContentNavbar = ({ permission, ranks, currentUser }) => {
  const [count, setCount] = useState({
    bajarilgan: 0,
    bajarilmagan: 0,
    bajarishUchun: 0,
    malumotUchun: 0,
    nazoratda: 0,
    nazoratdanOlish: 0,
    radEtilgan: 0,
    rezalutsiya: 0,
    umumlashtiruvchi: 0,
    yangi: 0
  });

  console.log(permission);

  const [maxsusNazoratCount, setMaxsusNazoratCount] = useState(0)
  const [maxsusNazoratdanOlishCount, setMaxsusNazoratdanOlishCount] = useState(0)

  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("monitoring/personal/" + JSON.parse(localStorage.getItem('ids')))
        if (isMounted)
          setCount(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // Maxsus nazorat
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("superVisor/getCount/" + JSON.parse(localStorage.getItem('ids')))
        console.log(res.data);
        if (isMounted)
          setMaxsusNazoratCount(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);

  // maxsus nazoratdan olish
  useEffect(() => {
    let isMounted = true;
    const getData = async () => {
      try {
        const res = await axiosInstance.get("superVisor/getCountInProcess/" + JSON.parse(localStorage.getItem('ids')))
        console.log(res.data);
        if (isMounted)
          setMaxsusNazoratdanOlishCount(res.data);
      } catch (error) {
        console.log(error.response);
      }
    }
    getData();

    return () => {
      isMounted = false;
    }
  }, [currentUser]);


  // console.log(ranks);
  return (
    <>
      {permission.includes("YANGI QO'SHISH") && (
        <li className="nav-item" >
          <NavLink exact to="/kiruvchi" className="nav-link " activeClassName='NavLinkLi' style={{ marginLeft: "20px" }}>
            <i className="icon-plus2 mr-1 sx-none"></i> Добавить новое
          </NavLink>
        </li>
      )}
      {permission.includes("YANGI") && (
        <li className="nav-item yangi" style={{ marginLeft: permission.includes("YANGI QO'SHISH") ? "0px" : "30px", display: count?.yangi === 0 ? "none" : "block" }}>
          <NavLink to="/kiruvchi/yangi" className="nav-link" activeClassName='NavLinkLi'>
            <i className="icon-newspaper mr-1 sx-none"></i> Новый
          </NavLink>
          <span className="badge1">{count?.yangi}</span>
        </li>
      )}
      {(ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || permission.includes("RESOLUTSIYA") || permission.includes("RECEPTION")) && (
        <li className="nav-item rezalutsiya" style={{ marginLeft: (!(permission.includes("YANGI QO'SHISH") || permission.includes("YANGI") || (count?.yangi !== 0))) && "20px", display: count?.rezalutsiya === 0 ? "none" : "block" }} >
          <NavLink to="/kiruvchi/resolution" className="nav-link" activeClassName='NavLinkLi'>
            <i className="icon-user-plus mr-1 sx-none"></i> Резолюция
          </NavLink>
          <span className="badge1" >{count?.rezalutsiya}</span>
        </li>
      )}
      <li className="nav-item bajarishUchun" style={{ marginLeft: (permission.includes("YANGI QO'SHISH") || permission.includes("YANGI") || (ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || ranks.includes(4) || ranks.includes(8)) || (count?.rezalutsiya === 0 && count?.yangi === 0)) && "20px", display: count?.bajarishUchun === 0 ? "none" : "block" }}>
        <NavLink to="/kiruvchi/bajarish" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-pen mr-1 sx-none"></i> Для выполнения
        </NavLink>
        <span className="badge1">{count?.bajarishUchun}</span>
      </li>
      <li className="nav-item nazoratda" style={{ display: count?.nazoratda === 0 ? "none" : "block", marginLeft: (count?.bajarishUchun === 0 && count?.rezalutsiya === 0 && count?.yangi === 0) && "20px" }}>
        <NavLink to="/kiruvchi/nazorat" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-laptop mr-1 sx-none"></i> Под контролем
        </NavLink>
        <span className="badge1">{count?.nazoratda}</span>
      </li>
      {((ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || permission.includes("RECEPTION"))) && maxsusNazoratCount !== 0 && (
        <li className="nav-item maxsusnazorat" style={{
          marginLeft: (count?.bajarishUchun === 0 && count?.rezalutsiya === 0 && count?.yangi === 0) && "20px"
        }}>
          <NavLink to="/kiruvchi/maxsusNazorat" className="nav-link" activeClassName='NavLinkLi'>
            <i className="icon-laptop mr-1 sx-none"></i>Специальный контроль
          </NavLink>
          <span className="badge1">{maxsusNazoratCount}</span>
        </li>
      )}
      <li className="nav-item umumlashtiruvchi" style={{ display: count?.umumlashtiruvchi === 0 ? "none" : "block", marginLeft: (count?.nazoratda === 0 && count?.bajarishUchun === 0 && count?.rezalutsiya === 0) && "20px" }}>
        <NavLink to="/kiruvchi/umumlashtiruvchi" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-laptop mr-1 sx-none"></i> Генерализатор
        </NavLink>
        <span className="badge1">{count?.umumlashtiruvchi}</span>
      </li>
      <li className="nav-item malumotUchun" style={{ display: count?.malumotUchun === 0 ? "none" : "block", marginLeft: (count?.umumlashtiruvchi === 0 && count?.nazoratda === 0 && count?.bajarishUchun === 0 && count?.rezalutsiya === 0 && count?.yangi === 0) && "20px" }}>
        <NavLink to="/kiruvchi/ma'lumot-uchun" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-laptop mr-1 sx-none"></i> Для справки
        </NavLink>
        <span className="badge1">{count?.malumotUchun}</span>
      </li>
      <li className="nav-item bajarilmagan" style={{ display: count?.bajarilmagan === 0 ? "none" : "block", marginLeft: (count?.malumotUchun === 0 && count?.umumlashtiruvchi === 0 && count?.nazoratda === 0 && count?.bajarishUchun === 0 && count?.rezalutsiya === 0 && count?.yangi === 0) && "20px" }}>
        <NavLink to="/kiruvchi/kechiktirilgan" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-calendar mr-1 sx-none"></i> Не выполнено
        </NavLink>
        <span className="badge1">{count?.bajarilmagan}</span>
      </li>
      <li className="nav-item redetilgan" style={{ display: count?.radEtilgan === 0 ? "none" : "block", marginLeft: (count?.bajarilmagan === 0 && count?.malumotUchun === 0 && count?.umumlashtiruvchi === 0 && count?.nazoratda === 0 && count?.bajarishUchun === 0 && count?.rezalutsiya === 0 && count?.yangi === 0) && "20px" }}>
        <NavLink to="/kiruvchi/radetilgan" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-stack-cancel mr-1 sx-none"></i>Отклоненный
        </NavLink>
        <span className="badge1">{count?.radEtilgan}</span>
      </li>
      <li className="nav-item bajarilgan" style={{ display: count?.bajarilgan === 0 ? "none" : "block", marginLeft: (count?.radEtilgan === 0 && count?.bajarilmagan === 0 && count?.malumotUchun === 0 && count?.umumlashtiruvchi === 0 && count?.nazoratda === 0 && count?.bajarishUchun === 0 && count?.rezalutsiya === 0 && count?.yangi === 0) && "20px" }}>
        <NavLink to="/kiruvchi/bajarilgan" className="nav-link" activeClassName='NavLinkLi'>
          <i className="icon-check mr-1 sx-none"></i> Сделанный
        </NavLink>
        <span className="badge1">{count?.bajarilgan}</span>
      </li>
      {permission.includes("NAZORATDAN OLISH") && (
        <li className="nav-item nazoratdanOlish" style={{ display: count?.nazoratdanOlish === 0 ? "none" : "block", marginLeft: (count?.bajarilgan === 0 && count?.radEtilgan === 0 && count?.bajarilmagan === 0 && count?.malumotUchun === 0 && count?.umumlashtiruvchi === 0 && count?.nazoratda === 0 && count?.bajarishUchun === 0 && count?.rezalutsiya === 0 && count?.yangi === 0) && "20px" }}>
          <NavLink to="/kiruvchi/nazoratdan-olish" className="nav-link " activeClassName='NavLinkLi'>
            <i className="icon-check mr-1 sx-none"></i> Взять под контроль
          </NavLink>
          <span className="badge1" >{count?.nazoratdanOlish}</span>
        </li>
      )}
      {((ranks.includes(1) || ranks.includes(2) || ranks.includes(3) || permission.includes("RECEPTION"))) && maxsusNazoratdanOlishCount !== 0 && (
        <li className="nav-item nazoratdanOlish" style={{ marginLeft: (count?.bajarilgan === 0 && count?.radEtilgan === 0 && count?.bajarilmagan === 0 && count?.malumotUchun === 0 && count?.umumlashtiruvchi === 0 && count?.nazoratda === 0 && count?.bajarishUchun === 0 && count?.rezalutsiya === 0 && count?.yangi === 0) && "20px" }}>
          <NavLink to="/kiruvchi/maxsusNazoratdanOlish" className="nav-link " activeClassName='NavLinkLi'>
            <i className="icon-check mr-1 sx-none"></i> Специальная инспекция
          </NavLink>
          <span className="badge1" >{maxsusNazoratdanOlishCount}</span>
        </li>
      )}
    </>
  )
}

export default React.memo(ContentNavbar);