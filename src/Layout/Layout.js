import React, { useState } from 'react';
import { Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Admin from "../pages/superadmin/admin/Admin";
import LoginOther from "../pages/LoginOther/LoginOther";
import Faq from "../pages/umumiyMalumotlar/Faq";
import NotFound500 from "../pages/notfound500/Notfound500";
import AllSidebarData from "../component/allSidebarData/AllSidebarData";
import AdminNavbar from "../component/superAdminSidebar/adminSidebar/AdminSidebar";
// import UmumiySozContent from "../pages/umumiySozlamalar/umumiySozContent/UmumiySozContent";
// import TashkiliyTuzilmaContent from "../pages/umumiySozlamalar/tashkiliyTuzilma/tashkiliyTuzilmaContent/TashkiliyTuzilmaContent";
// import ModulSozlamalariContent from "../pages/umumiySozlamalar/modulSozlamalari/modulSozlamalariContent/ModulSozlamalariContent";
// import FoySozlamalariContent from "../pages/umumiySozlamalar/foydalanuvchiSozlamalari/foySozlamalariContent/FoySozlamalariContent";
import VisibleLayout from "./VisibleLayout";
import Monitoring from "./Monitoring";
import BaseAdminNavbar from '../component/superAdminSidebar/baseAdminSidebar/BaseAdminSidebar';
import SuperBaseAdmin from './SuperBaseAdmin';
import AdminAll from './AdminAll';
import Table from "../component/table/Table";
import Navbar from "../component/navbar/Navbar";
import HomeContent from '../pages/Home/homeContent/HomeContent';
import CitizenAppeal from './CitizenAppeal';
import Archive from './Archive';
import Outgoing from './Outgoing';
// import Personnel from './Personnel';
import Settings from './Settings';
import KadrlarRoutes from './Kadrlar';
import ChiquvchiRoute from './ChiquvchiRoute';
// import Templates from './Templates';
// import GeneralInformation from './GeneralInformation';

let roles = [
  "boss_1",
  "boss_2",
  "boss_3",
  "chief_of_group",
  "controller",
  "head_of_department",
  "human_resources",
  "office_manager",
  "employee",
  "security",
];

// let supperAdmin= {id:61,middleName:"BAHRONOVICH",birthDate:"1987-07-04",userName:null,birthPlace:"VOBKENT TUMANI",birthCountry:"VOBKENT TUMANI",mobileNumber:"+998(86) 524-26-66",email:"bx52@inbox.ru",firstName:"SOBIR",lastName:"ABDULLOYEV",file:{id:12302,filePath:"/home/database/files/1/05eafdb2-1a73-4d95-a308-be69afac37e4.png",originalName:"Screenshot_1.png",extention:"image/png",generatedName:"05eafdb2-1a73-4d95-a308-be69afac37e4.png",size:8097,isActive:true,orderNumber:null},token:null,userPositions:[],userRoles:[],permissions:[],organizations:[{id:232,orgId:1,orgName:"Buxoro viloyat hokimligi",isAttached:true,orderNumber:59}]},
//     id: 61,
//     workPlaces: [
//         {orgId:1,orgName:"Buxoro viloyat hokimligi",workPlaces:[
//             {id:281,
//               userPositionName:"mudiri",
//               userRoles:[
//                   {id:10,
//                     systemName:"office_manager",
//                     orderNumber:10,
//                     rank:8,
//                     name:"Devonxona",
//                     isActive:true,
//                     orgId:null}
//               ],
//               departmentName:null,
//               permissions:[
//                   {id:7,
//                     name:"KENG QIDIRISH",
//                     orderNumber:7,
//                     deleted:false
//                   }
//                 ,{id:2,
//                   name:"YANGI",
//                   orderNumber:2,
//                   deleted:false
//                 },
//                 {
//                   id:3,
//                   name:"YANGI QO'SHISH",
//                   orderNumber:1,
//                   deleted:false
//                 },{id:5,
//                   name:"RESOLUTSIYA",
//                   orderNumber:5,
//                   deleted:false
//                 },{
//               id:1,
//                   name:"NAZORATDAN OLISH",
//                   orderNumber:2,
//                   deleted:false
//             }]}],
//           userRoles:[]},
//     ],
//     iat: 1664165596,
//     exp: 1664179996
// }

const Layout = ({ currentUser }) => {
  const [simpleUser, setSimpleUser] = useState(false);
  const [userAdmin, setUserAdmin] = useState(false);

  // token ichidan rolni ajratib olish
  let role = "", userRoles = [], visible = false, monitoringVisible = false, permission = false, permissionUser = [], ranks = [];
  if (currentUser) {
    const token = jwtDecode(currentUser);
    role = JSON.parse(token?.supperAdmin)?.userRoles[0]?.systemName;
    if (token?.workPlaces?.length > 0) {
      let result = [];
      let arr = JSON.parse(token?.workPlaces);
      arr?.forEach((d) => {
        d.workPlaces?.forEach((f) => {
          if (JSON.parse(localStorage.getItem('ids')) === f.id) {
            f.permissions.forEach((h) => {
              permissionUser.push(h?.name);
            })
            f.userRoles?.forEach((t) => {
              result.push(t?.systemName);
              ranks.push(t?.rank);
            })
          }
        })
      })
      userRoles = result;

      if (JSON.parse(localStorage.getItem('ids'))) {
        visible = (userRoles.includes("boss_1") || userRoles.includes("boss_2") || userRoles.includes("boss_3") || userRoles.includes("chief_of_group") || userRoles.includes("controller") || userRoles.includes("head_of_department") || userRoles.includes("human_resources") || userRoles.includes("office_manager") || userRoles.includes("employee"));
        monitoringVisible = (userRoles.includes("boss_1") || userRoles.includes("boss_2") || userRoles.includes("boss_3") || userRoles.includes("controller") || userRoles.includes("head_of_department") || userRoles.includes("office_manager"));
      }

      // permission dan bosh sahifa bor yoki yo'qligini aniqlash
      let per = arr.find((a) => a.id === JSON.parse(localStorage.getItem('ids')));
      permission = !!per?.permissions?.find((b) => b.name === "BOSH SAHIFA");
    }
  }
  // console.log(userRoles)
  // console.log(roles)

  return (
    <>
      {/* navbar */}
      {currentUser && (
        <Navbar currentUser={currentUser} setSimpleUser={setSimpleUser} setUserAdmin={setUserAdmin} />
      )}

      <div className="page-content" style={{ height: "100%" }}>
        {(role === "admin" && (userAdmin || !JSON.parse(localStorage.getItem('ids')))) ? (
          <AdminNavbar currentUser={currentUser} />
        ) : (role === "base_admin") ? (
          <BaseAdminNavbar currentUser={currentUser} />
        ) : (currentUser && (simpleUser || JSON.parse(localStorage.getItem('ids')))) && (
          <AllSidebarData currentUser={currentUser} permission1={permissionUser} ranks={ranks} roles={userRoles} />
        )}

        <div className="content-wrapper">
          <div className="content-inner">
            <Route path="/" exact>
              {visible ? (
                <HomeContent
                  ranks={ranks}
                  currentUser={currentUser}
                />
              ) : role === "admin" ? (
                <Admin
                  currentUser={currentUser}
                />
              ) : <LoginOther setSimpleUser={setSimpleUser} setUserAdmin={setUserAdmin} />}
            </Route>

            <VisibleLayout
              visible={visible}
              currentUser={currentUser}
              permission={permission}
              permissionUser={permissionUser}
              userRoles={userRoles}
              ranks={ranks}
            />

            {/* fuqaro murojaati */}
            <CitizenAppeal
              currentUser={currentUser}
              permissionUser={permissionUser}
              ranks={ranks}
            />

            {/* arxiv */}
            <Archive
              currentUser={currentUser}
            />

            {/* chiquvchi */}
            <Outgoing
              currentUser={currentUser}
              permission={permission}
              ranks={ranks}
              permissionUser={permissionUser}
            />

            {/* chiquvchi */}
            <ChiquvchiRoute
              currentUser={currentUser}
              permission={permission}
              ranks={ranks}
              permissionUser={permissionUser}
            />


            {/* sozlamalar */}
            <Settings
              currentUser={currentUser}
              userRoles={userRoles}
              role={role}
            />

            {/* kadrlar */}
            {/* <Personnel
              userRoles={userRoles}
              currentUser={currentUser}
            /> */}

            {/* shablonlar o'chirilmasin */}
            {/* <Templates
              currentUser={currentUser}
            /> */}

            {/* umumiy malumotlar */}
            {/* <GeneralInformation
              currentUser={currentUser}
            /> */}

            {/* umumiy sozlamalar -> o'chirilmasin*/}
            {/* <Route path="/umumiySozlamalar" exact>
              <UmumiySozContent currentUser={currentUser} />
            </Route>
            <Route path="/umumiySozlamalar_tashkiliy-tuzilma">
              <TashkiliyTuzilmaContent currentUser={currentUser} />
            </Route>
            <Route path="/umumiySozlamalar_modul-sozlamalari">
              <ModulSozlamalariContent currentUser={currentUser} />
            </Route>
            <Route path="/umumiySozlamalar_foydalanuvchi-sozlamalari">
              <FoySozlamalariContent currentUser={currentUser} />
            </Route> */}

            {/* monitoring */}
            <Monitoring
              monitoringVisible={monitoringVisible}
              currentUser={currentUser}
              role={role}
              userRoles={userRoles}
              permission={permission}
            />

            {/* kiruvchidagi pastki ma'lumotlar */}
            <Route path={'/kiruvchi/tab'}>
              <Table />
            </Route>

            {/* super base admin login page */}
            <SuperBaseAdmin
              role={role}
              currentUser={currentUser}
            />

            {/* admin */}
            <AdminAll
              role={role}
              currentUser={currentUser}
            />

            <KadrlarRoutes
              role={role}
              currentUser={currentUser}
            />


            {/* masalan userRoles = ["boss_1", "controller"] maksimal 2 ta rol bo'lishi mumkin, buni workPlace ichidan o'qib olamiz */}
            {/* super admin va admin dan tashqari qolgan barcha rollar uchun bu component ochiladi */}
            <Route path="/sahifa/asosiy" exact handler={AllSidebarData}>
              {(userRoles?.length > 0 && (roles.includes(userRoles[0]) || roles.includes(userRoles[1]) || roles.includes(userRoles[2]) || roles.includes(userRoles[3])) ? <HomeContent ranks={ranks} currentUser={currentUser} /> : <LoginOther />)}
            </Route>

            {/* FAQ */}
            <Route path="/FAQ">
              {(role === "admin" || role === "base_admin" || visible) && <Faq />}
            </Route>

            {/* NotFound500 */}
            <Route path="/page-not-found-500">
              {(role === "admin" || role === "base_admin" || visible) && <NotFound500 />}
            </Route>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;