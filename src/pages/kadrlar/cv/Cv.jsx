import React from "react";
import CvContent from "./cvContent/CvContent";

const Cv = ({ currentUser, permission1, ranks }) => {

    return <CvContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Cv)