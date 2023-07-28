import React, { useEffect } from 'react';
import VazifalarNazoratdaContent from './vazifalarNazoratdaContent/VazifalarNazoratdaContent';
import { VisibleField } from '../../../../../component/visibleField/VisibleField';

const VazifalarNazoratda = ({ permission, currentUser }) => {

  useEffect(() => {
    VisibleField();
  }, [])

  return <VazifalarNazoratdaContent permission={permission} currentUser={currentUser} />
}

export default React.memo(VazifalarNazoratda);