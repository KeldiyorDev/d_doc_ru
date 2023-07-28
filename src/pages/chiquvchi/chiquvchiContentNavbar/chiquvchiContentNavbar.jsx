import React, { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import { axiosInstanceOut, } from "../../../config";
import './chiquvchiContentNavbar.css';

const ChiquvchiContentNavbar = ({ permission, ranks, currentUser }) => {
    const [count, setCount] = useState([]);

    const param = useParams()
    console.log(param);

    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstanceOut.get("missive/count/" + JSON.parse(localStorage.getItem('ids')) + '/' + JSON.parse(localStorage.getItem('oi')), {
                    headers: {
                        Authorization: "Bearer " + currentUser
                    }
                })
                console.log(res.data)
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

    return (
        <>
            <li className="nav-item">
                <NavLink to="/chiquvchi/yangi" className="nav-link " activeClassName='NavLinkLi'
                    style={{ marginLeft: "20px" }}>
                    <i className="icon-plus2 mr-1 sx-none"></i> Добавить новое
                </NavLink>
            </li>
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 1)[0]?.count > 0 &&
                <li className="nav-item " style={{ marginLeft: "20px", display: "block" }}>
                    <NavLink to="/chiquvchi/xomaki" className="nav-link" activeClassName='NavLinkLi'>
                        <i className="icon-user-plus mr-1 sx-none"></i> Временный
                    </NavLink>
                    <span className="badge1">{count?.filter((t) => t?.tabCode === 1)[0]?.count}</span>
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 2)[0]?.count > 0 &&
                <li className="nav-item " style={{ marginLeft: "20px", display: "block" }}>
                    <NavLink to="/chiquvchi/jarayonda" className="nav-link" activeClassName='NavLinkLi'>
                        <i className="icon-pen mr-1 sx-none"></i> В Процесси
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 2)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 2)[0]?.count}</span>
                    }
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 3)[0]?.count > 0 &&
                <li className="nav-item " style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi/tasdiqlash_uchun" className="nav-link" activeClassName='NavLinkLi'>
                        <i className="icon-laptop mr-1 sx-none"></i> Подтвердить
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 3)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 3)[0]?.count}</span>
                    }
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 5)[0]?.count > 0 &&
                <li className="nav-item " style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi/imzolash_uchun" className="nav-link" activeClassName='NavLinkLi'>
                        <i className="icon-laptop mr-1 sx-none"></i> Подписывать
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 5)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 5)[0]?.count}</span>
                    }
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 6)[0]?.count > 0 &&
                <li className="nav-item " style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi/imzolangan" className="nav-link" activeClassName='NavLinkLi'>
                        <i className="icon-laptop mr-1 sx-none"></i> Подписано
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 6)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 6)[0]?.count}</span>
                    }
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 4)[0]?.count > 0 &&
                <li className="nav-item " style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi/tasdiqlangan" className="nav-link" activeClassName='NavLinkLi'>
                        <i className="icon-laptop mr-1 sx-none"></i> Подтвержденный
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 4)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 4)[0]?.count}</span>
                    }
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 7)[0]?.count > 0 &&  (<li className="nav-item " style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi/yuborilgan" className="nav-link" activeClassName='NavLinkLi'>
                        <i className="icon-laptop mr-1 sx-none"></i> Отправил
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 7)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 7)[0]?.count}</span>
                    }
                </li>)
            }
            {/* {permission.includes("NAZORATDAN OLISH") && (
                <li className="nav-item nazoratdanOlish" style={{ display: count?.nazoratdanOlish === 0 ? "none" : "block", marginLeft: (count?.bajarilgan === 0 && count?.radEtilgan === 0 && count?.bajarilmagan === 0 && count?.malumotUchun === 0 && count?.umumlashtiruvchi === 0 && count?.nazoratda === 0 && count?.bajarishUchun === 0 && count?.rezalutsiya === 0 && count?.yangi === 0) && "20px" }}>
                    <NavLink to="/kiruvchi/nazoratdan-olish" className="nav-link " activeClassName='NavLinkLi'>
                        <i className="icon-check mr-1 sx-none"></i> Nazoratdan Olish
                    </NavLink>
                    <span className="badge1" >{count?.nazoratdanOlish}</span>
                </li>
            )} */}
        </>
    )
}

export default React.memo(ChiquvchiContentNavbar)