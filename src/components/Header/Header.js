import React, { useRef } from "react";
import "./Header.css";
import DrawerMenu from "./DrawerMenu";
import { Badge, Tooltip } from "@mui/material";
import styled from "@emotion/styled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AuthMenu from "./AuthMenu";
import { Search } from "@mui/icons-material";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/features/cartSlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    background: "#341f97",
    padding: "0 4px",
    border: "1px solid #000",
  },
}));

const Header = () => {
  const { products } = useSelector(selectCartItems);

  const switcherTab = useRef(null);

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      document.querySelector(".header").classList.add("active");
    } else {
      document.querySelector(".header").classList.remove("active");
    }
  });

  return (
    <header className="header" ref={switcherTab}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-2 d-flex align-items-center header-logo">
            <div className="header__logo mb-0">
              <Link to="/">
                <Tooltip title="HOME" arrow>
                  <h2 className=" logo">MOHAMED</h2>
                </Tooltip>
              </Link>
            </div>
          </div>
          <div className="col-xl-6 col-lg-7 d-flex align-items-center justify-content-center">
            <nav className="header__menu">
              <ul>
                <li>
                  <NavLink to="/" style={{ fontSize: "17px" }}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/product" style={{ fontSize: "17px" }}>
                    Shop
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" style={{ fontSize: "17px" }}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" style={{ fontSize: "17px" }}>
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-lg-3">
            <div className="header__right d-flex align-items-center justify-content-end">
              <div className="header__right__auth">
                <AuthMenu />
              </div>

              <ul className="header__right__widget">
                <li className="">
                  <Link to="/cart" className=" text-dark">
                    <Tooltip title="Cart" arrow>
                      <StyledBadge
                        badgeContent={
                          products.length > 0 ? products.length : "0"
                        }
                        color="secondary"
                      >
                        <ShoppingCartIcon />
                      </StyledBadge>
                    </Tooltip>
                  </Link>
                </li>
                <li style={{ marginLeft: "20px" }}>
                  <Link to="/search" className=" text-dark">
                    <Tooltip title="Search" arrow>
                      <Search />
                    </Tooltip>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mobile-menu">
          <DrawerMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
