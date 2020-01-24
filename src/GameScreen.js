import React from "react";
import OnHandIngredient from "./OnHandIngredient";
import NavgationButton from "./NavigationButton";
import InformationCard from "./InformationCard";
import PlusMinusSelection from "./PlusMinusSelection";
import Timer from "./Timer";

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationSelection: "",
      startTime: new Date(),
      elapsedTime: 0
    };
  }

  updateSelection = event => {
    console.log(event);
    this.setState({
      navigationSelection: "hi"
    });
  };

  updateStartTime = () => {
    this.setState({
      startTime: new Date()
    });
  };

  calculateElapsed = () => {
    let endTime = new Date();
    let elapsedTimeInSeconds = Math.floor(
      (endTime - this.state.startTime) / 1000
    );
    this.setState({ elapsedTime: elapsedTimeInSeconds });
  };

  render() {
    return (
      <div>
        <OnHandIngredient />
        <div className="show-as-row">
          <button onClick={this.updateSelection} className="navigation-btn">
            <img src="https://via.placeholder.com/60" />
            <span>Recipes</span>
          </button>
          <button className="navigation-btn">
            <img src="https://via.placeholder.com/60" />
            <span>Supplies</span>
          </button>
        </div>
        <InformationCard>
          <h3>Supplies</h3>
          <PlusMinusSelection />
        </InformationCard>
        <button onClick={this.updateStartTime}>Start</button>
        <button onClick={this.calculateElapsed}>End</button>
        <span>Elapsed time: {this.state.elapsedTime} </span>
      </div>
    );
  }
}

export default GameScreen;
