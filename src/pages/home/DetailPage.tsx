import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { ICar, getCarById } from '@/services/api/car/car';

export function DetailPage() {
	const [car, setCar] = useState({} as ICar);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	const carId = Number(id);

	useEffect(() => {
		const fetchCar = async (): Promise<void> => {
			try {
				const car = await getCarById(carId);
				setCar(car);
				setIsLoading(false);
			} catch (error) {
				if (error instanceof Error) {
					notifyStatus(
						NOTIFICATION_TYPE.ERROR,
						'detail-get-car-error-alert',
						error.message,
					);
				}
			}
		};
		fetchCar();
	}, [carId]);

	if (isLoading) {
		return (
			<div className="h-96 grid place-content-center text-white text-xl">
				Loading...
			</div>
		);
	}

	return (
		<div className="bg-gray-900 text-white">
			<div className="pt-6">
				<div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
					<div className="w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:h-80">
						<img
							src={car.images[0].src || 'no-image.jpg'}
							alt={car.brand}
							className="h-full w-full object-cover object-center lg:h-full lg:w-full"
						/>
					</div>

					<div className="mt-4 lg:mt-0">
						<h2 className="">car information</h2>
						<p className="text-3xl tracking-tight text-violet-200">
							{car.pricePerDay}
						</p>

						<form className="mt-2 ">
							<div>
								<h3 className="text-sm font-medium ">Color</h3>
							</div>

							<div className="mt-10">
								<div className="flex items-center justify-between">
									<h3 className="text-sm font-medium">Size</h3>
									<a
										href="#"
										className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
									>
										Size guide
									</a>
								</div>

								<div className="h-44 bg-violet-300"></div>
							</div>
						</form>
						<button
							type="submit"
							className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Add to bag
						</button>
					</div>
				</div>

				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
					<div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
						<h1 className="text-2xl font-bold tracking-tight  sm:text-3xl">
							{car.brand} {car.model}
						</h1>
					</div>

					<div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
						<div>
							<h3 className="">Description</h3>

							<div className="space-y-6">
								<p className="text-base ">{car.color}</p>
							</div>
						</div>

						<div className="mt-10">
							<h3 className="text-sm font-medium ">Highlights</h3>

							<div className="mt-4"></div>
						</div>

						<div className="mt-10">
							<h2 className="text-sm font-medium ">Details</h2>

							<div className="mt-4 space-y-6">
								<p className="text-sm text-slate-200">{car.passengers}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
