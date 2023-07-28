import React, { useEffect } from "react";
import './bajarish.css';
import BajarishContent from "./bajarishContent/BajarishContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const Bajarish = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return <BajarishContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Bajarish);