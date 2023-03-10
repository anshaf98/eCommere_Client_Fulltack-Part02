import React, { useEffect } from "react";
import GalleryImages from "../../components/GalleryImages/GalleryImages";
import Title from "../../components/Title/Title";
import "./About.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  selectAllCategories,
} from "../../redux/features/categorySlice";
import { toast } from "react-toastify";
import MetaData from "../../components/Metadata";

const About = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector(selectAllCategories);

  useEffect(() => {
    dispatch(getCategories({ toast }));
  }, [dispatch]);

  return (
    <>
      <MetaData title={`About Us - Mohamed`} />
      <Title title="About Us" />

      {/*  */}

      <section className="blog-details spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="blog__details__content">
                <div className="blog__details__item">
                  <img
                    src="https://t4.ftcdn.net/jpg/02/72/08/71/360_F_272087168_0aHPc8hgQNRyEK2Niy16l0Vbk5e7ld9c.jpg"
                    alt=""
                  />
                  <div className="blog__details__item__title">
                    <span className="tip">Street style</span>
                    <h4>
                      Being seen: how is age diversity effecting change in
                      fashion and beauty?
                    </h4>
                    <ul>
                      <li>
                        by <span> Admin</span>
                      </li>
                      <li>Seb 17, 2019</li>
                    </ul>
                  </div>
                </div>
                <div className="blog__details__desc">
                  <p>
                    Afashion season can be defined as much by the people on the
                    catwalk as it can by the clothes they are wearing. This time
                    around, a key moment came at the end of Marc Jacobs’ New
                    York show, when an almost makeup-free Christy Turlington
                    made a rare return to the catwalk, aged 50 (she also stars,
                    with the designer himself, in the label’s AW ad campaign),
                    where the average catwalk model is around 18.
                  </p>
                  <p>
                    A few days later, Simone Rocha arguably upped the ante. The
                    32-year-old’s show – in part inspired by Louise Bourgeois,
                    who lived until she was 98 – featured models in their 30s
                    and 40s, including cult favourite Jeny Howorth and actor
                    Chloë Sevigny.
                  </p>
                </div>
                <div className="blog__details__quote">
                  <div className="icon">
                    <i className="fa fa-quote-left"></i>
                  </div>
                  <p>
                    Consectetur adipisicing elit, sed do eiusmod tempor
                    incididunt ut labore dolore magna aliqua. Ut enim ad minim
                    veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="blog__details__desc">
                  <p>
                    Occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate.
                  </p>
                </div>
                <div className="blog__details__tags">
                  {categories?.map((category) => (
                    <span className=" text-uppercase" key={category?._id}>
                      {category?.title}
                    </span>
                  ))}
                </div>
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

export default About;
