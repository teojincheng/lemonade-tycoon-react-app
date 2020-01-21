import React from "react";
import logo from "./logo.svg";
import "./App.css";
import OnHandIngredient from "./OnHandIngredient";
import InformationCard from "./InformationCard";
import NavgationButton from "./NavigationButton";
import PlusButton from "./PlusButton";
import MinusButton from "./MinusButton";

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
      <PlusButton />
      <MinusButton />
      <InformationCard />
    </div>
  );
}

export default App;
