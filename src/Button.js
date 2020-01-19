import React from "react";
export default class Button {
  constructor(type = "base") {
    this.type = type;
  }

  getType() {
    return this.type;
  }
}
