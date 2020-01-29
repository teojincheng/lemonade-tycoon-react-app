import React from "react";
import "./Customer.css";
class Customer {
  constructor(id, canWaitTime, imageName) {
    this._id = id;
    this._canWaitTime = canWaitTime;
    this._inQueueTime = 0;
    this._imageName = imageName;
    this._imageSrc = "";
  }

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

  set imageSrc(src) {
    this._imageSrc = src;
  }

  isCanWaitTimeEqualtoInQueueTime() {
    return this._canWaitTime === this._inQueueTime;
  }

  displayCustomerImage() {
    return (
      <img
        className="customer-img"
        src={process.env.PUBLIC_URL + "/images/" + this._imageName}
        alt="image"
      />
    );
  }
}

export default Customer;
