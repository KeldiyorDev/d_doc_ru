import React, { useEffect } from "react";
import { VisibleField } from "../../../component/visibleField/VisibleField";
// import ChiquvchiJarayondaContent from "./chiquvchiJarayondaContent/chiquvchiJarayondaContent";
import ChiquvchiTasdiqlashUchunContent from "./tasdiqlashUchunContent/tashdiqlashUchunContent";
const ChiquvchiTasdiqlashUchun=({ currentUser, permission1, ranks })=> {

  useEffect(() => {
    VisibleField();
  }, [])

  return <ChiquvchiTasdiqlashUchunContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(ChiquvchiTasdiqlashUchun)