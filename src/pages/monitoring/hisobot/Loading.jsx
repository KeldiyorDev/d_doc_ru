import React from "react";

const Loading = ({ loader }) => {
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
        <span>Ma'lumot yuklanmoqda</span>
      </div>
    </div>
  )
}

export default React.memo(Loading);