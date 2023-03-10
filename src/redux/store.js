import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import BrandReducer from "./features/brandSlice";
import CategoryReducer from "./features/categorySlice";
import StoreReducer from "./features/storeSlice";
import ProductReducer from "./features/productSlice";
import CartReducer from "./features/cartSlice";
import ReviewReducer from "./features/reviewSlice";
import ShippingReducer from "./features/shippingSlice";
import OrderReducer from "./features/orderSlice";
import SizeReducer from "./features/sizeSlice";
import bannerReducer from "./features/bannerSlice";
import offerReducer from "./features/offerSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    brand: BrandReducer,
    category: CategoryReducer,
    size: SizeReducer,
    store: StoreReducer,
    product: ProductReducer,
    cart: CartReducer,
    review: ReviewReducer,
    shipping: ShippingReducer,
    order: OrderReducer,
    banner: bannerReducer,
    offer: offerReducer,
  },
});
