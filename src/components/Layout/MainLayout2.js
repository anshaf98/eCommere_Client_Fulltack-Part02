import { Outlet } from "react-router-dom";
import BackToTop from "../BackToTop/BackToTop";
import Header from "../Header/Header";
import Offer from "./Offer";

const MainLayout2 = () => {
  return (
    <>
      <Offer />
      <Header />
      <Outlet />
      <BackToTop />
    </>
  );
};

export default MainLayout2;
