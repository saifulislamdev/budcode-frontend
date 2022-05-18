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
          <h4 className = "github-links">Github Links</h4>
          <div className="footer-links">
            <a href="https://github.com/abdulimtiaz">&bull; Abdul Imtiaz</a>
            <a href="https://github.com/anvinhtr">&bull; Anvinh Troung</a>
            <a href="https://github.com/saifulislamdev">&bull; Saiful Islam</a>
            <a href="https://github.com/tufayel5">&bull; Tufayel Ahmed</a>
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default Footer;
