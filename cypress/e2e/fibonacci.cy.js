import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

const fib = [
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
  4181, 6765,
];

describe("Fibonacci testing", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  it("button is disabled", () => {
    cy.get("input").should("have.value", "");
    cy.get('[type="submit"]').should("be.disabled");
    //больше 20
    cy.get("input").type("20");
    cy.get('[type="submit"]').should("be.disabled");
  });

  it("fibonacci is correct", () => {
    cy.get("input").type("19");
    cy.get('[type="submit"]').click();
    for (let i = 0; i < 20; i++) {
      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("[class*=circle_circle]").eq(i).should("have.text", fib[i]);
      cy.get("[class*=circle_index]").eq(i).should("have.text", i);
    }
  });
});
