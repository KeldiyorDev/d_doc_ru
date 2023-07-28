import React from "react";
import { Route } from "react-router-dom";
import ArxivContent from "../pages/arxiv/arxivContent/ArxivContent";

export default function Archive({ currentUser }) {
  return (
    currentUser && (
      <Route path="/arxiv" >
        <ArxivContent currentUser={currentUser} />
      </Route>
    )
  )
}