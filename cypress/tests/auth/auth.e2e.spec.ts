describe('Register page', () => {
	beforeEach(() => {
		cy.visit('/register');
	});

	it('Should render form correctly', () => {
		cy.get('[data-cy="register-first-name"]').should('exist');
		cy.get('[data-cy="register-last-name"]').should('exist');
		cy.get('[data-cy="register-email"]').should('exist');
		cy.get('[data-cy="register-password"]').should('exist');
		cy.get('[data-cy="register-dob"]').should('exist');
		cy.get('[data-cy="register-address"]').should('exist');
		cy.get('[data-cy="register-country"]').should('exist');
		cy.get('[data-cy="register-submit-button"]').should('exist');
	});

	it('Should visit the register page from login page link', () => {
		cy.visit('/login');
		cy.get('[data-cy="register-link"]').click();
		cy.url().should('include', '/register');
	});

	it('Should display required error if inputs are empty', () => {
		cy.get('[data-cy="register-form"]').submit();
		cy.get('[data-cy="register-first-name-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="register-last-name-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="register-email-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="register-password-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="register-dob-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="register-address-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="register-country-error"]')
			.should('exist')
			.and('text', 'Required');
	});

	it('Should display the proper error message depending the error type', () => {
		cy.get('[data-cy="register-first-name"]').type('Ga');
		cy.get('[data-cy="register-last-name"]').type('Na');
		cy.get('[data-cy="register-email"]').type('gabrielgoogle.com');
		cy.get('[data-cy="register-password"]').type('gabriel1');
		cy.get('[data-cy="register-address"]').type('La');
		cy.get('[data-cy="register-country"]').type(
			'República Federal Democrática de las Provincias del Sur Argentina',
		);

		cy.get('[data-cy="register-form"]').submit();

		cy.get('[data-cy="register-first-name-error"]')
			.should('exist')
			.and('text', 'At least (3) characters');
		cy.get('[data-cy="register-last-name-error"]')
			.should('exist')
			.and('text', 'At least (3) characters');
		cy.get('[data-cy="register-email-error"]')
			.should('exist')
			.and('text', 'The email must have a valid format');
		cy.get('[data-cy="register-password-error"]')
			.should('exist')
			.and('text', 'Uppercase, lowercase and a number required');
		cy.get('[data-cy="register-dob-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="register-address-error"]')
			.should('exist')
			.and('text', 'At least (3) characters');
		cy.get('[data-cy="register-country-error"]')
			.should('exist')
			.and('text', 'Maximum (21) characters');
	});

	it('Should show an error alert when register fails', () => {
		cy.intercept('POST', 'api/auth/sign-up', {
			statusCode: 404,
		}).as('registerError');

		cy.get('[data-cy="register-first-name"]').type('Gabriel');
		cy.get('[data-cy="register-last-name"]').type('Nardone');
		cy.get('[data-cy="register-email"]').type('gabriel@google.com');
		cy.get('[data-cy="register-password"]').type('Gabriel12');
		cy.get('[data-cy="register-address"]').type('Lanús 300');
		cy.get('[data-cy="register-dob"]').type('2015-01-02');
		cy.get('[data-cy="register-country"]').type('República Argentina');

		cy.get('[data-cy="register-form"]').submit();
		cy.wait('@registerError');

		cy.get('[data-cy="register-error-alert"]')
			.should('be.visible')
			.and('contain', 'Request failed with status code 404');
	});

	it('Should redirect to login page on successful signup and show a success alert', () => {
		cy.intercept('POST', 'api/auth/sign-up', {
			statusCode: 200,
		}).as('signup');

		cy.get('[data-cy="register-first-name"]').type('Gabriel');
		cy.get('[data-cy="register-last-name"]').type('Nardone');
		cy.get('[data-cy="register-email"]').type('gabriel@google.com');
		cy.get('[data-cy="register-password"]').type('Gabriel12');
		cy.get('[data-cy="register-address"]').type('Lanús 300');
		cy.get('[data-cy="register-dob"]').type('2015-01-02');
		cy.get('[data-cy="register-country"]').type('República Argentina');

		cy.get('[data-cy="register-form"]').submit();
		cy.wait('@signup');

		cy.get('[data-cy="register-success-alert"]')
			.should('be.visible')
			.and('contain', 'User Gabriel Nardone registered successfully');

		cy.url().should('include', '/login');
	});
});

describe('Login page', () => {
	beforeEach(() => {
		cy.visit('/login');
	});

	it('Should render form correctly', () => {
		cy.get('[data-cy="login-email"]').should('exist');
		cy.get('[data-cy="login-password"]').should('exist');
		cy.get('[data-cy="login-submit-button"]').should('exist');
	});

	it('Should visit the login page from register page link', () => {
		cy.visit('/register');
		cy.get('[data-cy="login-link"]').click();
		cy.url().should('include', '/login');
	});

	it('Should display required error if inputs are empty', () => {
		cy.get('[data-cy="login-form"]').submit();
		cy.get('[data-cy="login-email-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="login-password-error"]')
			.should('exist')
			.and('text', 'Required');
	});

	it('Should display an error alert when login fails', () => {
		cy.intercept('POST', 'api/auth/sign-in', {
			statusCode: 404,
		}).as('loginError');

		cy.get('[data-cy="login-email"]').type('gabriel@google.com');
		cy.get('[data-cy="login-password"]').type('Gabriel12');

		cy.get('[data-cy="login-form"]').submit();
		cy.wait('@loginError');

		cy.get('[data-cy="login-error-alert"]')
			.should('be.visible')
			.and('contain', 'Request failed with status code 404');
	});

	it('Should redirect to home page on successful login', () => {
		cy.intercept('POST', 'api/auth/sign-in', {
			statusCode: 200,
		}).as('login');

		cy.get('[data-cy="login-email"]').type('gabriel@google.com');
		cy.get('[data-cy="login-password"]').type('Gabriel12');

		cy.get('[data-cy="login-form"]').submit();
		cy.wait('@login');

		cy.url().should('deep.equal', 'http://localhost:3000/');
	});
});

describe('Forgot password page', () => {
	beforeEach(() => {
		cy.visit('/forgot-password');
	});

	it('Should render form correctly', () => {
		cy.get('[data-cy="forgot-password-email"]').should('exist');
		cy.get('[data-cy="forgot-password-submit-button"]').should('exist');
	});

	it('Should visit the forgot password page from login page link', () => {
		cy.visit('/login');
		cy.get('[data-cy="forgot-password-link"]').click();
		cy.url().should('include', '/forgot-password');
	});

	it('Should display required error if inputs are empty', () => {
		cy.get('[data-cy="forgot-password-form"]').submit();
		cy.get('[data-cy="forgot-password-email-error"]')
			.should('exist')
			.and('text', 'Required');
	});

	it('Should display an error alert when forgot password fails', () => {
		cy.intercept('POST', 'api/auth/forgot-password', {
			statusCode: 404,
		}).as('forgotPasswordError');

		cy.get('[data-cy="forgot-password-email"]').type('gabriel@google.com');

		cy.get('[data-cy="forgot-password-form"]').submit();
		cy.wait('@forgotPasswordError');

		cy.get('[data-cy="forgot-password-error-alert"]')
			.should('be.visible')
			.and('contain', 'Request failed with status code 404');
	});

	it('Should show success alert when forgot password is successful', () => {
		cy.intercept('POST', 'api/auth/forgot-password', {
			statusCode: 200,
		}).as('forgotPassword');

		cy.get('[data-cy="forgot-password-email"]').type('gabriel@google.com');

		cy.get('[data-cy="forgot-password-form"]').submit();
		cy.wait('@forgotPassword');

		cy.get('[data-cy="forgot-password-success-alert"]')
			.should('be.visible')
			.and('contain', 'We have sent a confirmation code to gabriel@google.com');
	});
});

describe('Change password page', () => {
	beforeEach(() => {
		cy.visit('/change-password');
	});

	it('Should render form correctly', () => {
		cy.get('[data-cy="change-password-email"]').should('exist');
		cy.get('[data-cy="change-password-confirmation-code"]').should('exist');
		cy.get('[data-cy="change-password-password"]').should('exist');
		cy.get('[data-cy="change-password-submit-button"]').should('exist');
	});

	it('Should visit the change password page from forgot password page link', () => {
		cy.visit('/forgot-password');
		cy.get('[data-cy="forgot-password-change-password-link"]').click();
		cy.url().should('include', '/change-password');
	});

	it('Should display required error if inputs are empty', () => {
		cy.get('[data-cy="change-password-form"]').submit();
		cy.get('[data-cy="change-password-email-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="change-password-confirmation-code-error"]')
			.should('exist')
			.and('text', 'Required');
		cy.get('[data-cy="change-password-password-error"]')
			.should('exist')
			.and('text', 'Required');
	});

	it('Should display an error alert when change password fails', () => {
		cy.intercept('POST', 'api/auth/confirm-password', {
			statusCode: 404,
		}).as('changePasswordError');

		cy.get('[data-cy="change-password-email"]').type('gabriel@google.com');
		cy.get('[data-cy="change-password-confirmation-code"]').type('123456');
		cy.get('[data-cy="change-password-password"]').type('Gabr12iel');

		cy.get('[data-cy="change-password-form"]').submit();
		cy.wait('@changePasswordError');

		cy.get('[data-cy="change-password-error-alert"]')
			.should('be.visible')
			.and('contain', 'Request failed with status code 404');
	});

	it('Should show success alert when change password is successful', () => {
		cy.intercept('POST', 'api/auth/confirm-password', {
			statusCode: 200,
		}).as('changePassword');

		cy.get('[data-cy="change-password-email"]').type('gabriel@google.com');
		cy.get('[data-cy="change-password-confirmation-code"]').type('123456');
		cy.get('[data-cy="change-password-password"]').type('Gabr12iel');

		cy.get('[data-cy="change-password-form"]').submit();
		cy.wait('@changePassword');

		cy.get('[data-cy="change-password-success-alert"]')
			.should('be.visible')
			.and('contain', 'Password changed successfully');
	});

	it('Should redirect to login when click on back icon', () => {
		cy.get('[data-cy="change-password-back-button"]').click();
		cy.url().should('include', '/login');
	});
});
