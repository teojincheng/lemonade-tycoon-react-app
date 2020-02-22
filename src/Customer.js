import React from "react";
import "./Customer.css";
class Customer {
  constructor() {
    this._imageSrc = "";
  }

  /*
  get id() {
    return this._id;
  }

  get canWaitTime() {
    return this._canWaitTime;
  }

  get inQueueTime() {
    return this._inQueueTime;
  }

  set inQueueTime(value) {
    this._inQueueTime = value;
  }
  */
  set imageSrc(src) {
    this._imageSrc = src;
  }

  /*
  isCanWaitTimeEqualtoInQueueTime() {
    return this._canWaitTime === this._inQueueTime;
  }
  */

  displayCustomerImage() {
    return <img className="customer-img" src={this._imageSrc} alt="image" />;
  }
}

export default Customer;
