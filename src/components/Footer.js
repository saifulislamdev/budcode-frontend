import React from "react";
import "./Footer.css";
import BudCodeLogo from "../assets/footer-logo.png";
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
          <div className="footer-links">
            <img className = "logo-footer" src={BudCodeLogo}></img>
            <a href="https://github.com/abdulimtiaz"> Abdul Imtiaz</a>
            <a href="https://github.com/anvinhtr">Anvinh Truong</a>
            <a href="https://github.com/saifulislamdev">Saiful Islam</a>
            <a href="https://github.com/tufayel5">Tufayel Ahmed</a>
          </div>
        </div>
        
        
      </div>
    </section>
  );
};

export default Footer;
