describe('login', () => {
    beforeEach(() => {
        cy.visit('/auth/login')
        cy.url().should('eq', 'http://localhost:4200/auth/login')
    });
    it('should visit login page', function () {});
    it('should not make login button clickable if password too short', function () {
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('123')
        cy.get('button').should('be.disabled')
    });
    it('should not make login button clickable if email is invalid', function () {
        cy.get('#email').type('test')
        cy.get('#password1').type('123456')
        cy.get('button').should('be.disabled')
    });
    it('should make login button clickable if email and password are valid', function () {
        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Test123!')
        cy.get('button').should('not.be.disabled')
    });
    it('should not login if invalid but valid credentials are provided', () => {
        cy.intercept('POST', 'http://localhost:8080/api/auth/login', {fixture: 'loginFailed.json'})

        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Test123!!')
        cy.get('button').click()

        cy.wait(1000)

        cy.url().should('include', '')
    });
    it('should login user when valid credentials are provided', function () {
        cy.intercept('POST', 'http://localhost:8080/api/auth/login', {fixture: 'loginSuccess.json'})

        cy.get('#email').type('test@mail.com')
        cy.get('#password1').type('Ireallylovepupp1es')
        cy.get('button').click()

        cy.wait(1000)

        cy.url().should('eq', 'http://localhost:4200/')
        cy.get('#display-4').should('contain.text', 'SwordsNStuff')
    });
});