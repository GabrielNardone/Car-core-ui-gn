import { ArrowUturnLeftIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';

import { deletePicture } from '@/service/api/car/delete-picture';
import { editCar } from '@/service/api/car/edit-car';
import { ICarImages } from '@/service/api/car/get-all-cars';
import { getCarById } from '@/service/api/car/get-car-by-id';
import { uploadCarPicture } from '@/service/api/car/upload-picture';

const NEW_CAR_INITIAL_STATE = {
	brand: '',
	model: '',
	color: '',
	passengers: '',
	ac: '',
	pricePerDay: '',
};
const NEW_CAR_IMAGES_INITIAL_STATE = {
	picture: '',
	title: '',
	description: '',
	type: '',
	date: '',
};

interface IFormData {
	picture: any;
	title: string;
	description: string;
	type: string;
	date: string;
}

export const CarEdit = () => {
	const { state: carInfo } = useLocation();
	const navigate = useNavigate();

	const [carPictures, setCarPictures] = useState<ICarImages[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const fileUpload = (id: number, values: IFormData) => {
		const formData = new FormData();
		formData.append('file', values.picture);
		formData.append('title', values.title);
		formData.append('description', values.description);
		formData.append('type', values.type);
		formData.append('date', values.date);

		uploadCarPicture(id, formData)
			.then((resp) => {
				if (resp.status === 201) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `<span data-cy="add-new-image">New image saved on ${carInfo.brand} ${carInfo.model} (ID:${carInfo.id})</span>`,
						showConfirmButton: false,
						timer: 2500,
						background: '#000000',
						color: '#F0F0F0',
					});

					setCarPictures([...carPictures, resp.data]);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const onHandleDelete = (id: number) => {
		Swal.fire({
			title: 'Are you sure?',
			text: "You won't be able to revert this!",
			background: '#000000',
			color: '#F0F0F0',
			showCancelButton: true,
			confirmButtonColor: '#17B169',
			cancelButtonColor: '#d33',
			confirmButtonText:
				'<span data-cy="confirm-picture-delete">Yes, delete it!</span>',
		}).then((result) => {
			if (result.isConfirmed) {
				deletePicture(id);
				Swal.fire({
					title: 'Deleted!',
					text: 'Your car has been deleted.',
					icon: 'success',
					background: '#000000',
					color: '#F0F0F0',
					confirmButtonColor: '#17B169',
					confirmButtonText:
						'<span data-cy="close-picture-delete-alert">Ok</span>',
				});
			}
			setCarPictures((carPictures) =>
				carPictures.filter((picture) => picture.id !== id),
			);
		});
	};

	const formikCar = useFormik({
		initialValues: NEW_CAR_INITIAL_STATE,
		validationSchema: yup.object({
			brand: yup
				.string()
				.min(3, 'At least (3) characters')
				.max(21, 'Maximum (21) characters'),
			model: yup
				.string()
				.min(3, 'At least (3) characters')
				.max(21, 'Maximum (21) characters'),
			color: yup.string(),
			passengers: yup.number(),
			ac: yup.boolean(),
			pricePerDay: yup.number().positive('Must be a positive number'),
		}),
		onSubmit: (values) => {
			editCar(carInfo.id, {
				brand: values.brand || carInfo.brand,
				model: values.model || carInfo.model,
				color: values.color || carInfo.color,
				pricePerDay: Number(values.pricePerDay) || carInfo.pricePerDay,
				passengers: Number(values.passengers) || carInfo.passengers,
				ac: values.ac === 'true' ? true : false || carInfo.ac,
			})
				.then((status) => {
					if (status === 202) {
						Swal.fire({
							position: 'top-end',
							icon: 'success',
							title: `<span data-cy="car-edit-success">${carInfo.brand} ${carInfo.model} (ID:${carInfo.id}) updated!</span>`,
							showConfirmButton: false,
							timer: 2500,
							background: '#000000',
							color: '#F0F0F0',
						});
					}
				})
				.catch((error) => {
					console.log(error);
				});
			formikCar.resetForm();
		},
	});

	const formikCarImages = useFormik({
		initialValues: NEW_CAR_IMAGES_INITIAL_STATE,
		validationSchema: yup.object({
			picture: yup.mixed().required('Required'),
			title: yup
				.string()
				.required('Required')
				.min(3, 'At least (3) characters')
				.max(21, 'Maximum (21) characters'),
			description: yup
				.string()
				.required('Required')
				.min(3, 'At least (3) characters')
				.max(120, 'Maximum (120) characters'),
			type: yup.string().required('Required'),
			date: yup.string().required('Required'),
		}),
		onSubmit: (values) => {
			fileUpload(carInfo.id, {
				picture: values.picture[0],
				title: values.title,
				description: values.description,
				type: values.type,
				date: values.date,
			});

			formikCarImages.resetForm();
		},
	});

	useEffect(() => {
		getCarById(carInfo.id).then((resp) => {
			setCarPictures(resp || []);
			setIsLoading(false);
		});
	}, [carInfo.id]);

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
									Fill the fields you want to change
								</h2>
								<p className="mt-1 text-sm leading-6 text-indigo-400">
									You can leave the others empty
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
							{carInfo.brand} {carInfo.model} Information (ID {carInfo.id})
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
										data-cy="brand"
										id="brand"
										type="text"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCar.getFieldProps('brand')}
									/>
									{formikCar.touched.brand && formikCar.errors.brand && (
										<p data-cy="brand-error" className="text-red-500">
											{formikCar.errors.brand}
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
										data-cy="model"
										id="model"
										type="text"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCar.getFieldProps('model')}
									/>
									{formikCar.touched.model && formikCar.errors.model && (
										<p data-cy="model-error" className="text-red-500">
											{formikCar.errors.model}
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
										data-cy="color"
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
											{formikCar.errors.color}
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
										typeof="number"
										data-cy="passengers"
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
												{formikCar.errors.passengers}
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
										data-cy="ac"
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
											{formikCar.errors.ac}
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
										data-cy="pricePerDay"
										type="number"
										id="pricePerDay"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCar.getFieldProps('pricePerDay')}
									/>
									{formikCar.touched.pricePerDay &&
										formikCar.errors.pricePerDay && (
											<p data-cy="pricePerDay-error" className="text-red-500">
												{formikCar.errors.pricePerDay}
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
				onSubmit={formikCarImages.handleSubmit}
				noValidate
				data-cy="car-edit-new-image-form"
			>
				<div>
					<div className="border-b border-white/10 pb-12">
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<h2 className="text-base font-semibold leading-7 text-white col-span-full">
								Delete current images or add new ones
							</h2>
							<div className="col-span-full grid grid-cols-2 gap-3">
								{isLoading ? (
									<span className="text-white">Loading...</span>
								) : (
									carPictures.map((picture) => (
										<div className="grid" key={picture.id}>
											<img
												src={picture.src ? picture.src : '/no-image.jpg'}
												className="text-white w-full"
												alt="car-image"
											/>
											<button
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
													data-cy="picture"
													id="picture"
													name="picture"
													type="file"
													className="sr-only"
													onChange={(e) =>
														formikCarImages.setFieldValue(
															'picture',
															e.currentTarget.files,
														)
													}
												/>
											</label>
										</div>
										<p className="text-lg leading-5 text-gray-400">
											{formikCarImages.values.picture.length}
										</p>
									</div>
								</div>
								{formikCarImages.touched.picture &&
									formikCarImages.errors.picture && (
										<p data-cy="picture-error" className="text-red-500">
											{formikCarImages.errors.picture}
										</p>
									)}
							</div>
						</div>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="title"
									className="block text-sm font-medium leading-6 text-white"
								>
									Title
								</label>
								<div className="mt-2">
									<input
										data-cy="car-edit-image-title"
										id="title"
										type="text"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCarImages.getFieldProps('title')}
									/>
									{formikCarImages.touched.title &&
										formikCarImages.errors.title && (
											<p data-cy="title-error" className="text-red-500">
												{formikCarImages.errors.title}
											</p>
										)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="car-edit-image-description"
									className="block text-sm font-medium leading-6 text-white"
								>
									Description
								</label>
								<div className="mt-2">
									<input
										data-cy="car-edit-image-description"
										id="description"
										type="text"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCarImages.getFieldProps('description')}
									/>
									{formikCarImages.touched.description &&
										formikCarImages.errors.description && (
											<p data-cy="description-error" className="text-red-500">
												{formikCarImages.errors.description}
											</p>
										)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="type"
									className="block text-sm font-medium leading-6 text-white"
								>
									Type
								</label>
								<div className="mt-2">
									<select
										data-cy="car-edit-image-type"
										id="type"
										className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
										{...formikCarImages.getFieldProps('type')}
									>
										<option value="" disabled>
											Select type
										</option>
										<option value={'front'}>Front</option>
										<option value={'back'}>Back</option>
										<option value={'side'}>Side</option>
										<option value={'other'}>Other</option>
									</select>
									{formikCarImages.touched.type &&
										formikCarImages.errors.type && (
											<p data-cy="type-error" className="text-red-500">
												{formikCarImages.errors.type}
											</p>
										)}
								</div>
							</div>

							<div className="sm:col-span-3">
								<label
									htmlFor="date"
									className="block text-sm font-medium leading-6 text-white"
								>
									Date
								</label>
								<div className="mt-2">
									<input
										data-cy="car-edit-image-date"
										id="date"
										type="date"
										className="block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
										{...formikCarImages.getFieldProps('date')}
									/>
									{formikCarImages.touched.date &&
										formikCarImages.errors.date && (
											<p data-cy="date-error" className="text-red-500">
												{formikCarImages.errors.date}
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
