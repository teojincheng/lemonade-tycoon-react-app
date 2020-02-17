import React from "react";
import PlusMinusSelection from "./PlusMinusSelection";
class SelectionList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      itemsToAdjust: [
        {
          name: "lemon",
          displayName: " $0.40 each",
          amount: 0
        },
        {
          name: "sugar",
          displayName: " $0.40 per cup",
          amount: 0
        },
        {
          name: "ice",
          displayName: " $0.02 per cube",
          amount: 0
        }
      ],
      recipeItemToAdjust: [
        {
          name: "lemon",
          amount: 0
        },
        {
          name: "sugar",
          amount: 0
        },
        {
          name: "ice",
          amount: 0
        }
      ]
    };
  }

  getAmountFromSelection = userInput => {
    if (this.props.hasCost === "true") {
      let copyOfAbleToAdjust = [...this.state.itemsToAdjust];
      if (userInput.name === "lemon") {
        copyOfAbleToAdjust[0].amount = userInput.amount;
      } else if (userInput.name === "sugar") {
        copyOfAbleToAdjust[1].amount = userInput.amount;
      } else if (userInput.name === "ice") {
        copyOfAbleToAdjust[2].amount = userInput.amount;
      }

      this.setState({
        itemsToAdjust: copyOfAbleToAdjust
      });
      //this.sendArrOfSuppliesToGameScreen();
    } else {
      let copyOfRecipeToAdjust = [...this.state.recipeItemToAdjust];
      if (userInput.name === "lemon") {
        copyOfRecipeToAdjust[0].amount = userInput.amount;
      } else if (userInput.name === "sugar") {
        copyOfRecipeToAdjust[1].amount = userInput.amount;
      } else if (userInput.name === "ice") {
        copyOfRecipeToAdjust[2].amount = userInput.amount;
      }

      this.setState({
        recipeItemToAdjust: copyOfRecipeToAdjust
      });
    }
  };

  sendArrOfDataToGameScreen = () => {
    if (this.props.hasCost === "true") {
      this.props.parentCallBack(this.state.itemsToAdjust);
    } else {
      this.props.parentCallBack(this.state.recipeItemToAdjust);
    }
  };

  render() {
    const arrOfSelection = this.state.itemsToAdjust.map(itemToAdjust => (
      <PlusMinusSelection
        name={itemToAdjust.name}
        displayName={itemToAdjust.displayName}
        parentCallBack={this.getAmountFromSelection}
        hasCost={this.props.hasCost}
      />
    ));
    return (
      <div>
        {arrOfSelection}
        <button onClick={this.sendArrOfDataToGameScreen}>
          {this.props.hasCost === "true" ? "Buy" : "Set Recipe"}
        </button>
      </div>
    );
  }
}

export default SelectionList;
