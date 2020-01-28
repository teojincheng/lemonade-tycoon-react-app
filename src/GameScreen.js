import React from "react";
import OnHandIngredient from "./OnHandIngredient";
import NavgationButton from "./NavigationButton";
import InformationCard from "./InformationCard";
import PlusMinusSelection from "./PlusMinusSelection";
import InternalGame from "./InternalGame";
import Customer from "./Customer";

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationSelection: "supplies",
      startTime: new Date(),
      elapsedTime: 0,
      arrOfCustomer: [],
      customerQueue: []
    };
  }

  updateSelection = navSelection => {
    this.setState({
      navigationSelection: navSelection
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

  addCustomerIntoQueue = () => {
    if (this.state.arrOfCustomer.length === 0) {
      return;
    }
    let copyOfCustomerArray = [...this.state.arrOfCustomer];
    let Customer = copyOfCustomerArray.pop();
    this.setState({
      customerQueue: this.state.customerQueue.concat(Customer),
      arrOfCustomer: copyOfCustomerArray
    });
  };

  componentDidMount() {
    let Game = new InternalGame();

    this.setState({
      arrOfCustomer: Game.createCustomersAndAddIntoArrOfCustomers()
    });

    this.timerID = setInterval(() => this.addCustomerIntoQueue(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  displayCustomerQueue = () => {
    const arrToDisplay = this.state.customerQueue.map(customer => (
      <div>{customer.displayCustomerImage()}</div>
    ));
    return arrToDisplay;
  };

  render() {
    return (
      <div>
        <OnHandIngredient />
        <div className="show-as-row">
          <button
            onClick={() => this.updateSelection("recipe")}
            className="navigation-btn"
          >
            <img src="https://via.placeholder.com/60" />
            <span>Recipes</span>
          </button>
          <button
            onClick={() => this.updateSelection("supplies")}
            className="navigation-btn"
          >
            <img src="https://via.placeholder.com/60" />
            <span>Supplies</span>
          </button>
        </div>
        <InformationCard>
          {this.state.navigationSelection === "supplies" ? (
            <h3>Supplies</h3>
          ) : (
            <h3>Recipes</h3>
          )}

          <PlusMinusSelection />
        </InformationCard>
        {this.displayCustomerQueue()}
        <button onClick={this.updateStartTime}>Start</button>
        <button onClick={this.calculateElapsed}>End</button>
        <span>Elapsed time: {this.state.elapsedTime} </span>
      </div>
    );
  }
}

export default GameScreen;
