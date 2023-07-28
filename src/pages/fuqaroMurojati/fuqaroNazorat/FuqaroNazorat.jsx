import React, {useEffect} from "react";
import './fuqaroNazorat.css';
import FuqaroNazoratContent from "./fuqaroNazoratContent/FuqaroNazoratContent";
import {VisibleField} from "../../../component/visibleField/VisibleField";

const FuqaroNazorat = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <FuqaroNazoratContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}
export default React.memo(FuqaroNazorat)