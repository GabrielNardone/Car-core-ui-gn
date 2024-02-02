describe('Car table', () => {
	beforeEach(() => {
		cy.intercept('GET', '/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCar');
		cy.visit('/admin/car');
	});

	it('Should display a list of cars', () => {
		cy.wait('@getAllCar');

		cy.get('[data-cy=car-table]').should('have.length', 4);
		cy.get('[data-cy=car-brand-2]').should('contain', 'BMW');
		cy.get('[data-cy=car-brand-5]').should('contain', 'Toyota');
		cy.get('[data-cy=car-brand-8]').should('contain', 'Nissan');
		cy.get('[data-cy=car-brand-6]').should('contain', 'Volkswagen');

		cy.get('[data-cy=gallery-button]').eq(0).click();
		cy.get('[data-cy=carousel]').should('be.visible');
		cy.get('[data-cy=carousel-indicators]').should('be.visible');
		cy.get('[data-cy=carousel-image]').should('be.visible');
	});
});

describe('Car form', () => {
	beforeEach(() => {
		cy.visit('/admin/car-form');
		cy.intercept('POST', '/api/car', {
			id: 1,
		}).as('newCar');
		cy.intercept('POST', '/api/picture/car/1', {
			statusCode: 201,
		}).as('newCarPicture');
		//hacer que falle mandar un status code 500
		//chequear el msj que viene en el error
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

		cy.wait('@newCar');
		cy.wait('@newCarPicture');

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

	it('Should diplay error alert', () => {
		cy.intercept('POST', '/api/car', {
			statusCode: 500,
		}).as('newCar');

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

		cy.wait('@newCar');

		cy.get('[data-cy=create-car-error-alert]').should('be.visible');
		cy.get('[data-cy=create-car-error-alert]').should(
			'contain',
			'Something went wrong!',
		);
	});
});

describe('Car table edit', () => {
	beforeEach(() => {
		cy.intercept('GET', '/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCar');

		cy.visit('/admin/car');

		cy.intercept('GET', '/api/car/2', {
			fixture: 'get-car-by-id-mock.json',
			statusCode: 200,
		}).as('getCarById');
		cy.intercept('PATCH', '/api/car/2', {
			statusCode: 202,
		}).as('getEditCar');
		cy.intercept('POST', '/api/picture/car/2', {
			statusCode: 201,
		}).as('newCarPicture');
		cy.intercept('DELETE', '/api/picture/1', {
			body: { data: true },
			statusCode: 200,
		}).as('deletePicture');
	});

	it('Should edit a car', () => {
		cy.get('[data-cy=edit-car-2]').click();

		cy.get('[data-cy=brand]').type('VolksWagen');
		cy.get('[data-cy=model]').type('Classic');

		cy.get('[data-cy=car-edit-form]').submit();

		cy.wait('@getEditCar');
		cy.get('[data-cy=car-edit-success]').should('be.visible');
	});

	it('Should upload a new car image', () => {
		cy.get('[data-cy=edit-car-2]').click();

		cy.get('[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from('car image'),
				fileName: 'car-1.jpg',
				mimeType: 'image/jpg',
				lastModified: Date.now(),
			},
			{ force: true },
		);

		cy.get('[data-cy=car-edit-image-title]').type('VolksWagen1');
		cy.get('[data-cy=car-edit-image-description]').type('Simple image');
		cy.get('[data-cy=car-edit-image-type]').select('front');
		cy.get('[data-cy=car-edit-image-date]').type('2023-02-06');

		cy.get('[data-cy=car-edit-new-image-form]').submit();

		cy.get('[data-cy=add-new-image]').should('be.visible');
	});

	it('Should delete a car image', () => {
		cy.get('[data-cy=edit-car-2]').click();

		cy.get('[data-cy=car-edit-delete-image]')
			.eq(0)
			.should('be.visible')
			.click();
		cy.get('[data-cy=confirm-picture-delete]').should('be.visible').click();
		cy.get('[data-cy=close-picture-delete-alert]').should('be.visible').click();
		cy.get('[data-cy=car-edit-images-div]').should('have.length', 1);
	});
});

describe('Car table delete', () => {
	beforeEach(() => {
		cy.visit('/admin/car');
		cy.intercept('GET', '/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCar');
	});

	it('Should display a list of cars', () => {
		cy.wait('@getAllCar');

		cy.intercept('DELETE', '/api/car/2', {
			body: { data: true },
			statusCode: 200,
		}).as('deleteCar');

		cy.get('[data-cy=delete-car]').should('be.visible').eq(0).click();
		cy.get('[data-cy=confirm-delete]').should('be.visible').click();

		cy.get('[data-cy=close-delete-alert]').should('be.visible').click();

		cy.get('[data-cy=car-table]').should('have.length', 3);
	});
});
