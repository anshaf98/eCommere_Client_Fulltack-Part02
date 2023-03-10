import { Outlet } from "react-router-dom";
import BackToTop from "../BackToTop/BackToTop";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Offer from "./Offer";

const MainLayout = () => {
  return (
    <>
      <Offer />
      <Header />
      <Outlet />
      <Footer />
      <BackToTop />
    </>
  );
};

export default MainLayout;
