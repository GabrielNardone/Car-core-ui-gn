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
			id: 1,
		}).as('newCarPostRequest');
		cy.intercept('POST', 'http://localhost:5000/api/picture/car/1', {
			statusCode: 201,
		}).as('newCarPicturePostRequest');
	});

	it('Should create a new car', () => {
		cy.get('[data-cy=brand]').type('Toyota');
		cy.get('[data-cy=model]').type('heroic');
		cy.get('[data-cy=color]').select('black');
		cy.get('[data-cy=passengers]').select('4');
		cy.get('[data-cy=ac]').select('true');
		cy.get('[data-cy=pricePerDay]').type('750000');

		cy.get('[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from('car image'),
				fileName: 'car-1.jpg',
				mimeType: 'image/jpg',
				lastModified: Date.now(),
			},
			{ force: true },
		);

		cy.get('[data-cy=title]').type('car-1');
		cy.get('[data-cy=description]').type('Simple car image');
		cy.get('[data-cy=type]').select('front');
		cy.get('[data-cy=date]').type('2015-01-02');

		cy.get('[data-cy=car-form]').submit();

		cy.wait('@newCarPostRequest');
		cy.wait('@newCarPicturePostRequest');

		cy.get('[data-cy=create-car-success]').should('be.visible');
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
	});
});

describe('Car table delete', () => {
	beforeEach(() => {
		cy.visit('/admin/car');
		cy.intercept('GET', 'http://localhost:5000/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCarRequest');
	});

	it('Should display a list of cars', () => {
		cy.wait('@getAllCarRequest');

		cy.intercept('DELETE', 'http://localhost:5000/api/car/2', {
			body: { data: true },
			statusCode: 200,
		}).as('deleteCarRequest');

		cy.get('[data-cy=delete-car]').should('be.visible').eq(0).click();
		cy.get('[data-cy=confirm-delete]').should('be.visible').click();

		cy.get('[data-cy=close-delete-alert]').should('be.visible').click();

		cy.get('[data-cy=car-table]').should('have.length', 3);
	});
});
