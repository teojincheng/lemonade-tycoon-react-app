import React from "react";
import logo from "./logo.svg";
import "./App.css";
import OnHandIngredient from "./OnHandIngredient";
import InformationCard from "./InformationCard";
import NavgationButton from "./NavigationButton";
import PlusButton from "./PlusButton";
import MinusButton from "./MinusButton";
import NumberInput from "./NumberInput";
import PlusMinusSelection from "./PlusMinusSelection";
function App() {
  return (
    <div className="App">
      <OnHandIngredient />
      <div className="show-as-row">
        <NavgationButton
          text="Recipe"
          imageSource="https://via.placeholder.com/70"
        />
        <NavgationButton
          text="Supplies"
          imageSource="https://via.placeholder.com/70"
        />
      </div>
      <InformationCard>
        <h3>Supplies</h3>
        <PlusMinusSelection />
      </InformationCard>
    </div>
  );
}

export default App;
