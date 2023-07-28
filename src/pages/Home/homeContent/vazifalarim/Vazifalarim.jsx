import React, { useEffect } from 'react';
import VazifalarContent from './vazifalarimContent/VazifalarContent';
import { VisibleField } from '../../../../component/visibleField/VisibleField';

const Vazifalarim = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <VazifalarContent permission={permission} currentUser={currentUser} />
}

export default React.memo(Vazifalarim);