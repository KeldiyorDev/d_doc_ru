import React, { useEffect } from "react";
import { VisibleField } from "../../../component/visibleField/VisibleField";
import ChiquvchiJarayondaContent from "./chiquvchiJarayondaContent/chiquvchiJarayondaContent";

const ChiquvchiJarayonda=({ currentUser, permission1, ranks })=> {

    useEffect(() => {
        VisibleField();
    }, [])

    return <ChiquvchiJarayondaContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(ChiquvchiJarayonda)