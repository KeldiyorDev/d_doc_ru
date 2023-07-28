import React from "react";
import IjroContent from "./ijroContent/IjroContent";

const Ijro = ({ currentUser, permission1, ranks }) => {
  return <IjroContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Ijro);