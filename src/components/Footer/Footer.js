import React from "react";
import "./Footer.css";
import {
  Facebook,
  HeartBroken,
  Instagram,
  Twitter,
  WhatsApp,
  YouTube,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-7">
            <div className="footer__about">
              <div className="footer__logo">
                <Link to="/">
                  <h2 className=" logo">MOHAMED</h2>
                </Link>
              </div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt cilisis.
              </p>
              <div className="footer__payment">
                <div>
                  <IconButton
                    style={{ cursor: "none" }}
                    aria-label="delete"
                    color="black"
                  >
                    <NearMeIcon />
                  </IconButton>
                  <span className=" mx-3">No 71, ABC Road Sri lanka</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-5">
            <div className="footer__widget">
              <h6>Quick links</h6>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">Blogs</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-2 col-md-3 col-sm-4">
            <div className="footer__widget">
              <h6>Account</h6>
              <ul>
                <li>
                  <Link to="/profile">My Account</Link>
                </li>
                <li>
                  <Link to="/order">Orders</Link>
                </li>
                <li>
                  <Link to="/checket">Checkout</Link>
                </li>
                <li>
                  <Link to="/search">Search</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-md-8 col-sm-8">
            <div className="footer__gallery">
              <h6>GALLERY</h6>
              <img
                src="https://www.extremetech.com/wp-content/uploads/2022/02/S22-family-640x353.jpg"
                alt=""
              />
              <div className="footer__social">
                <a href="/">
                  <Facebook style={{ color: "#341f97" }} />
                </a>
                <a href="/">
                  <Twitter style={{ color: "lightblue" }} />
                </a>
                <a href="/">
                  <YouTube style={{ color: "red" }} />
                </a>
                <a href="/">
                  <Instagram />
                </a>
                <a href="/">
                  <WhatsApp style={{ color: "green" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="footer__copyright__text">
              <p>
                Copyright &copy; 2023 All rights reserved |
                <HeartBroken /> by <Link to="/"> MOHAMED</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
