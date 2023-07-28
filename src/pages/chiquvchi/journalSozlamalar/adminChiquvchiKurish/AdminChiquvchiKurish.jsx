import React from "react"
import AdminSidebar from "../../../../component/superAdminSidebar/adminSidebar/AdminSidebar";
import Navbar from "../../../../component/navbar/Navbar";
import ChiquvchiBarchasiDetailContent from "./adminChiquvchiKurishContent/AdminFuqaroKurishContent";

export default function ChiquvchiKurish({ orgName, currentUser, permission1, ranks, roles }) {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar orgName={orgName} currentUser={currentUser} />

            <div className="page-content" style={{ height: "100%" }}>
                <AdminSidebar currentUser={currentUser} permission={permission1} ranks={ranks} roles={roles} />
                <div className="content-wrapper">
                    <div className="content-inner">
                        <ChiquvchiBarchasiDetailContent itemsPerPage={6} currentUser={currentUser} />
                    </div>
                </div>
            </div >
        </div>
    )
}