import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    // <div id="preloder">
    //   <div className="loader"></div>
    // </div>
    <div id="preloader-active">
      <div className="preloader d-flex align-items-center justify-content-center">
        <div className="preloader-inner position-relative">
          <div className="preloader-circle"></div>
          <div className="preloader-img pere-text">
            <h1>Mohamed</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
