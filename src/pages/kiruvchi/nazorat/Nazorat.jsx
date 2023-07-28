import React, { useEffect } from "react";
import NazoratContent from "./NazoratContent/NazoratContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const Nazorat = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return <NazoratContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Nazorat);