import React, {useEffect} from "react";
import {VisibleField} from "../../../component/visibleField/VisibleField";
import FuqaroRezolutionContent from "./FuqaroResolutionKorishContent/FuqaroResolutionKorishContent";

const FuqaroResolutionKorish = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <FuqaroRezolutionContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}

export default React.memo(FuqaroResolutionKorish)