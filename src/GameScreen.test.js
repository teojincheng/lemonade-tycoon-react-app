import React from "react";
import { shallow, configure } from "enzyme";
import SelectionList from "./SelectionList";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("GameScreen", () => {
  it("getDataFromSuppliesList() is called", () => {
    const mockGetDataFromSuppliesList = jest.fn();
    const wrapper = shallow(
      <SelectionList
        key="supplySelection"
        hasCost="true"
        parentCallBack={mockGetDataFromSuppliesList}
      />
    );
    wrapper
      .find("button")
      .at(0)
      .simulate("click");

    expect(mockGetDataFromSuppliesList).toHaveBeenCalled();
  });
});
