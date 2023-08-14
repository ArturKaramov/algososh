import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  DEFAULT,
  CHANGING,
  CIRCLE,
  CIRCLE_TAIL,
  CIRCLE_HEAD,
  ADD_BUTTON,
  CLEAR_BUTTON,
  DELETE_BUTTON,
  INPUT,
} from "../constants";
import { QUEUE_SIZE } from "../../src/constants/limits";

describe("Queue testing", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it("button disabled", () => {
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
    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get(INPUT).type(i + 1);
      cy.get(ADD_BUTTON).click();

      cy.get(CIRCLE).eq(i).should("have.css", "border-color", CHANGING);

      cy.wait(SHORT_DELAY_IN_MS);

      for (let j = 0; j <= i; j++) {
        cy.get(CIRCLE)
          .eq(j)
          .should("have.css", "border-color", DEFAULT)
          .should("have.text", j + 1);

        j === 0
          ? cy.get(CIRCLE_HEAD).eq(j).should("have.text", "head")
          : cy.get(CIRCLE_HEAD).eq(j).should("not.have.text");

        j === i
          ? cy.get(CIRCLE_TAIL).eq(j).should("have.text", "tail")
          : cy.get(CIRCLE_TAIL).eq(j).should("not.have.text");
      }
    }
  });

  it("delete elements", () => {
    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get(INPUT).type(i + 1);
      cy.get(ADD_BUTTON).click();
      cy.wait(SHORT_DELAY_IN_MS);
    }

    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get(DELETE_BUTTON).click();
      cy.get(CIRCLE)
        .eq(i)
        .should("have.css", "border-color", CHANGING)
        .should("have.text", i + 1);
      cy.get(CIRCLE_HEAD).eq(i).should("have.text", "head");
      i === QUEUE_SIZE - 1
        ? cy.get(CIRCLE_TAIL).eq(i).should("have.text", "tail")
        : cy.get(CIRCLE_TAIL).eq(i).should("not.have.text");

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get(CIRCLE)
        .eq(i)
        .should("have.css", "border-color", DEFAULT)
        .should("not.have.text");
      i + 1 < QUEUE_SIZE
        ? cy
            .get(CIRCLE_HEAD)
            .eq(i + 1)
            .should("have.text", "head")
        : cy.get(CIRCLE_HEAD).eq(i).should("have.text", "head");
    }
  });

  it("clear elements", () => {
    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get(INPUT).type(i + 1);
      cy.get(ADD_BUTTON).click();
      cy.wait(SHORT_DELAY_IN_MS);
    }
    cy.get(CLEAR_BUTTON).click();
    cy.wait(SHORT_DELAY_IN_MS);
    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get(CIRCLE).eq(i).should("not.have.text");
    }
  });
});
