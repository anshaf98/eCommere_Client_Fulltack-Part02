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
import SmallProduct from "../../components/SmallProduct";

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

const ProductPage = () => {
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
    dispatch(getCategories({ toast }));
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
            <div className="col-lg-3 col-md-3">
              <div className="shop__sidebar">
                <div className="sidebar__color">
                  <div className="section-title">
                    <h4>Search Products</h4>
                  </div>
                  <Box>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography sx={{ display: "flex" }}>
                          Search Products
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <TextField
                          type="text"
                          id="search"
                          label="Search"
                          name="search"
                          margin="normal"
                          fullWidth
                          value={search}
                          onChange={handleSearch}
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </div>
                {/* CATEGORIES */}
                <div className="sidebar__categories">
                  <div className="section-title">
                    <h4>Categories</h4>
                  </div>
                  <Box>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography sx={{ display: "flex" }}>
                          Select Category
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <List component="nav" aria-label="main mailbox folders">
                          <ListItemButton
                            key={0}
                            id={0}
                            selected={selectedIndex === 0}
                            onClick={(event) =>
                              handleListItemClick(event, 0, "")
                            }
                          >
                            <ListItemText primary="All" />
                          </ListItemButton>

                          {categories &&
                            categories.map((cat, index) => (
                              <ListItemButton
                                key={cat._id}
                                id={cat._id}
                                selected={selectedIndex === index + 1}
                                onClick={(event) =>
                                  handleListItemClick(event, index + 1, cat._id)
                                }
                              >
                                <ListItemText
                                  className=" text-capitalize"
                                  primary={cat.title}
                                />
                              </ListItemButton>
                            ))}
                        </List>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </div>
                {/* CATEGORIES */}

                {/* PRICE */}
                <div className="sidebar__price">
                  <div className="section-title">
                    <h4>Shop By Price</h4>
                  </div>
                  <Box>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography sx={{ display: "flex" }}>
                          By Price
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <PrettoSlider
                          value={priceRange}
                          min={minPrice}
                          step={1000}
                          max={maxPrice}
                          onChange={(e, newPriceRange) =>
                            priceHandler(e, newPriceRange)
                          }
                          valueLabelDisplay="on"
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </div>
                {/* PRICE */}

                <div className="sidebar__rating">
                  <div className="section-title">
                    <h4>Rating</h4>
                  </div>

                  <Box>
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography sx={{ display: "flex" }}>
                          By Rating
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <PrettoSlider
                          defaultValue={0}
                          min={0}
                          step={0.1}
                          max={5}
                          onChange={ratingHandler}
                          valueLabelDisplay="on"
                        />
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                </div>
              </div>

              {/*  */}
              <div className=" mt-3 mb-3">
                <SmallProduct products={products} />
              </div>
            </div>

            {/* MAIN SIDE */}

            <div className="col-lg-9 col-md-9">
              {loading && loading ? (
                <HeadingWaveSkeleton />
              ) : (
                <Typography
                  variant="div"
                  component="h5"
                  sx={{ mb: "20px", mt: "20px", textAlign: "left" }}
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
      </section>

      {/*  */}
      <GalleryImages />
    </>
  );
};

export default ProductPage;
