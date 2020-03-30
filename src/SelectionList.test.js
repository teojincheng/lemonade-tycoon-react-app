import React from "react";
import { shallow, configure } from "enzyme";
import PlusMinusSelection from "./PlusMinusSelection";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
describe("SelectionList", () => {
  it("getAmountFromSelection() is called", () => {
    const mockGetAmountFromSelection = jest.fn();
    const wrapper = shallow(
      <PlusMinusSelection
        name="lemon"
        displayName="lemon"
        parentCallBack={mockGetAmountFromSelection}
        hasCost="true"
      />
    );
    wrapper
      .find("button")
      .at(1)
      .simulate("click");
    expect(mockGetAmountFromSelection).toHaveBeenCalled();
  });
});
