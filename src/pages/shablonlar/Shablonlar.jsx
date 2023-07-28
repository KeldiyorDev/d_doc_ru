import React from 'react';
import Navbar from '../../component/navbar/Navbar';
import ShablonContent from './shablonContent/ShablonContent';
import AllSidebarData from '../../component/allSidebarData/AllSidebarData';

export default function Shablonlar() {
    return (
        <div style={{ height: "100vh" }}>
            <Navbar />

            <div className="page-content" style={{ height: "100%" }}>
                <AllSidebarData />

                <div className="content-wrapper">
                    <div className="content-inner">
                        <ShablonContent />
                    </div>
                </div>
            </div >
        </div>
    )
}