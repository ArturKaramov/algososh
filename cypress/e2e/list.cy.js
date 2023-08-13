import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT, CHANGING, MODIFIED } from "../constants";
import { INIT_LIST } from "../../src/constants/limits";

describe("List testing", () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it("button disabled", () => {
    cy.get("[name=node]").should("have.value", "");
    cy.get("[name=index]").should("have.value", "");
    cy.get("[id=addHead]").should("be.disabled");
    cy.get("[id=addTail]").should("be.disabled");
    cy.get("[id=addIndex]").should("be.disabled");
    cy.get("[id=deleteIndex]").should("be.disabled");
    cy.get("[name=node]").type("1");
    cy.get("[id=addHead]").should("not.be.disabled");
    cy.get("[id=addTail]").should("not.be.disabled");
    cy.get("[name=index]").type("1");
    cy.get("[id=addIndex]").should("not.be.disabled");
    cy.get("[id=deleteIndex]").should("not.be.disabled");
  });

  it("initial list", () => {
    for (let i = 0; i < INIT_LIST.length; i++) {
      cy.get("[class*=circle_circle]")
        .eq(i)
        .should("have.css", "border-color", DEFAULT)
        .should("have.text", INIT_LIST[i]);
    }
    cy.get("[class*=circle_head]").eq(0).should("have.text", "head");
    cy.get("[class*=circle_tail]")
      .eq(INIT_LIST.length - 1)
      .should("have.text", "tail");
  });

  it("add into head", () => {
    cy.get("[name=node]").type("1");
    cy.get("[id=addHead]").click();
    //в первом элементе
    cy.get("[class*=circle_head]").eq(0).children().should("have.text", "1");
    //проверка отображения
    cy.get("[class*=circle_small]")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", "1");
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_circle]")
      .eq(0)
      .should("have.text", "1")
      .should("have.css", "border-color", MODIFIED);
    cy.get("[class*=circle_head]").eq(0).should("have.text", "head");
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_circle]")
      .eq(0)
      .should("have.text", "1")
      .should("have.css", "border-color", DEFAULT);
  });

  it("add into tail", () => {
    cy.get("[name=node]").type("1");
    cy.get("[id=addTail]").click();
    //в первом элементе
    cy.get("[class*=circle_head]")
      .eq(INIT_LIST.length - 1)
      .children()
      .should("have.text", "1");
    //проверка отображения
    cy.get("[class*=circle_small]")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", "1");
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_circle]")
      .eq(INIT_LIST.length)
      .should("have.text", "1")
      .should("have.css", "border-color", MODIFIED);

    cy.get("[class*=circle_tail]")
      .eq(INIT_LIST.length)
      .should("have.text", "tail");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_circle]")
      .eq(INIT_LIST.length)
      .should("have.text", "1")
      .should("have.css", "border-color", DEFAULT);
  });

  it("add by index", () => {
    cy.get("[name=node]").type("1");
    cy.get("[name=index]").type("1");
    cy.get("[id=addIndex]").click();

    cy.get("[class*=circle_head]").eq(0).children().should("have.text", "1");
    //проверка отображения
    cy.get("[class*=circle_small]")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", "1");
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_head]").eq(1).children().should("have.text", "1");
    //проверка отображения
    cy.get("[class*=circle_small]")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", "1");

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_circle]")
      .eq(1)
      .should("have.text", "1")
      .should("have.css", "border-color", MODIFIED);
    cy.get("[class*=circle_head]").eq(0).should("have.text", "head");
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_circle]")
      .eq(1)
      .should("have.text", "1")
      .should("have.css", "border-color", DEFAULT);
  });

  it("delete head", () => {
    cy.get("[id=deleteHead]").click();
    //в первом элементе
    cy.get("[class*=circle_tail]")
      .eq(0)
      .children()
      .should("have.text", INIT_LIST[0]);
    //проверка отображения
    cy.get("[class*=circle_small]")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", INIT_LIST[0]);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_circle]").eq(0).should("have.text", INIT_LIST[1]);
    cy.get("[class*=circle_head]").eq(0).should("have.text", "head");
  });

  it("delete tail", () => {
    cy.get("[id=deleteTail]").click();
    //в первом элементе
    cy.get("[class*=circle_tail]")
      .eq(INIT_LIST.length - 1)
      .children()
      .should("have.text", INIT_LIST[INIT_LIST.length - 1]);
    //проверка отображения
    cy.get("[class*=circle_small]")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", INIT_LIST[INIT_LIST.length - 1]);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=circle_circle]")
      .eq(INIT_LIST.length - 2)
      .should("have.text", INIT_LIST[INIT_LIST.length - 2]);
    cy.get("[class*=circle_tail]")
      .eq(INIT_LIST.length - 2)
      .should("have.text", "tail");
  });

  it("delete by index", () => {
    cy.get("[name=index]").type("1");
    cy.get("[id=deleteIndex]").click();
    cy.get("[class*=circle_circle]")
      .eq(0)
      .should("have.css", "border-color", CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_circle]")
      .eq(1)
      .should("have.css", "border-color", CHANGING);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_tail]")
      .eq(1)
      .children()
      .should("have.text", INIT_LIST[1]);
    //проверка отображения
    cy.get("[class*=circle_small]")
      .should("have.css", "border-color", CHANGING)
      .should("have.text", INIT_LIST[1]);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=circle_circle]").eq(1).should("have.text", INIT_LIST[2]);
  });
});
