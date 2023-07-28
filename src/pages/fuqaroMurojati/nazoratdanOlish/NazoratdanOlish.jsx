import React, {useEffect} from "react";
import './nazoratdanOlish.css';
import NazoratdanOlishContent from "./nazoratdanOlishContent/NazoratdanOlishContent";
import {VisibleField} from "../../../component/visibleField/VisibleField";

const FuqaroNazoratdanOlish = ({currentUser, permission, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <NazoratdanOlishContent currentUser={currentUser} permission={permission} ranks={ranks}/>
}

export default React.memo(FuqaroNazoratdanOlish)