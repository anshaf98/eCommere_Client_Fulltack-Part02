import React, { useEffect, useState } from "react";
import NavigationIcon from "@mui/icons-material/Navigation";
import "./BackToTop.css";

const BackToTop = () => {
  const [backToTopButton, setbackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setbackToTopButton(true);
      } else {
        setbackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {backToTopButton && (
        <button
          className=" scrolBtn"
          style={{
            position: "fixed",
            bottom: "50px",
            right: "50px",
            width: "50px",
            height: "50px",
            border: "0",
            background: "#000",
            color: "#fff",
            zIndex: "9999",
          }}
          onClick={scrollUp}
        >
          <NavigationIcon />
        </button>
      )}
    </>
  );
};

export default BackToTop;
