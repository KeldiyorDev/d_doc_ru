import React, { useEffect } from "react";
import Bajarilmagan4kunKechContent from "./bajarilmagan4kunKechContent/Bajarilmagan4kunKechContent";
import { VisibleField } from "../../../../../component/visibleField/VisibleField";

const Bajarilmagan4kunKechikkan = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <Bajarilmagan4kunKechContent permission={permission} currentUser={currentUser} />
}

export default React.memo(Bajarilmagan4kunKechikkan);