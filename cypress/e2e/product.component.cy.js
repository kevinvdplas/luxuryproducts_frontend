describe('product', () => {
    it('should visit products page', function () {
        cy.visit('/products')
        cy.url().should('eq', 'http://localhost:4200/products')
    });

    it('should not be able to press add to cart if logged out', function () {
        cy.visit('/products')
        cy.get("#addtocartloggedout").should('be.disabled')
    });

    it('should add product to cart if logged in', function () {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.url().visit('http://localhost:4200/products')
        cy.visit('/products')

        cy.get("#addtocartloggedin").should('be.enabled')
    });
});