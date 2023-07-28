import React, { useEffect } from "react";
import './maxsusNazoratdanOlish.css';
import { VisibleField } from "../../../component/visibleField/VisibleField";
import MaxsusNazoratdanOlishContent from "./maxsusNazoratdanOlishContent/MaxsusNazoratdanOlishContent";

const MaxsusNazoratdanOlish = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return <MaxsusNazoratdanOlishContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(MaxsusNazoratdanOlish);