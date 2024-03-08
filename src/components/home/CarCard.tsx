import { Link } from 'react-router-dom';

import { ICar } from '@/interfaces/car.interfaces';

export const CarCard = ({ car }: { car: ICar }) => {
	return (
		<div data-cy="car-card">
			<div className="w-full overflow-hidden rounded-md bg-gray-200 hover:opacity-75 lg:h-80">
				<img
					src={car.images[0].src}
					alt={car.brand}
					className="h-full w-full object-cover object-center lg:h-full lg:w-full"
				/>
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm text-gray-200">
						<span>
							{car.brand} {car.model}
						</span>
					</h3>

					<Link
						data-cy="book-car-link"
						to={`/detail/${car.id}`}
						className="mt-1 text-blue-500"
					>
						Book
					</Link>
				</div>
				<div>
					<p>Passengers : {car.passengers}</p>
					<p className="text-sm font-medium text-violet-200">
						Price per day: ${car.pricePerDay}
					</p>
				</div>
			</div>
		</div>
	);
};
