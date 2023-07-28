import React from 'react';
import YangiQushishContent from './yangiqushish/YangiQushishContent';
import "./chiquvchi2.css"

const Chiquvchi = ({ currentUser, permission, ranks }) => {
    return (
        <YangiQushishContent currentUser={currentUser} permission={permission} ranks={ranks} />
    )
}

export default React.memo(Chiquvchi)