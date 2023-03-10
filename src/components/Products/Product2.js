import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  addItemsToCart,
  removeItem,
  selectCartItems,
} from "../../redux/features/cartSlice";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import "./Products.css";
import { IMAGE_BASEURL } from "../../constants/baseURL";
import { Box, Button, Rating } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatCurrency } from "../../utility/formatCurrency";

const Product = React.forwardRef(({ product }, ref) => {
  const dispatch = useDispatch();
  const [exist, setExist] = useState(false);
  const [color, setColor] = useState("secondary");
  const [icon, setIcon] = useState(<AddShoppingCartIcon />);
  const [text, setText] = useState("Add to cart");

  const { products } = useSelector(selectCartItems);

  const remove = () => {
    setExist(true);
    setColor("error");
    setIcon(<DeleteIcon />);
    setText("Remove from cart");
  };

  const add = () => {
    setExist(false);
    setColor("secondary");
    setIcon(<AddShoppingCartIcon />);
    setText("Add to cart");
  };

  const cartHandler = () => {
    const _id = product._id;
    const quantity = 1;

    if (exist) {
      dispatch(removeItem(_id));
      toast.error("Product remove from cart");
      add();
      return;
    }
    if (!exist) {
      dispatch(addItemsToCart({ _id, quantity, toast }));
      toast.success("Product added to cart");
      remove();
      return;
    }
  };

  const getExist = () => {
    if (products) {
      const e = products.some((p) => p._id === product._id);
      if (e === true) {
        remove();
      }
    }
  };

  useEffect(() => {
    getExist();
  }, []);

  const navigate = useNavigate();

  const linkToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="col-lg-4 col-sm-6 mb-5">
      <div className="product__item">
        <div
          className="product__item__pic set-bg"
          style={{
            backgroundImage: `url(${IMAGE_BASEURL + product.images[0].url})`,
          }}
        >
          {product.discount > 0 ? (
            <div className="label new">{product.discount}%</div>
          ) : (
            ""
          )}
          {product.localShipmentPolicy === "free" ? (
            <div className="label2 new2">Free Shipping</div>
          ) : (
            ""
          )}
          <ul className="product__hover">
            <li>
              <p onClick={linkToDetails}>
                <span className="icon_heart_alt">
                  <VisibilityIcon />
                </span>
              </p>
            </li>
          </ul>
        </div>
        <div className="product__item__text">
          <h5
            onClick={linkToDetails}
            className=" mb-2 text-capitalize"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            {product?.title.length > 15
              ? product.title.slice(0, 14)
              : product.title}
          </h5>
          <div className="rating">
            <Rating
              name="half-rating-read"
              value={product.ratings}
              precision={0.1}
              readOnly
            />

            <span className=" review-card">
              ({product.numOfReviews}) Reviews
            </span>
          </div>
          {product.discount > 0 ? (
            <div className=" d-flex justify-content-center align-items-center gap-2">
              <div className="product__price discount">
                {formatCurrency(product.price)}
              </div>
              <div className="product__price">
                {formatCurrency(
                  product.price - product.price * (product.discount / 100)
                )}
              </div>
            </div>
          ) : (
            <div className="product__price">
              {formatCurrency(product.price)}
            </div>
          )}
        </div>
      </div>

      <Box sx={{ mt: 2 }}>
        {ref ? (
          <Button
            variant="outlined"
            ref={ref}
            fullWidth
            color={color}
            startIcon={icon}
            onClick={cartHandler}
          >
            {text}
          </Button>
        ) : (
          <Button
            variant="outlined"
            fullWidth
            color={color}
            startIcon={icon}
            onClick={cartHandler}
          >
            {text}
          </Button>
        )}
      </Box>
    </div>
  );
});

export default Product;
