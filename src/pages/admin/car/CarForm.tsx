import { ArrowUturnLeftIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { CAR_ERRORS_MESSAGES } from '@/errors/car-errors-messages.enum';
import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { createCarSchema } from '@/helpers/validations/car.validations';
import { createCar } from '@/services/api/car/car';
import { createCarPicture } from '@/services/api/picture/picture';

interface ICarFormData {
	brand: string;
	model: string;
	color: string;
	passengers: string;
	ac: string;
	pricePerDay: number;
	picture: any;
	pictureTitle: string;
	pictureDescription: string;
	pictureType: string;
	pictureDate: string;
}

const NEW_CAR_INITIAL_STATE: ICarFormData = {
	brand: '',
	model: '',
	color: '',
	passengers: '',
	ac: '',
	pricePerDay: 0,
	picture: '',
	pictureTitle: '',
	pictureDescription: '',
	pictureType: '',
	pictureDate: '',
};

export const CarForm = () => {
	const navigate = useNavigate();

	const handleSubmit = async (values: ICarFormData): Promise<void> => {
		try {
			const carId = await createCar({
				brand: values.brand,
				model: values.model,
				color: values.color,
				pricePerDay: Number(values.pricePerDay),
				passengers: Number(values.passengers),
				ac: values.ac === 'true' ? true : false,
			});

			await createCarPicture({
				carId,
				picture: values.picture[0],
				title: values.pictureTitle,
				description: values.pictureDescription,
				type: values.pictureType,
				date: values.pictureDate,
			});

			notifyStatus(NOTIFICATION_TYPE.SUCCESS, `Car with id ${carId} created`);
		} catch (error) {
			console.log(error);
			notifyStatus(
				NOTIFICATION_TYPE.ERROR,
				CAR_ERRORS_MESSAGES.CREATE_CAR_ERROR,
			);
		}
	};

	const formik = useFormik({
		initialValues: NEW_CAR_INITIAL_STATE,
		validationSchema: createCarSchema,
		onSubmit: async (values) => {
			await handleSubmit(values);
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
									{formik.errors.picture as string}
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
									data-cy="pictureTitle"
									id="pictureTitle"
									type="text"
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('pictureTitle')}
								/>
								{formik.touched.pictureTitle && formik.errors.pictureTitle && (
									<p data-cy="title-error" className="text-red-500">
										{formik.errors.pictureTitle}
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
									data-cy="pictureDescription"
									id="pictureDescription"
									type="text"
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('pictureDescription')}
								/>
								{formik.touched.pictureDescription &&
									formik.errors.pictureDescription && (
										<p data-cy="description-error" className="text-red-500">
											{formik.errors.pictureDescription}
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
									data-cy="pictureType"
									id="pictureType"
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
									{...formik.getFieldProps('pictureType')}
								>
									<option value="" disabled>
										Select type
									</option>
									<option value={'front'}>Front</option>
									<option value={'back'}>Back</option>
									<option value={'side'}>Side</option>
									<option value={'other'}>Other</option>
								</select>
								{formik.touched.pictureType && formik.errors.pictureType && (
									<p data-cy="type-error" className="text-red-500">
										{formik.errors.pictureType}
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
									data-cy="pictureDate"
									id="pictureDate"
									type="date"
									className="block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('pictureDate')}
								/>
								{formik.touched.pictureDate && formik.errors.pictureDate && (
									<p data-cy="date-error" className="text-red-500">
										{formik.errors.pictureDate}
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
					Create
				</button>
			</div>
		</form>
	);
};
