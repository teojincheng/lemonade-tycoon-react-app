import React from "react";
import Button from "./Button";
import "./PlusButton.css";
const MinusButton = () => {
  return (
    <div className="vertical-center">
      <Button className="plus-button">
        <img src={process.env.PUBLIC_URL + "/icons/minus-icon.png"} alt="" />
      </Button>
    </div>
  );
};

export default MinusButton;
