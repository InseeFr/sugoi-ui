/// <reference types="cypress" />

// defined in default public/oidc-config/config.json
const keycloakUrl = 'http://my-authority-url.com';
const apiUrl = 'http://localhost:8080';
describe('home test with a user admin and a unique realm', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
	});
	beforeEach(() => {
		cy.intercept(`${keycloakUrl}/.well-known/openid-configuration`, {
			fixture: 'oidc-config-mock.json',
		});
		const sessionState = 12345;
		cy.intercept(`${keycloakUrl}/auth**`, (req) => {
			req.reply({
				headers: {
					location: `http://localhost:3000/authentication/callback?code=12345&state=${req.query.state}&session_state=${sessionState}`,
				},
				statusCode: 302,
			});
		});
		cy.intercept('POST', `${keycloakUrl}/token`, {
			fixture: 'fake-user.json',
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});
		cy.intercept(`${keycloakUrl}/user-info`, {
			fixture: 'basic-user-info.json',
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});
		cy.intercept(`${apiUrl}/realms`, {
			fixture: 'realms-unique.json',
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});
		cy.intercept(`${apiUrl}/whoami`, {
			fixture: 'whoami-admin.json',
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});
		cy.intercept(`${apiUrl}/realms/SSP/storages/ssm/users?size=**`, {
			fixture: 'users-ssp.json',
			headers: {
				'Access-Control-Allow-Origin': '*',
			},
		});
	});

	it('contains a connect button', () => {
		cy.get('[id=go-button]').contains(/.*connect.*|.*Log.*/);
	});

	it('connect to main page', () => {
		cy.get('[id=go-button]').click();
	});

	it('The unique realm SSP should be selected', () => {
		cy.get('[id=go-button]').click();
		cy.get('[id=realm-choice]').should("have.value", "SSP");
	});
});
