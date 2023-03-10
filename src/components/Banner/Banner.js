import React, { useEffect } from "react";
import "./Banner.css";
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOffers, selectAllOffers } from "../../redux/features/offerSlice";
import { toast } from "react-toastify";

const Banner = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(selectAllOffers);

  useEffect(() => {
    dispatch(getOffers({ toast }));
  }, [dispatch]);

  return (
    <section
      className="banner set-bg"
      data-setbg="img/banner/banner-1.jpg"
      style={{
        backgroundImage: `url("https://www.bajajfinserv.in/5_mobiles_under_Rs.20,000_that_you_buy_on_BF_EMI_store_banner_Samsung-Galaxy-M31_CP-top-banner_Desktop_790x345.jpg")`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xl-7 col-lg-8 m-auto">
            <div className="banner__slider">
              <Swiper
                cssMode={true}
                mousewheel={true}
                keyboard={true}
                loop={true}
                centeredSlides={true}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                modules={[
                  Autoplay,
                  Navigation,
                  Pagination,
                  Mousewheel,
                  Keyboard,
                ]}
              >
                {categories?.map((offer) => (
                  <SwiperSlide>
                    <div className="banner__item">
                      <div className="banner__text">
                        <span>{offer.title}</span>
                        <h1>{offer.description}</h1>
                        <Link to="/shop" className=" btn2">
                          Shop now
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
