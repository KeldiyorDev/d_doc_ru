import React from "react";
import RagbatlantirishContent from "./ragbatlantirishContent/RagbatlantirishContent";
// import './Cv.css';
// import { VisibleField } from "../../../component/visibleField/VisibleField";

const Ragbatlantirish = ({ currentUser, permission1, ranks }) => {

    // useEffect(() => {
    //     VisibleField();
    // }, []);

    return <RagbatlantirishContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Ragbatlantirish)