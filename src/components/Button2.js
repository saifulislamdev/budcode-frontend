import React from "react";
import "./Button2.css";

const Button2 = ({ text, btnClass, href }) => {
  return (
    <a href={href} className={`btn2 ${btnClass}`}>
      {text}
    </a>
  );
};

export default Button2;
