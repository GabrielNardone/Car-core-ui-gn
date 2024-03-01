describe('User table', () => {
	beforeEach(() => {
		cy.login('erik@gmail.com', 'Erik1234');
	});

	it('Should display a list of users', () => {
		cy.intercept('GET', '/api/user', {
			fixture: 'get-all-users-mock.json',
			statusCode: 200,
		}).as('getAllUsers');

		cy.get('[data-cy=admin-page-link]').click();
		cy.get('[data-cy=admin-sidebar-User-item]').click();

		cy.wait('@getAllUsers');

		cy.get('[data-cy=user-table]').should('have.length', 2);
		cy.get('[data-cy=user-email-1]').should('contain', 'erik@gmail.com');
		cy.get('[data-cy=user-email-2]').should('contain', 'mauro@gmail.com');
	});

	it('Should display error alert when server error getting all users', () => {
		cy.intercept('GET', '/api/user', {
			statusCode: 500,
		}).as('getAllUsersError');

		cy.get('[data-cy=admin-page-link]').click();
		cy.get('[data-cy=admin-sidebar-User-item]').click();

		cy.wait('@getAllUsersError');

		cy.get('[data-cy=get-all-users-error-alert]')
			.should('be.visible')
			.and('contain', 'Request failed with status code 500');
	});
});

describe('User form', () => {
	beforeEach(() => {
		cy.login('erik@gmail.com', 'Erik1234');
		cy.intercept('GET', '/api/user', {
			fixture: 'get-all-users-mock.json',
			statusCode: 200,
		}).as('getAllUsers');
	});

	it('Should create a new user', () => {
		cy.intercept('POST', '/api/user', {
			statusCode: 201,
		}).as('newUser');

		cy.get('[data-cy=admin-page-link]').click();
		cy.get('[data-cy=admin-sidebar-User-item]').click();
		cy.wait('@getAllUsers');

		cy.get('[data-cy=add-user-link]').click();

		cy.get('[data-cy=create-user-first-name]').type('Hernán');
		cy.get('[data-cy=create-user-last-name]').type('Cortéz');
		cy.get('[data-cy=create-user-email]').type('hernan@google.com');
		cy.get('[data-cy=create-user-address]').type('España 123');
		cy.get('[data-cy=create-user-country]').type('México');
		cy.get('[data-cy=create-user-dob]').type('2015-01-02');
		cy.get('[data-cy=create-user-role]').select('client');

		cy.get('[data-cy=create-user-form]').submit();

		cy.wait('@newUser');

		cy.get('[data-cy=create-user-success-alert]')
			.should('be.visible')
			.and('contain', 'Hernán Cortéz created!');
	});

	it('Should display errors if inupts don´t match validations', () => {
		cy.get('[data-cy=admin-page-link]').click();
		cy.get('[data-cy=admin-sidebar-User-item]').click();
		cy.wait('@getAllUsers');

		cy.get('[data-cy=add-user-link]').click();

		cy.get('[data-cy=create-user-first-name]').type('He');
		cy.get('[data-cy=create-user-email]').type('hernangoogle.com');

		cy.get('[data-cy=create-user-form]').submit();

		cy.get('[data-cy=create-user-first-name-error]').should('be.visible');
		cy.get('[data-cy=create-user-last-name-error]').should('be.visible');
		cy.get('[data-cy=create-user-email-error]').should('be.visible');
		cy.get('[data-cy=create-user-address-error]').should('be.visible');
		cy.get('[data-cy=create-user-country-error]').should('be.visible');
		cy.get('[data-cy=create-user-dob-error]').should('be.visible');
		cy.get('[data-cy=create-user-role-error]').should('be.visible');
	});

	it('Should display error alert when server error creating a new user', () => {
		cy.intercept('POST', '/api/user', {
			statusCode: 500,
		}).as('newUserError');

		cy.get('[data-cy=admin-page-link]').click();
		cy.get('[data-cy=admin-sidebar-User-item]').click();
		cy.wait('@getAllUsers');

		cy.get('[data-cy=add-user-link]').click();

		cy.get('[data-cy=create-user-first-name]').type('Hernán');
		cy.get('[data-cy=create-user-last-name]').type('Cortéz');
		cy.get('[data-cy=create-user-email]').type('hernan@google.com');
		cy.get('[data-cy=create-user-address]').type('España 123');
		cy.get('[data-cy=create-user-country]').type('México');
		cy.get('[data-cy=create-user-dob]').type('2015-01-02');
		cy.get('[data-cy=create-user-role]').select('client');

		cy.get('[data-cy=create-user-form]').submit();

		cy.wait('@newUserError');

		cy.get('[data-cy=create-user-error-alert]')
			.should('be.visible')
			.and('contain', 'Request failed with status code 500');
	});
});

describe('User form edit', () => {
	beforeEach(() => {
		cy.login('erik@gmail.com', 'Erik1234');
		cy.intercept('GET', '/api/user', {
			fixture: 'get-all-users-mock.json',
			statusCode: 200,
		}).as('getAllUsers');
		cy.intercept('GET', 'api/user/1', {
			fixture: 'get-user-by-id-mock.json',
			statusCode: 200,
		}).as('getUserById');
	});

	it('Should edit a user', () => {
		cy.intercept('PATCH', '/api/user/1', {
			statusCode: 202,
		}).as('editUser');

		cy.get('[data-cy=admin-page-link]').click();
		cy.get('[data-cy=admin-sidebar-User-item]').click();
		cy.wait('@getAllUsers');

		cy.get('[data-cy=edit-user-1]').click();

		cy.get('[data-cy=edit-user-first-name]').type('Juancho');
		cy.get('[data-cy=edit-user-last-name]').type('Aponiuk');

		cy.get('[data-cy=edit-user-form]').submit();

		cy.wait('@editUser');

		cy.get('[data-cy=edit-user-success-alert]').should('be.visible');
	});

	it('Should display error alert when server error editing a user', () => {
		cy.intercept('PATCH', '/api/user/1', {
			statusCode: 500,
		}).as('editUserError');

		cy.get('[data-cy=admin-page-link]').click();
		cy.get('[data-cy=admin-sidebar-User-item]').click();
		cy.wait('@getAllUsers');

		cy.get('[data-cy=edit-user-1]').click();

		cy.get('[data-cy=edit-user-first-name]').type('Juancho');
		cy.get('[data-cy=edit-user-last-name]').type('Aponiuk');

		cy.get('[data-cy=edit-user-form]').submit();

		cy.wait('@editUserError');

		cy.get('[data-cy=edit-user-error-alert]')
			.should('be.visible')
			.and('contain', 'Request failed with status code 500');
	});
});

describe('User table delete', () => {
	beforeEach(() => {
		cy.login('erik@gmail.com', 'Erik1234');
		cy.intercept('GET', '/api/user', {
			fixture: 'get-all-users-mock.json',
			statusCode: 200,
		}).as('getAllUsers');
	});

	it('Should delete a user', () => {
		cy.intercept('DELETE', '/api/user/1', {
			body: { data: true },
			statusCode: 200,
		}).as('deleteUser');

		cy.get('[data-cy=admin-page-link]').click();
		cy.get('[data-cy=admin-sidebar-User-item]').click();
		cy.wait('@getAllUsers');

		cy.get('[data-cy=user-table-delete]').should('be.visible').eq(0).click();
		cy.get('[data-cy=confirm-user-table-delete-alert]')
			.should('be.visible')
			.click();

		cy.get('[data-cy=close-user-table-delete-alert]')
			.should('be.visible')
			.click();

		cy.get('[data-cy=user-table]').should('have.length', 1);
	});

	it('Should display error alert when server error deleting user', () => {
		cy.intercept('DELETE', '/api/user/1', {
			statusCode: 500,
		}).as('deleteUserError');

		cy.get('[data-cy=admin-page-link]').click();
		cy.get('[data-cy=admin-sidebar-User-item]').click();
		cy.wait('@getAllUsers');

		cy.get('[data-cy=user-table-delete]').should('be.visible').eq(0).click();
		cy.get('[data-cy=confirm-user-table-delete-alert]')
			.should('be.visible')
			.click();

		cy.get('[data-cy=user-table-delete-error-alert]')
			.should('be.visible')
			.click();
	});
});
