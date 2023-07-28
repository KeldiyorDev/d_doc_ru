import React, { useEffect } from "react";
import Yaqin1kunQoldiContent from "./yaqin1kunQoldiContent/Yaqin1kunQoldiContent";
import { VisibleField } from "../../../../../component/visibleField/VisibleField";

const Yaqinlashmoqda1kunQoldi = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <Yaqin1kunQoldiContent permission={permission} currentUser={currentUser} />
}

export default React.memo(Yaqinlashmoqda1kunQoldi);