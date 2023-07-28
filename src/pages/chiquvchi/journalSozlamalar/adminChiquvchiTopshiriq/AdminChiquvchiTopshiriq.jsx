import React from "react";
import AdminSidebar from "../../../../component/superAdminSidebar/adminSidebar/AdminSidebar";
import Navbar from "../../../../component/navbar/Navbar";
import AdminChiquvchiTopshiriqlarContent from "./adminChiquvchiTopshiriqContent/AdminChiquvchiTopshiriqContent";

export default function ChiquvchiTopshiriq({  orgName, userData, setUserData, currentUser,image,permission1,ranks,roles }) {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar orgName={orgName} currentUser={currentUser} />

            <div className="page-content" style={{ height: "100%" }}>
                <AdminSidebar userData={userData} setUserData={setUserData} image={image} currentUser={currentUser} permission={permission1} ranks={ranks} roles={roles} />

                <div className="content-wrapper">
                    <div className="content-inner">
                        <AdminChiquvchiTopshiriqlarContent currentUser={currentUser} />
                    </div>
                </div>
            </div >
        </div>
    )
}