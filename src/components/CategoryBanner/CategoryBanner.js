import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./CategoryBanner.css";

import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { getBanners, selectAllBanners } from "../../redux/features/bannerSlice";
import { toast } from "react-toastify";
import { IMAGE_BASEURL } from "../../constants/baseURL";

const CategoryBanner = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector(selectAllBanners);

  useEffect(() => {
    dispatch(getBanners({ toast }));
  }, [dispatch]);

  return (
    <section className="categories">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 p-0">
            <Swiper
              cssMode={true}
              mousewheel={true}
              keyboard={true}
              loop={true}
              centeredSlides={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
            >
              {banners.map((banner) => (
                <SwiperSlide>
                  <div
                    className="categories__item categories__large__item set-bg"
                    style={{
                      backgroundImage: `url(${
                        IMAGE_BASEURL + banner.images[0].url
                      })`,
                    }}
                  >
                    <div className="categories__text">
                      <h1
                        className=" text-uppercase"
                        style={{ textShadow: "#fff 1px 0 10px" }}
                      >
                        {banner?.title}
                      </h1>
                      <p>{banner?.description}</p>
                      <Link to="/product">Shop now</Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="col-lg-6">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                <div
                  className="categories__item set-bg"
                  style={{
                    backgroundImage: `url("https://motorolanz.vtexassets.com/assets/vtex.file-manager-graphql/images/1a214250-b0d7-42b4-8627-a24ac3168ab6___3eb8f8b0b585cec24f7e89c10f5bd5db.jpg")`,
                  }}
                >
                  <div className="categories__text">
                    <h4 style={{ textShadow: "#fff 1px 0 10px" }}>Oppo</h4>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                <div
                  className="categories__item set-bg"
                  style={{
                    backgroundImage: `url("https://www.91-cdn.com/hub/wp-content/uploads/2022/05/Realme.jpg")`,
                  }}
                >
                  <div className="categories__text">
                    <h4 style={{ textShadow: "#fff 1px 0 10px" }}>Redmi</h4>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                <div
                  className="categories__item set-bg"
                  style={{
                    backgroundImage: `url("https://www.inventiva.co.in/wp-content/uploads/2022/10/motorola_edge_20_series-16291849223x2-1.jpg")`,
                  }}
                >
                  <div className="categories__text">
                    <h4 style={{ textShadow: "#fff 1px 0 10px" }}>Nokia</h4>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                <div
                  className="categories__item set-bg"
                  style={{
                    backgroundImage: `url("https://contentstatic.techgig.com/photo/msid-88583104/New-year-new-phone-7-best-Android-phones-you-can-buy-under-Rs-30000.jpg")`,
                  }}
                >
                  <div className="categories__text">
                    <h4 style={{ textShadow: "#fff 1px 0 10px" }}>
                      Head Phone
                    </h4>
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
