import React, { useEffect } from "react";
import './resolutsiya.css';
import ResolutionContent from "./resolutionContent/ResolutionContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const Resolutsiya = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return (
    <ResolutionContent currentUser={currentUser} ranks={ranks} permission={permission1} />
  )
}

export default React.memo(Resolutsiya);