import React from "react";
import { NavLink, useParams } from 'react-router-dom';

export default function KadrlarNavbar({ currentUser, permission, ranks }) {

    const { id } = useParams()
    const { name } = useParams()

    return (
        <>

            <li className="nav-item" style={{ marginLeft: "20px" }}>
                <NavLink exact to={`/kadrlar/${name}/${id}/mehnat_daftarchasi`} activeClassName="NavLinkLi"
                    className="nav-link d-flex align-items-center">
                    <i className="icon-magazine mr-1" /> Mehnat daftarchasi
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink exact to={`/kadrlar/${name}/${id}/qarindoshlar`} activeClassName="NavLinkLi"
                    className="nav-link d-flex align-items-center">
                    <i className="icon-users4 mr-1" /> Qarindoshlar
                </NavLink>
            </li>

            <li className="nav-item">
                <NavLink exact to={`/kadrlar/${name}/${id}/cv`} activeClassName="NavLinkLi"
                    className="nav-link d-flex align-items-center">
                    <i className="icon-vcard mr-1" /> Cv/Obyektivka
                </NavLink>
            </li>

            {/* <li className="nav-item">
                <NavLink exact to={`/kadrlar/${name}/${id}/malumoti`} activeClassName="NavLinkLi"
                    className="nav-link d-flex align-items-center">
                    <i className="icon-certificate mr-1" /> Ma'lumoti
                </NavLink>
            </li> */}
        </>
    )
}