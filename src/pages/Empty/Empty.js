import React from "react";
import { Link } from "react-router-dom";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const Empty = () => {
  return (
    <>
      <section
        class="empty-cart page-wrapper"
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div class="row">
          <div class="col-12 col-md-offset-3">
            <div class="block text-center">
              <RemoveShoppingCartIcon />
              <h2 class="text-center">Your product is currently empty.</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore, sed.
              </p>
              <Link to="/" class="btn btn-main mt-20">
                Return to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Empty;
