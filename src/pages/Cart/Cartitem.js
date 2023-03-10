import { Close } from "@mui/icons-material";
import React from "react";
import { IMAGE_BASEURL } from "../../constants/baseURL";
import { formatCurrency } from "../../utility/formatCurrency";
import { Tooltip } from "@mui/material";
import { IconButton } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Cartitem = ({
  item,
  deleteCartItems,
  decreaseQuantity,
  increaseQuantity,
}) => {
  return (
    <tr>
      <td className="cart__product__item">
        <img src={IMAGE_BASEURL + item.image} width={100} alt="" />
        <div className="cart__product__item__title">
          <h6>{item.title}</h6>
        </div>
      </td>
      <td className="cart__price">{formatCurrency(item.price)}</td>
      <td className="cart__quantity ">
        <div
          className=" bg-dark"
          style={{ width: "fit-content", borderRadius: "25px" }}
        >
          <Tooltip title="Decrease quantity" placement="top" arrow>
            <IconButton
              style={{ color: "#fff" }}
              component="span"
              onClick={() => decreaseQuantity(item._id, item.quantity)}
            >
              <RemoveCircleIcon style={{ height: "40px", width: "40px" }} />
            </IconButton>
          </Tooltip>
          <label className=" text-white">{item.quantity}</label>
          <Tooltip title="Increase quantity" placement="top">
            <IconButton
              component="span"
              style={{ color: "#fff" }}
              onClick={() =>
                increaseQuantity(item._id, item.quantity, item.stock)
              }
            >
              <AddCircleIcon style={{ height: "40px", width: "40px" }} />
            </IconButton>
          </Tooltip>
        </div>
      </td>
      <td className="cart__total">
        {formatCurrency(item.quantity * item.price)}
      </td>
      <td className="cart__close">
        <button
          className="icon_close"
          onClick={() => deleteCartItems(item._id)}
        >
          <Close />
        </button>
      </td>
    </tr>
  );
};

export default Cartitem;
