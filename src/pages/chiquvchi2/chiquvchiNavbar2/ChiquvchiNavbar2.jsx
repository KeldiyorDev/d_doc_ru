import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { axiosInstanceOut } from "../../../config";

const ChiquvchiNavbar2 = ({ permission, ranks, currentUser }) => {
    const [count, setCount] = useState([])

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
            <li className="nav-item chiquvchi-nav">
                <NavLink to="/chiquvchi2/yangi" className="nav-link"
                    style={{ marginLeft: "20px" }}>
                    <i className="icon-plus2 mr-1 sx-none"></i> Добавить новое
                </NavLink>
            </li>
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 1)[0]?.count > 0 &&
                <li className="nav-item chiquvchi-nav" style={{ marginLeft: "20px", display: "block" }}>
                    <NavLink to="/chiquvchi2/tab/xomaki" className="nav-link">
                        <i className="icon-user-plus mr-1 sx-none"></i> Временное
                    </NavLink>
                    <span className="badge1">{count?.filter((t) => t?.tabCode === 1)[0]?.count}</span>
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 2)[0]?.count > 0 &&
                <li className="nav-item chiquvchi-nav" style={{ marginLeft: "20px", display: "block" }}>
                    <NavLink to="/chiquvchi2/tab/jarayonda" className="nav-link">
                        <i className="icon-pen mr-1 sx-none"></i> Прогресси
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 2)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 2)[0]?.count}</span>
                    }
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 3)[0]?.count > 0 &&
                <li className="nav-item chiquvchi-nav" style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi2/tab/tasdiqlash_uchun" className="nav-link">
                        <i className="icon-laptop mr-1 sx-none"></i> Для подтвердить
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 3)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 3)[0]?.count}</span>
                    }
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 5)[0]?.count > 0 &&
                <li className="nav-item chiquvchi-nav" style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi2/tab/imzolash_uchun" className="nav-link">
                        <i className="icon-laptop mr-1 sx-none"></i> Для подписывать
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 5)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 5)[0]?.count}</span>
                    }
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 6)[0]?.count > 0 &&
                <li className="nav-item chiquvchi-nav" style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi2/tab/imzolangan" className="nav-link">
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
                <li className="nav-item chiquvchi-nav" style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi2/tab/tasdiqlangan" className="nav-link">
                        <i className="icon-laptop mr-1 sx-none"></i> Подтвержденный
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 4)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 4)[0]?.count}</span>
                    }
                </li>
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 7)[0]?.count > 0 && (<li className="nav-item chiquvchi-nav" style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi2/tab/yuborilgan" className="nav-link">
                        <i className="icon-laptop mr-1 sx-none"></i> Отправил
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 7)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 7)[0]?.count}</span>
                    }
                </li>)
            }
            {
                count.length > 0 && count?.filter((t) => t?.tabCode === 8)[0]?.count > 0 && (<li className="nav-item chiquvchi-nav" style={{ display: "block", marginLeft: "20px" }}>
                    <NavLink to="/chiquvchi2/tab/rad_etilgan" className="nav-link">
                        <i className="icon-laptop mr-1 sx-none"></i> Отклоненный
                    </NavLink>
                    {
                        count?.filter((t) => t?.tabCode === 8)[0]?.count !== 0 &&
                        <span className="badge1">{count?.filter((t) => t?.tabCode === 8)[0]?.count}</span>
                    }
                </li>)
            }
        </>
    )
}

export default React.memo(ChiquvchiNavbar2)