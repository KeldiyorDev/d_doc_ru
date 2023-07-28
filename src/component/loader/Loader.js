import React from "react";
import './loader.css';

export default function Loader({ loader }) {
  return (
    <div className="loader" ref={loader} style={{ display: "none" }}>
      <div className="loaderWrapper">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}