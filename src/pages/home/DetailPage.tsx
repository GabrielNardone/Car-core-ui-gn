import { useEffect, useState } from 'react';
import { FiWind } from 'react-icons/fi';
import { MdOutlineColorLens } from 'react-icons/md';
import { PiUsersFour } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';

import { DayPickerComponent } from '@/components/detail/DayPickerComponent';
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
		<div className="text-white">
			<div className="pt-6 px-2 sm:px-0">
				<div className="mx-auto flex flex-col items-center mt-6 sm:px-6 sm:gap-x-2 gap-y-8 md:flex-row md:items-start md:justify-evenly  ">
					<div className="w-fit mt-4 lg:mt-0">
						<div
							data-cy="detail-car-price"
							className="flex justify-between items-center bg-gray-700 p-2 rounded-md"
						>
							<h2>Price per day</h2>
							<p className="text-2xl tracking-tight text-emerald-500">
								$ {car.pricePerDay}
							</p>
						</div>

						<DayPickerComponent carId={carId} carPrice={car.pricePerDay} />
					</div>

					<div>
						<div className="w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:h-80">
							<img
								data-cy="detail-car-image"
								src={car.images[0].src || 'no-image.jpg'}
								alt={car.brand}
								className="h-full w-full object-cover object-center lg:h-full lg:w-full"
							/>
						</div>
						<Link
							data-cy="detail-car-gallery-link"
							to={`/car-gallery/${car.id}`}
							state={{
								pictures: car.images,
								id: car.id,
								brand: car.brand,
								model: car.model,
							}}
							className="text-blue-500"
						>
							See all photos
						</Link>
						<div data-cy="detail-car-characteristics" className="pb-16 pt-10">
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
										<span className="text-slate-400">
											{car.ac ? 'Yes' : 'No'}
										</span>
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
