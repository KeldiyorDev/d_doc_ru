import React from "react";
import { Route } from "react-router-dom";
import ChiquvchiContent from "../pages/chiquvchi/chiquvchiContent/chiquvchiContent";
import ChiquvchiXomaki from "../pages/chiquvchi/xomaki/chiquvchiXomaki";
import ChiquvchiJarayonda from "../pages/chiquvchi/jarayonda/jatayonda";
import ChiquvchiTasdiqlashUchunContent
    from "../pages/chiquvchi/tasdiqlashUchun/tasdiqlashUchunContent/tashdiqlashUchunContent";
import ChiquvchiYuborilgan from "../pages/chiquvchi/yuborilgan/yuborilgan";
import ChiquvchiXomakiKurishContent from "../pages/chiquvchi/xomaki/ko'rishContent/ko'rishContent";
import ChiquvchiXomakiEditContent from "../pages/chiquvchi/xomaki/xomakiEdit/xomakiEdit";
import ChiquvchiImzolashUchun from "../pages/chiquvchi/imzolashUchun/iImzolashUchun";
import ChiquvchiTasdiqlangan from "../pages/chiquvchi/tasdiqlangan/tasdiqlangan";
import ChiquvchiImzolangan from "../pages/chiquvchi/imzolangan/iImzolangan";
import ChiquvchiYangi from "../pages/chiquvchi/chiquvchiYangi/chiquvchiYangi";
import ChiquvchiShablonlarContent from "../pages/chiquvchi/chiquvchiShablonlar/chiquvchiShablonlarContent";
import ChiquvchiElektronKitob from "../pages/chiquvchi/journalSozlamalar/AdminChiquvchiElektronKitob";
import ChiquvchiArxivContent
    from "../pages/chiquvchi/journalSozlamalar/adminChiquvchiArxiv/adminFuqaroArxivContent/AdminFuqaroArxivContent";
import ChiquvchiBarchasiDetailContent
    from "../pages/chiquvchi/journalSozlamalar/adminChiquvchiKurish/adminChiquvchiKurishContent/AdminFuqaroKurishContent";
import ChiquvchiArxivKurishContent
    from "../pages/chiquvchi/journalSozlamalar/adminChiquvchiArxiv/adminChiquvchiArxivKurish/adminChiquvchiArxivKurishContent/AdminChiquvchiArxivKurishContent";
import AdminChiquvchiTopshiriqlarContent
    from "../pages/chiquvchi/journalSozlamalar/adminChiquvchiTopshiriq/adminChiquvchiTopshiriqContent/AdminChiquvchiTopshiriqContent";
import ChiquvchiFaollar from "../pages/chiquvchi/journalSozlamalar/adminChiquvchiFaollar/AdminChiquvchiFaollar";

export default function Outgoing({ currentUser, permission, ranks, permissionUser }) {
    // console.log(permission)
    // console.log(ranks)
    // console.log(permissionUser)
    return (
        currentUser && (
            <>
                <Route path="/chiquvchi/yangi" exact>
                    <ChiquvchiContent currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                {/*<Route path="/chiquvchi/:name" >*/}
                {/*    <ChiquvchiMenu currentUser={currentUser} permission={permission} ranks={ranks}/>*/}
                {/*</Route>*/}
                <Route path="/chiquvchi/yangi/versiya/:id">
                    <ChiquvchiYangi currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/xomaki" exact>
                    <ChiquvchiXomaki currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/homaki/edit/:id">
                    <ChiquvchiXomakiEditContent currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                {/* <Route path="/chiquvchi/xomaki/tahrirlash/:id" exact>
                    <ChiquvchiXomaki currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route> */}
                <Route path="/chiquvchi/jarayonda">
                    <ChiquvchiJarayonda currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/tasdiqlash_uchun">
                    <ChiquvchiTasdiqlashUchunContent currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/imzolash_uchun">
                    <ChiquvchiImzolashUchun currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/tasdiqlangan">
                    <ChiquvchiTasdiqlangan currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/yuborilgan">
                    <ChiquvchiYuborilgan currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/imzolangan">
                    <ChiquvchiImzolangan currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/ko'rish/:name/:id" exact>
                    <ChiquvchiXomakiKurishContent currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/shablon/yaratish" exact>
                    <ChiquvchiShablonlarContent currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/elektron-kitob" exact>
                    <ChiquvchiElektronKitob currentUser={currentUser} permission={permissionUser} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/elektron-kitob-faollar">
                    <ChiquvchiFaollar currentUser={currentUser} permission={permissionUser} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/elektron-kitob-arxiv">
                    <ChiquvchiArxivContent currentUser={currentUser} permission={permissionUser} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/elektron-kitob-ko'rish/:id">
                    <ChiquvchiBarchasiDetailContent currentUser={currentUser} permission={permissionUser} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/elektron-kitob-arxiv-ko'rish/:id">
                    <ChiquvchiArxivKurishContent currentUser={currentUser} permission={permissionUser} ranks={ranks} />
                </Route>
                <Route path="/chiquvchi/elektron-kitob-topshiriqlar/:id" >
                    <AdminChiquvchiTopshiriqlarContent currentUser={currentUser} permission={permission} ranks={ranks} />
                </Route>

            </>
        )
    )
}