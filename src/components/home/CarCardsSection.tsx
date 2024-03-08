import { CarCard } from './CarCard';

import { useFetchAllCars } from '@/hooks/useFetchAllCars';

export const CarCardsSection = () => {
	const { cars, isLoading, isError } = useFetchAllCars();

	if (isLoading) {
		return (
			<div className="w-full h-96 grid place-content-center text-white text-xl">
				Loading...
			</div>
		);
	}

	if (isError) {
		return (
			<div className="w-full h-96 grid place-content-center text-red-500 text-xl">
				Error loading cars
			</div>
		);
	}

	return (
		<div>
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight">
					Choose the car that suits you best
				</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:gap-x-8">
					{cars?.map((car) => (
						<CarCard key={car.id} car={car} />
					))}
				</div>
			</div>
		</div>
	);
};
