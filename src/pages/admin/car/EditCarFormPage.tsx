import { ArrowUturnLeftIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
	NOTIFICATION_TYPE,
	notifyConfirmation,
	notifyStatus,
} from '@/helpers/notifications';
import {
	createPictureSchema,
	editCarSchema,
} from '@/helpers/validations/car.validations';
import { ICar } from '@/interfaces/car.interfaces';
import { editCar, getCarById } from '@/services/api/car/car';
import {
	createCarPicture,
	deletePicture,
} from '@/services/api/picture/picture';

interface INewCarState {
	brand: string;
	model: string;
	color: string;
	passengers: number;
	ac: boolean;
	pricePerDay: number;
}

interface INewImageState {
	picture: FileList;
	pictureTitle: string;
	pictureDescription: string;
	pictureType: string;
	pictureDate: string;
}

const NEW_CAR_IMAGES_INITIAL_STATE: INewImageState = {
	picture: [] as unknown as FileList,
	pictureTitle: '',
	pictureDescription: '',
	pictureType: '',
	pictureDate: '',
};

export const EditCarFormPage = () => {
	const [car, setCar] = useState<ICar>({} as ICar);
	const [isLoading, setIsLoading] = useState(true);
	const { id } = useParams();
	const carId = Number(id);

	const navigate = useNavigate();

	const NEW_CAR_INITIAL_STATE: INewCarState = {
		brand: car?.brand || '',
		model: car?.model || '',
		color: car?.color || '',
		passengers: car?.passengers || 0,
		ac: car?.ac || false,
		pricePerDay: car?.pricePerDay || 0,
	};
	const handleDeletePicture = async (pictureId: number): Promise<void> => {
		try {
			await deletePicture(pictureId);
			notifyStatus(
				NOTIFICATION_TYPE.DELETED,
				'close-car-edit-delete-picutre-alert',
			);
			setCar({
				...car,
				images: car.images?.filter((image) => image.id !== pictureId),
			});
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'car-edit-delete-picture-error',
					error.message,
				);
			}
		}
	};
	const onHandleDelete = (id: number): void => {
		notifyConfirmation('confirm-picture-delete-alert', handleDeletePicture, id);
	};

	const handleSubmitNewCar = async (values: INewCarState): Promise<void> => {
		try {
			await editCar(carId, {
				brand: values.brand || car.brand,
				model: values.model || car.model,
				color: values.color || car.color,
				pricePerDay: values.pricePerDay || car.pricePerDay,
				passengers: Number(values.passengers) || car.passengers,
				ac: values.ac || car.ac,
			});
			setCar({ ...car, ...values });

			notifyStatus(
				NOTIFICATION_TYPE.SUCCESS,
				'car-edit-success',
				`Car with ID: ${carId} updated!`,
			);
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(NOTIFICATION_TYPE.ERROR, 'car-edit-error', error.message);
			}
		}
	};

	const handleSubmitNewCarPicture = async (
		values: INewImageState,
	): Promise<void> => {
		try {
			const picture = await createCarPicture({
				carId: carId,
				picture: values.picture,
				title: values.pictureTitle,
				description: values.pictureDescription,
				type: values.pictureType,
				date: values.pictureDate,
			});

			setCar({
				...car,
				images: [...(car.images || []), picture],
			});

			notifyStatus(
				NOTIFICATION_TYPE.SUCCESS,
				'car-edit-create-picture-success',
				`New picture saved on ${car.brand} ${car.model} (ID:${carId})`,
			);
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'car-edit-create-picture-error',
					error.message,
				);
			}
		}
	};

	const formikCar = useFormik({
		enableReinitialize: true,
		initialValues: NEW_CAR_INITIAL_STATE,
		validationSchema: editCarSchema,
		onSubmit: async (values) => {
			await handleSubmitNewCar(values);
			formikCar.resetForm();
		},
	});

	const formikCarPictures = useFormik({
		initialValues: NEW_CAR_IMAGES_INITIAL_STATE,
		validationSchema: createPictureSchema,
		onSubmit: async (values) => {
			await handleSubmitNewCarPicture(values);

			formikCarPictures.resetForm();
		},
	});

	useEffect(() => {
		const fetchCarById = async (): Promise<void> => {
			try {
				const car = await getCarById(carId);
				setCar(car);
				setIsLoading(false);
			} catch (error) {
				if (error instanceof Error) {
					notifyStatus(
						NOTIFICATION_TYPE.ERROR,
						'get-car-pictures-error-alert',
						error.message,
					);
				}
			}
		};
		fetchCarById();
	}, [carId]);

	return (
		<div className="flex flex-col flex-1">
			<form
				className="p-6 pb-0"
				onSubmit={formikCar.handleSubmit}
				noValidate
				data-cy="car-edit-form"
			>
				<div className="space-y-10">
					<div className="border-b border-white/10 pb-8">
						<div className="flex">
							<div>
								<h2 className="text-base font-semibold leading-7 text-white">
									Fill the fields with new information
								</h2>
								<p className="mt-1 text-sm leading-6 text-indigo-400">
									Or leave them with the previous values
								</p>
							</div>
							<div className="flex-1"></div>
							<button onClick={() => navigate('/admin/car')}>
								<ArrowUturnLeftIcon className="w-6 text-white" />
							</button>
						</div>
					</div>

					<div>
						<h2 className="text-base font-semibold leading-7 text-white">
							{car.brand} {car.model} Information (ID {carId})
						</h2>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-white/10 pb-8">
							<div className="sm:col-span-3">
								<label
									htmlFor="brand"
									className="block text-sm font-medium leading-6 text-white"
								>
									Brand
								</label>

								<div className="mt-2">
									<input
										data-cy="car-edit-brand"
										id="brand"
										type="text"
										className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCar.getFieldProps('brand')}
									/>
									{formikCar.touched.brand && formikCar.errors.brand && (
										<p data-cy="brand-error" className="text-red-500">
											{formikCar.errors.brand as string}
										</p>
									)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="model"
									className="block text-sm font-medium leading-6 text-white"
								>
									Model
								</label>
								<div className="mt-2">
									<input
										data-cy="car-edit-model"
										id="model"
										type="text"
										className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCar.getFieldProps('model')}
									/>
									{formikCar.touched.model && formikCar.errors.model && (
										<p data-cy="model-error" className="text-red-500">
											{formikCar.errors.model as string}
										</p>
									)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="color"
									className="block text-sm font-medium leading-6 text-white"
								>
									Color
								</label>
								<div className="mt-2">
									<select
										data-cy="car-edit-color"
										id="color"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
										{...formikCar.getFieldProps('color')}
									>
										<option value="" disabled>
											Select Color
										</option>
										<option value={'black'}>Black</option>
										<option value={'white'}>White</option>
										<option value={'gray'}>Gray</option>
										<option value={'dark blue'}>Dark Blue</option>
										<option value={'red'}>Red</option>
									</select>
									{formikCar.touched.color && formikCar.errors.color && (
										<p data-cy="color-error" className="text-red-500">
											{formikCar.errors.color as string}
										</p>
									)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="passengers"
									className="block text-sm font-medium leading-6 text-white"
								>
									Passengers
								</label>
								<div className="mt-2">
									<select
										data-cy="car-edit-passengers"
										typeof="number"
										id="passengers"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
										{...formikCar.getFieldProps('passengers')}
									>
										<option value="" disabled>
											Select Number
										</option>
										<option value={1}>1</option>
										<option value={2}>2</option>
										<option value={4}>4</option>
										<option value={6}>6</option>
										<option value={8}>8</option>
									</select>
									{formikCar.touched.passengers &&
										formikCar.errors.passengers && (
											<p data-cy="passengers-error" className="text-red-500">
												{formikCar.errors.passengers as string}
											</p>
										)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="color"
									className="block text-sm font-medium leading-6 text-white"
								>
									Air Conditioning
								</label>
								<div className="mt-2">
									<select
										data-cy="car-edit-ac"
										id="ac"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
										{...formikCar.getFieldProps('ac')}
									>
										<option value="" disabled>
											Select Option
										</option>
										<option value={'true'}>Yes</option>
										<option value={'false'}>No</option>
									</select>
									{formikCar.touched.ac && formikCar.errors.ac && (
										<p data-cy="ac-error" className="text-red-500">
											{formikCar.errors.ac as string}
										</p>
									)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="pricePerDay"
									className="block text-sm font-medium leading-6 text-white"
								>
									Price Per Day
								</label>
								<div className="mt-2">
									<input
										data-cy="car-edit-price-per-day"
										type="number"
										id="pricePerDay"
										className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCar.getFieldProps('pricePerDay')}
									/>
									{formikCar.touched.pricePerDay &&
										formikCar.errors.pricePerDay && (
											<p data-cy="pricePerDay-error" className="text-red-500">
												{formikCar.errors.pricePerDay as string}
											</p>
										)}
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="button"
						className="text-sm font-semibold leading-6 text-white"
					>
						Cancel
					</button>
					<button
						disabled={formikCar.values === NEW_CAR_INITIAL_STATE}
						type="submit"
						data-cy="submit-button"
						className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					>
						Update
					</button>
				</div>
			</form>

			<form
				className="p-6 pt-0"
				onSubmit={formikCarPictures.handleSubmit}
				noValidate
				data-cy="car-edit-new-picture-form"
			>
				<div>
					<div className="border-b border-white/10 pb-12">
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<h2 className="text-base font-semibold leading-7 text-white col-span-full">
								Delete current images or add new ones
							</h2>
							<div
								data-cy="car-edit-pictures-div"
								className="col-span-full grid grid-cols-2 gap-3"
							>
								{isLoading ? (
									<span className="text-white">Loading...</span>
								) : (
									car.images.map((picture) => (
										<div className="grid" key={picture.id}>
											<img
												src={picture.src ? picture.src : '/no-image.jpg'}
												className="text-white w-full"
												alt="car-image"
											/>
											<button
												data-cy="car-edit-delete-picture"
												className="text-white justify-self-end hover:text-red-500"
												onClick={() => onHandleDelete(picture.id)}
											>
												Delete
											</button>
										</div>
									))
								)}
							</div>
							<div className="col-span-full">
								<label className="block text-sm font-medium leading-6 text-white">
									Pictures
								</label>
								<div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
									<div className="text-center">
										<PhotoIcon
											className="mx-auto h-12 w-12 text-gray-500"
											aria-hidden="true"
										/>
										<div className="mt-4 flex text-sm leading-6 text-gray-400">
											<label
												htmlFor="picture"
												className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
											>
												<span>Upload a file</span>
												<input
													data-cy="car-edit-picture"
													id="picture"
													name="picture"
													type="file"
													className="sr-only"
													onChange={(e) =>
														formikCarPictures.setFieldValue(
															'picture',
															e.currentTarget.files,
														)
													}
												/>
											</label>
										</div>
										<p className="text-lg leading-5 text-gray-400">
											{formikCarPictures.values.picture.length}
										</p>
									</div>
								</div>
								{formikCarPictures.touched.picture &&
									formikCarPictures.errors.picture && (
										<p
											data-cy="car-edit-picture-error"
											className="text-red-500"
										>
											{formikCarPictures.errors.picture as unknown as string}
										</p>
									)}
							</div>
						</div>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="pictureTitle"
									className="block text-sm font-medium leading-6 text-white"
								>
									Title
								</label>
								<div className="mt-2">
									<input
										data-cy="car-edit-picture-title"
										id="pictureTitle"
										type="text"
										className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCarPictures.getFieldProps('pictureTitle')}
									/>
									{formikCarPictures.touched.pictureTitle &&
										formikCarPictures.errors.pictureTitle && (
											<p data-cy="pictureTitle-error" className="text-red-500">
												{formikCarPictures.errors.pictureTitle}
											</p>
										)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="pictureDescription"
									className="block text-sm font-medium leading-6 text-white"
								>
									Description
								</label>
								<div className="mt-2">
									<input
										data-cy="car-edit-picture-description"
										id="pictureDescription"
										type="text"
										className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCarPictures.getFieldProps('pictureDescription')}
									/>
									{formikCarPictures.touched.pictureDescription &&
										formikCarPictures.errors.pictureDescription && (
											<p
												data-cy="pictureDescription-error"
												className="text-red-500"
											>
												{formikCarPictures.errors.pictureDescription}
											</p>
										)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="pictureType"
									className="block text-sm font-medium leading-6 text-white"
								>
									Type
								</label>
								<div className="mt-2">
									<select
										data-cy="car-edit-picture-type"
										id="pictureType"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
										{...formikCarPictures.getFieldProps('pictureType')}
									>
										<option value="" disabled>
											Select type
										</option>
										<option value={'front'}>Front</option>
										<option value={'back'}>Back</option>
										<option value={'side'}>Side</option>
										<option value={'other'}>Other</option>
									</select>
									{formikCarPictures.touched.pictureType &&
										formikCarPictures.errors.pictureType && (
											<p
												data-cy="car-edit-pictureType-error"
												className="text-red-500"
											>
												{formikCarPictures.errors.pictureType}
											</p>
										)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="pictureDate"
									className="block text-sm font-medium leading-6 text-white"
								>
									Date
								</label>
								<div className="mt-2">
									<input
										data-cy="car-edit-picture-date"
										id="pictureDate"
										type="date"
										max={new Date().toISOString().split('T')[0]}
										min="1900-01-01"
										className="block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCarPictures.getFieldProps('pictureDate')}
									/>
									{formikCarPictures.touched.pictureDate &&
										formikCarPictures.errors.pictureDate && (
											<p data-cy="pictureDate-error" className="text-red-500">
												{formikCarPictures.errors.pictureDate}
											</p>
										)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<button
						type="submit"
						data-cy="submit-button"
						className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
					>
						Add Picture
					</button>
				</div>
			</form>
		</div>
	);
};
