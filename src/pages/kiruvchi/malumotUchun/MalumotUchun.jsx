import React, { useEffect } from "react";
import MalumotUchunContent from "./malumotUchunContent/MalumotUchunContent";
import { VisibleField } from "../../../component/visibleField/VisibleField";

const MalumotUchun = ({ currentUser, permission1, ranks }) => {

  useEffect(() => {
    VisibleField();
  }, []);

  return <MalumotUchunContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(MalumotUchun);