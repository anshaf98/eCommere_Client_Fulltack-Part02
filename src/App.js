import MainLayout from "./components/Layout/MainLayout";
import About from "./pages/About/About";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import ProductPage from "./pages/ProductPage/ProductPage";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import Auth from "./pages/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { axiosPublic } from "./redux/axiosPublic";
import Loader from "./components/Loading/Loading";
import AuthorizedRoute from "./components/Routes/AuthorizedRoute";
import Dashboard from "./components/Authorized/Dashboard/Dashboard";
import AddNewBrand from "./components/Authorized/Brand/AddNewBrand";
import BrandList from "./components/Authorized/Brand/BrandList";
import UpdateBrand from "./components/Authorized/Brand/UpdateBrand";
import AddNewCategory from "./components/Authorized/Category/AddNewCategory";
import CategoryList from "./components/Authorized/Category/CategoryList";
import UpdateCategory from "./components/Authorized/Category/UpdateCategory";
import AddNewStore from "./components/Authorized/Store/AddNewStore";
import StoreList from "./components/Authorized/Store/StoreList";
import UpdateStore from "./components/Authorized/Store/UpdateStore";
import AddNewProduct from "./components/Authorized/Product/AddNewProduct";
import ProductList from "./components/Authorized/Product/ProductList";
import UpdateProduct from "./components/Authorized/Product/UpdateProduct";
import UserList from "./components/Authorized/User/UserList";
import UpdateRole from "./components/Authorized/User/UpdateRole";
import Profile from "./components/Usar/Profile";
import UpdateProfile from "./components/Usar/UpdateProfile";
import UpdatePassword from "./components/Usar/UpdatePassword";
import ReviewList from "./components/Authorized/Review/ReviewList";
import Shipping from "./pages/Cart/Shipping";
import ConfirmOrder from "./pages/Cart/ConfirmOrder/ConfirmOrder";
import Payment from "./pages/Cart/Payment";
import OrderSuccess from "./pages/Cart/OrderSuccess";
import Order from "./components/Usar/Order";
import OrderDetails from "./pages/Cart/OrderDetails/OrderDetails";
import F0F from "./pages/F0F/F0F";
import OrderList from "./components/Authorized/Order/OrderList";
import ProcessOrder from "./components/Authorized/Order/ProcessOrder";
import {
  refreshUserDetails,
  selectLoggedInUser,
  selectPersist,
} from "./redux/features/authSlice";
import AddSize from "./components/Authorized/Size/AddSize";
import SizeList from "./components/Authorized/Size/SizeList";
import UpdateSize from "./components/Authorized/Size/UpdateSize";
import Search from "./pages/Search/Search";
import AddNewBanner from "./components/Authorized/Banner/AddNewBanner";
import BannerList from "./components/Authorized/Banner/BannerList";
import AddNewOffer from "./components/Authorized/Offer/AddNewOffer";
import OfferList from "./components/Authorized/Offer/OfferList";
import ScrollOnTop from "./components/ScrollOnTop";
import MainLayout2 from "./components/Layout/MainLayout2";

function App() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector(selectLoggedInUser);
  const { persist } = useSelector(selectPersist);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        const { data } = await axiosPublic.get(`/refresh`);
        dispatch(refreshUserDetails(data));
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, [accessToken, dispatch, persist]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <ScrollOnTop>
        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          transition={Zoom}
          draggable
          pauseOnHover
          theme="colored"
        />

        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="product" element={<ProductPage />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="cart" element={<Cart />} />
            <Route path="auth" element={<Auth />} />
            {/* <Route path="load" element={<Loading />} /> */}
            <Route path="/search" element={<Search />} />
            {/* <Route path="/shop/:search" element={<ProductPage />} /> */}

            <Route path="/" element={<ProtectedRoute />}>
              <Route path="profile" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/confirm-order" element={<ConfirmOrder />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/order/success" element={<OrderSuccess />} />
              <Route path="/order" element={<Order />} />
              <Route path="/order/:id" element={<OrderDetails />} />
            </Route>
            <Route path="/*" element={<F0F />} />
          </Route>

          <Route path="/" element={<MainLayout2 />}>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/authorized" element={<AuthorizedRoute />}>
                <Route path="dashboard" element={<Dashboard />} />

                <Route path="brand" element={<AddNewBrand />} />
                <Route path="brandlist" element={<BrandList />} />
                <Route path="brand/:id" element={<UpdateBrand />} />

                {/* <Route path="size" element={<AddSize />} />
                <Route path="sizelist" element={<SizeList />} />
                <Route path="size/:id" element={<UpdateSize />} /> */}

                <Route path="category" element={<AddNewCategory />} />
                <Route path="categorylist" element={<CategoryList />} />
                <Route path="category/:id" element={<UpdateCategory />} />

                <Route path="offer" element={<AddNewOffer />} />
                <Route path="offerlist" element={<OfferList />} />

                <Route path="store" element={<AddNewStore />} />
                <Route path="storelist" element={<StoreList />} />
                <Route path="store/:id" element={<UpdateStore />} />

                <Route path="product" element={<AddNewProduct />} />
                <Route path="productlist" element={<ProductList />} />
                <Route path="product/:id" element={<UpdateProduct />} />

                <Route path="banner" element={<AddNewBanner />} />
                <Route path="bannerlist" element={<BannerList />} />

                <Route path="orderlist" element={<OrderList />} />
                <Route path="order/:id" element={<ProcessOrder />} />

                <Route path="reviewlist" element={<ReviewList />} />

                <Route path="userlist" element={<UserList />} />
                <Route path="user/:id" element={<UpdateRole />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </ScrollOnTop>
    </>
  );
}

export default App;
