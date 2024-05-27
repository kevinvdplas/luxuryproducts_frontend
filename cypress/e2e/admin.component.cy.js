describe('admin', () => {
    before(() => {
        cy.visit('http://localhost:4200/auth/register');
        cy.get('#firstName').type('Test')
        cy.get('#lastName').type('Test')
        cy.get('#email').type('test1@mail.com')
        cy.get('#password1').type('Test123!')
        cy.get('#password2').type('Test123!')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
    });

    it('should not be able to add negative saldo to a giftcard', function () {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.wait(1000)
        cy.url().visit('http://localhost:4200/admin')
        cy.get("#giftcardValue").type("-1000");
        cy.get('#bevestig').click();
        cy.wait(3000)
    });
    it('should be able to add saldo to a giftcard', function () {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.wait(1000)
        cy.url().visit('http://localhost:4200/admin')
        cy.get("#giftcardValue").type("1000");
        cy.get('#bevestig').click();
        cy.wait(3000)
    });
    it("should be able to deactivate a giftcard", function () {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.wait(1000)
        cy.url().visit('http://localhost:4200/admin')
        cy.get("#activeer").click();
    });
    it("should be able to activate a giftcard", function () {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.wait(1000)
        cy.url().visit('http://localhost:4200/admin')
        cy.get("#deactiveer").click();
    });
    it("should be able to visit giftcard history", function () {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.wait(1000)
        cy.url().visit('http://localhost:4200/admin')
        cy.get('#giftcardhistory').click()
    });
});