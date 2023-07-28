import React, {useEffect} from "react";
import './yuborilgan.css';
import YuborilganContent from "./yuborilganContent/YuborilganContent";
import {VisibleField} from "../../../component/visibleField/VisibleField";

const Yuborilgan = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return <YuborilganContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
}
export default React.memo(Yuborilgan)