import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import GalleryImages from "../../components/GalleryImages/GalleryImages";
import Title from "../../components/Title/Title";
import {
  addItemsToCart,
  removeItem,
  selectCartItems,
} from "../../redux/features/cartSlice";
import "./Cart.css";
import Cartitem from "./Cartitem";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utility/formatCurrency";
import Empty from "../Empty/Empty";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products } = useSelector(selectCartItems);

  const deleteCartItems = (_id) => {
    dispatch(removeItem(_id));
  };

  const decreaseQuantity = (_id, qty) => {
    const quantity = qty - 1;
    if (qty <= 1) return;
    dispatch(addItemsToCart({ _id, quantity }));
  };

  const increaseQuantity = (_id, qty, stock) => {
    const quantity = qty + 1;
    if (stock <= qty) return;
    dispatch(addItemsToCart({ _id, quantity }));
  };

  const chackOutHandler = () => {
    navigate("/auth", { state: { path: "/shipping" } });
  };

  return (
    <>
      <Title title="Shipping Cart" />

      {/*  */}
      {products.length > 0 ? (
        <section className="shop-cart spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shop__cart__table">
                  <table>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Sub Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map((item) => (
                          <Cartitem
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            item={item}
                            deleteCartItems={deleteCartItems}
                            key={item._id}
                          />
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="cart__btn">
                  <Link to="/product">Continue Shopping</Link>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6"></div>
            </div>

            <div className="row">
              <div className="col-lg-6"></div>
              <div className="col-lg-4 offset-lg-2">
                <div className="cart__total__procced">
                  <h6>Cart total</h6>
                  <ul>
                    <li>
                      Total
                      <span>
                        {formatCurrency(
                          products.reduce(
                            (acc, item) => acc + item.quantity * item.price,
                            0
                          )
                        )}
                      </span>
                    </li>
                  </ul>
                  <button className=" btn2 w-100" onClick={chackOutHandler}>
                    Proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <Empty />
      )}
      {/*  */}

      <GalleryImages />
    </>
  );
};

export default Cart;
