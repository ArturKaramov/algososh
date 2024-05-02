import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import {
  DEFAULT,
  CHANGING,
  MODIFIED,
  INPUT_NODE,
  INPUT_INDEX,
  CIRCLE,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  CIRCLE_SMALL,
  ADD_HEAD,
  ADD_TAIL,
  ADD_INDEX,
  DELETE_HEAD,
  DELETE_TAIL,
  DELETE_INDEX,
} from '../constants';
import { INIT_LIST } from '../../src/constants/limits';

describe('List testing', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('button disabled', () => {
    cy.get(INPUT_NODE).should('have.value', '');
    cy.get(INPUT_INDEX).should('have.value', '');
    cy.get(ADD_HEAD).should('be.disabled');
    cy.get(ADD_TAIL).should('be.disabled');
    cy.get(ADD_INDEX).should('be.disabled');
    cy.get(DELETE_INDEX).should('be.disabled');
    cy.get(INPUT_NODE).type('1');
    cy.get(ADD_HEAD).should('not.be.disabled');
    cy.get(ADD_TAIL).should('not.be.disabled');
    cy.get(INPUT_INDEX).type('1');
    cy.get(ADD_INDEX).should('not.be.disabled');
    cy.get(DELETE_INDEX).should('not.be.disabled');
  });

  it('initial list', () => {
    for (let i = 0; i < INIT_LIST.length; i++) {
      cy.get(CIRCLE)
        .eq(i)
        .should('have.css', 'border-color', DEFAULT)
        .should('have.text', INIT_LIST[i]);
    }
    cy.get(CIRCLE_HEAD).eq(0).should('have.text', 'head');
    cy.get(CIRCLE_TAIL)
      .eq(INIT_LIST.length - 1)
      .should('have.text', 'tail');
  });

  it('add into head', () => {
    cy.get(INPUT_NODE).type('1');
    cy.get(ADD_HEAD).click();
    //в первом элементе
    cy.get(CIRCLE_HEAD).eq(0).children().should('have.text', '1');
    //проверка отображения
    cy.get(CIRCLE_SMALL).should('have.css', 'border-color', CHANGING).should('have.text', '1');
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(0).should('have.text', '1').should('have.css', 'border-color', MODIFIED);
    cy.get(CIRCLE_HEAD).eq(0).should('have.text', 'head');
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(0).should('have.text', '1').should('have.css', 'border-color', DEFAULT);
  });

  it('add into tail', () => {
    cy.get(INPUT_NODE).type('1');
    cy.get(ADD_TAIL).click();
    //в первом элементе
    cy.get(CIRCLE_HEAD)
      .eq(INIT_LIST.length - 1)
      .children()
      .should('have.text', '1');
    //проверка отображения
    cy.get(CIRCLE_SMALL).should('have.css', 'border-color', CHANGING).should('have.text', '1');
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE)
      .eq(INIT_LIST.length)
      .should('have.text', '1')
      .should('have.css', 'border-color', MODIFIED);

    cy.get(CIRCLE_TAIL).eq(INIT_LIST.length).should('have.text', 'tail');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE)
      .eq(INIT_LIST.length)
      .should('have.text', '1')
      .should('have.css', 'border-color', DEFAULT);
  });

  it('add by index', () => {
    cy.get(INPUT_NODE).type('1');
    cy.get(INPUT_INDEX).type('1');
    cy.get(ADD_INDEX).click();

    cy.get(CIRCLE_HEAD).eq(0).children().should('have.text', '1');
    //проверка отображения
    cy.get(CIRCLE_SMALL).should('have.css', 'border-color', CHANGING).should('have.text', '1');
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE_HEAD).eq(1).children().should('have.text', '1');
    //проверка отображения
    cy.get(CIRCLE_SMALL).should('have.css', 'border-color', CHANGING).should('have.text', '1');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(1).should('have.text', '1').should('have.css', 'border-color', MODIFIED);
    cy.get(CIRCLE_HEAD).eq(0).should('have.text', 'head');
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(1).should('have.text', '1').should('have.css', 'border-color', DEFAULT);
  });

  it('delete head', () => {
    cy.get(DELETE_HEAD).click();
    //в первом элементе
    cy.get(CIRCLE_TAIL).eq(0).children().should('have.text', INIT_LIST[0]);
    //проверка отображения
    cy.get(CIRCLE_SMALL)
      .should('have.css', 'border-color', CHANGING)
      .should('have.text', INIT_LIST[0]);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE).eq(0).should('have.text', INIT_LIST[1]);
    cy.get(CIRCLE_HEAD).eq(0).should('have.text', 'head');
  });

  it('delete tail', () => {
    cy.get(DELETE_TAIL).click();
    //в первом элементе
    cy.get(CIRCLE_TAIL)
      .eq(INIT_LIST.length - 1)
      .children()
      .should('have.text', INIT_LIST[INIT_LIST.length - 1]);
    //проверка отображения
    cy.get(CIRCLE_SMALL)
      .should('have.css', 'border-color', CHANGING)
      .should('have.text', INIT_LIST[INIT_LIST.length - 1]);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CIRCLE)
      .eq(INIT_LIST.length - 2)
      .should('have.text', INIT_LIST[INIT_LIST.length - 2]);
    cy.get(CIRCLE_TAIL)
      .eq(INIT_LIST.length - 2)
      .should('have.text', 'tail');
  });

  it('delete by index', () => {
    cy.get(INPUT_INDEX).type('1');
    cy.get(DELETE_INDEX).click();
    cy.get(CIRCLE).eq(0).should('have.css', 'border-color', CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(1).should('have.css', 'border-color', CHANGING);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE_TAIL).eq(1).children().should('have.text', INIT_LIST[1]);
    //проверка отображения
    cy.get(CIRCLE_SMALL)
      .should('have.css', 'border-color', CHANGING)
      .should('have.text', INIT_LIST[1]);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CIRCLE).eq(1).should('have.text', INIT_LIST[2]);
  });
});
