import React from 'react';
import Navbar from '../../component/navbar/Navbar';
import UmumiyContent from './umumiyContent/UmumiyContent';
import AllSidebarData from '../../component/allSidebarData/AllSidebarData';

export default function UmumiyMalumotlar() {
  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div className="page-content" style={{ height: "100%" }}>
        <AllSidebarData />

        <div className="content-wrapper">
          <div className="content-inner">
            <UmumiyContent />
          </div>
        </div>

      </div >
    </div>
  )
}