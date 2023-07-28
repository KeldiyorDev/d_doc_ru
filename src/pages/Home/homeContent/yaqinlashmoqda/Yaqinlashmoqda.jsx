import React, { useEffect } from "react";
import YaqinlashmoqdaContent from "./yaqinlashmoqdaContent/YaqinlashmoqdaContent";
import { VisibleField } from "../../../../component/visibleField/VisibleField";

const Yaqinlashmoqda = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <YaqinlashmoqdaContent permission={permission} currentUser={currentUser} />
}

export default React.memo(Yaqinlashmoqda);