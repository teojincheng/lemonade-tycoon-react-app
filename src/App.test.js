import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import GameScreen from "./GameScreen";
describe(App, () => {
  it("<GameScreen> should render", () => {
    const { getByText } = render(<GameScreen />);
    const gameScreenComponent = getByText("Supplies");
    expect(gameScreenComponent).toBeInTheDocument();
  });
});
