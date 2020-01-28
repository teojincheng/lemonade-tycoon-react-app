import Customer from "./Customer";
import Queue from "./Queue";

class InternalGame {
  constructor() {
    this._customerQueue = [];
    this._arrOfCustomer = [];
  }

  createCustomersAndAddIntoArrOfCustomers = () => {
    let CustomerA = new Customer(1, 120, "coolcat.PNG");
    let CustomerB = new Customer(2, 300, "dogsunglass.PNG");
    this._arrOfCustomer.add(CustomerA);
    this._arrOfCustomer.add(CustomerB);
    return this._arrOfCustomer;
  };

  get customerQueue() {
    return this._customerQueue;
  }
}

export default InternalGame;
