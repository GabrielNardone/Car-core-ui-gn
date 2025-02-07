describe('Detail page', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.intercept('GET', '/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCars');
		cy.intercept('GET', '/api/car/2', {
			statusCode: 200,
			fixture: 'get-car-by-id-mock.json',
		}).as('getCarById');
	});

	it('Should render day picker correctly', () => {
		cy.getBySel('book-car-link').eq(0).click();

		cy.getBySel('detail-day-picker').should('be.visible');
	});

	it('Should render car details and pictures correctly', () => {
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
		cy.getBySel('book-car-link').eq(0).click();

		cy.getBySel('detail-car-gallery-link').click();

		cy.location('pathname').should('eq', '/car-gallery/2');

		cy.getBySel('car-picture-1').should('be.visible');
		cy.getBySel('car-picture-2').should('be.visible');
	});
});
