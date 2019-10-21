describe('ngrc-platform', () => {
  beforeEach(() => cy.visit('/'));

  it('should show the toolbar', () => {
    cy.get('ngrc-toolbar').should('exist');
  });
});
