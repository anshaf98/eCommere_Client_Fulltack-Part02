import React, { useRef, useState } from "react";
import GalleryImages from "../../components/GalleryImages/GalleryImages";
import Title from "../../components/Title/Title";
import "./Contact.css";
import MetaData from "../../components/Metadata";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import HeadphonesIcon from "@mui/icons-material/Headphones";

const Contact = () => {
  const [done, setDone] = useState(false);
  const form = useRef(null);

  const sendMail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bfml4rd",
        "template_00fpsnz",
        form.current,
        "lHj39_UKhZy8LtNNF"
      )
      .then(
        (result) => {
          console.log(result.text);
          setDone(true);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <>
      <MetaData title={"Contact Form"} />
      <Title title="Contact Us" />

      {/*  */}

      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__content">
                <div className="contact__address">
                  <h5>Contact info</h5>
                  <ul>
                    <li>
                      <h6 className=" d-flex align-items-center gap-2">
                        <BusinessIcon style={{ fontSize: "18px" }} />
                        <span>Address</span>
                      </h6>
                      <p>
                        160 Pennsylvania Ave NW, Kinniya, Castle, PA 16101-5161
                      </p>
                    </li>
                    <li>
                      <h6 className=" d-flex align-items-center gap-2">
                        <PhoneIcon style={{ fontSize: "18px" }} />
                        <span>Phone</span>
                      </h6>
                      <p>
                        <span>111-111-111</span>
                        <span>222-222-222</span>
                      </p>
                    </li>
                    <li>
                      <h6 className=" d-flex align-items-center gap-2">
                        <HeadphonesIcon style={{ fontSize: "18px" }} />
                        <span>Support</span>
                      </h6>
                      <p>abc@gmail.com</p>
                    </li>
                  </ul>
                </div>
                <div className="contact__form">
                  <h5>SEND MESSAGE</h5>
                  <form ref={form} onSubmit={sendMail}>
                    <input type="text" placeholder="Name" name="user_name" />
                    <input type="text" placeholder="Email" name="user_email" />
                    <textarea placeholder="Message" name="meassage"></textarea>
                    <button type="submit" className=" btn2">
                      Send Message
                    </button>
                    {done &&
                      toast.success(
                        "Thanks for your report we will reply it in very soon..."
                      )}
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="contact__map">
                <iframe
                  title="map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63139.764912283434!2d81.1336252413346!3d8.476485589697095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afba20df78f2777%3A0x778c916b3edda3e9!2sKinniya!5e0!3m2!1sen!2slk!4v1676719468930!5m2!1sen!2slk"
                  height={780}
                  style={{ border: "0" }}
                  allowfullscreen=""
                ></iframe>
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

export default Contact;
