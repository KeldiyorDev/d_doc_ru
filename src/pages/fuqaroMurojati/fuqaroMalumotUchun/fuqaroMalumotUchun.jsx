import React, {useEffect} from "react";
import {VisibleField} from "../../../component/visibleField/VisibleField";
import FuqaroMalumotUchunContent from "./fuqaroMalumotUchunContent/fuqaroMalumotUchunContent";

const FuqaroMalumotUchun = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <FuqaroMalumotUchunContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}

export default React.memo(FuqaroMalumotUchun)