import React from 'react';
import Navbar from '../../../component/navbar/Navbar';
import TashkiliyTuzilmaContent from './tashkiliyTuzilmaContent/TashkiliyTuzilmaContent';
import AllSidebarData from '../../../component/allSidebarData/AllSidebarData';

export default function TashkiliyTuzilma({ orgName, currentUser, permission1, ranks, roles }) {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar orgName={orgName} currentUser={currentUser} />

            <div className="page-content" style={{ height: "100%" }}>
                <AllSidebarData currentUser={currentUser} permission={permission1} ranks={ranks} roles={roles} />

                <div className="content-wrapper">
                    <div className="content-inner">
                        <TashkiliyTuzilmaContent currentUser={currentUser} />
                    </div>
                </div>
            </div >
        </div>
    )
}