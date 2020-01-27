class Customer {
  constructor(id, canWaitTime) {
    this._id = id;
    this._canWaitTime = canWaitTime;
  }

  get canWaitTime() {
    return this._canWaitTime;
  }

  get id() {
    return this._id;
  }
}
