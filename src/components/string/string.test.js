import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import { screen, waitFor } from "@testing-library/react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import { StringComponent } from "./string";
import { delay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

describe("Testing String", () => {
  it("Even number of symbols", async () => {
    render(
      <BrowserRouter>
        <Route>
          <StringComponent />
        </Route>
      </BrowserRouter>
    );
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");
    //инпут пуст
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "test" } });
    let word = screen.getAllByTestId("letter");
    //слово введено
    expect(word.map((elem) => elem.dataset.letter).join("")).toBe("test");
    fireEvent.click(button);
    await waitFor(
      () => {
        word = screen.getAllByTestId("letter");
        //слово развернуто
        expect(word.map((elem) => elem.dataset.letter).join("")).toBe("tset");
      },
      { timeout: DELAY_IN_MS }
    );
  });

  it("Odd number of symbols", async () => {
    render(
      <BrowserRouter>
        <Route>
          <StringComponent />
        </Route>
      </BrowserRouter>
    );
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");
    //инпут пуст
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "abc" } });
    fireEvent.click(button);
    await waitFor(
      () => {
        let word = screen.getAllByTestId("letter");
        //слово развернуто
        expect(word.map((elem) => elem.dataset.letter).join("")).toBe("cba");
      },
      { timeout: DELAY_IN_MS }
    );
  });

  it("One symbol", async () => {
    render(
      <BrowserRouter>
        <Route>
          <StringComponent />
        </Route>
      </BrowserRouter>
    );
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");
    //инпут пуст
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "a" } });
    let word = screen.getAllByTestId("letter");
    //слово введено
    expect(word.map((elem) => elem.dataset.letter).join("")).toBe("a");
    fireEvent.click(button);
    await waitFor(
      () => {
        word = screen.getAllByTestId("letter");
        //слово развернуто
        expect(word.map((elem) => elem.dataset.letter).join("")).toBe("a");
      },
      { timeout: DELAY_IN_MS }
    );
  });

  it("No symbol", async () => {
    render(
      <BrowserRouter>
        <Route>
          <StringComponent />
        </Route>
      </BrowserRouter>
    );
    const input = screen.getByTestId("input");
    const button = screen.getByTestId("button");
    //инпут пуст
    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "" } });
    //если строка пуста - кнопка неактивна
    expect(button.hasAttribute("disabled"));
  });
});
