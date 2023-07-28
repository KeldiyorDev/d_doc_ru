    import React, {useEffect} from 'react';
import FuqaroMurojatYangiContent from './FuqaroMurojatYangiContent/FuqaroMurojatYangiContent';
import {VisibleField} from '../../../component/visibleField/VisibleField';

const FuqaroMurojatYangi = ({currentUser, permission1, ranks}) => {

    useEffect(() => {
        VisibleField();
    }, []);

    return (
        <FuqaroMurojatYangiContent currentUser={currentUser} permission={permission1} ranks={ranks}/>
    )
}

export default React.memo(FuqaroMurojatYangi)