import React from "react";
import { Route } from "react-router-dom";
import FuqaroMurojati from "../pages/fuqaroMurojati/FuqaroMurojati";
import FuqaroMurojatYangi from "../pages/fuqaroMurojati/FuqaroMurojatYangi/FuqaroMurojatYangi";
import Xomaki from "../pages/fuqaroMurojati/xomaki/Xomaki";
import XomakiKurishContent from "../pages/fuqaroMurojati/xomaki/xomakiContent/Ko'rish/XomakiKurishContent";
import FuqaroMurojatiBajarish from "../pages/fuqaroMurojati/fuqaroMurojatiBajarish/FuqaroMurojatiBajarish";
import FuqaroNazorat from "../pages/fuqaroMurojati/fuqaroNazorat/FuqaroNazorat";
import FuqaroKechiktirilgan from "../pages/fuqaroMurojati/fuqaroKechiktirilgan/FuqaroKechiktirilgan";
import FuqaroBajarilgan from "../pages/fuqaroMurojati/fuqaroBajarilgan/FuqaroBajarilgan";
import Yuborilgan from "../pages/fuqaroMurojati/yuborilgan/Yuborilgan";
import FuqaroNazoratdanOlish from "../pages/fuqaroMurojati/nazoratdanOlish/NazoratdanOlish";
import FuqaroRezalutsiyaKurish from "../pages/fuqaroMurojati/fuqaroRezalutsiyaKurish/FuqaroRezalutsiyaKurish";
import FuqaroIjro from "../pages/fuqaroMurojati/fuqaroMurojatiBajarish/fuqaroMurojatiBajarishContent/ijro/Ijro";
import FuqaroElektronKitob from "../pages/fuqaroMurojati/journalSozlamalar/AdminFuqaroElektronKitob";
import FuqaroFaollar from "../pages/fuqaroMurojati/journalSozlamalar/adminFuqaroFaollar/AdminFuqaroFaollar";
import FQMYangiKurish from "../pages/fuqaroMurojati/FuqaroMurojatYangi/FuqaroMurojatYangiContent/Ko'rish/FQM_YangiEdit";
import FuqaroArxivContent
  from "../pages/fuqaroMurojati/journalSozlamalar/adminFuqaroArxiv/adminFuqaroArxivContent/AdminFuqaroArxivContent";
import FuqaroBarchasiDetailContent
  from "../pages/fuqaroMurojati/journalSozlamalar/adminFuqaroKurish/adminFuqaroKurishContent/AdminFuqaroKurishContent";
import FuqaroArxivKurishContent
  from "../pages/fuqaroMurojati/journalSozlamalar/adminFuqaroArxiv/adminFuqaroArxivKurish/adminFuqaroArxivKurishContent/AdminFuqaroArxivKurishContent";
import FuqaroRezolution from "../pages/fuqaroMurojati/fuqaroRezalutsiyaKurish/fuqaroRez";
import FuqaroResolutionKorish from "../pages/fuqaroMurojati/fuqaroRezalutsiyaKurish/FuqaroRezalutsiyaKurish";
import FuqaroBajarilmagan from "../pages/fuqaroMurojati/fuqaroBajarilmagan/fuqaroBajarilmagan";
import FuqaroUmumlashtiruvchi from "../pages/fuqaroMurojati/fuqaroUmumlashtiruvchi/fuqaroUmumlashtiruvchi";
import FuqaroMalumotUchun from "../pages/fuqaroMurojati/fuqaroMalumotUchun/fuqaroMalumotUchun";
import FuqaroRadEtilgan from "../pages/fuqaroMurojati/fuqaroRadEtilgan/fuqaroRadEtilgan";
// import AdminFaollarContent
//     from "../pages/superadmin/admin/adminElektronKitob/adminFaollar/adminFaollarContent/AdminFaollarContent";
// import LoginOther from "../pages/LoginOther/LoginOther";
// import AdminTopshiriqContent
//     from "../pages/superadmin/admin/adminElektronKitob/adminTopshiriq/adminTopshiriqContent/AdminTopshiriqContent";
import AdminFQTopshiriqlarContent
  from "../pages/superadmin/admin/adminElektronKitob/adminTopshiriq/adminFQTopshiriqContent/adminFQTopshiriqContent";

export default function CitizenAppeal({ currentUser, permissionUser, ranks }) {
  return (
    currentUser && (
      <>
        <Route path="/fuqaro/murojati" exact>
          <FuqaroMurojati currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/yangi" exact>
          <FuqaroMurojatYangi currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/yangi/:id">
          <FQMYangiKurish currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/xomaki" exact>
          <Xomaki currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/xomaki/rezolutsyaga_tayyorlash/:id">
          <XomakiKurishContent currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/xomaki/yangilash/:id">
          <XomakiKurishContent edit={true} currentUser={currentUser} permission={permissionUser}
            ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/rezalutsiya" exact>
          <FuqaroRezolution currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/rezalutsiya/:id" exact>
          <FuqaroResolutionKorish currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/malumotUchun" exact>
          <FuqaroMalumotUchun currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/radEtilgan" exact>
          <FuqaroRadEtilgan currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/bajarishUchun">
          <FuqaroMurojatiBajarish currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/nazorat">
          <FuqaroNazorat currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/kechiktirilgan">
          <FuqaroKechiktirilgan currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/bajarilgan">
          <FuqaroBajarilgan currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/bajarilmagan">
          <FuqaroBajarilmagan currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/umumlashtiruvchi">
          <FuqaroUmumlashtiruvchi currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/yuborilgan">
          <Yuborilgan currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/nazoratdanOlish">
          <FuqaroNazoratdanOlish currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/rezalutsiya/kurish/:id">
          <FuqaroRezalutsiyaKurish currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/bajarish_ijro/:id/:name">
          <FuqaroIjro currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/elektron-kitob" exact>
          <FuqaroElektronKitob currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/elektron-kitob-faollar">
          <FuqaroFaollar currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/elektron-kitob-arxiv">
          <FuqaroArxivContent currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojat/elektron-kitob-ko'rish/:id">
          <FuqaroBarchasiDetailContent currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojat/elektron-kitob-arxiv-ko'rish/:id">
          <FuqaroArxivKurishContent currentUser={currentUser} permission={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/fuqaro/murojati/elektron-kitob-topshiriqlar/:id" >
          <AdminFQTopshiriqlarContent currentUser={currentUser} />
        </Route>
      </>
    )
  )
}