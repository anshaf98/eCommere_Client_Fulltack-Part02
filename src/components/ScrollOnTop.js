import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollOnTop = (props) => {
  const loaction = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loaction]);

  return <>{props.children}</>;
};

export default ScrollOnTop;
