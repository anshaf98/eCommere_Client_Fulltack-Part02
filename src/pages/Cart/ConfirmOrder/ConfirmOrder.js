import React from "react";
import "./ConfirmOrder.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { selectShippingInfo } from "../../../redux/features/shippingSlice";
import { selectCartItems } from "../../../redux/features/cartSlice";
import { IMAGE_BASEURL } from "../../../constants/baseURL";
import { formatCurrency } from "../../../utility/formatCurrency";
import Title from "../../../components/Title/Title";

const ConfirmOrder = () => {
  const { shipInfo } = useSelector(selectShippingInfo);
  const { products } = useSelector(selectCartItems);

  const address =
    shipInfo.address +
    " , " +
    shipInfo.zipCode +
    " , " +
    shipInfo.city +
    " , " +
    shipInfo.state +
    " , " +
    shipInfo.country;

  let subTotal = products.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  let tax = 0;

  // LOCAL SHIPPING 20
  // INTERNATIONAL 1000

  let unitShippingCharge = [];
  let shippingCharge = 0;
  if (shipInfo.country === "IN") {
    tax = subTotal * 0.1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].localShipmentPolicy === "free") {
        shippingCharge = shippingCharge + 0;
        unitShippingCharge[i] = 0;
      }
      if (products[i].localShipmentPolicy === "custom") {
        shippingCharge =
          shippingCharge +
          products[i].quantity * products[i].customLocalShipmentCost;
        unitShippingCharge[i] =
          products[i].quantity * products[i].customLocalShipmentCost;
      }
      if (products[i].localShipmentPolicy === "standard") {
        if (products[i].weight && products[i].weight > 5) {
          products[i].weight = Math.ceil(products[i].weight / 5);
          shippingCharge =
            shippingCharge + products[i].weight * products[i].quantity * 20;
          unitShippingCharge[i] =
            products[i].weight * products[i].quantity * 20;
        } else {
          shippingCharge = shippingCharge + products[i].quantity * 20;
          unitShippingCharge[i] = products[i].quantity * 20;
        }
      }
    }
  } else {
    tax = subTotal * 0.5;
    for (let i = 0; i < products.length; i++) {
      if (products[i].internationalShipmentPolicy === "free") {
        shippingCharge = shippingCharge + 0;
        unitShippingCharge[i] = 0;
      }
      if (products[i].internationalShipmentPolicy === "custom") {
        shippingCharge =
          shippingCharge +
          products[i].quantity * products[i].customInternationShipmentCost;
        unitShippingCharge[i] =
          products[i].quantity * products[i].customInternationShipmentCost;
      }
      if (products[i].internationalShipmentPolicy === "standard") {
        if (products[i].weight && products[i].weight > 5) {
          products[i].weight = Math.ceil(products[i].weight / 5);
          shippingCharge =
            shippingCharge + products[i].weight * products[i].quantity * 1000;
          unitShippingCharge[i] =
            products[i].weight * products[i].quantity * 1000;
        } else {
          shippingCharge = shippingCharge + products[i].quantity * 1000;
          unitShippingCharge[i] = products[i].quantity * 1000;
        }
      }
    }
  }
  const totalPrice = subTotal + shippingCharge + tax;

  const navigate = useNavigate();

  const proccedToPayment = () => {
    const data = {
      subTotal,
      shippingCharge,
      tax,
      totalPrice,
      shipInfo,
    };
    // sessionStorage.setItem("shipInfo", JSON.stringify());
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/payment");
  };

  return (
    <>
      <Title title="Cart & Shipping Information" />

      {/*  */}

      <div class="page-wrapper">
        <div class="checkout shopping">
          <div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="block billing-details">
                  <h4 class="widget-title">Shipping Address</h4>
                  <div class="form-group">
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <PhoneIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                          {shipInfo && shipInfo.phone}
                        </ListItemText>
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <LocationOnIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText>{address}</ListItemText>
                      </ListItem>
                    </List>
                  </div>
                </div>
              </div>

              <div class="col-md-4">
                <div class="product-checkout-details">
                  <div class="block">
                    <h4 class="widget-title">Order Summary</h4>
                    {products &&
                      products.map((item, i) => (
                        <>
                          <div class="media product-card mt-2" key={item._id}>
                            <img
                              class="media-object"
                              src={IMAGE_BASEURL + item.image}
                              alt=""
                            />
                            <div class="media-body">
                              <h4
                                class="media-heading text-capitalize"
                                style={{ fontFamily: "Roboto, sans-serif" }}
                              >
                                <Link
                                  to={`/product/${item._id}`}
                                  className=" text-dark"
                                >
                                  {item.title}
                                </Link>
                              </h4>
                              <p
                                class="price"
                                style={{ fontFamily: "Roboto, sans-serif" }}
                              >
                                {formatCurrency(item.price)} x {item.quantity} ={" "}
                                {formatCurrency(item.price * item.quantity)}
                              </p>
                              <p
                                class="price"
                                style={{ fontFamily: "Roboto, sans-serif" }}
                              >
                                Shipping Charge:{" "}
                                {formatCurrency(unitShippingCharge[i])}
                              </p>
                            </div>
                          </div>
                          <Divider />
                        </>
                      ))}

                    <ul class="summary-prices mt-2">
                      <li>
                        <span style={{ fontFamily: "Roboto, sans-serif" }}>
                          Subtotal:
                        </span>
                        <span
                          class="price"
                          style={{ fontFamily: "Roboto, sans-serif" }}
                        >
                          {formatCurrency(subTotal)}
                        </span>
                      </li>
                      <li>
                        <span style={{ fontFamily: "Roboto, sans-serif" }}>
                          Shipping Charges:
                        </span>
                        <span style={{ fontFamily: "Roboto, sans-serif" }}>
                          {formatCurrency(shippingCharge)}
                        </span>
                      </li>
                      <li>
                        <span style={{ fontFamily: "Roboto, sans-serif" }}>
                          Tax:
                        </span>
                        <span style={{ fontFamily: "Roboto, sans-serif" }}>
                          {formatCurrency(tax)}
                        </span>
                      </li>
                    </ul>
                    <div class="summary-total">
                      <span style={{ fontFamily: "Roboto, sans-serif" }}>
                        Total
                      </span>
                      <span style={{ fontFamily: "Roboto, sans-serif" }}>
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>

                    <button className=" btn2 mt-5" onClick={proccedToPayment}>
                      Procced to payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
    </>
  );
};

export default ConfirmOrder;
