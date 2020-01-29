import React from "react";
import OnHandIngredient from "./OnHandIngredient";
import InformationCard from "./InformationCard";
import PlusMinusSelection from "./PlusMinusSelection";
import InternalGame from "./InternalGame";
import SuppliesAdjustList from "./SuppliesList";

import axios from "axios";
import "./NavigationButton.css";

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationSelection: "supplies",
      startTime: new Date(),
      elapsedTime: 0,
      arrOfCustomer: [],
      customerQueue: [],
      arrOfPeople: [],
      supplyOfLemon: 0
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

  setPictureOfCustomer = arrOfCustomer => {
    let copyOfCustomers = [...arrOfCustomer];

    for (let i = 0; i < copyOfCustomers.length; i++) {
      copyOfCustomers[i].imageSrc = this.state.arrOfPeople[i].picture.medium;
    }

    this.setState({
      arrOfCustomer: arrOfCustomer
    });
  };

  componentDidMount() {
    let Game = new InternalGame();
    let internalArrOfCustomer = Game.createCustomersAndAddIntoArrOfCustomers();
    axios("https://randomuser.me/api/?results=5").then(response => {
      this.setState({
        arrOfCustomer: internalArrOfCustomer
      });
      this.setState({
        arrOfPeople: response.data.results
      });
      this.setPictureOfCustomer(this.state.arrOfCustomer);
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

  getDataFromSuppliesList = data => {
    console.log("game screen new lemon: " + data);
  };

  render() {
    return (
      <div>
        <div className="show-as-row">
          <span>Lemon: </span>
          <span className="empty-space"></span>
          <span>{this.state.supplyOfLemon}</span>
          <OnHandIngredient />
          <OnHandIngredient />
        </div>
        <div className="show-as-row">
          <button className="navigation-btn">
            <img src="https://via.placeholder.com/60" />
            <span>Marketing</span>
          </button>
          <button
            onClick={() => this.updateSelection("recipe")}
            className="navigation-btn"
          >
            <img src="https://via.placeholder.com/60" />
            <span>Recipe</span>
          </button>
          <button
            onClick={() => this.updateSelection("supplies")}
            className="navigation-btn"
          >
            <img src="https://via.placeholder.com/60" />
            <span>Supplies</span>
          </button>
        </div>
        <div className="show-as-row">
          <InformationCard>
            {this.state.navigationSelection === "supplies" ? (
              <div>
                <h3>Supplies</h3>
                <SuppliesAdjustList
                  parentCallBack={this.getDataFromSuppliesList}
                />
              </div>
            ) : (
              <h3>Recipe</h3>
            )}
          </InformationCard>
          <div className="show-as-row">{this.displayCustomerQueue()}</div>
        </div>
        <button onClick={this.updateStartTime}>Start</button>
        <button onClick={this.calculateElapsed}>End</button>
        <span>Elapsed time: {this.state.elapsedTime} </span>
      </div>
    );
  }
}

export default GameScreen;
