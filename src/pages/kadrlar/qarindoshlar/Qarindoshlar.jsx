import React from "react";
// import './Cv.css';
import QarindoshlarContent from "./qarindoshlarContent/QarindoshlarContent";
// import { VisibleField } from "../../../component/visibleField/VisibleField";

const Qarindoshlar = ({ currentUser, permission1, ranks }) => {

    // useEffect(() => {
    //     VisibleField();
    // }, []);

    return <QarindoshlarContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Qarindoshlar)