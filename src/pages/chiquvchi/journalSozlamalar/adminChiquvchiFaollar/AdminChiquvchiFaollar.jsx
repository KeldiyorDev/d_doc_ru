import React from "react";
import ChiquvchiFaollarContent from "./adminChiquvchiFaollarContent/AdminFuqaroFaollarContent";

const ChiquvchiFaollar = ({ currentUser }) => {
  return <ChiquvchiFaollarContent currentUser={currentUser} />
}

export default React.memo(ChiquvchiFaollar)