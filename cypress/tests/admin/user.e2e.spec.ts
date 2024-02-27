describe('User table', () => {
	it('Should display a list of users', () => {
		cy.intercept('GET', '/api/user', {
			fixture: 'get-all-users-mock.json',
			statusCode: 200,
		}).as('getAllUsers');
		cy.visit('/admin/user');

		cy.wait('@getAllUsers');

		cy.get('[data-cy=user-table]').should('have.length', 2);
		cy.get('[data-cy=user-email-1]').should('contain', 'erik@gmail.com');
		cy.get('[data-cy=user-email-2]').should('contain', 'mauro@gmail.com');
	});

	it('Should display error alert when server error getting all users', () => {
		cy.intercept('GET', '/api/user', {
			statusCode: 500,
		}).as('getAllUsersError');
		cy.visit('/admin/user');

		cy.wait('@getAllUsersError');
		cy.get('[data-cy=get-all-users-error-alert]')
			.should('be.visible')
			.and('contain', 'Request failed with status code 500');
	});
});

describe('User form edit', () => {
	beforeEach(() => {
		cy.intercept('GET', '/api/user', {
			fixture: 'get-all-users-mock.json',
			statusCode: 200,
		}).as('getAllUsers');

		cy.visit('/admin/user');

		cy.intercept('GET', 'api/user/1', {
			fixture: 'get-user-by-id-mock.json',
			statusCode: 200,
		}).as('getUserById');
	});

	it('Should edit a user', () => {
		cy.intercept('PATCH', '/api/user/1', {
			statusCode: 202,
		}).as('editUser');

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
		cy.intercept('GET', '/api/user', {
			fixture: 'get-all-users-mock.json',
			statusCode: 200,
		}).as('getAllUser');
		cy.visit('/admin/user');
	});

	it('Should delete a user', () => {
		cy.wait('@getAllUser');

		cy.intercept('DELETE', '/api/user/1', {
			body: { data: true },
			statusCode: 200,
		}).as('deleteUser');

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

		cy.get('[data-cy=user-table-delete]').should('be.visible').eq(0).click();
		cy.get('[data-cy=confirm-user-table-delete-alert]')
			.should('be.visible')
			.click();

		cy.get('[data-cy=user-table-delete-error-alert]')
			.should('be.visible')
			.click();
	});
});
