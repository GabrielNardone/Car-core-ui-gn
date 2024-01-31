import { ArrowUturnLeftIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup';

import { createCar } from '@/service/api/car/create-car';
import { uploadCarPicture } from '@/service/api/car/upload-picture';

const NEW_CAR_INITIAL_STATE = {
	brand: '',
	model: '',
	color: '',
	passengers: '',
	ac: '',
	pricePerDay: 0,
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

export const CarForm = () => {
	const navigate = useNavigate();

	const fileUpload = (id: number, values: IFormData) => {
		const formData = new FormData();
		formData.append('file', values.picture);
		formData.append('title', values.title);
		formData.append('description', values.description);
		formData.append('type', values.type);
		formData.append('date', values.date);

		uploadCarPicture(id, formData)
			.then((response) => {
				if (response.status === 201) {
					Swal.fire({
						position: 'top-end',
						icon: 'success',
						title: `<span data-cy="create-car-success">Car with id ${id} created!</span>`,
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
	};

	const formik = useFormik({
		initialValues: NEW_CAR_INITIAL_STATE,
		validationSchema: yup.object({
			brand: yup
				.string()
				.required('Required')
				.min(3, 'At least (3) characters')
				.max(21, 'Maximum (21) characters'),
			model: yup
				.string()
				.required('Required')
				.min(3, 'At least (3) characters')
				.max(21, 'Maximum (21) characters'),
			color: yup.string().required('Required'),
			passengers: yup.number().required('Required'),
			ac: yup.boolean().required('Required'),
			pricePerDay: yup
				.number()
				.required('Required')
				.positive('Must be a positive number'),
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
			createCar({
				brand: values.brand,
				model: values.model,
				color: values.color,
				pricePerDay: Number(values.pricePerDay),
				passengers: Number(values.passengers),
				ac: values.ac === 'true' ? true : false,
			}).then((id) => {
				fileUpload(id, {
					picture: values.picture[0],
					title: values.title,
					description: values.description,
					type: values.type,
					date: values.date,
				});
			});
			formik.resetForm();
		},
	});

	return (
		<form
			className="flex-1 p-6"
			onSubmit={formik.handleSubmit}
			noValidate
			data-cy="car-form"
		>
			<div className="space-y-10">
				<div className="border-b border-white/10 pb-8">
					<div className="flex">
						<div>
							<h2 className="text-base font-semibold leading-7 text-white">
								Fill the form
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

				<div className="border-b border-white/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-white">
						Car Information
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
									{...formik.getFieldProps('brand')}
								/>
								{formik.touched.brand && formik.errors.brand && (
									<p data-cy="brand-error" className="text-red-500">
										{formik.errors.brand}
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
									{...formik.getFieldProps('model')}
								/>
								{formik.touched.model && formik.errors.model && (
									<p data-cy="model-error" className="text-red-500">
										{formik.errors.model}
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
									{...formik.getFieldProps('color')}
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
								{formik.touched.color && formik.errors.color && (
									<p data-cy="color-error" className="text-red-500">
										{formik.errors.color}
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
									{...formik.getFieldProps('passengers')}
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
								{formik.touched.passengers && formik.errors.passengers && (
									<p data-cy="passengers-error" className="text-red-500">
										{formik.errors.passengers}
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
									{...formik.getFieldProps('ac')}
								>
									<option value="" disabled>
										Select Option
									</option>
									<option value={'true'}>Yes</option>
									<option value={'false'}>No</option>
								</select>
								{formik.touched.ac && formik.errors.ac && (
									<p data-cy="ac-error" className="text-red-500">
										{formik.errors.ac}
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
									{...formik.getFieldProps('pricePerDay')}
								/>
								{formik.touched.pricePerDay && formik.errors.pricePerDay && (
									<p data-cy="pricePerDay-error" className="text-red-500">
										{formik.errors.pricePerDay}
									</p>
								)}
							</div>
						</div>
					</div>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
													formik.setFieldValue('picture', e.currentTarget.files)
												}
											/>
										</label>
									</div>
									<p className="text-lg leading-5 text-gray-400">
										{formik.values.picture.length}
									</p>
								</div>
							</div>
							{formik.touched.picture && formik.errors.picture && (
								<p data-cy="picture-error" className="text-red-500">
									{formik.errors.picture}
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
									data-cy="title"
									id="title"
									type="text"
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('title')}
								/>
								{formik.touched.title && formik.errors.title && (
									<p data-cy="title-error" className="text-red-500">
										{formik.errors.title}
									</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="description"
								className="block text-sm font-medium leading-6 text-white"
							>
								Description
							</label>
							<div className="mt-2">
								<input
									data-cy="description"
									id="description"
									type="text"
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('description')}
								/>
								{formik.touched.description && formik.errors.description && (
									<p data-cy="description-error" className="text-red-500">
										{formik.errors.description}
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
									data-cy="type"
									id="type"
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
									{...formik.getFieldProps('type')}
								>
									<option value="" disabled>
										Select type
									</option>
									<option value={'front'}>Front</option>
									<option value={'back'}>Back</option>
									<option value={'side'}>Side</option>
									<option value={'other'}>Other</option>
								</select>
								{formik.touched.type && formik.errors.type && (
									<p data-cy="type-error" className="text-red-500">
										{formik.errors.type}
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
									data-cy="date"
									id="date"
									type="date"
									className="block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('date')}
								/>
								{formik.touched.date && formik.errors.date && (
									<p data-cy="date-error" className="text-red-500">
										{formik.errors.date}
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
					Create
				</button>
			</div>
		</form>
	);
};
