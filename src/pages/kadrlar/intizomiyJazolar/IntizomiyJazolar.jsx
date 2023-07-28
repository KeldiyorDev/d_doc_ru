import React from "react";
// import './Cv.css';
import IntizomiyJazolarContent from "./intizomiyJazolarContent/IntizomiyJazolarContent";
// import { VisibleField } from "../../../component/visibleField/VisibleField";

const IntizomiyJazolar = ({ currentUser, permission1, ranks }) => {

    // useEffect(() => {
    //     VisibleField();
    // }, []);

    return <IntizomiyJazolarContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(IntizomiyJazolar)