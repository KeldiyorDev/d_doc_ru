import React, { useEffect } from "react";
import './bajarilgan.css';
import BajarilganContent from "./bajarilganContent/BajarilganContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const Bajarilgan = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <BajarilganContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Bajarilgan);