import React from "react";
import Counter from "./Counter";
import { render, fireEvent } from "@testing-library/react";

describe("Counter", () => {
  it("should render a div element with value properly", () => {
    let c1 = new Counter();
    c1.counterValue = 58;
    const { getByText } = render(c1.displayValue());
    const counterValue = getByText("58");
    expect(counterValue.tagName.toLowerCase()).toBe("div");
  });

  it("can update the value of the counter", () => {
    let c1 = new Counter();
    c1.counterValue = 38;
    expect(c1.counterValue).toBe(38);
  });
});
