import React from 'react';
import XomakiKurish from "./XomakiKurish";
import XomakiEdit from "./editXomaki/XomakiEdit";

const XomakiKurishContent = ({ edit,currentUser, permission1, ranks}) => {
    return (
        <>
            {edit ? <XomakiEdit currentUser={currentUser} permission={permission1} ranks={ranks}/> : <XomakiKurish currentUser={currentUser} permission={permission1} ranks={ranks}/>}
        </>
    )
}
export default React.memo(XomakiKurishContent)