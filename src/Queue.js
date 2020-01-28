import React from "react";
import Customer from "./Customer";

class Queue {
  constructor() {
    this._queue = [];
  }

  enqueue = customer => {
    this._queue.push(customer);
  };

  dequeue = customer => {
    this._queue.shift();
  };

  displayQueue() {
    let arrToDisplay = this._queue.map(customer => (
      <div>{customer.displayCustomerImage()}</div>
    ));

    return arrToDisplay;
  }
}

export default Queue;
