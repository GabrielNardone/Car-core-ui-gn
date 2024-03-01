import { useEffect, useState } from 'react';
import { FiWind } from 'react-icons/fi';
import { MdOutlineColorLens } from 'react-icons/md';
import { PiUsersFour } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { ICar } from '@/interfaces/car.interfaces';
import { getCarById } from '@/services/api/car/car';

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
			<div className="pt-6 px-2 sm:px-0">
				<div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
					<div>
						<div className="w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:h-80">
							<img
								src={car.images[0].src || 'no-image.jpg'}
								alt={car.brand}
								className="h-full w-full object-cover object-center lg:h-full lg:w-full"
							/>
						</div>
						<Link to={`/somewhere/*****`} className="text-blue-500">
							See all photos
						</Link>
					</div>

					<div className="mt-4 lg:mt-0">
						<h2 className="">Price per day</h2>
						<p className="text-3xl tracking-tight text-violet-200">
							$ {car.pricePerDay}
						</p>

						<form className="mt-2 ">
							<h3 className="text-sm font-medium ">Choose date and time</h3>

							<div className="h-44 bg-violet-300 mt-2 rounded-md"></div>
						</form>
						<button
							type="submit"
							className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-violet-600 px-8 py-3 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
						>
							Book
						</button>
					</div>
				</div>

				<div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:max-w-7xl">
					<div>
						<h1 className="text-2xl font-bold tracking-tight  sm:text-3xl">
							{car.brand} {car.model}
						</h1>
					</div>

					<div className="w-fit">
						<div className="mt-4 flex items-center gap-x-2">
							<MdOutlineColorLens className="text-xl" />
							<span className="text-xl">
								Color: <span className="text-slate-400">{car.color}</span>
							</span>
						</div>
						<div className="mt-4 flex items-center gap-x-2">
							<PiUsersFour className="text-xl" />
							<span className="text-xl">
								Passengers:{' '}
								<span className="text-slate-400">{car.passengers}</span>
							</span>
						</div>
						<div className="mt-4 flex items-center gap-x-2">
							<FiWind className="text-xl" />
							<span className="text-xl">
								Air conditioning:{' '}
								<span className="text-slate-400">{car.ac ? 'Yes' : 'No'}</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
