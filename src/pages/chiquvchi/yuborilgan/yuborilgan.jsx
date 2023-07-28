import React, { useEffect } from "react";
import { VisibleField } from "../../../component/visibleField/VisibleField";
import ChiquvchiYuborilganContent from "./yuborilganContent/yuborilganContent";

const ChiquvchiYuborilgan=({ currentUser, permission1, ranks })=> {

    useEffect(() => {
        VisibleField();
    }, [])

    return <ChiquvchiYuborilganContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(ChiquvchiYuborilgan)