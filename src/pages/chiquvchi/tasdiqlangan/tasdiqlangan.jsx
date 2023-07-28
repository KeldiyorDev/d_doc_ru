import React, { useEffect } from "react";
import { VisibleField } from "../../../component/visibleField/VisibleField";
import ChiquvchiTasdiqlanganContent from "./tasdiqlanganContent/tasdiqlanganContent";

const ChiquvchiTasdiqlangan=({ currentUser, permission1, ranks })=> {

    useEffect(() => {
        VisibleField();
    }, [])

    return <ChiquvchiTasdiqlanganContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(ChiquvchiTasdiqlangan)