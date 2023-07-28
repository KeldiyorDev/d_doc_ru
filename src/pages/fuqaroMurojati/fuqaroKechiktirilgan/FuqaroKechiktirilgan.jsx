import React, {useEffect} from "react";
import './fuqaroKechiktirilgan.css';
import FuqaroKechiktirilganContent from "./fuqaroKechiktirilganContent/FuqaroKechiktirilganContent";
import {VisibleField} from "../../../component/visibleField/VisibleField";

const FuqaroKechiktirilgan = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return (
        <FuqaroKechiktirilganContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
    )
}

export default React.memo(FuqaroKechiktirilgan)