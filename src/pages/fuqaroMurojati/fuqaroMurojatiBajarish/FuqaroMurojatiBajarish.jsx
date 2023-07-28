import React, {useEffect} from "react";
import './fuqaroMurojatiBajarish.css';
import BajarishContent from "./fuqaroMurojatiBajarishContent/BajarishContent";
import {VisibleField} from "../../../component/visibleField/VisibleField";

const FuqaroMurojatiBajarish = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <BajarishContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}

export default React.memo(FuqaroMurojatiBajarish)