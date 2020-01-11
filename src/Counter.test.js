import React from "react";
import Counter from "./Counter";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount, render, configure } from "enzyme";

/*

var c1 = new Counter();
c1.update(188);
renderer.render(c1.displayValue());

*/
configure({ adapter: new Adapter() });
var c1 = new Counter();
c1.update(188);

describe("check displayValue() method", () => {
  it("renders a div", () => {
    const wrapper = shallow(c1.displayValue());
    expect(wrapper.contains(<div>{188}</div>)).toBe(true);
  });
});

test("test update value of counter", () => {
  let c1 = new Counter();
  c1.update(78);
  expect(c1.getValue()).toBe(78);
});
