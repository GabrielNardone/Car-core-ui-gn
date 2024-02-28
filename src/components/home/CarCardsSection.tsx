import { useEffect, useState } from 'react';

import { CarCard } from './CarCard';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { ICar, getAllCars } from '@/services/api/car/car';

export const CarCardsSection = () => {
	const [cars, setCars] = useState<ICar[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchCars = async (): Promise<void> => {
		try {
			const cars = await getAllCars();
			setCars(cars);
			setIsLoading(false);
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'home-get-all-cars-error-alert',
					error.message,
				);
			}
		}
	};

	useEffect(() => {
		fetchCars();
	}, []);

	if (isLoading) {
		return (
			<div className="w-full h-96 grid place-content-center text-white text-xl">
				Loading...
			</div>
		);
	}

	return (
		<div>
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight">
					Choose the car that suits you best
				</h2>

				<div
					data-cy="car-cards-section"
					className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-8"
				>
					{cars.map((car) => (
						<CarCard key={car.id} car={car} />
					))}
				</div>
			</div>
		</div>
	);
};
