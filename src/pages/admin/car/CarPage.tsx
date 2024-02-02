import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CarTable } from '@/components/admin/car/CarTable';
import { ICars, deleteCar, getAllCars } from '@/service/api/car/car-requests';

export const CarPage = () => {
	const [cars, setCars] = useState<ICars[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const [showGallery, setShowGallery] = useState(false);

	const onCloseModal = () => {
		setShowGallery(false);
	};

	const handleDeleteCar = async (carId: number): Promise<void> => {
		await deleteCar(carId);
		setCars((prevCars) => prevCars?.filter((car) => car.id !== carId));
	};

	const onGettingAllCars = async () => {
		const cars = await getAllCars();
		setCars(cars);
		setIsLoading(false);
	};

	useEffect(() => {
		onGettingAllCars();
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
									<CarTable
										cars={cars}
										handleDeleteCar={handleDeleteCar}
										showGallery={showGallery}
										onCloseModal={onCloseModal}
										setShowGallery={setShowGallery}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
