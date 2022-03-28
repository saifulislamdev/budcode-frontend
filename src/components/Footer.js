import React from "react";
import "./Footer.css";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFax,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <section id="footer">
      <div className="container footer">
        <div className="footer-box">
          <h4>Useful Links</h4>
          <div className="footer-links">
            <a href="#">&bull; Support</a>
          </div>
        </div>
        <div className="footer-box">
          <h4>Support</h4>
          <div className="footer-links">
            <a href="#">&bull; Support</a>
          </div>
        </div>
        <div className="footer-box">
          <h4>Contact Us</h4>
          <div className="footer-contact u-text-small">
            <p>
              <FaMapMarkerAlt /> &nbsp; Address:
            </p>
            <p>
              <FaPhoneAlt /> &nbsp; Phone:
            </p>
            <p>
              <FaFax /> &nbsp; Fax: 
            </p>
            <p>
              <FaEnvelope /> &nbsp; Email: 
            </p>
            <p>
              <FaGlobe /> &nbsp; Website: 
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
