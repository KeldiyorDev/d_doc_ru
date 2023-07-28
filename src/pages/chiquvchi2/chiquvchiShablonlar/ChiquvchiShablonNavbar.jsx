import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { axiosInstanceOut } from '../../../config';
import '../chiquvchi2.css'

const ChiquvchiShablonNavbar = ({ currentUser }) => {
    const location = useLocation()
    console.log(location);

    const [data, setData] = useState()

    const isEdit = location?.pathname?.split("/")[location?.pathname?.split("/").length - 1]
    console.log(isEdit);

    useEffect(() => {
        let isMounted = true;

        const getData = async () => {
            try {
                const res = await axiosInstanceOut.get(`template/all/` + JSON.parse(localStorage.getItem('ids')) + "/" + JSON.parse(localStorage.getItem('oi')));
                setData(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
        }
    }, []);

    return (
        <>
            <li className="nav-item" >
                <NavLink to="/chiquvchi2/shablon/yaratish" className="nav-link " activeClassName='NavLinkLi' style={{ marginLeft: "20px" }}>
                    <i className="icon-plus2 mr-1 sx-none"></i> Добавить новое
                </NavLink>
            </li>

            {data?.length > 0 && <li className="nav-item" >
                <NavLink to="/chiquvchi2/shablon/mavjud" className="nav-link " activeClassName='NavLinkLi'>
                    <i className="icon-file-check mr-1 sx-none"></i> Доступные шаблоны
                </NavLink>
            </li>}

            {isEdit === "edit" && <li className="nav-item" >
                <NavLink to="/chiquvchi2/shablon/edit" className="nav-link " activeClassName='NavLinkLi'>
                    <i className="icon-pencil5 mr-1 sx-none"></i> Изменять
                </NavLink>
            </li>}
        </>
    );
};

export default ChiquvchiShablonNavbar;