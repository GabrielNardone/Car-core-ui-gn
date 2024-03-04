describe('Detail page', () => {
	beforeEach(() => {
		cy.visit('/detail/1');
	});

	it('Should render car details correctly', () => {
		cy.intercept('GET', '/api/car/1', {
			statusCode: 200,
			fixture: 'get-car-by-id-mock.json',
		}).as('getCarById');
	});
});
