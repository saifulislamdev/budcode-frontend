import React, { useEffect } from "react";
import "./Team.css";
import { IconContext } from "react-icons";
import AOS from "aos";
import "aos/dist/aos.css";

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
          <div className="team-icons">
            
            <div className="team-icon">
              <p>Abdul Imtiaz</p>
            </div>
            <div className="team-icon">
              <p>Anvinh Troung</p>
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
