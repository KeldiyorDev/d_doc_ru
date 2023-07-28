import React, { useEffect } from "react";
import './yangi.css';
import YangiContent from "./yangiContent/YangiContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const Yangi = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return (
    <YangiContent currentUser={currentUser} permission={permission1} ranks={ranks} />
  )
}

export default React.memo(Yangi);