import React from "react";
import InformationCard from "./InformationCard";
import InternalGame from "./InternalGame";
import PlusMinusSelectionSelling from "./PlusMinusSelectionSelling";
import axios from "axios";
import "./GameScreen.css";
import Constant from "./Constant";
import SelectionList from "./SelectionList";

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
      budget: 10,
      recipeOfLemon: 0,
      recipeOfSugar: 0,
      recipeOfIce: 0,
      sellingPricePerCup: 0,
      canSelectRecipe: false,
      canSelectMarketing: false,
      canSelectSupplies: true,
      buyButtonIsClicked: false,
      numbersOfCupsMade: 0,
      numberOfCupsInStore: 0,
      totalCostOfSupplies: 0,
      costPerCup: 0,
      dayStarted: false,
      profit: 0,
      day: 1
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

  // add an internal array of customers into a queue
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

  //when axios call to api is done, call this function to set the image of every customer
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

    return totalCost;
  };

  calculateNumberOfCupsMadeWithRecipe = () => {
    let numbersOfCups = Math.floor(
      this.state.supplyOfLemon / this.state.recipeOfLemon
    );

    return numbersOfCups;
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
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.timerRemoveCustomer);
  }

  displayCustomerQueue = () => {
    const arrToDisplay = this.state.customerQueue.map(customer => (
      <div>{customer.displayCustomerImage()}</div>
    ));
    return arrToDisplay;
  };

  //after user has input the supplies to buy for the day, get data from the
  //children component
  //refactor
  getDataFromSuppliesList = data => {
    let inputValidationMsg = "";
    let amountOfLemon = data[0].amount;
    let amountOfSugar = data[1].amount;
    let amountOfIce = data[2].amount;
    if (amountOfLemon === 0) {
      inputValidationMsg += "You must buy at least 1 lemon";
    } else if (amountOfSugar === 0) {
      inputValidationMsg += "You must buy at least 1 cup of sugar";
    } else if (amountOfIce === 0) {
      inputValidationMsg += "You must buy at least 1 ice";
    }

    if (inputValidationMsg.length !== 0) {
      alert(inputValidationMsg);
      return;
    }

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

  //after user has input the recipe for each cup. get data from children component
  //refactor?
  getDataFromRecipeList = data => {
    let amountOfLemon = data[0].amount;
    let amountOfSugar = data[1].amount;
    let amountOfIce = data[2].amount;
    let inputValidationMsg = "";
    if (amountOfLemon === 0) {
      inputValidationMsg += "You must set at least 1 lemon";
    }

    if (inputValidationMsg.length !== 0) {
      alert(inputValidationMsg);
      return;
    }

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

    this.setState({
      recipeOfLemon: data[0].amount,
      recipeOfSugar: data[1].amount,
      recipeOfIce: data[2].amount,
      numbersOfCupsMade: this.state.supplyOfLemon / amountOfLemon,
      numberOfCupsInStore: this.state.supplyOfLemon / amountOfLemon,
      costPerCup:
        this.state.totalCostOfSupplies /
        (this.state.supplyOfLemon / amountOfLemon)
    });

    this.updateSelection("marketing");
  };

  //after user has input the selling price for a cup, get the data from the children component
  getSellingPrice = userInput => {
    this.setState({
      sellingPricePerCup: userInput,
      navigationSelection: "startDay"
    });
    document.getElementById("start-button").style.visibility = "visible";
    document.getElementsByClassName("profit-fields")[0].style.visibility =
      "visible";
    document.getElementsByClassName("profit-fields")[1].style.visibility =
      "visible";
  };

  //after the sale of each cup, minus the ingredients from the supply.
  removeSupplyOfRawIngredientAfterSale = () => {
    this.setState({
      supplyOfLemon: this.state.supplyOfLemon - this.state.recipeOfLemon,
      supplyOfIce: this.state.supplyOfIce - this.state.recipeOfIce,
      supplyOfSugar: this.state.supplyOfSugar - this.state.recipeOfSugar
    });
  };

  //
  removeCustomerFromQueue = profitOfOneSale => {
    //condition when a game day has ended
    if (this.state.numberOfCupsInStore === 0) {
      clearInterval(this.timerRemoveCustomer);
      return;
    }

    let copyOfCustomerQueue = [...this.state.customerQueue];

    // condition when a game day has ended
    if (copyOfCustomerQueue.length === 0) {
      clearInterval(this.timerRemoveCustomer);
      //start a new day?
      /*
      this.setState({
        navigationSelection: "supplies"
      });
      */
      return;
    }

    copyOfCustomerQueue.shift();
    this.removeSupplyOfRawIngredientAfterSale();
    this.setState({
      customerQueue: copyOfCustomerQueue,
      profit: profitOfOneSale,
      numberOfCupsInStore: this.state.numbersOfCupsMade - 1
    });
  };

  calculateProfitOfOneSale = () => {
    let profitOfOneSale = this.state.sellingPricePerCup - this.state.costPerCup;
    let profitUpdated = this.state.profit + profitOfOneSale;
    return parseFloat(profitUpdated.toFixed(2));
  };

  //after user has started the day, add customers into the queue
  AddCustomerPeriodically = () => {
    this.setState({
      navigationSelection: "dayStarted"
    });
    document.getElementById("start-button").style.visibility = "hidden";
    this.timerID = setInterval(() => this.addCustomerIntoQueue(), 1000);
    this.timerRemoveCustomer = setInterval(
      () => this.removeCustomerFromQueue(this.calculateProfitOfOneSale()),
      5000
    );
  };

  //depending on what the user has done, for example after buying supplies, display the screen to
  //set the recipe for each cup.
  displayContentInsideInformationCard = () => {
    if (this.state.navigationSelection === "supplies") {
      return (
        <div>
          <h3>Supplies</h3>
          <SelectionList
            key="supplySelection"
            hasCost="true"
            parentCallBack={this.getDataFromSuppliesList}
          />
        </div>
      );
    } else if (this.state.navigationSelection === "recipe") {
      return (
        <div>
          <h3>Recipe</h3>
          <SelectionList
            key="recipeSelection"
            hasCost="false"
            parentCallBack={this.getDataFromRecipeList}
          />
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
    } else if (this.state.navigationSelection === "dayStarted") {
      return <div>Time is passing...</div>;
    }
  };

  render() {
    return (
      <div>
        <div className="show-as-row">
          <img
            className="icon-image"
            src={process.env.PUBLIC_URL + "/icons/lemonIcon.png"}
            alt="lemon icon"
          />
          <span className="empty-space"></span>
          <span>{this.state.supplyOfLemon}</span>
          <span className="empty-space"></span>
          <img
            className="icon-image"
            src={process.env.PUBLIC_URL + "/icons/sugarIcon.png"}
            alt="lemon icon"
          />
          <span className="empty-space"></span>
          <span>{this.state.supplyOfSugar}</span>
          <span className="empty-space"></span>
          <img
            className="icon-image"
            src={process.env.PUBLIC_URL + "/icons/iceIcon.png"}
            alt="lemon icon"
          />
          <span className="empty-space"></span>
          <span>{this.state.supplyOfIce}</span>
          <span className="empty-space"></span>
          <span>Budget: </span>
          <span>${this.state.budget.toFixed(2)}</span>
          <span className="empty-space"></span>
          <span className="profit-fields">Profit: </span>
          <span className="profit-fields">$ {this.state.profit}</span>
        </div>

        <div className="show-as-row">
          <InformationCard>
            {this.displayContentInsideInformationCard()}
          </InformationCard>
          <div>{this.displayCustomerQueue()}</div>
          <button id="start-button" onClick={this.AddCustomerPeriodically}>
            Start Day
          </button>
        </div>
      </div>
    );
  }
}

export default GameScreen;
