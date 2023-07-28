import React from "react";
import Navbar from "../../../../../component/navbar/Navbar";
import FuqaroArxivKurishContent from "./adminFuqaroArxivKurishContent/AdminFuqaroArxivKurishContent";
import AdminSidebar from "../../../../../component/superAdminSidebar/adminSidebar/AdminSidebar";

export default function FuqaroArxivKurish({ orgName, currentUser, permission1, ranks, roles }) {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar orgName={orgName} currentUser={currentUser} />

      <div className="page-content" style={{ height: "100%" }}>
        <AdminSidebar currentUser={currentUser} permission={permission1} ranks={ranks} roles={roles} />

        <div className="content-wrapper">
          <div className="content-inner">
            <FuqaroArxivKurishContent currentUser={currentUser} />
          </div>
        </div>
      </div >
    </div>
  )
}