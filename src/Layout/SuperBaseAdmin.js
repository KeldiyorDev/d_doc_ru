import React from "react";
import { Route } from "react-router-dom";
import BaseSozJurnallarContent from "../pages/superadmin/baseAdmin/baseSozlamalar/baseSozJurnallar/baseSozJurnallarContent/BaseSozJurnallarContent";
import BaseSozKorresContent from "../pages/superadmin/baseAdmin/baseSozlamalar/baseSozKorrespandent/baseSozKorresContent/BaseSozKorresContent";
import BaseSozlamalarContent from "../pages/superadmin/baseAdmin/baseSozlamalar/baseSozlamalarContent/BaseSozlamalarContent";
import BaseSozRezalutsiyaContent from "../pages/superadmin/baseAdmin/baseSozlamalar/baseSozRezalutsiya/baseSozRezalutsiyaContent/BaseSozRezalutsiyaContent";
import BaseSozTaqdimFormaContent from "../pages/superadmin/baseAdmin/baseSozlamalar/baseSozTaqdimForma/baseSozTaqdimFormaContent/BaseSozTaqdimFormaContent";
import FakeContent from "../pages/superadmin/baseAdmin/fake/fakeContent/FakeContent";
import HududContent from "../pages/superadmin/baseAdmin/hudud/hududContent/HududContent";
import AdminKorishContent from "../pages/superadmin/baseAdmin/hudud/korish/AdminKorishContent/AdminKorishContent";
import ShahartumanContent from "../pages/superadmin/baseAdmin/hudud/shahartuman/shahartumanContent/ShahartumanContent";
import ViloyatlarContent from "../pages/superadmin/baseAdmin/hudud/viloyatlar/viloyatlarContent/ViloyatlarContent";
import KartochkaQushishContent from "../pages/superadmin/baseAdmin/kartochkaQushish/kartochkaQushishContent/KartochkaQushishContent";
import ModullarContent from "../pages/superadmin/baseAdmin/modullar/modullarContent/ModullarContent";
import OrgContent from "../pages/superadmin/baseAdmin/Org/orgContent/orgContent";
import BoshqaRollarContent from "../pages/superadmin/baseAdmin/rollar/boshqaRollar/boshqaRollarContent/BoshqaRollarContent";
import RollarContent from "../pages/superadmin/baseAdmin/rollar/rollarContent/RollarContent";
import XodimRollariContent from "../pages/superadmin/baseAdmin/rollar/xodimRollari/xodimRollariContent/XodimRollariContent";
import MurojaatFormasiContent from "../pages/superadmin/baseAdmin/SozlamalarHudud/MurojaatFormasi/MurojaatFormasiContent/MurojaatFormasiContent";
import MurojaatMaqsadiContent from "../pages/superadmin/baseAdmin/SozlamalarHudud/MurojaatMaqsadi/MurojaatMaqsadiContent/MurojaatMaqsadiContent";
import MurojaatTuriContent from "../pages/superadmin/baseAdmin/SozlamalarHudud/MurojatTuri/MurojatTuriContent/MurojatTuriContent";
import QabulxonaContent from "../pages/superadmin/baseAdmin/SozlamalarHudud/Qabulxona/QabulxonaContent/QabulxonaContent";
import AdministratsiyaContent from "../pages/superadmin/baseAdmin/tashkilotQushish/tashkilotKurish/administratsiya/administratsiyaContent/AdministratsiyaContent";
import CardSozlamaContent from "../pages/superadmin/baseAdmin/tashkilotQushish/tashkilotKurish/cardSozlama/cardSozlamaContent/CardSozlamaContent";
import ModulSozlamaContent from "../pages/superadmin/baseAdmin/tashkilotQushish/tashkilotKurish/modulSozlama/modulSozlamaContent/ModulSozlamaContent";
import TashkilotKurishContent from "../pages/superadmin/baseAdmin/tashkilotQushish/tashkilotKurish/tashkilotKurishContent/TashkilotKurishContent";
import TashkilotQushishContent from "../pages/superadmin/baseAdmin/tashkilotQushish/tashkilotQushishContent/TashkilotQushishContent";
import XabarnomaContent from "../pages/superadmin/baseAdmin/xabarnoma/xabarnomaContent/XabarnomaContent";
import Login from "../pages/superadmin/login/Login";
import JournalsContent from "../pages/superadmin/baseAdmin/journals/journalsContent/journalsContent";
import Tasnif1Content from "../pages/superadmin/baseAdmin/journals/Tasnif1/Tasnif1Content/Tasnif1Content";
import Tasnif2Content from "../pages/superadmin/baseAdmin/journals/Tasnif2/Tasnif2Content/Tasnif2Content";

export default function SuperBaseAdmin({ role, currentUser }) {

  return (
    <>
      {/* super admin */}
      <Route path="/darico777">
        {role === "base_admin" ? <TashkilotQushishContent tab={false} currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin" exact>
        {role === "base_admin" ? <TashkilotQushishContent tab={false} currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_tashkilot-ko'rish">
        {role === "base_admin" ? <AdminKorishContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_tashkilot-qushish">
        {role === "base_admin" ? <TashkilotQushishContent tab={false} currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_tashkilot-qushish/:stir">
        {role === "base_admin" ? <TashkilotQushishContent tab={false} currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_tashkilotlar-tuzilishi/:id">
        {role === "base_admin" ? <TashkilotKurishContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin-administratsiya/:id">
        {role === "base_admin" ? <AdministratsiyaContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_modul-sozlama/:id">
        {role === "base_admin" ? <ModulSozlamaContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_card-sozlama/:id">
        {role === "base_admin" ? <CardSozlamaContent currentUser={currentUser} /> : <Login />}
      </Route>

      {/* super admin sozlamalar */}
      <Route path="/super_base_admin_sozlamalar">
        {role === "base_admin" ? <BaseSozlamalarContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_sozlamalar-korrespandent">
        {role === "base_admin" ? <BaseSozKorresContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_sozlamalar_tadqim-etish-formasi">
        {role === "base_admin" ? <BaseSozTaqdimFormaContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_sozlamalar-rezalutsiya">
        {role === "base_admin" ? <BaseSozRezalutsiyaContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_sozlamalar-jurnallar">
        {role === "base_admin" ? <BaseSozJurnallarContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin-modullar">
        {role === "base_admin" ? <ModullarContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin-kartochka">
        {role === "base_admin" ? <KartochkaQushishContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin-fake">
        {role === "base_admin" ? <FakeContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin-org">
        {role === "base_admin" ? <OrgContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_rollar">
        {role === "base_admin" ? <RollarContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_xodim-rollari">
        {role === "base_admin" ? <XodimRollariContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_boshqa-rollar">
        {role === "base_admin" ? <BoshqaRollarContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_hudud">
        {role === "base_admin" ? <HududContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_hudud-viloyatlar">
        {role === "base_admin" ? <ViloyatlarContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_murojaat_formasi">
        {role === "base_admin" ? <MurojaatFormasiContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_murojaat_turi">
        {role === "base_admin" ? <MurojaatTuriContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_murojaat_maqsadi">
        {role === "base_admin" ? <MurojaatMaqsadiContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_qabulxona">
        {role === "base_admin" ? <QabulxonaContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_hudud-shahar-tuman">
        {role === "base_admin" ? <ShahartumanContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_xabarnoma">
        {role === "base_admin" ? <XabarnomaContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_journals_tasnif3">
        {role === "base_admin" ? <JournalsContent currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_journals_tasnif1">
        {role === "base_admin" ? <Tasnif1Content currentUser={currentUser} /> : <Login />}
      </Route>
      <Route path="/super_base_admin_journals_tasnif2">
        {role === "base_admin" ? <Tasnif2Content currentUser={currentUser} /> : <Login />}
      </Route>
    </>
  )
}