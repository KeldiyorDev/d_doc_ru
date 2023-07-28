import React from "react";
import KorishContent from "./korishContent/KorishContent";

const Korish = ({ currentUser, permission1, ranks }) => {
  return <KorishContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Korish);