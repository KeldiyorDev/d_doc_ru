import React, { useEffect } from "react";
import UmumlashtiruvchiContent from "./umumlashtiruvchiContent/UmumlashtiruvchiContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const Umumlashtiruvchi = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return <UmumlashtiruvchiContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Umumlashtiruvchi);