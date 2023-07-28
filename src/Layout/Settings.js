import React from "react";
import { Route } from "react-router-dom";
import MavjudPaketlarContentOfficeMeneger from "../pages/superadmin/officeManager/movjudDocument/mavjudPaketlar/mavjudPaketlarContent/mavjudPaketlarContent";
import UmumiyTashkilotlarContentOfficeMeneger from "../pages/superadmin/officeManager/movjudDocument/mavjudTashkilotlar/mavjudTashkilotlarContent/mavjudTashkilotlarContent";
import SozlamalarKorrespondentContent from "../pages/sozlamalar/sozlamalarKorrespondent/SozKorrespondentContent/SozKorrespondentContent";
import TaqdimFormasiContent from "../pages/sozlamalar/taqdimFormasi/taqdimFormasiContent/TaqdimFormasiContent";
import TezkorRezalutContent from "../pages/sozlamalar/tezkorRezalut/tezkorRezolutContent/TezkorRezalutContent";

export default function Settings({ userRoles, currentUser, role }) {
  return (
    (userRoles.includes("office_manager") || role === "admin") && (
      <>
        <Route path="/office_manager/mavjud/paketlar">
          <MavjudPaketlarContentOfficeMeneger currentUser={currentUser} />
        </Route>
        <Route path="/office_manager/Umumiy/tashkilotlar">
          <UmumiyTashkilotlarContentOfficeMeneger currentUser={currentUser} />
        </Route>
        <Route path="/sozlamalar_korrespondent">
          <SozlamalarKorrespondentContent currentUser={currentUser} />
        </Route>
        <Route path="/sozlamalar_taqdim-formasi">
          <TaqdimFormasiContent currentUser={currentUser} />
        </Route>
        <Route path="/sozlamalar_tezkor-rezolutsiya">
          <TezkorRezalutContent currentUser={currentUser} />
        </Route>
      </>
    )
  )
}