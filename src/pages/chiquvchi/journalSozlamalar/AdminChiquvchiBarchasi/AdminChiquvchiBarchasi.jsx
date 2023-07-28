import React from "react";
import AdminSidebar from "../../../../component/superAdminSidebar/adminSidebar/AdminSidebar";
import Navbar from "../../../../component/navbar/Navbar";
import ChiquvchiBarchasiContent from "./AdminChiquvchiBarchasiContent/AdminBarchasiContent";

export default function FuqaroBarchasi({  orgName, currentUser}) {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar orgName={orgName} currentUser={currentUser} />

            <div className="page-content" style={{ height: "100%" }}>
                <AdminSidebar currentUser={currentUser} />

                <div className="content-wrapper">
                    <div className="content-inner">
                        <ChiquvchiBarchasiContent currentUser={currentUser} />
                    </div>
                </div>
            </div >
        </div>
    )
}