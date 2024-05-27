describe('register', () => {
    beforeEach(() => {
        cy.visit('/auth/register')
        cy.url().should('eq', 'http://localhost:4200/auth/register')
    });
    it('should visit register page', function () {});
    it('should not make register button clickable if password too short', function () {
        cy.get('#firstName').type('Test')
        cy.get('#lastName').type('Test')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('123')
        cy.get('#password2').type('123')
        cy.get('button').should('be.disabled')
    });
    it('should not make register button clickable if email is invalid', function () {
        cy.get('#firstName').type('Test')
        cy.get('#lastName').type('Test')
        cy.get('#email').type('test@')
        cy.get('#password1').type('Test123!')
        cy.get('#password2').type('Test123!')
        cy.get('button').should('be.disabled')
    });
    it('should make register button clickable if email and password are valid', function () {
        cy.get('#firstName').type('Test')
        cy.get('#lastName').type('Test')
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Test123!')
        cy.get('#password2').type('Test123!')
        cy.get('button').should('be.enabled')
    });
    it('should not register if password and confirm password are not matching', function () {
        cy.intercept('POST', 'http://localhost:8080/api/auth/register', {fixture: 'registerFailed.json'})

        cy.get('#firstName').type('Test')
        cy.get('#lastName').type('Test')
        cy.get('#email').type('test123@mail.com')
        cy.get('#password1').type('Test123!')
        cy.get('#password2').type('Test123!!')
        cy.get('button').click()

        cy.wait(1000)

        cy.url().should('eq', 'http://localhost:4200/auth/register')
    });
    it('should make an account if credentials are valid', function () {
        cy.intercept('POST', 'http://localhost:8080/api/auth/register', {fixture: 'registerSuccess.json'})

        cy.get('#firstName').type('Test')
        cy.get('#lastName').type('Test')
        cy.get('#email').type('test123@mail.com')
        cy.get('#password1').type('Test123!')
        cy.get('#password2').type('Test123!')
        cy.get('button').click()

        cy.wait(1000)

        cy.url().should('eq', 'http://localhost:4200/')
    });
});