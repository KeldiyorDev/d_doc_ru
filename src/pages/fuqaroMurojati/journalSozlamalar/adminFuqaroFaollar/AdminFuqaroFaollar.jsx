import React from "react";
import FuqaroFaollarContent from "./adminFuqaroFaollarContent/AdminFuqaroFaollarContent";

const FuqaroFaollar = ({ currentUser }) => {
  return <FuqaroFaollarContent currentUser={currentUser} />
}

export default React.memo(FuqaroFaollar)