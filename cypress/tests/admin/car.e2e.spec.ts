describe('Should check create car form functionalities', () => {
	beforeEach(() => {
		cy.visit('/admin/car-form');
		cy.intercept('POST', 'http://localhost:5000/api/car', {
			fixture: 'create_car_success_mock.json',
			statusCode: 201,
		}).as('postRequest');
	});

	it('Should check if the create car form success', () => {
		cy.get('[data-cy=brand]').type('Toyota');
		cy.get('[data-cy=model]').type('heroic');
		cy.get('[data-cy=color]').select('black');
		cy.get('[data-cy=passengers]').select('4');
		cy.get('[data-cy=ac]').select('true');
		cy.get('[data-cy=pricePerDay]').type('750000');

		cy.get('[data-cy=car-form]').submit();

		cy.wait('@postRequest').then((interception) => {
			expect(interception.response.statusCode).to.equal(201);
		});
	});
});
