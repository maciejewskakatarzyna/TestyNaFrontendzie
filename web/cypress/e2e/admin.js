import { product } from '../support/config'

describe('Admin panel', () => {

    beforeEach(() => {
        cy.exec('cd .. && npm run resetDatabaseData')
        cy.login()
    })

    it('should login to admin panel with valid login and password', () => {
        cy.contains('Products')
        cy.contains('Add new product')
        cy.contains('Logout')
    })

    it('should successfully remove product from products list and shop', () => {
        cy.contains("Sports shoes - Adidas").parent().parent().find("button").click();
        cy.contains("Sports shoes - Adidas").should('not.exist')
        cy.visit('')
        cy.contains("Sports shoes - Adidas").should('not.exist')
    })

    it('should successfully add new product to products list and to shop', () => {
        cy.findByRole('button', { name: 'Add new product' }).click();
        cy.findByPlaceholderText("Product name in Polish").type(product.namePL);
        cy.findByPlaceholderText("Product name in English").type(product.nameEN);
        cy.findByPlaceholderText("Brand").type(product.brand);
        cy.findByPlaceholderText("Price in cents (USD)").type(product.priceUSD);
        cy.findByPlaceholderText("Price in eurocents (EUR)").type(product.priceEUR);
        cy.findByPlaceholderText("Price in grosze (PLN)").type(product.pricePLN);
        cy.findByRole('button', { name: 'Save' }).click();
        cy.contains(product.nameEN)
        cy.contains(product.priceUSD/100)
        cy.visit('')
        cy.contains(product.nameEN)
        cy.contains(product.priceUSD/100)
    })

    it('should successfully logout the admin', () => {
        cy.findByRole('button', { name: 'Logout' }).click();
        cy.contains('Sign in')
        cy.contains('Add new product').should('not.exist')
    })
});