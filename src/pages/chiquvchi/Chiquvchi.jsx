import React from 'react';
import ChiquvchiContent from "./chiquvchiContent/chiquvchiContent";

const Chiquvchi=({ currentUser })=> {
  return (
    <ChiquvchiContent currentUser={currentUser} />
  )
}

export default React.memo(Chiquvchi)