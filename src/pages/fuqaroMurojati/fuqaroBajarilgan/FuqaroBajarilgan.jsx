import React, {useEffect} from "react";
import './fuqaroBajarilgan.css';
import FuqaroBajarilganContent from "./fuqaroBajarilganContent/FuqaroBajarilganContent";
import {VisibleField} from "../../../component/visibleField/VisibleField";

const FuqaroBajarilgan = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <FuqaroBajarilganContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}

export default React.memo(FuqaroBajarilgan)