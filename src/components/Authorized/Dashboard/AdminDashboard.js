import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserList,
  getAllUsers,
  selectLoggedInUser,
} from "../../../redux/features/authSlice";
import {
  selectAllProducts,
  getProductsByAuthorizeRoles,
} from "../../../redux/features/productSlice";
import {
  getAllOrders,
  selectAllOrders,
} from "../../../redux/features/orderSlice";
import { getStores, selectAllStores } from "../../../redux/features/storeSlice";
import Box from "@mui/material/Box";
import "./Admin.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GroupIcon from "@mui/icons-material/Group";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { IMAGE_BASEURL } from "../../../constants/baseURL";
import { formatCurrency } from "../../../utility/formatCurrency";
import { DateFormat, shortUppercaseId } from "../../DateNDUppercase";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import {
  getBanners,
  selectAllBanners,
} from "../../../redux/features/bannerSlice";
import { LatestUser } from "./LatestUser";
import { LatestOrders } from "./LatestOrders";
import { Link } from "react-router-dom";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(selectLoggedInUser);

  const { products } = useSelector(selectAllProducts);
  const { users } = useSelector(selectUserList);
  const { orders } = useSelector(selectAllOrders);
  const { stores } = useSelector(selectAllStores);
  const { banners } = useSelector(selectAllBanners);

  // let outOfStock = 0;
  // products &&
  //   products.forEach((item) => {
  //     if (item.stock === 0) {
  //       outOfStock += 1;
  //     }
  //   });

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  useEffect(() => {
    dispatch(getProductsByAuthorizeRoles({ toast }));
    dispatch(getAllOrders({ toast }));
    dispatch(getAllUsers({ toast }));
    dispatch(getStores({ toast }));
    dispatch(getBanners({ toast }));
  }, [dispatch]);

  // const lineData = {
  //   labels: ["Initial Amount", "Amount Earned"],
  //   datasets: [
  //     {
  //       label: "TOTAL AMOUNT",
  //       backgroundColor: ["#000"],
  //       hoverBackgroundColor: ["#ccc"],
  //       data: [0, totalAmount],
  //     },
  //   ],
  // };

  // const doughnutData = {
  //   labels: ["Out Of Stock", "In Stock"],
  //   datasets: [
  //     {
  //       backgroundColor: ["gray", "black"],
  //       hoverBackgroundColor: ["black", "gray"],
  //       data: [outOfStock, products.length - outOfStock],
  //     },
  //   ],
  // };

  return (
    <>
      {/* ONE */}
      <div className="row mt-4 col-12">
        <div className="col-xl-3 col-md-6 col-sm-12 mb-3">
          <Card>
            <CardContent>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Avatar
                  src={IMAGE_BASEURL + user.avatar.url}
                  sx={{
                    height: 80,
                    mb: 2,
                    width: 80,
                  }}
                />
                <Typography
                  gutterBottom
                  variant="h5"
                  style={{ textTransform: "capitalize" }}
                >
                  {user.name}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {DateFormat(user.createdAt)}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {user.timezone}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions>
              <Link to="/me/update" style={{ margin: "0 auto" }}>
                <Button fullWidth variant="text" style={{ color: "#111" }}>
                  Upload Profile
                </Button>
              </Link>
            </CardActions>
          </Card>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card card-default card-mini">
            <div className="card-header">
              <div className=" d-flex justify-content-between align-items-center">
                <h2>Products</h2>
                <div
                  className=" p-2 rounded-circle text-white"
                  style={{ background: "#4cd137" }}
                >
                  <ShoppingCartIcon />
                </div>
              </div>
              <div className="sub-title d-flex align-items-center justify-content-between mb-2">
                <span className="mr-1">No.Of Products |</span>
                <span className="mx-1 fs-4">
                  {products && products?.length}
                </span>
              </div>
              <AvatarGroup total={products && products?.length}>
                {products?.map((product) => (
                  <Avatar
                    alt=""
                    src={IMAGE_BASEURL + product?.images[0]?.url}
                    style={{ border: "1px solid #ccc" }}
                  />
                ))}
              </AvatarGroup>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card card-default card-mini">
            <div className="card-header">
              <div className=" d-flex justify-content-between align-items-center">
                <h2>Users</h2>
                <div
                  className=" p-2 rounded-circle text-white"
                  style={{ background: "#fbc531" }}
                >
                  <GroupIcon />
                </div>
              </div>
              <div className="sub-title d-flex align-items-center justify-content-between mb-2">
                <span className="mr-1">No.Of Users |</span>
                <span className="mx-1 fs-4">{users && users?.length}</span>
              </div>

              <AvatarGroup total={users && users?.length}>
                {users?.map((user) => (
                  <Avatar
                    alt=""
                    src={IMAGE_BASEURL + user?.avatar?.url}
                    style={{ border: "1px solid #ccc" }}
                  />
                ))}
              </AvatarGroup>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-sm-6">
          <div className="card card-default card-mini">
            <div className="card-header">
              <div className=" d-flex justify-content-between align-items-center">
                <h2>Stores</h2>
                <div
                  className=" p-2 rounded-circle text-white"
                  style={{ background: "#00a8ff" }}
                >
                  <StoreMallDirectoryIcon />
                </div>
              </div>
              <div className="sub-title d-flex align-items-center justify-content-between mb-2">
                <span className="mr-1">No.Of Stores |</span>
                <span className="mx-1 fs-4">{stores && stores?.length}</span>
              </div>
              <AvatarGroup total={stores && stores?.length}>
                {stores?.map((store) => (
                  <Avatar
                    alt=""
                    src={IMAGE_BASEURL + store?.logo?.url}
                    style={{ border: "1px solid #ccc" }}
                  />
                ))}
              </AvatarGroup>
            </div>
          </div>
        </div>
      </div>

      {/* ANOTHER ONE */}

      <div className="row justify-content-center col-12">
        <div className="col-xl-4">
          <div className="card card-default card-mini">
            <div className="card-header">
              <div className=" d-flex justify-content-between align-items-center">
                <h2>Orders</h2>
                <div
                  className=" p-2 rounded-circle text-white"
                  style={{ background: "#e84118" }}
                >
                  <AttachMoneyIcon />
                </div>
              </div>
              <div className="sub-title d-flex align-items-center justify-content-between">
                <span className="mr-1">Orders Amount |</span>
                <span className="mx-1 fs-4">
                  {formatCurrency(orders && totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card card-default card-mini">
            <div className="card-header">
              <div className=" d-flex justify-content-between align-items-center">
                <h2>Orders</h2>
                <div
                  className=" p-2 rounded-circle text-white"
                  style={{ background: "#9c88ff" }}
                >
                  <ListAltIcon />
                </div>
              </div>
              <div className="sub-title d-flex align-items-center justify-content-between">
                <span className="mr-1">No.Of Orders |</span>
                <span className="mx-1 fs-4">{orders && orders?.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Box sx={{ minHeight: 300 }}>
        <h3 className=" my-4">Banners</h3>
        <Masonry columns={3} spacing={2}>
          {banners.map((item) => (
            <div key={item?._id}>
              <Label className=" text-uppercase">{item.title}</Label>
              <img
                src={`${
                  IMAGE_BASEURL + item?.images[0]?.url
                }?w=162&auto=format`}
                srcSet={`${
                  IMAGE_BASEURL + item?.images[0]?.url
                }?w=162&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{
                  borderBottomLeftRadius: 4,
                  borderBottomRightRadius: 4,
                  display: "block",
                  width: "100%",
                }}
              />
            </div>
          ))}
        </Masonry>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3} style={{ margin: "0 auto" }}>
            <Grid xs={12} md={6} lg={3} className="mx-5">
              <LatestUser users={users} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} md={12} lg={7}>
              <LatestOrders orders={orders} sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div className="card-body">
              <table
                id="productsTable"
                className="table table-hover table-product"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Discount</th>
                    <th>localShipmentPolicy</th>
                    <th>internationalShipmentPolicy</th>
                    <th>weight</th>
                    <th>In Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => (
                      <tr key={product._id}>
                        <td>
                          <img
                            src={IMAGE_BASEURL + product?.images[0]?.url}
                            alt=""
                          />
                        </td>
                        <td className=" text-uppercase">{product.title}</td>
                        <td>{product.discount}%</td>
                        <td>{product.localShipmentPolicy}</td>
                        <td>{product.internationalShipmentPolicy}</td>
                        <td>{product.weight}</td>
                        <td>{product.stock}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card card-default">
            <div>
              <h2 className=" text-center mt-2">Recent Orders</h2>
            </div>
            <div className="card-body">
              <table className="table table-hover table-product">
                <thead>
                  <tr>
                    <td className=" fw-bolder">Order ID</td>
                    <td className=" fw-bolder">Price</td>
                    <td className=" fw-bolder">Status</td>
                  </tr>
                </thead>
                {orders &&
                  orders.slice(0, 10).map((ord) => (
                    <tbody key={ord._id}>
                      <tr>
                        <td>{shortUppercaseId(ord._id)}</td>
                        <td>{formatCurrency(ord.totalPrice)}</td>
                        <td>
                          <span
                            className={
                              ord.orderStatus === "Processing"
                                ? "greenColor"
                                : "redColor"
                            }
                          >
                            {ord.orderStatus}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <div className=" col-12 d-flex align-items-center justify-content-center">
        <div className=" col-6">
          <Doughnut data={doughnutData} />
        </div>
        <div className=" col-6">
          <Line data={lineData} />
        </div>
      </div> 
     */}
    </>
  );
};

export default AdminDashboard;
