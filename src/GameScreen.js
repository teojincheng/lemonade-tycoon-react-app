import React from "react";
import InformationCard from "./InformationCard";
import Customer from "./Customer";
import PlusMinusSelectionSelling from "./PlusMinusSelectionSelling";
import AxiosInstance from "./AxiosInstance";
import "./GameScreen.css";
import Constant from "./Constant";
import SelectionList from "./SelectionList";
const NUM_CUSTOMERS = 2;

class GameScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigationSelection: "supplies",
      startTime: new Date(),
      elapsedTime: 0,
      arrOfCustomer: [],
      customerQueue: [],
      supplyOfLemon: 0,
      supplyOfSugar: 0,
      supplyOfIce: 0,
      budget: 10,
      recipeOfLemon: 0,
      recipeOfSugar: 0,
      recipeOfIce: 0,
      sellingPricePerCup: 0,
      numbersOfCupsMade: 0,
      numberOfCupsInStore: 0,
      totalCostOfSupplies: 0,
      costPerCup: 0,
      dayStarted: false,
      profit: 0,
      day: 1,
    };
  }

  updateSelection = (navSelection) => {
    this.setState({
      navigationSelection: navSelection,
    });
  };

  updateStartTime = () => {
    this.setState({
      startTime: new Date(),
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
      arrOfCustomer: copyOfCustomerArray,
    });
  };

  //when axios call to api is done, call this function to set the image of every customer
  setPictureOfCustomer = (arrOfImageData) => {
    const customers = [];
    for (let i = 0; i < NUM_CUSTOMERS; i++) {
      const newCustomer = new Customer();
      newCustomer.imageSrc = arrOfImageData.data[i].imageSrc;
      customers.push(newCustomer);
    }

    this.setState({
      arrOfCustomer: customers,
    });
  };

  calculateTotalCost = (data) => {
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

  getSuppliesDataFromDatabase = () => {
    AxiosInstance.get("/supplies").then((response) => {
      if (response.data.length === 3) {
        const costOfLemon =
          Constant.BUYING_PRICE_ONE_LEMON * response.data[0].qty;
        const costOfSugar =
          Constant.BUYING_PRICE_ONE_CUP_SUGAR * response.data[1].qty;
        const costOfIce =
          Constant.BUYING_PRICE_ONE_ICE_CUBE * response.data[2].qty;
        const totalCost = parseFloat(
          costOfLemon + costOfSugar + costOfIce
        ).toFixed(2);

        this.setState({
          supplyOfLemon: response.data[0].qty,
          supplyOfSugar: response.data[1].qty,
          supplyOfIce: response.data[2].qty,
          budget: parseFloat((this.state.budget - totalCost).toFixed(2)),
          totalCostOfSupplies: totalCost,
        });
      }
      this.updateSelection("recipe");
    });
  };

  initialiseCustomers = () => {
    AxiosInstance.get("/customers").then((response) => {
      this.setPictureOfCustomer(response);
    });
  };

  componentDidMount() {
    this.initialiseCustomers();
    //this.getSuppliesDataFromDatabase();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.timerRemoveCustomer);
  }

  displayCustomerQueue = () => {
    const arrToDisplay = this.state.customerQueue.map((customer) => (
      <div>{customer.displayCustomerImage()}</div>
    ));
    return arrToDisplay;
  };

  thereIsExistingSupplies = () => {
    if (
      this.state.supplyOfLemon !== 0 &&
      this.state.supplyOfSugar !== 0 &&
      this.state.supplyOfIce !== 0
    ) {
      return true;
    }
    return false;
  };

  //after user has input the supplies to buy for the day, get data from the
  //children component
  getDataFromSuppliesList = (data) => {
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

    //existing supplies from first game day.
    if (this.thereIsExistingSupplies()) {
      const lemonSupplyObj = {};
      lemonSupplyObj.name = "lemon";
      lemonSupplyObj.qty = this.state.supplyOfLemon + amountOfLemon;

      const sugarSupplyObj = {};
      sugarSupplyObj.name = "sugar";
      sugarSupplyObj.qty = this.state.supplyOfSugar + amountOfSugar;

      const iceSupplyObj = {};
      iceSupplyObj.name = "ice";
      iceSupplyObj.qty = this.state.supplyOfIce + amountOfIce;

      const suppliesArrToPatch = [lemonSupplyObj, sugarSupplyObj, iceSupplyObj];

      //AxiosInstance.patch("/supplies", suppliesArrToPatch);

      this.setState({
        supplyOfLemon: this.state.supplyOfLemon + amountOfLemon,
        supplyOfSugar: this.state.supplyOfSugar + amountOfSugar,
        supplyOfIce: this.state.supplyOfIce + amountOfIce,
        budget: parseFloat((this.state.budget - totalCost).toFixed(2)),
        totalCostOfSupplies: totalCost,
      });
      this.updateSelection("recipe");
    } else {
      const suppliesArrToPost = [];
      for (let i = 0; i < data.length; i++) {
        const supplyObj = {};
        supplyObj.name = data[i].name;
        supplyObj.qty = data[i].amount;
        supplyObj.costPrice = Constant.ARR_SUPPLIES_COST[i];
        suppliesArrToPost.push(supplyObj);
      }

      //AxiosInstance.post("/supplies", suppliesArrToPost);

      this.setState({
        supplyOfLemon: amountOfLemon,
        supplyOfSugar: amountOfSugar,
        supplyOfIce: amountOfIce,
        budget: parseFloat((this.state.budget - totalCost).toFixed(2)),
        totalCostOfSupplies: totalCost,
      });
      this.updateSelection("recipe");
    }
  };

  //after user has input the recipe for each cup. get data from children component
  getDataFromRecipeList = (data) => {
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

    const arrOfPostPromises = [];

    for (let i = 0; i < data.length; i++) {
      const recipeObj = {};
      recipeObj.name = data[i].name;
      recipeObj.qty = data[i].amount;

      //arrOfPostPromises.push(AxiosInstance.post("/recipes", recipeObj));
    }

    //Promise.all(arrOfPostPromises).then();

    this.setState({
      recipeOfLemon: data[0].amount,
      recipeOfSugar: data[1].amount,
      recipeOfIce: data[2].amount,
      numbersOfCupsMade: this.state.supplyOfLemon / amountOfLemon,
      numberOfCupsInStore: this.state.supplyOfLemon / amountOfLemon,
      costPerCup:
        this.state.totalCostOfSupplies /
        (this.state.supplyOfLemon / amountOfLemon),
    });

    this.updateSelection("marketing");
  };

  //after user has input the selling price for a cup, get the data from the children component
  getSellingPrice = (userInput) => {
    this.setState({
      sellingPricePerCup: userInput,
      navigationSelection: "startDay",
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
      supplyOfSugar: this.state.supplyOfSugar - this.state.recipeOfSugar,
    });
  };

  constructDayStatObj = () => {
    const dayStatObj = {};
    dayStatObj.dayNumber = this.state.day;
    dayStatObj.costPerCup = this.state.costPerCup;
    dayStatObj.sellingPricePerCup = this.state.sellingPricePerCup;
    dayStatObj.cupsSold = 1;

    return dayStatObj;
  };

  resetGameStatesForNewDay = () => {
    this.setState({
      costPerCup: 0,
      numberOfCupsInStore: 0,
      numbersOfCupsMade: 0,
      recipeOfIce: 0,
      recipeOfSugar: 0,
      recipeOfLemon: 0,
      sellingPricePerCup: 0,
      totalCostOfSupplies: 0,
      day: this.state.day + 1,
    });
  };

  functionForResettingStates = () => {
    this.resetGameStatesForNewDay();

    this.setState({
      navigationSelection: "supplies",
    });
    document.getElementById("customer-queue").style.display = "none";
  };
  //
  removeCustomerFromQueue = (profitOfOneSale) => {
    let copyOfCustomerQueue = [...this.state.customerQueue];
    // condition when a game day has ended
    if (copyOfCustomerQueue.length === 0) {
      clearInterval(this.timerRemoveCustomer);

      //remove data from database.
      //AxiosInstance.delete("/recipes");

      //game day has ended and we are at the second game day.
      if (this.state.day === 2) {
        //AxiosInstance.delete("/supplies");

        /*
        AxiosInstance.get("/statistics")
          .then(function (response) {
            // handle success

            let message = "";
            let sortedResultArr = [];
            sortedResultArr = response.data.sort(function (a, b) {
              return a._id - b._id;
            });
            for (let i = 0; i < sortedResultArr.length; i++) {
              message +=
                " Day " +
                sortedResultArr[i]._id +
                " Profit : " +
                sortedResultArr[i].profitPerCup.toFixed(2);
            }
            AxiosInstance.delete("/statistics").then(function () {
              alert(message);
              window.location.reload();
            });
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          });
          */

        window.location.reload();
        return;
      }

      //start a new day
      this.initialiseCustomers();
      this.functionForResettingStates();
      /*
      if (
        this.state.supplyOfIce === 0 &&
        this.state.supplyOfSugar === 0 &&
        this.state.supplyOfLemon === 0
      ) {
        AxiosInstance.delete("/supplies")
          .then(this.functionForResettingStates())
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.functionForResettingStates();
      }
      */
      return;
    }

    //condition when a game day has ended
    if (this.state.numberOfCupsInStore === 0) {
      clearInterval(this.timerRemoveCustomer);
      this.setState({
        customerQueue: [],
      });
      this.initialiseCustomers();
      this.functionForResettingStates();
      /*
      if (
        this.state.supplyOfIce === 0 &&
        this.state.supplyOfSugar === 0 &&
        this.state.supplyOfLemon === 0
      ) {
        AxiosInstance.delete("/supplies")
          .then(this.functionForResettingStates())
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.functionForResettingStates();
      } 
      */
      return;
    }

    copyOfCustomerQueue.shift();
    this.removeSupplyOfRawIngredientAfterSale();

    this.setState({
      customerQueue: copyOfCustomerQueue,
      profit: profitOfOneSale,
      numberOfCupsInStore: this.state.numberOfCupsInStore - 1,
    });

    //AxiosInstance.post("/statistics", this.constructDayStatObj());
  };

  calculateProfitOfOneSale = () => {
    let profitOfOneSale = this.state.sellingPricePerCup - this.state.costPerCup;
    let profitUpdated = this.state.profit + profitOfOneSale;
    return parseFloat(profitUpdated.toFixed(2));
  };

  //after user has started the day, add customers into the queue
  AddCustomerPeriodically = () => {
    this.setState({
      navigationSelection: "dayStarted",
    });
    document.getElementById("start-button").style.visibility = "hidden";
    document.getElementById("customer-queue").style.display = "block";
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
          <div id="customer-queue">{this.displayCustomerQueue()}</div>
          <button id="start-button" onClick={this.AddCustomerPeriodically}>
            Start Day
          </button>
        </div>
      </div>
    );
  }
}

export default GameScreen;
