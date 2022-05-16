import React, { useEffect } from "react";
import "./Features.css";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import picFeatures from "../assets/feature-pic.png";
import Feature from "./Feature";
import { FeatureList } from "./data";

import AOS from "aos";
import "aos/dist/aos.css";

const Features = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="features">
      <div className="container features">
        <div className="title" data-aos="fade-up">
          <BsFillBookmarkStarFill color="navy" size={30} />
          <h2>Features</h2>
          <p className="u-text-small">
            These are some of the key features that BudCode has to offer for people looking to collaborate!
          </p>
        </div>
        <div className="features-content">
          <div className="features-left" data-aos="fade-right">
            <img className = "feature-pic" src={picFeatures} alt="featurePic" />
          </div>
          <div className="features-right" data-aos="fade-left">
            {FeatureList.map((feature) => (
              <Feature
                key={feature.id}
                icon={feature.icon}
                heading={feature.heading}
                text={feature.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
