import React, {useEffect} from "react";
import {VisibleField} from "../../../component/visibleField/VisibleField";
import FuqaroRadEtilganContent from "./fuqaroRadEtilganContent/fuqaroRadEtilganContent";

const FuqaroRadEtilgan = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <FuqaroRadEtilganContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}

export default React.memo(FuqaroRadEtilgan)