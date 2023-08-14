import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  CHANGING,
  DEFAULT,
  MODIFIED,
  INPUT,
  CIRCLE,
  CIRCLE_HEAD,
  CIRCLE_INDEX,
  CLEAR_BUTTON,
  ADD_BUTTON,
  DELETE_BUTTON,
} from "../constants";

describe("Stack testing", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });

  it("button is disabled", () => {
    cy.get(INPUT).should("have.value", "");
    cy.get(ADD_BUTTON).should("be.disabled");
    cy.get(DELETE_BUTTON).should("be.disabled");
    cy.get(CLEAR_BUTTON).should("be.disabled");
    cy.get(INPUT).type("5");
    cy.get(ADD_BUTTON).should("not.be.disabled");
    cy.get(ADD_BUTTON).click();
    cy.get(ADD_BUTTON).should("be.disabled");
    cy.get(DELETE_BUTTON).should("not.be.disabled");
    cy.get(CLEAR_BUTTON).should("not.be.disabled");
  });

  it("add elements", () => {
    for (let i = 0; i < 4; i++) {
      cy.get(INPUT).type(i);
      cy.get(ADD_BUTTON).click();
      cy.get(CIRCLE)
        .eq(i)
        .should("have.css", "border-color", CHANGING)
        .should("have.text", i);
      cy.get(CIRCLE_HEAD).eq(i).should("have.text", "top");
      cy.get(CIRCLE_INDEX).eq(i).should("have.text", i);

      cy.wait(SHORT_DELAY_IN_MS);
      cy.get(CIRCLE)
        .eq(i)
        .should("have.css", "border-color", DEFAULT)
        .should("have.text", i);
    }
  });

  it("delete elements", () => {
    for (let i = 0; i < 4; i++) {
      cy.get(INPUT).type(i);
      cy.get(ADD_BUTTON).click();
      cy.wait(SHORT_DELAY_IN_MS);
    }

    for (let i = 3; i >= 0; i--) {
      cy.get(DELETE_BUTTON).click();
      cy.get(CIRCLE).eq(i).should("have.css", "border-color", CHANGING);
      cy.wait(SHORT_DELAY_IN_MS);
      i === 0
        ? cy.get(CIRCLE).should("not.exist")
        : cy
            .get(CIRCLE_HEAD)
            .eq(i - 1)
            .should("have.text", "top");
    }
  });

  it("clear elements", () => {
    for (let i = 0; i < 4; i++) {
      cy.get(INPUT).type(i);
      cy.get(ADD_BUTTON).click();
      cy.wait(SHORT_DELAY_IN_MS);
    }

    cy.get(CLEAR_BUTTON).click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).should("not.exist");
  });
});
