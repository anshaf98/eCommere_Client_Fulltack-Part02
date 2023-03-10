import React from "react";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <section
      class="page-wrapper success-msg"
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="block text-center">
              <DoneAllIcon className="iconsone" />
              <h2 class="text-center">Thank you! For your payment</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Inventore, sed.
              </p>
              <Link to="/product" class="btn btn-main mt-20">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
