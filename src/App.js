import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from "./Layout/Layout";
import FabMenu from './component/fabMenu/FabMenu';
import Notifications from './component/notifications/Notifications';

export const colourStyles = {
  control: (styles) => ({ ...styles, backgroundColor: 'white', height: '56px' }),
  option: (styles, { isDisabled }) => {
    return {
      ...styles,
      textTransform: 'upperCase',
      fontWeight: isDisabled ? "bold" : " ",
      fontSize: isDisabled ? "16px" : '14px',
      color: isDisabled ? "blue" : "black",
      cursor: isDisabled ? "not-allowed" : "default",

    };
  }
};

function App() {
  const { user: currentUser } = useSelector(state => state.user.insta);

  return (
    <BrowserRouter>
      {/* notification */}
      <Notifications currentUser={currentUser} />

      {/* fab menu */}
      <FabMenu />

      <div style={{ height: "100vh" }}>
        <Switch>
          {<Layout currentUser={currentUser} />}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;