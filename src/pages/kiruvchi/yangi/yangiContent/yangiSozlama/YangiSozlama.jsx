import React from "react";
import YangiSozlamaContent from "./yangiSozlamaContent/YangiSozlamaContent";

const YangiSozlama = ({ currentUser, permission1, ranks }) => {
  return <YangiSozlamaContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(YangiSozlama);