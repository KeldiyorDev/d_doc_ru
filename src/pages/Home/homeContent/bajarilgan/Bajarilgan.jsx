import React, { useEffect } from "react";
import BajarilganContent from "./bajarilganContent/BajarilganContent";
import { VisibleField } from "../../../../component/visibleField/VisibleField";

const BajarilganB = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <BajarilganContent permission={permission} currentUser={currentUser} />
}

export default React.memo(BajarilganB);