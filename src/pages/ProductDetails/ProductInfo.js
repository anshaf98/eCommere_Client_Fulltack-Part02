import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { Box, Rating, IconButton, Tooltip, Button } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { formatCurrency } from "../../utility/formatCurrency";
import { addItemsToCart } from "../../redux/features/cartSlice";
import { shortUppercaseId } from "../../components/DateNDUppercase";

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const decreaseQuantity = () => {
    if (1 === quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };
  const increaseQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const addToCartHandler = () => {
    const _id = product._id;
    dispatch(addItemsToCart({ _id, quantity, toast }));
    toast.success("Product added to cart");
  };

  return (
    <div className="product__details__text">
      <h3>
        <div className=" d-flex align-items-center justify-content-between">
          <h3>{product.title}</h3>
          <span>#{shortUppercaseId(product._id)}</span>
        </div>
        <span>
          <b>Brand:</b> {product.brand.title}
        </span>
      </h3>
      <div className="rating d-flex align-items-center">
        <Rating value={product.ratings} precision={0.1} readOnly />
        <p className=" mb-0"> ({product.numOfReviews}) reviews</p>
      </div>
      {product.discount > 0 ? (
        <div className="product__details__price">
          {formatCurrency(product.price)}{" "}
          <span>
            {formatCurrency(
              product.price - product.price * (product.discount / 100)
            )}
          </span>
        </div>
      ) : (
        <div className="product__details__price">
          {formatCurrency(product.price)}
        </div>
      )}

      <p style={{ fontSize: "13px", textAlign: "justify" }}>
        {product.description}
      </p>
      <div className="product__details__button d-flex justify-content-between">
        <div className="quantity d-flex">
          <span>Quantity:</span>
          <div
            className=" bg-dark"
            style={{ width: "fit-content", borderRadius: "25px" }}
          >
            <Box className="btn-quantity">
              <Tooltip title="Decrease quantity" placement="top">
                <IconButton
                  style={{ color: "#fff" }}
                  component="span"
                  onClick={decreaseQuantity}
                >
                  <RemoveCircleIcon style={{ height: "40px", width: "40px" }} />
                </IconButton>
              </Tooltip>
              <label className=" text-white">{quantity}</label>
              <Tooltip title="Increase quantity" placement="top">
                <IconButton
                  style={{ color: "#fff" }}
                  component="span"
                  onClick={increaseQuantity}
                >
                  <AddCircleIcon style={{ height: "40px", width: "40px" }} />
                </IconButton>
              </Tooltip>
            </Box>
          </div>
        </div>
        {product?.stock > 1 ? (
          <Button
            className=" cart-btn"
            startIcon={<AddShoppingCartIcon />}
            onClick={addToCartHandler}
          >
            Add to cart
          </Button>
        ) : (
          <Tooltip title="Already Add To Cart" placement="top" arrow>
            <Button
              className=" cart-btn"
              startIcon={<AddShoppingCartIcon />}
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
          </Tooltip>
        )}
      </div>
      <div className="product__details__widget">
        <ul>
          <li className=" d-flex">
            <span>Availability:</span>
            <div>
              {product.stock > 0 ? (
                <label htmlFor="stockin" className=" text-start text-success">
                  In Stock
                </label>
              ) : (
                <label htmlFor="stockin" className=" text-start text-danger">
                  Out Of Stock
                </label>
              )}
            </div>
          </li>
          <li className=" d-flex">
            <span>Category:</span>
            <div className=" text-capitalize">{product.category.title}</div>
          </li>
          <li className=" d-flex">
            <span>Store:</span>
            <div>{product.store.title}</div>
          </li>
          {product.localShipmentPolicy === "free" ? (
            <li className=" d-flex">
              <span>Promotions:</span>
              <p className=" text-danger">Free Shipping</p>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductInfo;
