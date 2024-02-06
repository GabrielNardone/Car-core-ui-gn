describe('Car table', () => {
	const GALLERY_URL = 'http://localhost:3000/admin/car-gallery/2';

	it('Should display a list of cars', () => {
		cy.intercept('GET', '/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCars');
		cy.visit('/admin/car');

		cy.wait('@getAllCars');

		cy.get('[data-cy=car-table]').should('have.length', 4);
		cy.get('[data-cy=car-brand-2]').should('contain', 'BMW');
		cy.get('[data-cy=car-brand-5]').should('contain', 'Toyota');
		cy.get('[data-cy=car-brand-8]').should('contain', 'Nissan');
		cy.get('[data-cy=car-brand-6]').should('contain', 'Volkswagen');

		cy.get('[data-cy=gallery-button]').eq(0).click();
		cy.url().should('eq', GALLERY_URL);
		cy.get('[data-cy=car-gallery-div]').should('be.visible');
		cy.get('[data-cy=car-gallery-div]').should('have.length', 1);
		cy.get('[data-cy=car-picture-1]').should('be.visible');
	});

	it('Should diplay error alert when server error getting all cars', () => {
		cy.intercept('GET', '/api/car', {
			statusCode: 500,
		}).as('getAllCarsError');
		cy.visit('/admin/car');

		cy.wait('@getAllCarsError');
		cy.get('[data-cy=get-all-cars-error-alert]').should('be.visible');
		cy.get('[data-cy=get-all-cars-error-alert]').should(
			'contain',
			'Error: Request failed with status code 500',
		);
	});
});

describe('Car create form', () => {
	beforeEach(() => {
		cy.visit('/admin/car-form');
		cy.intercept('POST', '/api/car', {
			id: 1,
		}).as('newCar');
		cy.intercept('POST', '/api/picture/car/1', {
			statusCode: 201,
		}).as('newCarPicture');
	});

	it('Should create a new car', () => {
		cy.get('[data-cy=car-create-brand]').type('Toyota');
		cy.get('[data-cy=car-create-model]').type('heroic');
		cy.get('[data-cy=car-create-color]').select('black');
		cy.get('[data-cy=car-create-passengers]').select('4');
		cy.get('[data-cy=car-create-ac]').select('true');
		cy.get('[data-cy=car-create-pricePerDay]').type('750000');

		cy.get('[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from('car image'),
				fileName: 'car-1.jpg',
				mimeType: 'image/jpg',
				lastModified: Date.now(),
			},
			{ force: true },
		);

		cy.get('[data-cy=car-create-picture-title]').type('car-1');
		cy.get('[data-cy=car-create-picture-description]').type('Simple car image');
		cy.get('[data-cy=car-create-picture-type]').select('front');
		cy.get('[data-cy=car-create-picture-date]').type('2015-01-02');

		cy.get('[data-cy=car-create-form]').submit();

		cy.wait('@newCar');
		cy.wait('@newCarPicture');

		cy.get('[data-cy=create-car-success]').should('be.visible');
	});

	it('Should display errors if inupts don´t match validations', () => {
		cy.get('[data-cy=car-create-brand]').type('To');
		cy.get('[data-cy=car-create-pricePerDay]').type('0');
		cy.get('[data-cy=car-create-picture-title]').type('ca');

		cy.get('[data-cy=car-create-form]').submit();

		cy.get('[data-cy=car-create-brand-error]').should('be.visible');
		cy.get('[data-cy=car-create-model-error]').should('be.visible');
		cy.get('[data-cy=car-create-color-error]').should('be.visible');
		cy.get('[data-cy=car-create-passengers-error]').should('be.visible');
		cy.get('[data-cy=car-create-ac-error]').should('be.visible');
		cy.get('[data-cy=car-create-pricePerDay-error]').should('be.visible');
		cy.get('[data-cy=car-create-picture-title-error]').should('be.visible');
		cy.get('[data-cy=car-create-picture-description-error]').should(
			'be.visible',
		);
		cy.get('[data-cy=car-create-picture-type-error]').should('be.visible');
		cy.get('[data-cy=car-create-picture-date-error]').should('be.visible');
	});

	it('Should diplay error alert when server error posting new car', () => {
		cy.intercept('POST', '/api/car', {
			statusCode: 500,
		}).as('newCarError');

		cy.get('[data-cy=car-create-brand]').type('Toyota');
		cy.get('[data-cy=car-create-model]').type('heroic');
		cy.get('[data-cy=car-create-color]').select('black');
		cy.get('[data-cy=car-create-passengers]').select('4');
		cy.get('[data-cy=car-create-ac]').select('true');
		cy.get('[data-cy=car-create-pricePerDay]').type('750000');

		cy.get('[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from('car image'),
				fileName: 'car-1.jpg',
				mimeType: 'image/jpg',
				lastModified: Date.now(),
			},
			{ force: true },
		);

		cy.get('[data-cy=car-create-picture-title]').type('car-1');
		cy.get('[data-cy=car-create-picture-description]').type('Simple car image');
		cy.get('[data-cy=car-create-picture-type]').select('front');
		cy.get('[data-cy=car-create-picture-date]').type('2015-01-02');

		cy.get('[data-cy=car-create-form]').submit();

		cy.wait('@newCarError');

		cy.get('[data-cy=create-car-error]').should('be.visible');
		cy.get('[data-cy=create-car-error]').should(
			'contain',
			'Error: Request failed with status code 500',
		);
	});

	it('Should diplay error alert of unproccesable entity', () => {
		cy.intercept('POST', '/api/car', {
			statusCode: 422,
		}).as('newPictureError');

		cy.get('[data-cy=car-create-brand]').type('Toyota');
		cy.get('[data-cy=car-create-model]').type('heroic');
		cy.get('[data-cy=car-create-color]').select('black');
		cy.get('[data-cy=car-create-passengers]').select('4');
		cy.get('[data-cy=car-create-ac]').select('true');
		cy.get('[data-cy=car-create-pricePerDay]').type('750000');

		cy.get('[type="file"]').selectFile(
			{
				contents: Cypress.Buffer.from('car image'),
				fileName: 'car-1.jpg',
				mimeType: 'image/jpg',
				lastModified: Date.now(),
			},
			{ force: true },
		);

		cy.get('[data-cy=car-create-picture-title]').type('car-1');
		cy.get('[data-cy=car-create-picture-description]').type('Simple car image');
		cy.get('[data-cy=car-create-picture-type]').select('front');
		cy.get('[data-cy=car-create-picture-date]').type('2015-01-02');

		cy.get('[data-cy=car-create-form]').submit();

		cy.wait('@newPictureError');

		cy.get('[data-cy=create-car-error]').should('be.visible');
		cy.get('[data-cy=create-car-error]').should(
			'contain',
			'Error: Request failed with status code 422',
		);
	});
});

describe('Car edit form', () => {
	beforeEach(() => {
		cy.intercept('GET', '/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCars');

		cy.visit('/admin/car');

		cy.intercept('GET', '/api/car/2', {
			fixture: 'get-car-by-id-mock.json',
			statusCode: 200,
		}).as('getCarById');
		cy.intercept('PATCH', '/api/car/2', {
			statusCode: 202,
		}).as('editCar');
		cy.intercept('POST', '/api/picture/car/2', {
			statusCode: 201,
		}).as('newCarPicture');
		cy.intercept('DELETE', '/api/picture/1', {
			body: { data: true },
			statusCode: 200,
		}).as('deletePicture');
	});

	it('Should diplay error alert when server error getting car by id', () => {
		cy.intercept('GET', '/api/car/2', {
			statusCode: 500,
		}).as('getCarByIdError');

		cy.get('[data-cy=edit-car-2]').click();

		cy.wait('@getCarByIdError');
		cy.get('[data-cy=get-car-pictures-error-alert]').should('be.visible');
		cy.get('[data-cy=get-car-pictures-error-alert]').should(
			'contain',
			'Error: Request failed with status code 500',
		);
	});

	it('Should edit car information', () => {
		cy.get('[data-cy=edit-car-2]').click();

		cy.get('[data-cy=car-edit-brand]').type('VolksWagen');
		cy.get('[data-cy=car-edit-model]').type('Classic');

		cy.get('[data-cy=car-edit-form]').submit();

		cy.wait('@editCar');
		cy.get('[data-cy=car-edit-success]').should('be.visible');
		cy.get('[data-cy=car-edit-success]').should(
			'contain',
			'BMW Classic (ID:2) updated!',
		);
	});

	it('Should create a new car image', () => {
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

		cy.get('[data-cy=car-edit-picture-title]').type('VolksWagen1');
		cy.get('[data-cy=car-edit-picture-description]').type('Simple image');
		cy.get('[data-cy=car-edit-picture-type]').select('front');
		cy.get('[data-cy=car-edit-picture-date]').type('2023-02-06');

		cy.get('[data-cy=car-edit-new-picture-form]').submit();

		cy.get('[data-cy=car-edit-create-picture-success]').should('be.visible');
		cy.get('[data-cy=car-edit-create-picture-success]').should(
			'contain',
			'New picture saved on BMW Classic (ID:2)',
		);
	});

	it('Should display error when uploading a new car image', () => {
		cy.intercept('POST', '/api/picture/car/2', {
			statusCode: 422,
		}).as('newPictureError');

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

		cy.get('[data-cy=car-edit-picture-title]').type('VolksWagen1');
		cy.get('[data-cy=car-edit-picture-description]').type('Simple image');
		cy.get('[data-cy=car-edit-picture-type]').select('front');
		cy.get('[data-cy=car-edit-picture-date]').type('2023-02-06');

		cy.get('[data-cy=car-edit-new-picture-form]').submit();

		cy.get('[data-cy=car-edit-create-picture-error]').should('be.visible');
		cy.get('[data-cy=car-edit-create-picture-error]').should(
			'contain',
			'Error: Request failed with status code 422',
		);
	});

	it('Should delete a car picture', () => {
		cy.get('[data-cy=edit-car-2]').click();

		cy.get('[data-cy=car-edit-delete-picture]')
			.eq(0)
			.should('be.visible')
			.click();
		cy.get('[data-cy=confirm-picture-delete-alert]')
			.should('be.visible')
			.click();
		cy.get('[data-cy=close-car-edit-delete-picutre-alert]')
			.should('be.visible')
			.click();
		cy.get('[data-cy=car-edit-pictures-div]').should('have.length', 1);
	});

	it('Should display error when deleting a car picture', () => {
		cy.get('[data-cy=edit-car-2]').click();

		cy.intercept('DELETE', '/api/picture/1', {
			statusCode: 500,
		}).as('deleteCarError');

		cy.get('[data-cy=car-edit-delete-picture]')
			.eq(0)
			.should('be.visible')
			.click();
		cy.get('[data-cy=confirm-picture-delete-alert]')
			.should('be.visible')
			.click();
		cy.get('[data-cy=car-edit-delete-picture-error]')
			.should('be.visible')
			.and('contain', 'Error: Request failed with status code 500');
	});
});

describe('Car table delete', () => {
	beforeEach(() => {
		cy.visit('/admin/car');
		cy.intercept('GET', '/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCars');
	});

	it('Should display a list of cars', () => {
		cy.wait('@getAllCars');

		cy.intercept('DELETE', '/api/car/2', {
			body: { data: true },
			statusCode: 200,
		}).as('deleteCar');

		cy.get('[data-cy=car-table-delete-car]').should('be.visible').eq(0).click();
		cy.get('[data-cy=confirm-car-delete-alert]').should('be.visible').click();

		cy.get('[data-cy=close-car-table-delete-alert]')
			.should('be.visible')
			.click();

		cy.get('[data-cy=car-table]').should('have.length', 3);
	});

	it('Should display error when deleting a car', () => {
		cy.wait('@getAllCars');

		cy.intercept('DELETE', '/api/car/2', {
			statusCode: 500,
		}).as('deleteCarError');

		cy.get('[data-cy=car-table-delete-car]').should('be.visible').eq(0).click();
		cy.get('[data-cy=confirm-car-delete-alert]').should('be.visible').click();

		cy.get('[data-cy=car-table-delete-error]')
			.should('be.visible')
			.and('contain', 'Error: Request failed with status code 500');
	});
});
