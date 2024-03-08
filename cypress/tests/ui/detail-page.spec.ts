describe('Detail page', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.intercept('GET', '/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCars');
	});

	it('Should render day picker correctly', () => {
		cy.intercept('GET', '/api/car/2', {
			statusCode: 200,
			fixture: 'get-car-by-id-mock.json',
		}).as('getCarById');

		cy.getBySel('book-car-link').eq(0).click();

		cy.getBySel('day-picker').should('be.visible');
	});

	it('Should render car details and pictures correctly', () => {
		cy.intercept('GET', '/api/car/2', {
			statusCode: 200,
			fixture: 'get-car-by-id-mock.json',
		}).as('getCarById');

		cy.getBySel('book-car-link').eq(0).click();

		cy.getBySel('detail-car-price')
			.should('be.visible')
			.and('contain', 'Price per day')
			.and('contain', '$ 750000');

		cy.getBySel('detail-car-image').should('be.visible');

		cy.getBySel('detail-car-characteristics')
			.should('be.visible')
			.and('contain', 'Color: black')
			.and('contain', 'Passengers: 4')
			.and('contain', 'Air conditioning: Yes');
	});

	it('Should redirect to car gallery page', () => {
		cy.intercept('GET', '/api/car/2', {
			statusCode: 200,
			fixture: 'get-car-by-id-mock.json',
		}).as('getCarById');

		cy.getBySel('book-car-link').eq(0).click();

		cy.getBySel('detail-car-gallery-link').click();

		cy.location('pathname').should('eq', '/car-gallery/2');

		cy.getBySel('car-picture-1').should('be.visible');
		cy.getBySel('car-picture-2').should('be.visible');
	});

	it('Should rent a car', () => {
		cy.login('erik@gmail.com', 'Erik1234');
		cy.intercept('GET', '/api/car/2', {
			statusCode: 200,
			fixture: 'get-car-by-id-mock.json',
		}).as('getCarById');
		cy.intercept('POST', '/api/rent', {
			statusCode: 201,
		}).as('getCarById');

		cy.getBySel('book-car-link').eq(0).click();

		cy.getBySel('day-picker').find('button').contains('7').invoke('click');
		cy.getBySel('day-picker').find('button').contains('17').invoke('click');

		cy.getBySel('detail-book-car-button').click();

		cy.getBySel('detail-success-book-alert').should('be.visible');
		cy.getBySel('detail-success-book-alert').should(
			'contain',
			'You have successfully booked the car!',
		);
	});

	it('Should throw login warning', () => {
		cy.intercept('GET', '/api/car/2', {
			statusCode: 200,
			fixture: 'get-car-by-id-mock.json',
		}).as('getCarById');
		cy.intercept('POST', '/api/rent', {
			statusCode: 201,
		}).as('getCarById');

		cy.getBySel('book-car-link').eq(0).click();

		cy.getBySel('day-picker').find('button').contains('7').invoke('click');
		cy.getBySel('day-picker').find('button').contains('17').invoke('click');

		cy.getBySel('detail-book-car-button').click();

		cy.getBySel('detail-warning-book-alert').should('be.visible');
		cy.getBySel('detail-warning-book-alert').should(
			'contain',
			'You must be logged in to book',
		);
	});

	it('Should throw error when trying to rent a car', () => {
		cy.login('erik@gmail.com', 'Erik1234');
		cy.intercept('GET', '/api/car/2', {
			statusCode: 200,
			fixture: 'get-car-by-id-mock.json',
		}).as('getCarById');
		cy.intercept('POST', '/api/rent', {
			statusCode: 500,
		}).as('getCarById');

		cy.getBySel('book-car-link').eq(0).click();

		cy.getBySel('day-picker').find('button').contains('7').invoke('click');
		cy.getBySel('day-picker').find('button').contains('17').invoke('click');

		cy.getBySel('detail-book-car-button').click();

		cy.getBySel('detail-error-book-alert').should('be.visible');
		cy.getBySel('detail-error-book-alert').should(
			'contain',
			'Request failed with status code 500',
		);
	});
});
