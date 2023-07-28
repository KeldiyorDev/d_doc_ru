import React from 'react';
import Navbar from '../../../../../component/navbar/Navbar';
import FuqaroSavollariContent from './fuqaroSavollariContent/FuqaroSavollariContent';
import AdminSidebar from "../../../../../component/superAdminSidebar/adminSidebar/AdminSidebar";

export default function FuqaroSavollari() {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar />

            <div className="page-content" style={{ height: "100%" }}>
                <AdminSidebar />
                <div className="content-wrapper">
                    <div className="content-inner">
                        <FuqaroSavollariContent />
                    </div>
                </div>
            </div >
        </div>
    )
}