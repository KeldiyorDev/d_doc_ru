import React, { useEffect } from "react";
import BajarilmaganContent from "./bajarilmaganContent/BajarilmaganContent";
import { VisibleField } from "../../../../component/visibleField/VisibleField";

const Bajarilmagan = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <BajarilmaganContent permission={permission} currentUser={currentUser} />
}

export default React.memo(Bajarilmagan);