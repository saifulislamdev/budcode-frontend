import React, { useEffect } from "react";
import "./Team.css";
import { IconContext } from "react-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import ReactRoundedImage from "react-rounded-image";
import compHeader from "../assets/header-pic.jpg";
import saifulPic from "../assets/saiful-pic2.png";
import anvinhPic from "../assets/anvinh-pic.JPG";
import tufayelPic from "../assets/tufayel-pic.png";
import abdulPic from "../assets/abdul-pic.jpg";

const Team = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="team">
      <div className="container team" data-aos="fade-up">
        <h2>Team</h2>
        <p className="u-text-small">
          Our team was divided into two front-end developers and two back-end developers.
        </p>
        <IconContext.Provider value={{ size: "15" }}>
          <div className="team-photos">
            <div className="team-photo">
            <ReactRoundedImage
              image={abdulPic}      
              imageWidth="260"
              imageHeight="250"
              roundedSize="0"
              borderRadius="70"
            />
            </div>
            <div className="team-photo">
            <ReactRoundedImage
              image={anvinhPic}      
              imageWidth="260"
              imageHeight="250"
              roundedSize="0"
              borderRadius="70"
            />
            </div>
            <div className="team-photo">
            <ReactRoundedImage
              image={saifulPic}      
              imageWidth="260"
              imageHeight="250"
              roundedSize="0"
              borderRadius="70"
            />
            </div>
            <div className="team-photo">
            <ReactRoundedImage
              image={tufayelPic}      
              imageWidth="260"
              imageHeight="250"
              roundedSize="0"
              borderRadius="70"
            />
            </div>

          </div>
          <div className="team-icons">
            <div className="team-icon">
              <p>Abdul Imtiaz</p>
            </div>
            <div className="team-icon">
              <p>Anvinh Truong</p>
            </div>
            <div className="team-icon">
               <p>Saiful Islam</p>
            </div>
            <div className="team-icon">
              <p>Tufayel Ahmed</p>
            </div>
            
          </div>
        </IconContext.Provider>
      </div>
    </section>
  );
};

export default Team;
