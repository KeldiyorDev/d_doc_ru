import React, { useEffect } from "react";
import { VisibleField } from "../../../component/visibleField/VisibleField";
import ChiquvchiImzolanganContent from "./imzolanganContent/imzolanganContent";

const ChiquvchiImzolangan=({ currentUser, permission1, ranks })=> {

  useEffect(() => {
    VisibleField();
  }, [])

  return <ChiquvchiImzolanganContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(ChiquvchiImzolangan)