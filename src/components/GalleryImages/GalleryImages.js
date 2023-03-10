import React from "react";
import "./GalleryImages.css";

const GalleryImages = () => {
  return (
    <div className="instagram">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              style={{
                backgroundImage: `url(" https://cdn.pixabay.com/photo/2016/05/27/08/51/mobile-phone-1419275__340.jpg")`,
              }}
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="/">@mohamed</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              style={{
                backgroundImage: `url("https://www.komando.com/wp-content/uploads/2021/02/photo-gallery.jpg")`,
              }}
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="/">@mohamed</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              style={{
                backgroundImage: `url("https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnRwaG9uZXxlbnwwfHwwfHw%3D&w=1000&q=80")`,
              }}
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="/">@mohamed</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              style={{
                backgroundImage: `url("https://cdn.mos.cms.futurecdn.net/wPycQuKNEohEb6LhfnMusY.jpg")`,
              }}
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="/">@mohamed</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              style={{
                backgroundImage: `url("https://d9qtyz43wogdd.cloudfront.net/pixpacom/images/client-gallery/impress-client.jpg")`,
              }}
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="/">@mohamed</a>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-sm-4 p-0">
            <div
              className="instagram__item set-bg"
              style={{
                backgroundImage: `url("https://d9qtyz43wogdd.cloudfront.net/pixpacom/images/client-gallery/share-images-clients.jpg")`,
              }}
            >
              <div className="instagram__text">
                <i className="fa fa-instagram"></i>
                <a href="/">@mohamed</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryImages;
