import React, {useEffect} from "react";
import './xomaki.css';
import XomakiContent from "./xomakiContent/XomakiContent";
import {VisibleField} from "../../../component/visibleField/VisibleField";

const Xomaki = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <XomakiContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}

export default React.memo(Xomaki)