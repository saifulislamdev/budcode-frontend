import React, { useEffect } from "react";
import "./Header.css";
import compHeader from "../assets/header-pic.jpg";
import { FiArrowDown } from "react-icons/fi";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="header">
      <div className="container header">
        <div className="header-left" data-aos="fade-right">
          <h1>
            <span>The beginning of</span>
            <span>an online platform</span>
            <span>for developers</span>
          </h1>
          <p className="u-text-small">
          BudCode is an online platform that allows software developers, 
          at any level (novice students to seasoned professionals), to collaborate. 
          BudCode allows innovators to look for team members by posting their project 
          ideas along with relevant information about the project (description, requirements, 
          keywords, etc.) to the website. 
          </p>
          <p className="u-text-small">
          The filtering system allows users to search for projects with filters such as 
          technologies (if the user has a certain technology they would like to work with, 
          like JavaScript)  or themes (if the user wants to work in web development, machine 
          learning, or other areas). Alternatively, users can search for projects using keywords 
          (map to keywords assigned at project creation). Another aspect of search is that users 
          can search for other users and view their profile pages. 
          </p>
          <p className="u-text-small">
          Users can request to join projects and will be notified if the project owners approve 
          or reject their requests. Projects also have a “follow” option that users can opt for, 
          which will allow users to receive updates on their feed page from projects they follow. 
          After completion of a project, a user can leave reviews regarding their experience with 
          their teammates on their teammates’ profile pages.
          </p>
         
        </div>
        <div className="header-right" data-aos="fade-left">
          <img className = "comp-pic" src={compHeader} alt="comp" />
        </div>
      </div>
      <div className="floating-icon">
        <a href="#features">
          <FiArrowDown color="#fff" size={25} className="mouse" />
        </a>
      </div>
    </section>
  );
};

export default Header;
