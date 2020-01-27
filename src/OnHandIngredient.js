import React from "react";
import Counter from "./Counter";
import "./OnHandIngredient.css";

function OnHandIngredient(props) {
  var c1 = new Counter();
  c1.counterValue = 55;
  return (
    <div className="ingredient-block">
      <img src="https://via.placeholder.com/70" alt="" />
      <span className="vertical-center">{c1.displayValue()}</span>
    </div>
  );
}

export default OnHandIngredient;
