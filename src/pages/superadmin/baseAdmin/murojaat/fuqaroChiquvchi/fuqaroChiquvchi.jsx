import React from 'react';
import Navbar from '../../../../../component/navbar/Navbar';
import AdminSidebar from "../../../../../component/superAdminSidebar/adminSidebar/AdminSidebar";
import FuqaroChiquvchiContent from "./fuqaroChiquvchiContent/fuqaroChiquvchiContent";

export default function FuqaroChiquvchi() {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />

      <div className="page-content" style={{ height: "100%" }}>
        <AdminSidebar />
        <div className="content-wrapper">
          <div className="content-inner">
            <FuqaroChiquvchiContent />
          </div>
        </div>
      </div >
    </div>
  )
}