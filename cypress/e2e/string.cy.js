import { DELAY_IN_MS } from "../../src/constants/delays";
import { CHANGING, DEFAULT, MODIFIED } from "../constants";

describe("String page testing", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });

  it("Input empty and button disabled", () => {
    cy.get("input").should("have.value", "");
    cy.get("[data-testid^=button]").should("be.disabled");
  });

  it("String reverse", () => {
    cy.get("input").type("abcd");
    cy.get("[class^=circle_circle]").eq(0).as("0");
    cy.get("[class^=circle_circle]").eq(1).as("1");
    cy.get("[class^=circle_circle]").eq(2).as("2");
    cy.get("[class^=circle_circle]").eq(3).as("3");

    cy.get("@0")
      .should("have.css", "border-color", DEFAULT)
      .should("have.text", "a");
    cy.get("@1")
      .should("have.css", "border-color", DEFAULT)
      .should("have.text", "b");
    cy.get("@2")
      .should("have.css", "border-color", DEFAULT)
      .should("have.text", "c");
    cy.get("@3")
      .should("have.css", "border-color", DEFAULT)
      .should("have.text", "d");

    cy.get("[data-testid^=button]").click();

    cy.get("@0")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", "d");
    cy.get("@1")
      .should("have.css", "border-color", DEFAULT)
      .should("have.text", "b");
    cy.get("@2")
      .should("have.css", "border-color", DEFAULT)
      .should("have.text", "c");
    cy.get("@3")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", "a");
    cy.wait(DELAY_IN_MS);
    cy.get("@0")
      .should("have.css", "border-color", MODIFIED)
      .should("have.text", "d");
    cy.get("@1")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", "c");
    cy.get("@2")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", "b");
    cy.get("@3")
      .should("have.css", "border-color", MODIFIED)
      .should("have.text", "a");
    cy.wait(DELAY_IN_MS);
    cy.get("@0")
      .should("have.css", "border-color", MODIFIED)
      .should("have.text", "d");
    cy.get("@1")
      .should("have.css", "border-color", MODIFIED)
      .should("have.text", "c");
    cy.get("@2")
      .should("have.css", "border-color", MODIFIED)
      .should("have.text", "b");
    cy.get("@3")
      .should("have.css", "border-color", MODIFIED)
      .should("have.text", "a");
  });
});
