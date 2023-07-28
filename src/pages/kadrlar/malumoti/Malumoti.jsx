import React from "react";
// import './Cv.css';
import MalumotiContent from "./malumotiContent/MalumotiContent";
// import { VisibleField } from "../../../component/visibleField/VisibleField";

const Malumoti = ({ currentUser, permission1, ranks }) => {

    return <MalumotiContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Malumoti)