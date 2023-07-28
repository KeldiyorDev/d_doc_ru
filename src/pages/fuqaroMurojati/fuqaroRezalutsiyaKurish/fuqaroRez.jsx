import React, {useEffect} from "react";
import {VisibleField} from "../../../component/visibleField/VisibleField";
import FuqaroResolutionContent from "./fuqaroRezContent/FuqaroRezContent";

const FuqaroRezolution = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <FuqaroResolutionContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}
export default React.memo(FuqaroRezolution)