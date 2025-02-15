import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CarTable } from '@/components/admin/car/CarTable';
import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { ICar } from '@/interfaces/car.interfaces';
import { deleteCar, getAllCars } from '@/services/api/car/car';

export const CarTablePage = () => {
	const [cars, setCars] = useState<ICar[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const handleDeleteCar = async (carId: number): Promise<void> => {
		try {
			await deleteCar(carId);

			notifyStatus(NOTIFICATION_TYPE.DELETED, 'close-car-table-delete-alert');

			setCars((prevCars) => prevCars?.filter((car) => car.id !== carId));
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'car-table-delete-error',
					error.message,
				);
			}
		}
	};

	const fetchCars = async () => {
		try {
			const cars = await getAllCars();
			setCars(cars);
			setIsLoading(false);
		} catch (error: unknown) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'get-all-cars-error-alert',
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
			<div className="w-full grid place-content-center text-white text-xl">
				Loading...
			</div>
		);
	}

	return (
		<div className="flex-1">
			<div className="mx-auto max-w-7xl">
				<div className="bg-gray-900 py-10">
					<div className="px-4 sm:px-6 lg:px-8">
						<div className="sm:flex sm:items-center">
							<div className="sm:flex-auto">
								<h1 className="text-base font-semibold leading-6 text-white">
									Cars
								</h1>
								<p className="mt-2 text-sm text-gray-300">
									A list of all the cars in your account.
								</p>
							</div>
							<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
								<Link
									data-cy="add-car-link"
									to={'/admin/car-form'}
									className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
								>
									Add car
								</Link>
							</div>
						</div>
						<div className="mt-8 flow-root">
							<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
								<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
									<CarTable cars={cars} handleDeleteCar={handleDeleteCar} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
