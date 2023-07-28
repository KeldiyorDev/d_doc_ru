import React from "react";
// import { Route } from "react-router-dom";
// import Shablonlar from './shablonlar';

export default function Templates({ currentUser }) {
  return (
    currentUser && (
      <h1>Templates</h1>
      // <Route path="/shablonlar" >
      //   <Shablonlar />
      // </Route>
    )
  )
}