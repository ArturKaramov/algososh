import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT, CHANGING } from "../constants";
import { QUEUE_SIZE } from "../../src/constants/limits";

describe("Queue testing", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it("button disabled", () => {
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
    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get("input").type(i + 1);
      cy.get("[id=add]").click();

      cy.get("[class*=circle_circle]")
        .eq(i)
        .should("have.css", "border-color", CHANGING);

      cy.wait(SHORT_DELAY_IN_MS);

      for (let j = 0; j <= i; j++) {
        cy.get("[class*=circle_circle]")
          .eq(j)
          .should("have.css", "border-color", DEFAULT)
          .should("have.text", j + 1);

        j === 0
          ? cy.get("[class*=circle_head]").eq(j).should("have.text", "head")
          : cy.get("[class*=circle_head]").eq(j).should("not.have.text");

        j === i
          ? cy.get("[class*=circle_tail]").eq(j).should("have.text", "tail")
          : cy.get("[class*=circle_tail]").eq(j).should("not.have.text");
      }
    }
  });

  it("delete elements", () => {
    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get("input").type(i + 1);
      cy.get("[id=add]").click();
      cy.wait(SHORT_DELAY_IN_MS);
    }

    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get("[id=delete]").click();
      cy.get("[class*=circle_circle]")
        .eq(i)
        .should("have.css", "border-color", CHANGING)
        .should("have.text", i + 1);
      cy.get("[class*=circle_head]").eq(i).should("have.text", "head");
      i === QUEUE_SIZE - 1
        ? cy.get("[class*=circle_tail]").eq(i).should("have.text", "tail")
        : cy.get("[class*=circle_tail]").eq(i).should("not.have.text");

      cy.wait(SHORT_DELAY_IN_MS);

      cy.get("[class*=circle_circle]")
        .eq(i)
        .should("have.css", "border-color", DEFAULT)
        .should("not.have.text");
      i + 1 < QUEUE_SIZE
        ? cy
            .get("[class*=circle_head]")
            .eq(i + 1)
            .should("have.text", "head")
        : cy.get("[class*=circle_head]").eq(i).should("have.text", "head");
    }
  });

  it("clear elements", () => {
    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get("input").type(i + 1);
      cy.get("[id=add]").click();
      cy.wait(SHORT_DELAY_IN_MS);
    }
    cy.get("[id=clear]").click();
    cy.wait(SHORT_DELAY_IN_MS);
    for (let i = 0; i < QUEUE_SIZE; i++) {
      cy.get("[class*=circle_circle]").eq(i).should("not.have.text");
    }
  });
});
