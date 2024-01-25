describe('Car table', () => {
	beforeEach(() => {
		cy.visit('/admin/car');
		cy.intercept('GET', 'http://localhost:5000/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCarRequest');
	});

	it('Should display a list of cars', () => {
		cy.wait('@getAllCarRequest');
		cy.get('[data-cy=car-table]').should('have.length', 4);
	});
});

describe('Car form', () => {
	beforeEach(() => {
		cy.visit('/admin/car-form');
		cy.intercept('POST', 'http://localhost:5000/api/car', {
			fixture: 'create-car-success-mock.json',
			statusCode: 201,
		}).as('newCarPostRequest');
	});

	it('Should create a new car', () => {
		cy.get('[data-cy=brand]').type('Toyota');
		cy.get('[data-cy=model]').type('heroic');
		cy.get('[data-cy=color]').select('black');
		cy.get('[data-cy=passengers]').select('4');
		cy.get('[data-cy=ac]').select('true');
		cy.get('[data-cy=pricePerDay]').type('750000');

		cy.get('[data-cy=car-form]').submit();

		cy.wait('@newCarPostRequest').then((interception) => {
			expect(interception.response?.statusCode).to.equal(201);
			expect(interception.request.body).to.deep.equal({
				brand: 'Toyota',
				model: 'heroic',
				color: 'black',
				passengers: 4,
				ac: true,
				pricePerDay: 750000,
			});
		});
	});

	it('Should display errors if inupts don´t match validations', () => {
		cy.get('[data-cy=brand]').type('To');
		cy.get('[data-cy=pricePerDay]').type('0');

		cy.get('[data-cy=car-form]').submit();

		cy.get('[data-cy=brand-error]').should('be.visible');
		cy.get('[data-cy=model-error]').should('be.visible');
		cy.get('[data-cy=color-error]').should('be.visible');
		cy.get('[data-cy=passengers-error]').should('be.visible');
		cy.get('[data-cy=ac-error]').should('be.visible');
		cy.get('[data-cy=pricePerDay-error]').should('be.visible');

		cy.get('[data-cy=submit-button]').should('be.disabled');
	});
});
