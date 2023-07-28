import React, { useEffect } from "react";
import BajarilganKechBerilganContent from "./bajarilganKechBerilganContent/BajarilganKechBerilganContent";
import { VisibleField } from "../../../../../component/visibleField/VisibleField";

const BajarilganKechBerilgan = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <BajarilganKechBerilganContent permission={permission} currentUser={currentUser} />
}

export default React.memo(BajarilganKechBerilgan);