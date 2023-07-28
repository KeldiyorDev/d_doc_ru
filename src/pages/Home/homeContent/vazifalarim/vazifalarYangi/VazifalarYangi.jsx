import React, { useEffect } from 'react'
import VazifalarYangiContent from './vazifalarYangiContent/VazifalarYangiContent'
import { VisibleField } from '../../../../../component/visibleField/VisibleField';

const VazifalarYangi = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <VazifalarYangiContent permission={permission} currentUser={currentUser} />
}

export default React.memo(VazifalarYangi);