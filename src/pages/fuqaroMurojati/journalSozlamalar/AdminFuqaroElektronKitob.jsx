import React from "react";
import FuqaroElektronKitobContent from "./adminFuqaroElektronKitobContent/AdminFuqaroElektronKitobContent";

const FuqaroElektronKitob = ({ currentUser }) => {
  return <FuqaroElektronKitobContent currentUser={currentUser} />
}
export default React.memo(FuqaroElektronKitob)