import React from 'react';
import Navbar from '../../../component/navbar/Navbar';
import ModulSozlamalariContent from './modulSozlamalariContent/ModulSozlamalariContent';
import AllSidebarData from '../../../component/allSidebarData/AllSidebarData';

export default function ModulSozlamalari({ orgName, currentUser, permission1, ranks, roles }) {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar orgName={orgName} currentUser={currentUser} />

            <div className="page-content" style={{ height: "100%" }}>
                <AllSidebarData currentUser={currentUser} permission={permission1} ranks={ranks} roles={roles} />

                <div className="content-wrapper">
                    <div className="content-inner">
                        <ModulSozlamalariContent currentUser={currentUser} />
                    </div>
                </div>
            </div >
        </div>
    )
}