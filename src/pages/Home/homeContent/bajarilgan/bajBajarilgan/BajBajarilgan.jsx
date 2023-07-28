import React, { useEffect } from "react";
import BajBajarilganContent from "./bajBajarilganContent/BajBajarilganContent";
import { VisibleField } from "../../../../../component/visibleField/VisibleField";

const BajBajarilgan = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <BajBajarilganContent permission={permission} currentUser={currentUser} />
}

export default React.memo(BajBajarilgan);