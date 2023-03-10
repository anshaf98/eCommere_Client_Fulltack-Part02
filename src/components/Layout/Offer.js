import React from "react";
import Marquee from "react-fast-marquee";

const Offer = () => {
  return (
    <div
      className=" col-12 bg-black text-white text-uppercase"
      style={{ fontSize: "15px" }}
    >
      <Marquee speed={60} gradient={false} pauseOnHover>
        Local &nbsp;<span className=" text-danger">Free Shipping</span> ,
        &nbsp;and Global &nbsp;<span className=" text-danger">5% Off</span>
        &nbsp; Shipping Cost
      </Marquee>
    </div>
  );
};

export default Offer;
