import React from 'react';
import Navbar from '../../../component/navbar/Navbar';
import OfficeManagerSidebar from '../../../component/superAdminSidebar/officeManager/OfficeManagerSidebar';
import OfficeManagerContent from './officeManagerContent/OfficeManagerContent';

export default function OfficeManager() {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />

      <div className="page-content" style={{ height: "100%" }}>
        <OfficeManagerSidebar />
        <div className="content-wrapper">
          <div className="content-inner">
            <OfficeManagerContent />
          </div>
        </div>
      </div >
    </div>
  )
}
