describe('Home page', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('Should render marquee correctly', () => {
		cy.getBySel('marquee')
			.should('be.visible')
			.and('contain', '¡¡GREAT DEALS ON HIGHWAY-12!!');
	});

	it('Should render home title and subtitle correctly', () => {
		cy.getBySel('home-title').should('be.visible').and('contain', 'Highway-12');

		cy.getBySel('home-subtitle')
			.should('be.visible')
			.and('contain', 'Car Rental – Search, Compare & Save');
	});

	it('Should render car cards section correctly', () => {
		cy.intercept('GET', '/api/car', {
			fixture: 'get-all-cars-mock.json',
			statusCode: 200,
		}).as('getAllCars');

		cy.getBySel('car-cards-section').should('have.descendants', 'div');
		cy.getBySel('car-card').should('have.length', 4);
		cy.getBySel('book-car-link').should('exist').and('contain', 'Book');
	});

	it('Should throw error when fetching cars fails', () => {
		cy.intercept('GET', '/api/car', {
			statusCode: 500,
		}).as('getAllCarsError');

		cy.getBySel('home-get-all-cars-error-alert')
			.should('be.visible')
			.and('contain', 'Request failed with status code 500');
	});
});
