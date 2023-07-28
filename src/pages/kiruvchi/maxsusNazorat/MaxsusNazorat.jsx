import React, { useEffect } from "react";
import { VisibleField } from "../../../component/visibleField/VisibleField";
import MaxsusNazoratContent from "./MaxsusNazoratContent/MaxsusNazoratContent";

const MaxsusNazorat = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return <MaxsusNazoratContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(MaxsusNazorat);