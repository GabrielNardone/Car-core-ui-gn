import { PhotoIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

import { Carousel } from './Carousel';
import { GalleryModal } from './GalleryModal';

import { notifyConfirmation } from '@/helpers/notifications';
import { ICar } from '@/services/api/car/car';

interface ICarTable {
	cars: ICar[];
	handleDeleteCar: (carId: number) => Promise<void>;
	showGallery: boolean;
	onCloseModal: () => void;
	setShowGallery: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CarTable = ({
	cars,
	handleDeleteCar,
	showGallery,
	onCloseModal,
	setShowGallery,
}: ICarTable) => {
	return (
		<table className="min-w-full divide-y divide-gray-700">
			<thead>
				<tr>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						ID
					</th>
					<th
						scope="col"
						className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
					>
						Brand
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Model
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Color
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Price Per Day
					</th>
					<th
						scope="col"
						className="px-3 py-3.5 text-left text-sm font-semibold text-white"
					>
						Pictures
					</th>
					<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
						<span className="sr-only">Edit</span>
					</th>
					<th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
						<span className="sr-only">Delete</span>
					</th>
				</tr>
			</thead>
			<tbody className="divide-y divide-gray-800">
				{cars?.map((car) => (
					<tr key={car.id} data-cy="car-table">
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{car.id}
						</td>
						<td
							data-cy={`car-brand-${car.id}`}
							className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0"
						>
							{car.brand}
						</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{car.model}
						</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{car.color}
						</td>
						<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							{car.pricePerDay}
						</td>
						<td className="flex whitespace-nowrap px-3 py-4 text-sm text-gray-300">
							<button
								data-cy="gallery-button"
								onClick={() => setShowGallery(true)}
								className="text-indigo-400 hover:text-indigo-300"
							>
								See gallery
							</button>
							<PhotoIcon className="w-6 ml-2" />
							<GalleryModal isOpen={showGallery} onCloseModal={onCloseModal}>
								<Carousel images={car.images} />
							</GalleryModal>
						</td>
						<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
							<Link
								data-cy={`edit-car-${car.id}`}
								to={`/admin/car-edit/${car.id}`}
								state={{
									id: car.id,
									brand: car.brand,
									model: car.model,
									color: car.color,
									pricePerDay: car.pricePerDay,
									ac: car.ac,
									passengers: car.passengers,
								}}
								className="text-indigo-400 hover:text-indigo-300"
							>
								Edit
							</Link>
						</td>
						<td className="relative whitespace-nowrap py-4 pl-6 pr-4 text-right text-sm font-medium sm:pr-0">
							<TrashIcon
								data-cy="delete-car"
								className="text-white w-6 hover:text-red-400 hover:cursor-pointer"
								onClick={() => {
									notifyConfirmation(
										'<span data-cy="confirm-delete">Yes, delete it!</span>',
										'<span data-cy="close-delete-alert">Ok</span>',
										handleDeleteCar,
										car.id,
									);
								}}
							/>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
