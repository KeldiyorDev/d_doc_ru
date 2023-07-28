import React, { useEffect } from "react";
import Yaqin4kunQoldiContent from "./yaqin4kunQoldiContent/Yaqin4kunQoldiContent";
import { VisibleField } from "../../../../../component/visibleField/VisibleField";

const Yaqin4kunQoldi = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <Yaqin4kunQoldiContent permission={permission} currentUser={currentUser} />
}

export default React.memo(Yaqin4kunQoldi);