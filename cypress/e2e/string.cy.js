import { DELAY_IN_MS } from '../../src/constants/delays';
import { CHANGING, DEFAULT, MODIFIED, CIRCLE, BUTTON, INPUT } from '../constants';

describe('String page testing', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('Input empty and button disabled', () => {
    cy.get(INPUT).should('have.value', '');
    cy.get(BUTTON).should('be.disabled');
  });

  it('String reverse', () => {
    cy.get(INPUT).type('abcd');
    cy.get(CIRCLE).eq(0).as('0');
    cy.get(CIRCLE).eq(1).as('1');
    cy.get(CIRCLE).eq(2).as('2');
    cy.get(CIRCLE).eq(3).as('3');

    cy.get('@0').should('have.css', 'border-color', DEFAULT).should('have.text', 'a');
    cy.get('@1').should('have.css', 'border-color', DEFAULT).should('have.text', 'b');
    cy.get('@2').should('have.css', 'border-color', DEFAULT).should('have.text', 'c');
    cy.get('@3').should('have.css', 'border-color', DEFAULT).should('have.text', 'd');

    cy.get(BUTTON).click();

    cy.get('@0').should('have.css', 'border-color', CHANGING).should('have.text', 'd');
    cy.get('@1').should('have.css', 'border-color', DEFAULT).should('have.text', 'b');
    cy.get('@2').should('have.css', 'border-color', DEFAULT).should('have.text', 'c');
    cy.get('@3').should('have.css', 'border-color', CHANGING).should('have.text', 'a');
    cy.wait(DELAY_IN_MS);
    cy.get('@0').should('have.css', 'border-color', MODIFIED).should('have.text', 'd');
    cy.get('@1').should('have.css', 'border-color', CHANGING).should('have.text', 'c');
    cy.get('@2').should('have.css', 'border-color', CHANGING).should('have.text', 'b');
    cy.get('@3').should('have.css', 'border-color', MODIFIED).should('have.text', 'a');
    cy.wait(DELAY_IN_MS);
    cy.get('@0').should('have.css', 'border-color', MODIFIED).should('have.text', 'd');
    cy.get('@1').should('have.css', 'border-color', MODIFIED).should('have.text', 'c');
    cy.get('@2').should('have.css', 'border-color', MODIFIED).should('have.text', 'b');
    cy.get('@3').should('have.css', 'border-color', MODIFIED).should('have.text', 'a');
  });
});
