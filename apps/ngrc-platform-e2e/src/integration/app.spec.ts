import { getGreeting } from '../support/app.po';

describe('ngrc-platform', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to docs!');
  });
});
