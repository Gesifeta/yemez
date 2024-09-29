import React from "react";

const ViewGrid = ({toggleSetting}) => {
  return (
    <div className="app__view-grid" onClick={toggleSetting}>
      <div className="app__view-grid--circle"></div>
      <div className="app__view-grid--circle"></div>
      <div className="app__view-grid--circle"></div>
      <div className="app__view-grid--circle"></div>
      <div className="app__view-grid--circle"></div>
      <div className="app__view-grid--circle"></div>
      <div className="app__view-grid--circle"></div>
      <div className="app__view-grid--circle"></div>
      <div className="app__view-grid--circle"></div>
    </div>
  );
};

export default ViewGrid;
