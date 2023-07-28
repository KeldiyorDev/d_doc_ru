import React from 'react';
import Navbar from '../../../component/navbar/Navbar';
import FoySozlamalariContent from './foySozlamalariContent/FoySozlamalariContent';
import AllSidebarData from '../../../component/allSidebarData/AllSidebarData';

export default function FoydalanuvchiSozlamalari({ orgName, currentUser, permission1, ranks, roles }) {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar orgName={orgName} currentUser={currentUser} />

            <div className="page-content" style={{ height: "100%" }}>
                <AllSidebarData currentUser={currentUser} permission={permission1} ranks={ranks} roles={roles} />
                <div className="content-wrapper">
                    <div className="content-inner">
                        <FoySozlamalariContent currentUser={currentUser} />
                    </div>
                </div>
            </div >
        </div>
    )
}