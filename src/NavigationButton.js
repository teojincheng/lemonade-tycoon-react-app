import React from "react";
import "./NavigationButton.css";

const NavgationButton = ({ text, imageSource, onClickFunction }) => {
  return (
    <button onClick={onClickFunction} className="navigation-btn">
      <img src={imageSource} alt="" />
      <span>{text}</span>
    </button>
  );
};

export default NavgationButton;
