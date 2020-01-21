import React from "react";
import logo from "./logo.svg";
import "./App.css";
import OnHandIngredient from "./OnHandIngredient";
import InformationCard from "./InformationCard";
import NavgationButton from "./NavigationButton";
import Button from "./Button";

function App() {
  return (
    <div className="App">
      <OnHandIngredient />
      <InformationCard />
      <NavgationButton />
    </div>
  );
}

export default App;
