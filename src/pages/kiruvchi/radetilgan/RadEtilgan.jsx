import React, { useEffect } from "react";
import './radetilgan.css';
import RadEtilganContent from "./radEtilganContent/RadEtilganContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const RadEtilgan = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return <RadEtilganContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(RadEtilgan);