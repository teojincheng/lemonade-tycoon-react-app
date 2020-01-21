import React from "react";
import Button from "./Button";
import "./PlusButton.css";
const MinusButton = () => {
  return (
    <Button className="plus-button">
      <img src={process.env.PUBLIC_URL + "/icons/minus-icon.png"} alt="" />
    </Button>
  );
};

export default MinusButton;
