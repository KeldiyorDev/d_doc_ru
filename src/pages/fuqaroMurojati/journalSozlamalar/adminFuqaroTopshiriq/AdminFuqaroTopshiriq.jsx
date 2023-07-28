import React from "react";
import AdminTopshiriqContent from "./adminFuqaroTopshiriqContent/AdminFuqaroTopshiriqContent";
import AdminSidebar from "../../../../component/superAdminSidebar/adminSidebar/AdminSidebar";
import Navbar from "../../../../component/navbar/Navbar";

export default function FuqaroTopshiriq({  orgName, userData, setUserData, currentUser,image,permission1,ranks,roles }) {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar orgName={orgName} currentUser={currentUser} />

            <div className="page-content" style={{ height: "100%" }}>
                <AdminSidebar userData={userData} setUserData={setUserData} image={image} currentUser={currentUser} permission={permission1} ranks={ranks} roles={roles} />

                <div className="content-wrapper">
                    <div className="content-inner">
                        <AdminTopshiriqContent currentUser={currentUser} />
                    </div>
                </div>
            </div >
        </div>
    )
}