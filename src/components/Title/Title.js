import React from "react";
import "./Title.css";

const Title = ({ title }) => {
  return (
    <div
      className="breadcrumb-section"
      style={{
        backgroundImage: `url("https://motorolanz.vtexassets.com/assets/vtex.file-manager-graphql/images/1a214250-b0d7-42b4-8627-a24ac3168ab6___3eb8f8b0b585cec24f7e89c10f5bd5db.jpg")`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2 text-center">
            <div className="breadcrumb-text">
              <p>BEST SHOP IN THE WORLD</p>
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
