import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useLocation, useNavigate } from 'react-router-dom';

import { ICarPicture } from '@/services/api/picture/picture';

export const CarGallery = () => {
	const { state: carData } = useLocation();
	const navigate = useNavigate();
	console.log(carData);

	return (
		<div className="flex-1 p-6">
			<div className="border-b border-white/10 pb-8">
				<div className="flex">
					<div>
						<h2 className="text-base font-semibold leading-7 text-white">
							{carData.brand} {carData.model} (ID {carData.id}) gallery
						</h2>
						<p className="mt-1 text-sm leading-6 text-gray-400">
							In order to create a new car
						</p>
					</div>
					<div className="flex-1"></div>
					<button onClick={() => navigate('/admin/car')}>
						<ArrowUturnLeftIcon className="w-6 text-white" />
					</button>
				</div>
			</div>
			<div
				data-cy="car-gallery-div"
				className="flex flex-col items-center gap-y-4 mt-4"
			>
				{carData.pictures.length === 0 ? (
					<div className="w-full grid place-content-center text-white text-xl">
						<p>No pictures</p>
						<p>Upload one</p>
					</div>
				) : (
					carData.pictures.map((carPicture: ICarPicture) => (
						<div key={carPicture.id} className="w-[50%]">
							<img
								data-cy={`car-picture-${carPicture.id}`}
								src={carPicture.src ? carPicture.src : 'no-image.jpg'}
								alt="car-picture"
								className="rounded-lg w-full h-96 object-cover hover:scale-110 ease-in duration-300 hover:border hover:border-indigo-700"
							/>
						</div>
					))
				)}
			</div>
		</div>
	);
};
