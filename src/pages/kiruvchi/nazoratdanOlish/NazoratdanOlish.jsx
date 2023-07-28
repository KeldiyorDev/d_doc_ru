import React, { useEffect } from "react";
import './nazoratdanOlish.css';
import NazoratdanOlishContent from "./nazoratdanOlishContent/NazoratdanOlishContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const NazoratdanOlish = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return <NazoratdanOlishContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(NazoratdanOlish);