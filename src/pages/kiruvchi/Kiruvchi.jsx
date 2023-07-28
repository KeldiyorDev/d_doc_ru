import React from 'react';
import './kiruvchi.css';
import KiruvchiContent from './kiruvchiContent/KiruvchiContent';

const Kiruvchi = ({ currentUser, permission1, ranks }) => {

  return (
    <KiruvchiContent currentUser={currentUser} permission={permission1} ranks={ranks} />
  )
}

export default React.memo(Kiruvchi);