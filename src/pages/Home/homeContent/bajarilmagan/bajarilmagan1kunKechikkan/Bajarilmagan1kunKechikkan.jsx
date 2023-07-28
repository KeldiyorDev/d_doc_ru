import React, { useEffect } from "react";
import Bajarilmagan1kunKechContent from "./bajarilmagan1kunKechContent/Bajarilmagan1kunKechContent";
import { VisibleField } from "../../../../../component/visibleField/VisibleField";

const Bajarilmagan1kunKechikkan = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <Bajarilmagan1kunKechContent permission={permission} currentUser={currentUser} />
}

export default React.memo(Bajarilmagan1kunKechikkan);