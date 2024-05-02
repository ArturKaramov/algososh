describe('Routing to', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('StringPage is available', () => {
    cy.visit('/recursion');
    cy.contains('Строка');
  });

  it('FibonacciPage is available', () => {
    cy.visit('/fibonacci');
    cy.contains('Последовательность Фибоначчи');
  });

  it('SortingPage is available', () => {
    cy.visit('/sorting');
    cy.contains('Сортировка массива');
  });

  it('StackPage is available', () => {
    cy.visit('/stack');
    cy.contains('Стек');
  });

  it('QueuePage is available', () => {
    cy.visit('/queue');
    cy.contains('Очередь');
  });

  it('ListPage is available', () => {
    cy.visit('/list');
    cy.contains('Связный список');
  });
});
