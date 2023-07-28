import React, { useEffect } from "react";
import './kechiktirilgan.css';
import KechiktirilganContent from "./kechiktirilganContent/KechiktirilganContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const Kechiktirilgan = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return <KechiktirilganContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Kechiktirilgan);