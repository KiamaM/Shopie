describe('Testing sigup functionality using fixtures', () => {
    before(()=>{

        cy.visit('/register')
    })
    it('registers a user', () => {
        cy.fixture('register.json').then((regDetails) => {
            cy.get('[data-cy="fname-input"]').type(regDetails.firstName)
            cy.get('[data-cy="lname-input"]').type(regDetails.lastName)
            cy.get('[data-cy="email-input"]').type(regDetails.email)
            cy.get('[data-cy="password-input"]').type(regDetails.password)
            cy.get('[data-cy="create-account-link"]').click()
             
            // .then(el => {
            //     cy.wait(1000);
                cy.visit('/login')
                cy.location('pathname').should('not.equal', '/register')
                cy.location('pathname').should('equal', '/login')
            // })
        })
    })
})




describe('Testing login functionality', () => {

    let data: { email: string, password: string };

    before(() => {
        cy.fixture('login').then((info) => {
            data = info
        })
    })

    it('logs in user using fixture data', () => {
        cy.visit('/login')

        cy.fixture('login.json').then((data) => {
            cy.get('[data-cy="email-link"]').type(data.email)
            cy.get('[data-cy="password-link"]').type(data.password)
            cy.get('[data-cy="submit-btn"]').click().then(el => {
                cy.wait(1000);
                cy.visit('/admin')
                cy.location('pathname').should('not.equal', '/login')
                cy.location('pathname').should('equal', '/admin')
            })
        })

    })
})
describe('Working with fixtures with multiple data', ()=>{

    let data:{email:string, password:string}

    before(()=>{
        cy.fixture('login').then((info)=>{
            data = info
        })
    })

    it('iterates through login2 data and tries to login', ()=>{
        cy.visit('/login')

        cy.fixture('multi-login.json').then((dataarray)=>{
            dataarray.forEach((data:{email:string, password:string})=>{
                cy.get('[data-cy="email-link"]').type(data.email)
                cy.get('[data-cy="password-link"]').type(data.password)

                if(data.email == 'janey@gmail.com' && data.password == '12345'){
                    cy.get('[data-cy="submit-btn"]').click().then(el=>{
                        cy.location('pathname').should('equal', '/user')
                        cy.get('[data-cy="logout-link"]').click()
                        cy.visit('/login')
                    })
                }else if(data.email == 'janey@gmail.com' && data.password !=='12345'){
                    cy.get('[data-cy="submit-btn"]').click()
                    cy.contains('Incorrect password')
                }
            })
        })
    })
})


describe('Sending requests to register user without hitting the backend', () => {
    beforeEach(() => {
        cy.visit('/register')
    })

    it('Post request handling', () => {
        cy.intercept('POST', 'http://localhost:4500/users/register', {
            body: {
                message: "User registered successfully"
            },
            delayMs: 500
        }).as('RegisterRequest');

        cy.get('.form-submit').click();
        
        cy.wait('@RegisterRequest', { requestTimeout: 10000 }).then((interception) => {
            console.log('Intercepted request:', interception.request);
            expect(interception.request.body).to.exist;
        })

    })
})

describe('Sending login requests without hitting the backend', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.intercept('POST', 'http://localhost:4500/users/login', {
            body: {
                message: "Logged in successfully"
            }
        }).as('RequestToLogin');
    })

    it('Sends login requests without hitting the backend', () => {

        cy.get('[data-cy="submit-btn"]').click();

    cy.wait('@RequestToLogin', { requestTimeout: 10000 }).then(interception => {
        console.log('Intercepted request:', interception.request);
        console.log('Intercepted response:', interception.response);
        expect(interception.request.body).to.exist;
    });

})

describe('reset password works', () => {
    beforeEach(() => {
      cy.visit('/login');
    });
  
    it('redirects to reset password', () => {
      cy.get('[data-cy="reset"]').as('resetBtn'); 
      cy.get('@resetBtn').click(); 
      
      cy.location('pathname').should('eq', '/reset')
    });
  });
  


})