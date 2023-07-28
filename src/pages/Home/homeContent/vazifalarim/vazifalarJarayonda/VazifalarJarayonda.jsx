import React, { useEffect } from "react";
import VazifalarJarayondaContent from "./vazifalarJarayondaContent/VazifalarJarayondaContent";
import { VisibleField } from "../../../../../component/visibleField/VisibleField";

const VazifalarJarayonda = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <VazifalarJarayondaContent permission={permission} currentUser={currentUser} />
}

export default React.memo(VazifalarJarayonda);