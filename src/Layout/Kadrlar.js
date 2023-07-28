import React from "react";
import { Route, useLocation } from "react-router-dom";
import UserInfo from "../pages/kadrlar/components/UserInfo";
import Cv from "../pages/kadrlar/cv/Cv";
import KadrlarTable from "../pages/kadrlar/kadrlarTable/KadrlarTable";
import Malumoti from "../pages/kadrlar/malumoti/Malumoti";
import MehnatDaftarchasi from "../pages/kadrlar/mehnatDaftarchasi/MehnatDaftarchasi";
import Qarindoshlar from "../pages/kadrlar/qarindoshlar/Qarindoshlar";


export default function KadrlarRoutes({ currentUser, permissionUser, ranks }) {
  const location = useLocation();

  console.log(location.pathname);

  return (
    currentUser && (
      <>
        {location.pathname.split('/')[1] === "kadrlar" && (
          <div className="content mb-5">
            <div className="card" style={{ marginTop: "15px", padding: "15px", display: "flex !important" }}>
              {(location.pathname.split('/')[1] === "kadrlar" && location.pathname?.split('/')[3]?.length > 16) && <UserInfo location={location} />}
              <Route path="/kadrlar/:name/:id/mehnat_daftarchasi" exact>
                <MehnatDaftarchasi currentUser={currentUser} permission={permissionUser} ranks={ranks} />
              </Route>

              {/* <Route path="/kadrlar/:name/:id/malumoti" exact>
                <Malumoti currentUser={currentUser} permission={permissionUser} ranks={ranks} />
              </Route> */}

              <Route path="/kadrlar/:name/:id/qarindoshlar" exact>
                <Qarindoshlar currentUser={currentUser} permission={permissionUser} ranks={ranks} />
              </Route>

              <Route path="/kadrlar/:name/:id/cv" exact>
                <Cv currentUser={currentUser} permission={permissionUser} ranks={ranks} />
              </Route>


              {/* <Route path="/kadrlar" exact>
                <KadrlarTable currentUser={currentUser} permission={permissionUser} ranks={ranks} />
              </Route> */}

              <Route path="/kadrlar/:name" exact>
                <KadrlarTable currentUser={currentUser} permission={permissionUser} ranks={ranks} />
              </Route>
            </div>
          </div>
        )}
      </>
    )
  )
}