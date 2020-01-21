import React from "react";
import "./NavigationButton.css";
import Button from "./Button";

function NavgationButton() {
  return (
    <Button className="navigation-btn">
      <img src="https://via.placeholder.com/70" alt="" />
      <span>Recipe</span>
    </Button>
  );
}

export default NavgationButton;
