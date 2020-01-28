import Customer from "./Customer";

class InternalGame {
  constructor() {
    this._customerQueue = [];
    this._arrOfCustomer = [];
  }

  createCustomersAndAddIntoArrOfCustomers = () => {
    let CustomerA = new Customer(1, 120, "coolcat.PNG");
    let CustomerB = new Customer(2, 300, "dogsunglass.PNG");
    this._arrOfCustomer.push(CustomerA);
    this._arrOfCustomer.push(CustomerB);
    return this._arrOfCustomer;
  };
}

export default InternalGame;
