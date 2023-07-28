import React from 'react';
import './kengQidirish.css';
import ContentKengQidirish from './contentKengQidirish/ContentKengQidirish';

const KengQidirish = ({ currentUser }) => {
  return <ContentKengQidirish currentUser={currentUser} />
}

export default React.memo(KengQidirish);