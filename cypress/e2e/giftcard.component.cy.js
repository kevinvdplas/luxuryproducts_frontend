describe('giftcard', () => {
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

    it('should purchase a giftcard and receive a code via email', () => {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.wait(1000)
        cy.visit('http://localhost:4200/giftcards');
        cy.wait(1000)
        cy.get('#addtocartloggedin').click();
        cy.url().visit('http://localhost:4200/cart')
        cy.wait(1000)
        cy.url().should('eq', 'http://localhost:4200/cart')
        cy.wait(1000)
        cy.get('button').contains("Order").click();
        cy.get('#swal2-title').contains('Bestelling geplaatst!')
    });

    it('should use giftcard code for purchase', () => {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.wait(1000)
        cy.visit('http://localhost:4200/giftcards');
        cy.wait(1000)
        cy.get('#addtocartloggedin').click();
        cy.url().visit('http://localhost:4200/cart')
        cy.wait(1000)
        cy.url().should('eq', 'http://localhost:4200/cart')
        cy.wait(1000)
        cy.get('input').type('1234-5678')
        cy.get('#bevestigcode').click();
        cy.get('button').contains("Order").click();
        cy.get('#swal2-title').contains('Bestelling geplaatst!')
    });

    it('should not be able to use an invalid giftcard', () => {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.wait(1000)
        cy.visit('http://localhost:4200/giftcards');
        cy.wait(1000)
        cy.get('#addtocartloggedin').click();
        cy.url().visit('http://localhost:4200/cart')
        cy.wait(1000)
        cy.url().should('eq', 'http://localhost:4200/cart')
        cy.wait(1000)
        cy.get('input').type('1234-56789')
        cy.get('#bevestigcode').click();
        cy.get('#swal2-title').contains('Giftcard niet gevonden')
    });

    it('should not be able to use a giftcard with no saldo', () => {
        cy.visit('http://localhost:4200/auth/login')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').should('be.enabled')
        cy.get('button').click();
        cy.wait(1000)
        cy.visit('http://localhost:4200/giftcards');
        cy.wait(1000)
        cy.get('#addtocartloggedin').click();
        cy.url().visit('http://localhost:4200/cart')
        cy.wait(1000)
        cy.url().should('eq', 'http://localhost:4200/cart')
        cy.wait(1000)
        cy.get('input').type('9kCc-T0bu')
        cy.get('#bevestigcode').click();
        cy.get('#swal2-title').contains('Giftcard niet bruikbaar')
    });
});