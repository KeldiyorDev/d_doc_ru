import React, {useEffect} from 'react';
import {VisibleField} from "../../../component/visibleField/VisibleField";
import ChiquvchiMenuContent from "./chiquvchiMenuContent/chiquvchiMenuContent";

const ChiquvchiMenu = ({currentUser,permission,ranks}) => {

    useEffect(() => {
        VisibleField();
    }, [])
    return (
        <ChiquvchiMenuContent currentUser={currentUser} permissio={permission} ranks={ranks} />
    );
};

export default React.memo(ChiquvchiMenu);