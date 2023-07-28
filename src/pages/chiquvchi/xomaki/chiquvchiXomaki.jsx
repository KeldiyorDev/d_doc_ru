import React, { useEffect } from "react";
import { VisibleField } from "../../../component/visibleField/VisibleField";
import ChiquvchiXomakiContent from "./xomakiContent/chiquvchiXomakiContent";

const ChiquvchiXomaki=({ currentUser, permission1, ranks })=> {

    useEffect(() => {
        VisibleField();
    }, [])

    return <ChiquvchiXomakiContent currentUser={currentUser} permission={permission1} ranks={ranks} />
}

export default React.memo(ChiquvchiXomaki)