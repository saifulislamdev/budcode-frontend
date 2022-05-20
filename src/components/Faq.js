import React, { useEffect } from "react";
import { questions } from "./data2.js";
import Question from "./Question";
import { MdOutlineLibraryBooks } from "react-icons/md";

import AOS from "aos";
import "aos/dist/aos.css";

const Faq = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="faq">
      <div className="container faq">
        <div className="u-title" data-aos="fade-up">
          <MdOutlineLibraryBooks color="navy" size={30} />
          <h2>FAQ</h2>
          <p className="u-text-small">
            Select from the following list of FAQs. Browse through these FAQs to find answers to commmonly raised questions.
          </p>
        </div>
        <div className="questions">
          {questions.map((question) => (
            <Question
              key={question.id}
              title={question.title}
              answer={question.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
