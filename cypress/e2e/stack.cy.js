import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { CHANGING, DEFAULT, MODIFIED } from "../constants";

describe("Stack testing", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });

  it("button is disabled", () => {
    cy.get("input").should("have.value", "");
    cy.get("[id=add]").should("be.disabled");
    cy.get("[id=delete]").should("be.disabled");
    cy.get("[id=clear]").should("be.disabled");
    cy.get("input").type("5");
    cy.get("[id=add]").should("not.be.disabled");
    cy.get("[id=add]").click();
    cy.get("[id=add]").should("be.disabled");
    cy.get("[id=delete]").should("not.be.disabled");
    cy.get("[id=clear]").should("not.be.disabled");
  });

  it("add elements", () => {
    for (let i = 0; i < 4; i++) {
      cy.get("input").type(i);
      cy.get("[id=add]").click();
      cy.get("[class*=circle_circle]")
        .eq(i)
        .should("have.css", "border-color", CHANGING)
        .should("have.text", i);
      cy.get("[class*=circle_head]").eq(i).should("have.text", "top");
      cy.get("[class*=circle_index]").eq(i).should("have.text", i);

      cy.wait(SHORT_DELAY_IN_MS);
      cy.get("[class*=circle_circle]")
        .eq(i)
        .should("have.css", "border-color", DEFAULT)
        .should("have.text", i);
    }
  });

  it("delete elements", () => {
    for (let i = 0; i < 4; i++) {
      cy.get("input").type(i);
      cy.get("[id=add]").click();
      cy.wait(SHORT_DELAY_IN_MS);
    }

    for (let i = 3; i >= 0; i--) {
      cy.get("[id=delete]").click();
      cy.get("[class*=circle_circle]")
        .eq(i)
        .should("have.css", "border-color", CHANGING);
      cy.wait(SHORT_DELAY_IN_MS);
      i === 0
        ? cy.get("[class*=circle_circle]").should("not.exist")
        : cy
            .get("[class*=circle_head]")
            .eq(i - 1)
            .should("have.text", "top");
    }
  });

  it("clear elements", () => {
    for (let i = 0; i < 4; i++) {
      cy.get("input").type(i);
      cy.get("[id=add]").click();
      cy.wait(SHORT_DELAY_IN_MS);
    }

    cy.get("[id=clear]").click();
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_circle]").should("not.exist");
  });
});
