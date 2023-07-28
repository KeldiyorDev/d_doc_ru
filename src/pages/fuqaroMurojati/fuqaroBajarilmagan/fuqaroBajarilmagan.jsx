import React, {useEffect} from "react";
import {VisibleField} from "../../../component/visibleField/VisibleField";
import FuqaroBajarilmaganContent from "./fuqaroBajarilmaganContent/fuqaroBajarilmaganContent";

const FuqaroBajarilmagan = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <FuqaroBajarilmaganContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}

export default React.memo(FuqaroBajarilmagan)