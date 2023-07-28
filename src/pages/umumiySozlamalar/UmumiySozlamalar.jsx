import React from "react";
import Navbar from "../../component/navbar/Navbar";
import UmumiySozContent from "./umumiySozContent/UmumiySozContent";
import AllSidebarData from '../../component/allSidebarData/AllSidebarData';

export default function UmumiySozlamalar({ orgName, currentUser, permission1, ranks, roles }) {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar orgName={orgName} currentUser={currentUser} />

            <div className="page-content" style={{ height: "100%" }}>
                <AllSidebarData currentUser={currentUser} permission={permission1} ranks={ranks} roles={roles} />

                <div className="content-wrapper">
                    <div className="content-inner">
                        <UmumiySozContent currentUser={currentUser} />
                    </div>
                </div>

            </div >
        </div>
    )
}