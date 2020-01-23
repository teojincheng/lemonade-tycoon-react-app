import React from "react";
import Button from "./Button";
import "./PlusButton.css";

const PlusButton = () => {
  return (
    <div className="vertical-center">
      <Button className="plus-button">
        <img src={process.env.PUBLIC_URL + "/icons/PlusVector.png"} alt="" />
      </Button>
    </div>
  );
};

export default PlusButton;
