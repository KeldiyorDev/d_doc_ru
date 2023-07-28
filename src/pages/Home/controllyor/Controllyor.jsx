import React from "react";
import ControllyorContent from "./controllyorContent/ControllyorContent";

const BajarilganB = ({ currentUser }) => {
  return <ControllyorContent currentUser={currentUser} />
}

export default React.memo(BajarilganB);