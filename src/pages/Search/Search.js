import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GalleryImages from "../../components/GalleryImages/GalleryImages";
import Product2 from "../../components/Products/Product2";
import Title from "../../components/Title/Title";
import {
  getCategories,
  selectAllCategories,
} from "../../redux/features/categorySlice";
import {
  getProducts,
  resetProducts,
  selectAllProducts,
} from "../../redux/features/productSlice";
import "./ProductPage.css";
import { toast } from "react-toastify";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Slider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HeadingWaveSkeleton from "../../components/Skeletons/HeadingWaveSkeleton";
import ProductCardSkeleton from "../../components/Skeletons/ProductCardSkeleton";
import styled from "@emotion/styled";
import Empty from "../Empty/Empty";

const PrettoSlider = styled(Slider)({
  color: "#111",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 8,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#111",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const Search = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  let minPrice = 1;
  let maxPrice = 1000000;
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [ratingsfilter, setRatingsFilter] = useState(0);
  const [category, setCategory] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hasMorepage, setHasMorePage] = useState(true);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    dispatch(resetProducts());
  };

  const priceHandler = (e, newPriceRange) => {
    setPriceRange(newPriceRange);
    setCurrentPage(1);
    dispatch(resetProducts());
  };

  const ratingHandler = (e) => {
    setRatingsFilter(e.target.value);
    setCurrentPage(1);
    dispatch(resetProducts());
  };

  const handleListItemClick = (event, index, id) => {
    setSelectedIndex(index);
    setCategory(id);
    setCurrentPage(1);
    dispatch(resetProducts());
  };

  const { loading, products, filteredProductsCount, resultPerPage } =
    useSelector(selectAllProducts);
  const { categories } = useSelector(selectAllCategories);

  // * infinite scrolling
  const observer = useRef();
  const lastElementRef = useCallback(
    (lastElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMorepage) {
          setCurrentPage((prev) => prev + 1);
        }
      });
      if (lastElement) observer.current.observe(lastElement);
    },
    [loading, hasMorepage]
  );

  useEffect(() => {
    dispatch(resetProducts());
  }, [dispatch]);

  useEffect(() => {
    const promise = dispatch(
      getProducts({
        search,
        currentPage,
        priceRange,
        category,
        ratingsfilter,
        toast,
      })
    );
    return () => {
      promise.abort();
    };
  }, [dispatch, search, currentPage, priceRange, category, ratingsfilter]);

  useEffect(() => {
    if (filteredProductsCount && resultPerPage) {
      setHasMorePage(
        Math.ceil(filteredProductsCount / resultPerPage) > currentPage
      );
    }
  }, [filteredProductsCount, resultPerPage, currentPage]);

  return (
    <>
      <Title title="Shop Page" />

      {/*  */}

      <section className="shop spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="shop__sidebar">
                <div className="sidebar__color">
                  <div className="section-title">
                    <h4>Search Products</h4>
                  </div>
                  <div>
                    <TextField
                      type="search"
                      id="search"
                      label="Search"
                      name="search"
                      margin="normal"
                      fullWidth
                      value={search}
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN SIDE */}
            <div className="row">
              <div className="col-lg-12 col-md-12">
                {loading && loading ? (
                  <HeadingWaveSkeleton />
                ) : (
                  <Typography
                    variant="div"
                    component="h5"
                    sx={{ ml: "10px", mb: "20px", textAlign: "left" }}
                  >
                    {filteredProductsCount && filteredProductsCount > 0 ? (
                      `Found ${filteredProductsCount} items`
                    ) : (
                      <>
                        <Empty />
                      </>
                    )}
                  </Typography>
                )}

                <div className="row">
                  {products &&
                    products.map((product, index) =>
                      products.length === index + 1 ? (
                        <Product2
                          ref={lastElementRef}
                          product={product}
                          key={product._id}
                        />
                      ) : (
                        <Product2 product={product} key={product._id} />
                      )
                    )}
                  {/* PAGE */}
                </div>
                {loading && (
                  <div className="row">
                    {[...Array(6)].map((e, i) => (
                      <ProductCardSkeleton key={i} />
                    ))}
                    {/* PAGE */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <GalleryImages />
    </>
  );
};

export default Search;
