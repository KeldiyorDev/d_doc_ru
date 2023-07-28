import React, { useEffect } from "react";
import { VisibleField } from "../../../component/visibleField/VisibleField";
import ChiquvchiTabContent from "./chiquvchiTabContent/ChiquvchiTabContent";

const Xomaki = ({ currentUser, permission1, ranks }) => {

    useEffect(() => {
        VisibleField();
    }, [])

    return <ChiquvchiTabContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(Xomaki)