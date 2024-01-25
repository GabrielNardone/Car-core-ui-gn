import { ArrowUturnLeftIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { createCar } from '@/api/car/createCar';

const newCar = {
	brand: '',
	model: '',
	color: '',
	passengers: 1,
	ac: false,
	pricePerDay: 0,
};

export const CarForm = () => {
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: newCar,
		validationSchema: yup.object({
			brand: yup.string().required('Required').min(3).max(21),
			model: yup.string().required('Required').min(3).max(21),
			color: yup.string().required('Required').min(3).max(21),
			passengers: yup.number().required('Required'),
			ac: yup.boolean().required('Required'),
			pricePerDay: yup.number().required('Required'),
		}),
		onSubmit: (values) => {
			console.log(values);
			createCar(values);
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

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
							</div>
						</div>
					</div>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="col-span-full">
							{/* <label className="block text-sm font-medium leading-6 text-white">
								Pictures
							</label> */}
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
								<div className="text-center">
									<PhotoIcon
										className="mx-auto h-12 w-12 text-gray-500"
										aria-hidden="true"
									/>
									<div className="mt-4 flex text-sm leading-6 text-gray-400">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
										>
											<span>Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												className="sr-only"
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs leading-5 text-gray-400">
										PNG, JPG, GIF up to 10MB
									</p>
								</div>
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
					className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Create
				</button>
			</div>
		</form>
	);
};
