import React from "react";
import MehnatDaftarchasiContent from "./mehnatDaftarchasiContent/MehnatDaftarchasiContent";

const MehnatDaftarchasi = ({ currentUser, permission1, ranks }) => {

  return <MehnatDaftarchasiContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(MehnatDaftarchasi)