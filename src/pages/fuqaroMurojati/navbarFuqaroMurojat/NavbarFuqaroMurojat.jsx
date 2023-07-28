import React, {useEffect, useState} from "react";
import {NavLink} from 'react-router-dom';
import {axiosInstanceFq} from "../../../config";
import '../../kiruvchi/contentNavbar/contentNavbar.css';

export default function NavbarFuqaroMurojat({currentUser, permission, ranks}) {
    console.log(ranks)
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
        yangi: 0,
        xomaki: 0,
    });

    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                const res = await axiosInstanceFq.get("inExecutor/listCount/" + JSON.parse(localStorage.getItem('ids')) + '/' + JSON.parse(localStorage.getItem('oi')))
                console.log(res.data.data)
                if (isMounted)
                    setCount(res.data.data);
            } catch (error) {
                console.log(error.response);
            }
        }
        getData();

        // console.log(Math.floor(Math.random() *2000))

        return () => {
            isMounted = false;
        }
    }, [currentUser]);

    return (
        <>
            {
                (ranks?.includes(8)) && (
                    <li className="nav-item" style={{marginLeft: "20px"}}>
                        <NavLink exact to="/fuqaro/murojati" activeClassName="NavLinkLi"
                                 className="nav-link d-flex align-items-center">
                            <i className="icon-plus2 mr-1"/> Yangi Qo'shish
                        </NavLink>
                    </li>
                )
            }
            {
                (count?.yangi !== 0 && ranks?.includes(8)) && (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/yangi" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-newspaper mr-1"/> Yangi
                    </NavLink>
                    <span className="badge1">{count?.yangi}</span>
                </li>)
            }
            {
                ((ranks?.includes(8)) && (count?.xomaki !== 0)) &&
                (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/xomaki" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-newspaper mr-1"/> Xomaki
                    </NavLink>
                    <span className="badge1">{count?.xomaki}</span>
                </li>)
            }
            {
                ((ranks?.includes(8) || ranks?.includes(1)|| ranks?.includes(2)|| ranks?.includes(3)|| ranks?.includes(4)) && (count?.rezalutsiya !== 0)) &&
                (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/rezalutsiya" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-user-plus mr-1"/> Rezalutsiya
                    </NavLink>
                    <span className="badge1">{count?.rezalutsiya}</span>
                </li>)
            }

            {
                (count?.bajarishUchun !== 0) && (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/bajarishUchun" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-pen mr-1"/> Bajarish Uchun
                    </NavLink>
                    <span className="badge1">{count?.bajarishUchun}</span>
                </li>)
            }
            {
                (count?.nazoratda !== 0) && (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/nazorat" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-laptop mr-1"/> Nazoratda
                    </NavLink>
                    <span className="badge1">{count?.nazoratda}</span>
                </li>)
            }

            {/*<li className="nav-item">*/}
            {/*    <NavLink exact to="/fuqaro/murojati/kechiktirilgan" activeClassName="NavLinkLi"*/}
            {/*             className="nav-link d-flex align-items-center">*/}
            {/*        <i className="icon-calendar mr-1"/> Kechiktirilgan*/}
            {/*    </NavLink>*/}
            {/*</li>*/}

            {
                (count?.bajarilgan !== 0) && (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/bajarilgan" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-check mr-1"/> Bajarilgan
                    </NavLink>
                    <span className="badge1">{count?.bajarilgan}</span>
                </li>)
            }

            {
                (count?.umumlashtiruvchi !== 0) && (<li className="nav-item" style={{marginLeft: "20px"}}>
                    <NavLink exact to="/fuqaro/murojati/umumlashtiruvchi" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-calendar mr-1"/> Umumlashtiruvchi
                    </NavLink>
                    <span className="badge1">{count?.umumlashtiruvchi}</span>
                </li>)
            }


            {/*<li className="nav-item">*/}
            {/*    <NavLink exact to="/fuqaro/murojati/yuborilgan" activeClassName="NavLinkLi"*/}
            {/*             className="nav-link d-flex align-items-center">*/}
            {/*        <i className="icon-file-upload mr-1"/> Yuborilgan*/}
            {/*    </NavLink>*/}
            {/*</li>*/}

            {
                (count?.bajarilmagan !== 0) && (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/bajarilmagan" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-check mr-1"/> Bajarilmagan
                    </NavLink>
                    <span className="badge1">{count?.bajarilmagan}</span>
                </li>)
            }

            {
                (count?.nazoratdanOlish !== 0) &&
                (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/nazoratdanOlish" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-user-check mr-1"/> Nazoratdan Olish
                    </NavLink>
                    <span className="badge1">{count?.nazoratdanOlish}</span>
                </li>)
            }

            {
                (count?.malumotUchun !== 0) && (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/malumotUchun" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-user-check mr-1"/> Ma'lumot uchun
                    </NavLink>
                    <span className="badge1">{count?.malumotUchun}</span>
                </li>)
            }

            {
                (count?.radEtilgan !== 0) && (<li className="nav-item">
                    <NavLink exact to="/fuqaro/murojati/radEtilgan" activeClassName="NavLinkLi"
                             className="nav-link d-flex align-items-center">
                        <i className="icon-user-check mr-1"/> Rad etilgan
                    </NavLink>
                    <span className="badge1">{count?.radEtilgan}</span>
                </li>)
            }


        </>
    )
}