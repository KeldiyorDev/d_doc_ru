import React from "react";
import Navbar from "../../../../component/navbar/Navbar";
import MurojaatContent from "./murojaatContent/MurojaatContent";
import AdminSidebar from "../../../../component/superAdminSidebar/adminSidebar/AdminSidebar";

export default function Murojaat() {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div className="page-content" style={{ height: "100%" }}>
        <AdminSidebar />
        <div className="content-wrapper">
          <div className="content-inner">
            <MurojaatContent />
          </div>
        </div>
      </div >
    </div>
  )
}