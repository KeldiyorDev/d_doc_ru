import React, { useEffect } from "react";
import { VisibleField } from "../../../component/visibleField/VisibleField";
import ChiquvchiImzolashUchunContent from "./imzolashUchunContent/imzolashUchunContent";

const ChiquvchiImzolashUchun=({ currentUser, permission1, ranks })=> {

  useEffect(() => {
    VisibleField();
  }, [])

  return <ChiquvchiImzolashUchunContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(ChiquvchiImzolashUchun)