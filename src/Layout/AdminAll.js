import React from "react";
import { Route } from "react-router-dom";
import LoginOther from "../pages/LoginOther/LoginOther";
import Admin from "../pages/superadmin/admin/Admin";
import AdminAsosiyBannerContent from "../pages/superadmin/admin/adminContent/adminAsosiyBanner/adminAsosiyBannerContent/AdminAsosiyBannerContent";
import AdminBuyruqBannerContent from "../pages/superadmin/admin/adminContent/adminBuyruqBanner/adminBuyruqBannerContent/AdminBuyruqBannerContent";
import AdminFishkaContent from "../pages/superadmin/admin/adminContent/adminFishka/adminFishkaContent/AdminFishkaContent";
import AdminFoydalanuvchiContent from "../pages/superadmin/admin/adminContent/adminFoydalanuvchi/adminFoydalanuvchiContent/AdminFoydalanuvchiContent";
import AdminIshStoliContent from "../pages/superadmin/admin/adminContent/adminIshStoli/adminIshStoliContent/AdminIshStoliContent";
import AdminLavozimContent from "../pages/superadmin/admin/adminContent/adminLavozim/adminLavozimContent/AdminLavozimContent";
import AdminArxivContent from "../pages/superadmin/admin/adminElektronKitob/adminArxiv/adminArxivContent/AdminArxivContent";
import AdminArxivKurishContent from "../pages/superadmin/admin/adminElektronKitob/adminArxiv/adminArxivKurish/adminArxivKurishContent/AdminArxivKurishContent";
import AdminBarchasiContent from "../pages/superadmin/admin/adminElektronKitob/AdminBarchasi/AdminBarchasiContent/AdminBarchasiContent";
import AdminElektronKitobContent from "../pages/superadmin/admin/adminElektronKitob/adminElektronKitobContent/AdminElektronKitobContent";
import AdminFaollarContent from "../pages/superadmin/admin/adminElektronKitob/adminFaollar/adminFaollarContent/AdminFaollarContent";
import AdminKurishContent from "../pages/superadmin/admin/adminElektronKitob/adminKurish/adminKurishContent/AdminKurishContent";
import AdminTopshiriqContent from "../pages/superadmin/admin/adminElektronKitob/adminTopshiriq/adminTopshiriqContent/AdminTopshiriqContent";
import MavjudPaketlarContent from "../pages/superadmin/admin/adminPaketlar/mavjudPaketlar/mavjudPaketlarContent/MavjudPaketlarContent";
import UmumiyPaketlarContent from "../pages/superadmin/admin/adminPaketlar/umumiyPaketlar/umumiyPaketlarContent/UmumiyPaketlarContent";
import AdminSozlamalarContent from "../pages/superadmin/admin/adminSozlamalar/adminSozlamalarContent/AdminSozlamalarContent";
import MavjudTashkilotlarContent from "../pages/superadmin/admin/adminTashkilotlar/mavjudTashkilotlar/mavjudTashkilotlarContent/mavjudTashkilotlarContent";
import UmumiyTashkilotlarContent from "../pages/superadmin/officeManager/movjudDocument/mavjudTashkilotlar/mavjudTashkilotlarContent/mavjudTashkilotlarContent";
// import Chiquvchi from "../pages/chiquvchi/Chiquvchi";
import ChiquvchiFishkaContent from "../pages/chiquvchi/adminFishka/adminFishkaContent/AdminFishkaContent";

export default function AdminAll({ currentUser, role }) {
  return (
    <>
      <Route path="/super_admin" exact>
        {role === "admin" ? <Admin currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_elektron-kitob-barchasi" >
        {role === "admin" ? <AdminBarchasiContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_elektron-kitob" >
        {role === "admin" ? <AdminElektronKitobContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_elektron-kitob-faollar" >
        {role === "admin" ? <AdminFaollarContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_elektron-kitob-arxiv" >
        {role === "admin" ? <AdminArxivContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_elektron-kitob-ko'rish/:id" >
        {role === "admin" ? <AdminKurishContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_elektron-kitob-arxiv-ko'rish/:id" >
        {role === "admin" ? <AdminArxivKurishContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_elektron-kitob-topshiriqlar/:id" >
        {role === "admin" ? <AdminTopshiriqContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_lavozim" >
        {role === "admin" ? <AdminLavozimContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_foydalanuvchi" >
        {role === "admin" ? <AdminFoydalanuvchiContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_ish-stoli" >
        {role === "admin" ? <AdminIshStoliContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_fishka" >
        {role === "admin" ? <AdminFishkaContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_asosiy-banner" >
        {role === "admin" ? <AdminAsosiyBannerContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_buyruq-banner" >
        {role === "admin" ? <AdminBuyruqBannerContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin_sozlamalar" >
        {role === "admin" ? <AdminSozlamalarContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin/umumiy/paketlar" >
        {role === "admin" ? <UmumiyPaketlarContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin/mavjud/paketlar" >
        {role === "admin" ? <MavjudPaketlarContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin/umumiy/tashkilotlar" >
        {role === "admin" ? <UmumiyTashkilotlarContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
      <Route path="/super_admin/mavjud/tashkilotlar" >
        {role === "admin" ? <MavjudTashkilotlarContent currentUser={currentUser} /> : <LoginOther />}
      </Route>
        <Route path="/chiquvchi/super_admin_fishka" >
            {role === "admin" ? <ChiquvchiFishkaContent currentUser={currentUser} /> : <LoginOther />}
        </Route>
    </>
  )
}