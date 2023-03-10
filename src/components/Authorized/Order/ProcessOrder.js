import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getOrderDetails,
  selectOrderDetails,
  updateOrder,
  selectOrderMutationResult,
  resetMutationResult,
} from "../../../redux/features/orderSlice";

import {
  Box,
  Typography,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Select,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TakeoutDiningIcon from "@mui/icons-material/TakeoutDining";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DeliveryDiningRoundedIcon from "@mui/icons-material/DeliveryDiningRounded";
import Loading from "../../Loading/Loading";
import { IMAGE_BASEURL } from "../../../constants/baseURL";
import { formatCurrency } from "../../../utility/formatCurrency";

const ProcessOrder = () => {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const { loading, order } = useSelector(selectOrderDetails);
  const { success } = useSelector(selectOrderMutationResult);

  const submitHandler = (e) => {
    e.preventDefault();
    if (status === "") {
      toast.error("Please select a process option");
      return;
    }
    const jsonData = { status };
    dispatch(updateOrder({ id, jsonData, toast }));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetMutationResult());
    }
    dispatch(getOrderDetails({ id, toast }));
  }, [success, id, dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className=" text-center">Order details</h2>
          <div className="col-12 px-5 d-flex">
            <div className="col-6 mt-5">
              <div className=" mb-4" style={{ fontSize: "20px" }}>
                <MonitorHeartIcon /> Order Status
              </div>
              <div className=" px-3">
                <div>
                  {/* 01 */}
                  <div className=" d-flex align-items-center gap-2 mb-2">
                    <div
                      className=" p-2 rounded-circle"
                      style={{ background: "#ccc", width: "fit-content" }}
                    >
                      <FingerprintIcon style={{ color: "#fff" }} />
                    </div>{" "}
                    {order && "Order ID: " + order._id}
                  </div>
                  {/* 02 */}
                  <div className=" d-flex align-items-center gap-2 mb-2">
                    <div
                      className=" p-2 rounded-circle"
                      style={{ background: "#ccc", width: "fit-content" }}
                    >
                      <AccessTimeIcon style={{ color: "#fff" }} />
                    </div>{" "}
                    {order &&
                      "Ordered At: " + String(order.createdAt).substr(0, 10)}
                  </div>
                  {/* 03 */}
                  <div className=" d-flex align-items-center gap-2 mb-2">
                    <div
                      className=" p-2 rounded-circle"
                      style={{ background: "#ccc", width: "fit-content" }}
                    >
                      <AttachMoneyIcon style={{ color: "#fff" }} />
                    </div>{" "}
                    Order Status:{" "}
                    {order && order?.paymentInfo?.status === "succeeded"
                      ? "Paid"
                      : "Not Paid"}
                  </div>

                  {/* 04 */}
                  <div className=" d-flex align-items-center gap-2 mb-2">
                    <div
                      className=" p-2 rounded-circle"
                      style={{ background: "#ccc", width: "fit-content" }}
                    >
                      <TakeoutDiningIcon style={{ color: "#fff" }} />
                    </div>
                    {order && order?.orderStatus}
                  </div>
                </div>
              </div>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {order && order.orderStatus === "Delivered" ? (
                  <Box sx={{ mt: "20px", textAlign: "center" }}>
                    <Avatar>
                      <DeliveryDiningRoundedIcon />
                    </Avatar>
                    <Typography variant="button" component="div" gutterBottom>
                      This product delivered.
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: "200px",
                        mt: "20px",
                      }}
                    >
                      <FormControl sx={{ mb: "5px" }}>
                        <InputLabel id="status">Select process</InputLabel>
                        <Select
                          labelId="status"
                          id="status"
                          value={status}
                          variant="filled"
                          label="process"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          {order && order.orderStatus === "Processing" ? (
                            <MenuItem value="Shipped">Shipped</MenuItem>
                          ) : (
                            <MenuItem value="Delivered">Delivered</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                      <Button className=" btn2" onClick={submitHandler}>
                        Update
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </div>

            <div className="col-6 mt-5">
              <div className=" mb-4" style={{ fontSize: "20px" }}>
                <LocalShippingIcon /> Shipping Info
              </div>
              <div className=" px-3">
                <div>
                  {/* 01 */}
                  <div className=" d-flex align-items-center gap-2 mb-2">
                    <div
                      className=" p-2 rounded-circle"
                      style={{ background: "#ccc", width: "fit-content" }}
                    >
                      <PhoneIcon style={{ color: "#fff" }} />
                    </div>{" "}
                    {order?.shippingInfo?.phone}
                  </div>

                  {/* 02 */}
                  <div className=" d-flex align-items-center gap-2 mb-2">
                    <div
                      className=" p-2 rounded-circle"
                      style={{ background: "#ccc", width: "fit-content" }}
                    >
                      <LocationOnIcon style={{ color: "#fff" }} />
                    </div>{" "}
                    {order &&
                      `${order?.shippingInfo?.address},${order?.shippingInfo?.city},${order?.shippingInfo?.zipCode},${order?.shippingInfo?.state},${order?.shippingInfo?.country}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="col-12 mt-5 d-flex">
            <div className="col-6  px-5" style={{ fontSize: "20px" }}>
              <ShoppingCartIcon /> Product Details
              {order.orderItems &&
                order.orderItems.map((item, i) => (
                  <div key={item._id} className=" mt-3">
                    <div>
                      <img
                        src={IMAGE_BASEURL + item.product.images[0].url}
                        alt={item.title}
                        style={{ maxWidth: 100, marginRight: "5px" }}
                      />
                    </div>
                    <div>
                      <h5
                        className=" text-dark text-capitalize"
                        style={{ fontFamily: "Roboto, sans-serif" }}
                      >
                        <Link
                          to={`/product/${item.product._id}`}
                          className="text-dark"
                        >
                          {item.product.title}
                        </Link>
                      </h5>
                      <h5 style={{ fontFamily: "Roboto, sans-serif" }}>
                        Price : {formatCurrency(item.price)} x {item.quantity} =
                        {formatCurrency(item.price * item.quantity)}
                      </h5>
                    </div>
                  </div>
                ))}
            </div>

            <div className="col-6  px-5 mt-5">
              <div style={{ fontSize: "20px" }}>
                <FactCheckIcon /> Orders Info
              </div>
              <div className=" mt-3">
                <div
                  className=" mb-2"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Subtotal: {formatCurrency(order && order.itemsPrice)}
                </div>
                <div
                  className=" mb-2"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Shipping Charges:{" "}
                  {formatCurrency(order && order.shippingPrice)}
                </div>
                <div
                  className=" mb-2"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Tax: {formatCurrency(order && order.taxPrice)}
                </div>
                <div
                  className=" mb-2"
                  style={{ fontFamily: "Roboto, sans-serif" }}
                >
                  Total: {formatCurrency(order && order.totalPrice)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProcessOrder;
