import React from "react";
import ChiquvchiElektronKitobContent from "./adminChiquvchiElektronKitobContent/AdminChiquvchiElektronKitobContent";

const ChiquvchiElektronKitob = ({ currentUser }) => {
  return <ChiquvchiElektronKitobContent currentUser={currentUser} />
}
export default React.memo(ChiquvchiElektronKitob)