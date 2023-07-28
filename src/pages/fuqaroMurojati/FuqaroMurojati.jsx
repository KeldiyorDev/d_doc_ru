import React from 'react';
import FuqaroMurojatiContent from './fuqaroMurojatiContent/FuqaroMurojatiContent';

const FuqaroMurojati = ({currentUser, permission1, ranks}) => {
    return (
        <FuqaroMurojatiContent currentUser={currentUser} permission1={permission1} ranks={ranks}/>
    )
}
export default React.memo(FuqaroMurojati)