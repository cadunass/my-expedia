describe('Navigation', () => {
  it('should navigate to the results page', () => {
    cy.visit('https://expedia.vercel.app/');

    cy.get('button[type*="submit"]').click();

    cy.url().should('include', '/results');

    cy.get('input[id*="place"]').type('Test').should('have.value', 'Test');
  });
});

describe('Default header', () => {
  it('should have header on main page', () => {
    cy.visit('https://expedia.vercel.app/');

    cy.get('[alt="expedia logo"]').should('be.visible');
  });

  it('should have header on results page', () => {
    cy.visit('https://expedia.vercel.app/results');

    cy.get('[alt="expedia logo"]').should('be.visible');
  });
});
