import { Button } from "./button";
import React from "react";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Testing Button", () => {
  it("Button with text", () => {
    const tree = renderer.create(<Button text="Testing" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Button without text", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Disabled Button", () => {
    const tree = renderer.create(<Button disabled />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Callback on Button", () => {
    window.alert = jest.fn();
    render(<Button onClick={alert("Testing")} text="Testing" />);
    const button = screen.getByText("Testing");
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("Testing");
  });
});
