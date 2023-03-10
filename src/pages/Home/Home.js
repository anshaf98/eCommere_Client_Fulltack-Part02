import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import Banner from "../../components/Banner/Banner";
import CategoryBanner from "../../components/CategoryBanner/CategoryBanner";
import GalleryImages from "../../components/GalleryImages/GalleryImages";
import MetaData from "../../components/Metadata";
import Product from "../../components/Products/Product";
import Trend from "../../components/Trend/Trend";
import { axiosPublic } from "../../redux/axiosPublic";
import {
  getCategories,
  selectAllCategories,
} from "../../redux/features/categorySlice";
import { selectAllProducts } from "../../redux/features/productSlice";
import "./Home.css";
import { getProducts } from "../../redux/features/productSlice";
import StarsIcon from "@mui/icons-material/Stars";
import FiberNewIcon from "@mui/icons-material/FiberNew";

const Home = () => {
  const limit = 4;
  const dispatch = useDispatch();
  const { categories } = useSelector(selectAllCategories);
  const { products } = useSelector(selectAllProducts);

  useEffect(() => {
    dispatch(getCategories({ toast }));
    dispatch(getProducts({ toast }));
  }, [dispatch]);

  const [topRatedProduct, setTopRatedProduct] = useState();
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosPublic.get(
          `/products?&limit=${limit}&sort_by_ratings=${true}`
        );
        setTopRatedProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  const [categoryProducts, setCategoryProducts] = useState([]);
  const [catProductsLoading, setCatProductsLoading] = useState(false);

  useEffect(() => {
    if (categories) {
      setCatProductsLoading(true);
      const getProducts = async () => {
        try {
          const response = categories.map(
            async (category) =>
              await axiosPublic.get(
                `/products?&limit=${limit}&category=${category._id}`
              )
          );
          Promise.all(response).then((values) => {
            setCategoryProducts([
              ...categoryProducts,
              ...values.map((value) => value.data),
            ]);
          });
        } catch (error) {
          setCatProductsLoading(false);
        } finally {
          setCatProductsLoading(false);
        }
      };
      getProducts();
    }
  }, [categories, catProductsLoading]);

  return (
    <>
      <MetaData title={"Home - Mohamed"} />
      <CategoryBanner />

      {/*  */}
      <section className="product spad" id="#shop">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="section-title d-flex align-items-center justify-content-between">
                <h4>Top Rated Products</h4>
                <StarsIcon style={{ fontSize: "40px" }} />
              </div>
            </div>
          </div>
          <div className="row property__gallery">
            {topRatedProduct &&
              topRatedProduct?.products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>
        </div>
      </section>

      {/*  */}
      <Banner />

      {/*  */}

      {/* 
      {categories &&
        categories.map((cat, i) => (
          <section className="product" key={cat._id}>
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12">
                  <div className="section-title">
                    <h4>{cat.title}</h4>
                  </div>
                </div>
              </div>
              <div className="row property__gallery">
                {categoryProducts &&
                  categoryProducts[i]?.products.map((product) => (
                    <Product product={product} key={product._id} />
                  ))}
              </div>
            </div>
          </section>
        ))} */}

      {/*  */}

      {/*  */}

      <section className="trend spad">
        <div className="container">
          <div className="row">
            {categories &&
              categories.slice(0, 3).map((cat, i) => (
                <div className="col-lg-4 col-md-4 col-sm-6" key={cat._id}>
                  <div className="trend__content">
                    <div className="section-title">
                      <h4>{cat.title}</h4>
                    </div>
                    {categoryProducts &&
                      categoryProducts[i]?.products
                        .slice(0, 4)
                        .map((product) => (
                          <Trend product={product} key={product._id} />
                        ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="product spad" id="#shop">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="section-title d-flex align-items-center justify-content-between">
                <h4>New Products</h4>
                <FiberNewIcon style={{ fontSize: "40px" }} />
              </div>
            </div>
          </div>
          <div className="row property__gallery">
            {products &&
              products
                ?.slice(0, 4)
                .map((product) => (
                  <Product product={product} key={product._id} />
                ))}
          </div>
        </div>
      </section>

      {/*  */}

      <GalleryImages />
    </>
  );
};

export default Home;
