import React from 'react';
import Navbar from '../../../component/navbar/Navbar';
import SecuritySidebar from '../../../component/superAdminSidebar/security/SecuritySidebar';
import SecurityContent from './securityContent/SecurityContent';

export default function Security() {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />

      <div className="page-content" style={{ height: "100%" }}>
        <SecuritySidebar />
        <div className="content-wrapper">
          <div className="content-inner">
            <SecurityContent />
          </div>
        </div>
      </div >
    </div>
  )
}
