import React from "react";
import PlusMinusSelection from "./PlusMinusSelection";

class RecipeList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ableToAdjust: [
        {
          name: "recipe-lemon",
          shortname: "lemon",
          displayName: "Lemon",
          amount: 0
        },
        {
          name: "recipe-sugar",
          shortname: "sugar",
          displayName: "Sugar",
          amount: 0
        },
        { name: "recipe-ice", shortname: "ice", displayName: "Ice", amount: 0 }
      ]
    };
  }

  getRecipeAmount = userInput => {
    let copyOfAbleToAdjust = [...this.state.ableToAdjust];
    if (userInput.name === "lemon") {
      copyOfAbleToAdjust[0].amount = userInput.amount;
    } else if (userInput.name === "sugar") {
      copyOfAbleToAdjust[1].amount = userInput.amount;
    } else if (userInput.name === "ice") {
      copyOfAbleToAdjust[2].amount = userInput.amount;
    }

    this.setState({
      ableToAdjust: copyOfAbleToAdjust
    });
    //this.sendArrOfRecipeToGameScreen();
  };

  sendArrOfRecipeToGameScreen = () => {
    this.props.parentCallBack(this.state.ableToAdjust);
  };

  renderToAdjust() {
    let arrOfSelection = this.state.ableToAdjust.map(itemToAdjust => (
      <PlusMinusSelection
        name={itemToAdjust.shortname}
        displayName={itemToAdjust.displayName}
        parentCallBack={this.getRecipeAmount}
        hasCost="false"
      />
    ));
    return (
      <div>
        {arrOfSelection}
        <button onClick={this.sendArrOfRecipeToGameScreen}>Set Recipe</button>
      </div>
    );
  }

  render() {
    return this.renderToAdjust();
  }
}
export default RecipeList;
