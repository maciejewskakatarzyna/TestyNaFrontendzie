import { loginData } from './config'


Cypress.Commands.add('login', () => {
    cy.visit('/admin');
    cy.findByPlaceholderText("Email").type(loginData.login);
    cy.findByPlaceholderText("Password").type(loginData.password);
    cy.findByRole('button', { name: 'Sign in' }).click();
})