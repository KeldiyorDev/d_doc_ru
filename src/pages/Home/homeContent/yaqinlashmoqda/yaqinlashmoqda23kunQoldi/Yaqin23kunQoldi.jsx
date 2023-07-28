import React, { useEffect } from "react";
import Yaqin23kunQoldiContent from "./yaqin23kunQoldiContent/Yaqin23kunQoldiContent";
import { VisibleField } from "../../../../../component/visibleField/VisibleField";

const Yaqin23kunQoldi = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <Yaqin23kunQoldiContent permission={permission} currentUser={currentUser} />
}

export default React.memo(Yaqin23kunQoldi);