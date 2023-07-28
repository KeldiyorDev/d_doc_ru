import React from 'react';
import { Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Vazifalarim from "../pages/Home/homeContent/vazifalarim/Vazifalarim";
import VazifalarYangi from "../pages/Home/homeContent/vazifalarim/vazifalarYangi/VazifalarYangi";
import VazifalarJarayonda from "../pages/Home/homeContent/vazifalarim/vazifalarJarayonda/VazifalarJarayonda";
import VazifalarNazoratda from "../pages/Home/homeContent/vazifalarim/vazifalarNazoratda/VazifalarNazoratda";
import Yaqinlashmoqda from "../pages/Home/homeContent/yaqinlashmoqda/Yaqinlashmoqda";
import Yaqinlashmoqda1kunQoldi from "../pages/Home/homeContent/yaqinlashmoqda/yaqinlashmoqda1kunQoldi/Yaqinlashmoqda1kunQoldi";
import Yaqin23kunQoldi from "../pages/Home/homeContent/yaqinlashmoqda/yaqinlashmoqda23kunQoldi/Yaqin23kunQoldi";
import Yaqin4kunQoldi from "../pages/Home/homeContent/yaqinlashmoqda/yaqinlashmoqda4kunQoldi/Yaqin4kunQoldi";
import Bajarilmagan from "../pages/Home/homeContent/bajarilmagan/Bajarilmagan";
import Bajarilmagan1kunKechikkan from "../pages/Home/homeContent/bajarilmagan/bajarilmagan1kunKechikkan/Bajarilmagan1kunKechikkan";
import Bajarilmagan23kunKechikkan from "../pages/Home/homeContent/bajarilmagan/bajarilmagan23kunKechikkan/Bajarilmagan23kunKechikkan";
import Bajarilmagan4kunKechikkan from "../pages/Home/homeContent/bajarilmagan/bajarilmagan4kunKechikkan/Bajarilmagan4kunKechikkan";
import BajarilganB from "../pages/Home/homeContent/bajarilgan/Bajarilgan";
import BajBajarilgan from "../pages/Home/homeContent/bajarilgan/bajBajarilgan/BajBajarilgan";
import BajarilganKechBerilgan from "../pages/Home/homeContent/bajarilgan/bajarilganKechBerilgan/BajarilganKechBerilgan";
import Controllyor from "../pages/Home/controllyor/Controllyor";
import Kiruvchi from "../pages/kiruvchi/Kiruvchi";
import Yangi from "../pages/kiruvchi/yangi/Yangi";
import YangiSozlama from "../pages/kiruvchi/yangi/yangiContent/yangiSozlama/YangiSozlama";
import Resolutsiya from "../pages/kiruvchi/resolutsiya/Resolutsiya";
import Sozlama from "../pages/kiruvchi/resolutsiya/resolutionContent/sozlama/Sozlama";
import Bajarish from "../pages/kiruvchi/bajarish/Bajarish";
import Nazorat from "../pages/kiruvchi/nazorat/Nazorat";
import Umumlashtiruvchi from "../pages/kiruvchi/umumlashtiruvchi/Umumlashtiruvchi";
import MalumotUchun from "../pages/kiruvchi/malumotUchun/MalumotUchun";
import Kechiktirilgan from "../pages/kiruvchi/kechiktirilgan/Kechiktirilgan";
import RadEtilgan from "../pages/kiruvchi/radetilgan/RadEtilgan";
import Bajarilgan from "../pages/kiruvchi/bajarilgan/Bajarilgan";
import NazoratdanOlish from "../pages/kiruvchi/nazoratdanOlish/NazoratdanOlish";
import Korish from "../pages/kiruvchi/resolutsiya/resolutionContent/korish/Korish";
import Ijro from "../pages/kiruvchi/bajarish/bajarishContent/ijro/Ijro";
import KengQidirish from "../pages/kengQidirish/KengQidirish";
import NotPermission from '../component/allSidebarData/sidebarSection/NotPermission';
import MaxsusNazorat from '../pages/kiruvchi/maxsusNazorat/MaxsusNazorat';
import MaxsusNazoratdanOlish from '../pages/kiruvchi/maxsusNazoratdanOlish/MaxsusNazoratdanOlish';

const VisibleLayout = ({
  visible,
  currentUser,
  permission,
  permissionUser,
  ranks,
  userRoles
}) => {

  // console.log(permissionUser);
  return (
    (visible) && (
      <>
        {/* home component */}
        <Route path="/vazifalar_barchasi" >
          <Vazifalarim permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/vazifalar_yangi" >
          <VazifalarYangi permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/vazifalar_jarayonda" >
          <VazifalarJarayonda permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/vazifalar_nazoratda" >
          <VazifalarNazoratda permission={permission} currentUser={currentUser} permission1={permissionUser} ranks={ranks} roles={userRoles} />
        </Route>
        <Route path="/yaqinlashmoqda_barchasi" >
          <Yaqinlashmoqda permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/yaqinlashmoqda_1kun-qoldi" >
          <Yaqinlashmoqda1kunQoldi permission={permission} currentUser={currentUser} permission1={permissionUser} ranks={ranks} roles={userRoles} />
        </Route>
        <Route path="/yaqinlashmoqda_2-3kun-qoldi" >
          <Yaqin23kunQoldi permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/yaqinlashmoqda_4~kun-qoldi" >
          <Yaqin4kunQoldi permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/bajarilmagan_barchasi" >
          <Bajarilmagan permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/bajarilmagan_1kun-kechikkan" >
          <Bajarilmagan1kunKechikkan permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/bajarilmagan_2-3kun-kechikkan" >
          <Bajarilmagan23kunKechikkan permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/bajarilmagan_4~kun-kechikkan" >
          <Bajarilmagan4kunKechikkan permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/bajarilgan_barchasi" >
          <BajarilganB permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/bajarilgan_bajarilganlar" >
          <BajBajarilgan permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/bajarilgan_kechiktirib-berilgan" >
          <BajarilganKechBerilgan permission={permission} currentUser={currentUser} />
        </Route>
        <Route path="/bosh_sahifa_ko'rish/:id/:name" exact>
          <Controllyor currentUser={currentUser} />
        </Route>

        {/* kiruvchi */}
        {permissionUser?.includes("YANGI QO'SHISH") &&
          <Route path="/kiruvchi" exact>
            <Kiruvchi currentUser={currentUser} permission1={permissionUser} ranks={ranks} roles={userRoles} />
          </Route>
        }
        {permissionUser?.includes("YANGI") &&
          <Route path="/kiruvchi/yangi">
            <Yangi currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
          </Route>
        }
        <Route path="/kiruvchi/sahifa-mavjud-emas">
          <NotPermission />
        </Route>
        <Route path="/kiruvchi/y/sozlash/:id/:name/:docId" exact>
          <YangiSozlama currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/y/sozlash/:missiveId" exact>
          <YangiSozlama currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/resolution">
          <Resolutsiya currentUser={currentUser} permission1={permissionUser} ranks={ranks} roles={userRoles} />
        </Route>
        <Route path="/kiruvchi/sozlash/:id/:name" exact>
          <Sozlama currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/bajarish">
          <Bajarish currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/nazorat">
          <Nazorat currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/maxsusNazorat">
          <MaxsusNazorat currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/umumlashtiruvchi">
          <Umumlashtiruvchi currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/ma'lumot-uchun">
          <MalumotUchun currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/kechiktirilgan">
          <Kechiktirilgan currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/radetilgan">
          <RadEtilgan currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/bajarilgan">
          <Bajarilgan currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/nazoratdan-olish">
          <NazoratdanOlish currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi/maxsusNazoratdanOlish">
          <MaxsusNazoratdanOlish currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi_resolution_kurish/:id" >
          <Korish currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>
        <Route path="/kiruvchi_bajarish_ijro/:id/:name" exact>
          <Ijro currentUser={currentUser} permission1={permissionUser} ranks={ranks} />
        </Route>

        {/* keng qidirish */}
        <Route path="/qidirish">
          <KengQidirish currentUser={currentUser} />
        </Route>
      </>
    )
  )
};

export default VisibleLayout;