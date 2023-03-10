import { Rating } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IMAGE_BASEURL } from "../../constants/baseURL";
import { formatCurrency } from "../../utility/formatCurrency";

const Trend = ({ product }) => {
  const navigate = useNavigate();

  const linkToDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="trend__item">
      <div
        className="trend__item__pic"
        style={{ cursor: "pointer" }}
        onClick={linkToDetails}
      >
        <img
          src={IMAGE_BASEURL + product.images[0].url}
          alt={product.title}
          className=" rounded-2"
        />
      </div>
      <div className="trend__item__text d-flex align-items-start flex-column justify-content-center">
        <h6 onClick={linkToDetails} style={{ cursor: "pointer" }}>
          {product?.title.length > 15
            ? product.title.slice(0, 14)
            : product.title}
        </h6>

        <div className="rating">
          <Rating
            name="half-rating-read"
            value={product.ratings}
            precision={0.1}
            readOnly
          />
        </div>
        {product.discount > 0 ? (
          <div className=" d-flex align-items-center justify-content-center">
            <div className="product__price">
              {formatCurrency(product.price * (product.discount / 10))}
            </div>
            <div
              className="product__price discount"
              style={{ fontSize: "9px" }}
            >
              ({formatCurrency(product.price)})
            </div>
          </div>
        ) : (
          <div className="product__price">{formatCurrency(product.price)}</div>
        )}
      </div>
    </div>
  );
};

export default Trend;
