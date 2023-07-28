import React from "react";
import FuqaroIjroContent from "./ijroContent/IjroContent";

const FuqaroIjro = ({currentUser, permission1, ranks}) => {
    return <FuqaroIjroContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}
export default React.memo(FuqaroIjro)