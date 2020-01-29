import React from "react";
import PlusMinusSelection from "./PlusMinusSelection";
class SuppliesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ableToAdjust: [
        { name: "supplies-lemon", shortname: "lemon", amount: 0 },
        { name: "supplies-sugar", shortname: "sugar", amount: 0 },
        { name: "supplies-ice", shortname: "ice", amount: 0 }
      ]
    };
  }

  getAmountFromSelection = userInput => {
    let copyOfAbleToAdjust = [...this.state.ableToAdjust];
    if (userInput.name === "lemon") {
      copyOfAbleToAdjust[0].amount = userInput.amount;
      this.setState({
        ableToAdjust: copyOfAbleToAdjust
      });
      this.sendDataToGameScreen();
    } else if (userInput.name === "sugar") {
    } else if (userInput.name === "ice") {
    }
  };

  sendDataToGameScreen = () => {
    this.props.parentCallBack(this.state.ableToAdjust[0].amount);
  };

  renderToAdjust() {
    return this.state.ableToAdjust.map(itemToAdjust => (
      <PlusMinusSelection
        name={itemToAdjust.shortname}
        parentCallBack={this.getAmountFromSelection}
      />
    ));
  }

  render() {
    return this.renderToAdjust();
  }
}
export default SuppliesList;
