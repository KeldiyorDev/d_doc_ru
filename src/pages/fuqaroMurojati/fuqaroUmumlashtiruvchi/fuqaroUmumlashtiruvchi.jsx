import React, {useEffect} from "react";
import {VisibleField} from "../../../component/visibleField/VisibleField";
import FuqaroUmumlashtiruvchiContent from "./fuqaroUmumlashtiruvchiContent/fuqaroUmumlashtiruvchiContent";

const FuqaroUmumlashtiruvchi = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <FuqaroUmumlashtiruvchiContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}

export default React.memo(FuqaroUmumlashtiruvchi)