import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { CIRCLE, BUTTON, CIRCLE_INDEX, INPUT, fib } from "../constants";

describe("Fibonacci testing", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  it("button is disabled", () => {
    cy.get(INPUT).should("have.value", "");
    cy.get(BUTTON).should("be.disabled");
    //больше 20
    cy.get(INPUT).type("20");
    cy.get(BUTTON).should("be.disabled");
  });

  it("fibonacci is correct", () => {
    cy.get(INPUT).type("19");
    cy.get(BUTTON).click();
    for (let i = 0; i < 20; i++) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE).eq(i).should("have.text", fib[i]);
      cy.get(CIRCLE_INDEX).eq(i).should("have.text", i);
    }
  });
});
