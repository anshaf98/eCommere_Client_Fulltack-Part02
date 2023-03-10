import React from "react";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import "./F0F.css";
import MetaData from "../../components/Metadata";

const F0F = () => {
  return (
    <>
      <MetaData title={"404 - Mohamed"} />
      <Title title="404" />

      {/*  */}
      <section class="page-404">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h3 className=" logo">Mohamed</h3>
              <h1>404</h1>
              <h2>Page Not Found</h2>
              <Link to="/" class="btn btn-main align-items-center">
                <ArrowBackIosIcon fontSize="10px" /> Go Home
              </Link>
              <p class="copyright-text">© 2023 MHD All Rights Reserved</p>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
    </>
  );
};

export default F0F;
