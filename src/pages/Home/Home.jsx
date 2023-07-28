import React from 'react';
import './home.css';
import HomeContent from './homeContent/HomeContent';

const Home = ({ currentUser, ranks }) => {
  return (
    <HomeContent currentUser={currentUser} ranks={ranks}/>
  )
}

export default React.memo(Home);
