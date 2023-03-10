// import { PunchClock } from "@mui/icons-material";
import { Divider, Rating } from "@mui/material";
import React from "react";
import { IMAGE_BASEURL } from "../../constants/baseURL";

const ReviewCard = ({ review }) => {
  return (
    <>
      <div className="blog__comment__item mt-3">
        <div className="blog__comment__item__pic">
          <img
            src={
              IMAGE_BASEURL + review?.user?.avatar?.url ||
              "https://www.computerhope.com/jargon/g/guest-user.png"
            }
            alt=""
          />
        </div>
        <div className="blog__comment__item__text">
          <h6>{review?.user?.name || "User 1"}</h6>
          <p>{review.comment}</p>
          <Rating value={review.rating} precision={0.1} readOnly />
          {/* <ul>
          <li>
            <PunchClock /> Seb 17, 2019
          </li>
        </ul> */}
        </div>
      </div>
      <Divider />
    </>
  );
};

export default ReviewCard;
