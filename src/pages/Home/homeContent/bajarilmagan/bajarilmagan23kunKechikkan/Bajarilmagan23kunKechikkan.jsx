import React, { useEffect } from "react";
import Bajarilmagan23kunKechContent from "./bajarilmagan23kunKechContent/Bajarilmagan23kunKechContent";
import { VisibleField } from "../../../../../component/visibleField/VisibleField";

const Bajarilmagan23kunKechikkan = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <Bajarilmagan23kunKechContent permission={permission} currentUser={currentUser} />
}

export default React.memo(Bajarilmagan23kunKechikkan);