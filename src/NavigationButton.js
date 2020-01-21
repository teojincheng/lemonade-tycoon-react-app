import React from "react";
import "./NavigationButton.css";
import Button from "./Button";

const NavgationButton = ({ text, imageSource }) => {
  return (
    <Button className="navigation-btn">
      <img src={imageSource} alt="" />
      <span>{text}</span>
    </Button>
  );
};

export default NavgationButton;
