import React from "react";
import SozlamaContent from "./sozlamaContent/SozlamaContent";

const Sozlama = ({ currentUser, permission1, ranks }) => {
  return <SozlamaContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Sozlama);