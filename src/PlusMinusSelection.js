import React from "react";
import PlusButton from "./PlusButton";
import MinusButton from "./MinusButton";
import NumberInput from "./NumberInput";
import "./PlusMinusSelection.css";

function PlusMinusSelection() {
  return (
    <div className="selection-block">
      <MinusButton />
      <img src="https://via.placeholder.com/70" alt="" />
      <NumberInput />
      <PlusButton />
    </div>
  );
}

export default PlusMinusSelection;
