import React from "react";
import InformationCard from "./InformationCard";
import InternalGame from "./InternalGame";
import SuppliesAdjustList from "./SuppliesList";
import RecipeAdjustList from "./RecipeList";
import PlusMinusSelectionSelling from "./PlusMinusSelectionSelling";
import axios from "axios";
import "./NavigationButton.css";
import Constant from "./Constant";

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
      supplyOfLemon: 0,
      supplyOfSugar: 0,
      supplyOfIce: 0,
      budget: 100,
      recipeOfLemon: 0,
      recipeOfSugar: 0,
      recipeOfIce: 0,
      sellingPricePerCup: 0,
      canSelectRecipe: false,
      canSelectMarketing: false,
      canSelectSupplies: true,
      buyButtonIsClicked: false,
      numbersOfCupsMade: 0,
      totalCostOfSupplies: 0,
      costPerCup: 0,
      dayStarted: false
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
  /*
  checkWhetherDayHasStarted = () => {
    let isDayStarted = this.state.dayStarted;
  };
*/
  setPictureOfCustomer = arrOfCustomer => {
    let copyOfCustomers = [...arrOfCustomer];

    for (let i = 0; i < copyOfCustomers.length; i++) {
      copyOfCustomers[i].imageSrc = this.state.arrOfPeople[i].picture.medium;
    }

    this.setState({
      arrOfCustomer: arrOfCustomer
    });
  };

  calculateTotalCost = data => {
    let costOfLemon = Constant.BUYING_PRICE_ONE_LEMON * data[0].amount;
    let costOfSugar = Constant.BUYING_PRICE_ONE_CUP_SUGAR * data[1].amount;
    let costOfIce = Constant.BUYING_PRICE_ONE_ICE_CUBE * data[2].amount;
    let totalCost = parseFloat(costOfLemon + costOfSugar + costOfIce).toFixed(
      2
    );
    //console.log("total cost " + totalCost);
    return totalCost;
  };

  calculateNumberOfCupsMadeWithRecipe = () => {
    let numbersOfCups = Math.floor(
      this.state.supplyOfLemon / this.state.recipeOfLemon
    );
    //console.log("number of cups: " + numbersOfCups);
    return numbersOfCups;
  };

  /*
  calculateCostPerCup = () => {
    console.log("inside cost per cup");
    console.log("totoal cost: " + this.state.totalCostOfSupplies);
    console.log("cups made: " + this.state.numbersOfCupsMade);
    let costPerCup =
      this.state.totalCostOfSupplies / this.state.numbersOfCupsMade;
    //console.log("cost per cup: " + costPerCup);
    return costPerCup;
  };
  */

  /*
  calculateGainOrLoss = () => {
    let costPerCup = this.calculateCostPerCup();
    let gainOrLoss =
      this.state.sellingPricePerCup * this.state.customerQueue.length -
      costPerCup * this.state.customerQueue.length;
    //console.log("total gain or loss: " + gainOrLoss);
  };
  */
  /*
  makeDayStarted = () => {
    this.setState({
      dayStarted: true
    });
  };
  */

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

    //this.timerID = setInterval(() => this.checkWhetherDayHasStarted(), 1000);
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

  //from selection of supplies
  getDataFromSuppliesList = data => {
    let totalCost = this.calculateTotalCost(data);
    if (totalCost > this.state.budget) {
      alert("The supplies you bought exceed budget");
      return;
    }

    this.setState({
      supplyOfLemon: data[0].amount,
      supplyOfSugar: data[1].amount,
      supplyOfIce: data[2].amount,
      budget: this.state.budget - totalCost,
      totalCostOfSupplies: totalCost
    });
    this.updateSelection("recipe");
  };

  //from selection of recipe
  getDataFromRecipeList = data => {
    let amountOfLemon = data[0].amount;
    let amountOfSugar = data[1].amount;
    let amountOfIce = data[2].amount;

    let message = "";

    if (amountOfLemon > this.state.supplyOfLemon) {
      message += "You cannot use more lemon than what you have";
    } else if (amountOfSugar > this.state.supplyOfSugar) {
      message += "You cannot use more sugar than what you have";
    } else if (amountOfIce > this.state.supplyOfIce) {
      message += "You cannot use more ice than what you have";
    }

    if (message.length !== 0) {
      alert(message);
      return;
    }

    //let costPerCup = this.calculateCostPerCup();
    this.setState({
      recipeOfLemon: data[0].amount,
      recipeOfSugar: data[1].amount,
      recipeOfIce: data[2].amount,
      numbersOfCupsMade: this.state.supplyOfLemon / amountOfLemon,
      costPerCup:
        this.state.totalCostOfSupplies /
        (this.state.supplyOfLemon / amountOfLemon)
    });

    this.updateSelection("marketing");
  };

  getSellingPrice = userInput => {
    this.setState({
      sellingPricePerCup: userInput,
      navigationSelection: "startDay"
    });
    //document.querySelector("#start-button").disabled = false;
    document.getElementById("start-button").style.visibility = "visible";
  };

  removeCustomerFromQueue = () => {
    let copyOfCustomerQueue = [...this.state.customerQueue];
    copyOfCustomerQueue.shift();
    this.setState({
      customerQueue: copyOfCustomerQueue
    });
  };
  AddCustomerPeriodically = () => {
    this.timerID = setInterval(() => this.addCustomerIntoQueue(), 1000);
    this.timerRemoveCustomer = setInterval(
      () => this.removeCustomerFromQueue(),
      5000
    );
  };

  displayContentInsideInformationCard = () => {
    if (this.state.navigationSelection === "supplies") {
      return (
        <div>
          <h3>Supplies</h3>
          <SuppliesAdjustList parentCallBack={this.getDataFromSuppliesList} />
        </div>
      );
    } else if (this.state.navigationSelection === "recipe") {
      return (
        <div>
          <h3>Recipe</h3>
          <RecipeAdjustList parentCallBack={this.getDataFromRecipeList} />
        </div>
      );
    } else if (this.state.navigationSelection === "marketing") {
      return (
        <div>
          <h3>Marketing</h3>
          <PlusMinusSelectionSelling parentCallBack={this.getSellingPrice} />
        </div>
      );
    } else if (this.state.navigationSelection === "startDay") {
      return <div>Press Start Button below</div>;
    }
  };

  render() {
    return (
      <div>
        <div className="show-as-row">
          <span>Lemon: </span>
          <span className="empty-space"></span>
          <span>{this.state.supplyOfLemon}</span>
          <span className="empty-space"></span>
          <span>Sugar: </span>
          <span className="empty-space"></span>
          <span>{this.state.supplyOfSugar}</span>
          <span className="empty-space"></span>
          <span>Ice: </span>
          <span className="empty-space"></span>
          <span>{this.state.supplyOfIce}</span>
          <span className="empty-space"></span>
          <span>Amount of money: </span>
          <span>${this.state.budget}</span>
        </div>

        <div className="show-as-row">
          <InformationCard>
            {this.displayContentInsideInformationCard()}
          </InformationCard>
          <div className="show-as-row">{this.displayCustomerQueue()}</div>
        </div>
        <button id="start-button" onClick={this.AddCustomerPeriodically}>
          Start Day
        </button>
      </div>
    );
  }
}

export default GameScreen;
