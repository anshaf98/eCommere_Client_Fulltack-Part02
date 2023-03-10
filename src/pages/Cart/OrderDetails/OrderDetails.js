import React, { useEffect } from "react";
import "./OrderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { IMAGE_BASEURL } from "../../../constants/baseURL";
import { formatCurrency } from "../../../utility/formatCurrency";
import Title from "../../../components/Title/Title";
import {
  getOrderDetails,
  selectOrderDetails,
} from "../../../redux/features/orderSlice";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import NearMeIcon from "@mui/icons-material/NearMe";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, order } = useSelector(selectOrderDetails);
  // console.log(order);

  useEffect(() => {
    dispatch(getOrderDetails({ id, toast }));
  }, [id, dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Title title="Order Detail's" />

          {/*  */}

          <div class="page-wrapper">
            <div class="checkout shopping">
              <div class="container">
                <div class="row">
                  <div class="col-md-8">
                    <div class="block billing-details">
                      <h4 class="widget-title">Order details</h4>
                      <div class="form-group">
                        <List>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <MonitorHeartIcon style={{ color: "#000" }} />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                              {order &&
                              order?.paymentInfo?.status === "succeeded"
                                ? "Paid"
                                : "Not Paid"}
                            </ListItemText>
                          </ListItem>

                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <TakeoutDiningIcon style={{ color: "#000" }} />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                              {order && order?.orderStatus}
                            </ListItemText>
                          </ListItem>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <NearMeIcon style={{ color: "#000" }} />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText>
                              {order && order?.shippingInfo?.address}
                            </ListItemText>
                          </ListItem>
                        </List>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="product-checkout-details">
                      <div class="block">
                        <h4 class="widget-title">Cart Items Info</h4>
                        {order.orderItems &&
                          order.orderItems.map((item, i) => (
                            <>
                              <div
                                class="media product-card mt-2"
                                key={item._id}
                              >
                                <img
                                  class="media-object"
                                  src={
                                    IMAGE_BASEURL + item.product.images[0].url
                                  }
                                  alt=""
                                />
                                <div class="media-body">
                                  <h4
                                    class="media-heading text-capitalize"
                                    style={{ fontFamily: "Roboto, sans-serif" }}
                                  >
                                    <Link
                                      to={`/product/${item.product._id}`}
                                      className=" text-dark"
                                    >
                                      {item.product.title}
                                    </Link>
                                  </h4>
                                  <p
                                    class="price"
                                    style={{ fontFamily: "Roboto, sans-serif" }}
                                  >
                                    {formatCurrency(item.price)} x{" "}
                                    {item.quantity} ={" "}
                                    {formatCurrency(item.price * item.quantity)}
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
                              {formatCurrency(order && order.itemsPrice)}
                            </span>
                          </li>
                          <li>
                            <span style={{ fontFamily: "Roboto, sans-serif" }}>
                              Shipping Charges:
                            </span>
                            <span style={{ fontFamily: "Roboto, sans-serif" }}>
                              {formatCurrency(order && order.shippingPrice)}
                            </span>
                          </li>
                          <li>
                            <span style={{ fontFamily: "Roboto, sans-serif" }}>
                              Tax:
                            </span>
                            <span style={{ fontFamily: "Roboto, sans-serif" }}>
                              {formatCurrency(order && order.taxPrice)}
                            </span>
                          </li>
                        </ul>
                        <div class="summary-total">
                          <span style={{ fontFamily: "Roboto, sans-serif" }}>
                            Total
                          </span>
                          <span style={{ fontFamily: "Roboto, sans-serif" }}>
                            {formatCurrency(order && order.totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </>
      )}
    </>
  );
};

export default OrderDetails;
