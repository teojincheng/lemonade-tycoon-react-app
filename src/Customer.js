class Customer {
  constructor(id, canWaitTime) {
    this._id = id;
    this._canWaitTime = canWaitTime;
    this._inQueueTime = 0;
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

  isCanWaitTimeEqualtoInQueueTime() {
    return this._canWaitTime === this._inQueueTime;
  }
}

export default Customer;
