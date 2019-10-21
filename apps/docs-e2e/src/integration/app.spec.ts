describe('docs', () => {
  beforeEach(() => cy.visit('http://localhost:4200/'));

  it('should display the title', () => {
    cy.contains('NgRC Docs');
  });
});
