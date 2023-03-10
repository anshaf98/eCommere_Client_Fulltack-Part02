import React, { useEffect, useState } from "react";
import GalleryImages from "../../components/GalleryImages/GalleryImages";
import Product from "../../components/Products/Product";
import Title from "../../components/Title/Title";
import {
  productDetails,
  selectProductDetails,
} from "../../redux/features/productSlice";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newReview,
  selectAllReviews,
  selectReviewMutationResult,
  resetMutationResult,
  getReviews,
} from "../../redux/features/reviewSlice";
import { toast } from "react-toastify";
import ProductInfo from "./ProductInfo";
import ProductImage from "./ProductImage";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
  Stack,
  TextareaAutosize,
  Button,
} from "@mui/material";
import Loading from "../../components/Loading/Loading";
import ReviewCard from "./ReviewCard";
import { axiosPublic } from "../../redux/axiosPublic";
import MetaData from "../../components/Metadata";

const ProductDetails = () => {
  const [submitRating, setSubmitRating] = useState(5);
  const [submitReview, setSubmitReview] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, product } = useSelector(selectProductDetails);
  const { reviews } = useSelector(selectAllReviews);
  const { success } = useSelector(selectReviewMutationResult);
  console.log(reviews);

  useEffect(() => {
    if (success) {
      toast.success("Thank for your valuable review.");
      dispatch(resetMutationResult());
    }
    dispatch(productDetails({ id, toast }));
    dispatch(getReviews({ id, toast }));
  }, [dispatch, id, success]);

  const handleSubmitReviewRating = () => {
    setOpen(false);

    const jsonData = {
      rating: submitRating,
      comment: submitReview,
      productId: product._id,
    };
    dispatch(newReview({ jsonData, toast }));
  };

  // * TOP RATED PRODUCTS
  const [topRatedProduct, setTopRatedProduct] = useState();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosPublic.get(
          `/products?&sort_by_ratings=${true}`
        );
        setTopRatedProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${product?.title}'s - Mohamed`} />
          <Title title={`${product?.title}'s`} />

          {/*  */}

          <section className="product-details spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <div className="product__details__pic">
                    {product?.images && (
                      <ProductImage images={product.images} />
                    )}
                  </div>
                </div>
                <div className="col-lg-6">
                  {product && <ProductInfo product={product} />}
                </div>
              </div>

              <div className="row mt-5">
                <div className=" col-12">
                  <div className="blog__details__comment">
                    <h5>{product?.numOfReviews} Comment</h5>
                    <button className="leave-btn" onClick={handleClickOpen}>
                      Leave a comment
                    </button>
                    {/* YOUR COMMENT */}
                    <Dialog open={open} onClose={handleClose}>
                      <DialogTitle
                        sx={{ bgcolor: "black", color: "#fff", mb: 2 }}
                      >
                        Review &#38; Rating
                      </DialogTitle>
                      <DialogContent sx={{ minWidth: "500px" }} fullWidth>
                        <Stack spacing={1} sx={{ display: "block" }}>
                          <Rating
                            value={submitRating}
                            precision={0.1}
                            onChange={(e, newValue) =>
                              setSubmitRating(newValue)
                            }
                          />
                        </Stack>
                        <TextareaAutosize
                          id="review"
                          style={{
                            width: "100%",
                            margin: "10px 0",
                            borderRadius: "10px",
                            padding: "15px",
                            borderColor: "#ccc",
                            resize: "none",
                          }}
                          minRows={5}
                          value={submitReview}
                          variant="standard"
                          onChange={(e) => setSubmitReview(e.target.value)}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button className=" text-dark" onClick={handleClose}>
                          Cancel
                        </Button>
                        <Button
                          className=" text-dark"
                          onClick={handleSubmitReviewRating}
                        >
                          Submit
                        </Button>
                      </DialogActions>
                    </Dialog>

                    {/* RESENT REVIEW  */}

                    {product?.reviews && product.reviews[0] ? (
                      <div className="review">
                        {product?.reviews &&
                          product.reviews.map((review) => (
                            <ReviewCard review={review} />
                          ))}
                      </div>
                    ) : (
                      <div className="review box-shadow p-5 text-center">
                        <h3>No Reviews Yet</h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-lg-12 text-center">
                  <div className="related__title">
                    <h5>TOP RATED PRODUCTS</h5>
                  </div>
                </div>
                {topRatedProduct &&
                  topRatedProduct?.products
                    .slice(0, 4)
                    .map((product) => (
                      <Product product={product} key={product._id} />
                    ))}
              </div>
            </div>
          </section>

          {/*  */}
          <GalleryImages />
        </>
      )}
    </>
  );
};

export default ProductDetails;
