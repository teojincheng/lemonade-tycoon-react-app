import React from "react";
import PlusMinusSelection from "./PlusMinusSelection";
class SuppliesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ableToAdjust: [
        {
          name: "supplies-lemon",
          shortname: "lemon",
          displayName: " $0.40 each",
          amount: 0
        },
        {
          name: "supplies-sugar",
          shortname: "sugar",
          displayName: " $0.40 per cup",
          amount: 0
        },
        {
          name: "supplies-ice",
          shortname: "ice",
          displayName: " $0.02 per cube",
          amount: 0
        }
      ]
    };
  }

  getAmountFromSelection = userInput => {
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
    //this.sendArrOfSuppliesToGameScreen();
  };

  sendArrOfSuppliesToGameScreen = () => {
    this.props.parentCallBack(this.state.ableToAdjust);
  };

  renderToAdjust() {
    let arrOfSelection = this.state.ableToAdjust.map(itemToAdjust => (
      <PlusMinusSelection
        name={itemToAdjust.shortname}
        displayName={itemToAdjust.displayName}
        parentCallBack={this.getAmountFromSelection}
        hasCost="true"
      />
    ));
    return (
      <div>
        {arrOfSelection}
        <button onClick={this.sendArrOfSuppliesToGameScreen}>Buy</button>
      </div>
    );
  }

  render() {
    return this.renderToAdjust();
  }
}
export default SuppliesList;
