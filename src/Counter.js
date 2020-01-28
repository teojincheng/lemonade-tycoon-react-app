import React from "react";
class Counter {
  constructor() {
    this._counterValue = 0;
  }

  set counterValue(newValue) {
    this._counterValue = newValue;
  }

  get counterValue() {
    return this._counterValue;
  }

  displayValue() {
    return <div>{this._counterValue}</div>;
  }
}
export default Counter;
