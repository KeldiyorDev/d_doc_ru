import React from 'react';
import { Route } from "react-router-dom";
// monitoring 1
import MonitoringContent from "../pages/monitoring/monitoringContent/MonitoringContent";
import NazoratKarMalContent from "../pages/monitoring/nazoratKartochkaMalumot/nazoratKarMalContent/NazoratKarMalContent";
import MonitoringKiruvchiContent from "../pages/monitoring/monitoringKiruvchi/moniitoringKiruvchiContent/MonitoringKiruvchiContent";
import NazoratKartochkaContent from "../pages/monitoring/nazoratKartochka/nazoratKartochkaContent/NazoratKartochkaContent";
import TestContent from "../pages/monitoring/test/testContent/TestContent";
import SvodkaContent from "../pages/monitoring/svodka/svodkaContent/SvodkaContent";
import SvodkaContentQVC from "../pages/monitoring/svodkaQVC/svodkaQVCContent/SvodkaQVCContent";
import SvodakaNewContent from "../pages/monitoring/svodakaNew/svodakaNewContent/SvodakaNewContent";
import Content1A from '../pages/monitoring/1a/1aContent/Content1A';
import Hisobot from '../pages/monitoring/hisobot/Hisobot';
// monitoring 2
import MonitoringKiruvchi from '../pages/monitoring2/monitoringKiruvchi/MonitoringKiruvchi';
import MonitoringCantrolCard from '../pages/monitoring2/monitoringControlCard/MonitoringCantrolCard';
import MonitoringControlCardInformation from '../pages/monitoring2/monitoringControlCardInformation/MonitoringControlCardInformation';
import HigherOrganization1 from '../pages/monitoring2/higherOrganization1/HigherOrganization1';
import Report from '../pages/monitoring2/report/Report';

const Monitoring = ({ monitoringVisible, currentUser, role, userRoles }) => {
  // monitoringVisible && jwtDecode(currentUser)?.sub === "AB7157422")
  return (
    (currentUser) && (
      <>
        {/* monitoring */}
        <Route path="/monitoring" exact>
          <MonitoringContent currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_nazorat-kartochka-malumot/">
          <NazoratKarMalContent currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_kiruvchi">
          <MonitoringKiruvchiContent currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_nazorat-kartochka">
          <NazoratKartochkaContent currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_test">
          <TestContent />
        </Route>
        <Route path="/monitoring_svodka">
          <SvodkaContent currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_svodka_qvc">
          <SvodkaContentQVC currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_svodaka-new">
          <SvodakaNewContent />
        </Route>
        <Route path="/monitoring_yuqori_tashkilot_1a">
          <Content1A currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_umumiy-hisobot">
          <Hisobot currentUser={currentUser} />
        </Route>

        {/* monitoring 2*/}
        <Route path="/monitoring_kiruvchi_2">
          <MonitoringKiruvchi currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_nazorat-kartochka_2">
          <MonitoringCantrolCard currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_nazorat-kartochka-malumot_2">
          <MonitoringControlCardInformation currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_yuqori_tashkilot_1a_2">
          <HigherOrganization1 currentUser={currentUser} />
        </Route>
        <Route path="/monitoring_umumiy-hisobot_2">
          <Report currentUser={currentUser} />
        </Route>
      </>
    )
  )
}

export default Monitoring;










