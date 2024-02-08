import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { createUserSchema } from '@/helpers/validations/user-validations';
import { ICreateUserDto, createUser } from '@/services/api/user/user';

interface INewUserState {
	firstName: string;
	lastName: string;
	dob: string;
	email: string;
	address: string;
	country: string;
	role: string;
}

const NEW_USER_INITIAL_STATE: INewUserState = {
	firstName: '',
	lastName: '',
	dob: '',
	email: '',
	address: '',
	country: '',
	role: '',
};

export const CreateUserFormPage = () => {
	const navigate = useNavigate();

	const handleSubmit = async (values: ICreateUserDto): Promise<void> => {
		try {
			await createUser({
				firstName: values.firstName,
				lastName: values.lastName,
				dob: values.dob,
				email: values.email,
				address: values.address,
				country: values.country,
				role: values.role,
			});

			notifyStatus(
				NOTIFICATION_TYPE.SUCCESS,
				'create-user-success-alert',
				`${values.firstName} ${values.lastName} created!`,
			);
		} catch (error: unknown) {
			console.log(error);
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'create-user-error-alert',
					error.message,
				);
			}
		}
	};

	const formik = useFormik({
		initialValues: NEW_USER_INITIAL_STATE,
		validationSchema: createUserSchema,
		onSubmit: (values) => {
			handleSubmit({ ...values, dob: new Date(values.dob) });
			formik.resetForm();
		},
	});

	return (
		<form
			className="flex-1 p-6"
			onSubmit={formik.handleSubmit}
			noValidate
			data-cy="create-user-form"
		>
			<div className="space-y-10">
				<div className="border-b border-white/10 pb-8">
					<div className="flex">
						<div>
							<h2 className="text-base font-semibold leading-7 text-white">
								Fill the form
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-400">
								In order to create a new user
							</p>
						</div>
						<div className="flex-1"></div>
						<button onClick={() => navigate('/admin/user')}>
							<ArrowUturnLeftIcon className="w-6 text-white" />
						</button>
					</div>
				</div>

				<div>
					<h2 className="text-base font-semibold leading-7 text-white">
						User Information
					</h2>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 border-b border-white/10 pb-8">
						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-white"
							>
								First Name
							</label>
							<div className="mt-2">
								<input
									data-cy="create-user-first-name"
									id="firstName"
									type="text"
									className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('firstName')}
								/>
								{formik.touched.firstName && formik.errors.firstName && (
									<p
										data-cy="create-user-first-name-error"
										className="text-red-500"
									>
										{formik.errors.firstName}
									</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="lastName"
								className="block text-sm font-medium leading-6 text-white"
							>
								Last Name
							</label>
							<div className="mt-2">
								<input
									data-cy="create-user-last-name"
									id="lastName"
									type="text"
									className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('lastName')}
								/>
								{formik.touched.lastName && formik.errors.lastName && (
									<p
										data-cy="create-user-last-name-error"
										className="text-red-500"
									>
										{formik.errors.lastName}
									</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-white"
							>
								Email
							</label>
							<div className="mt-2">
								<input
									data-cy="create-user-email"
									id="email"
									type="email"
									className="block w-full rounded-md border-0 bg-white/5  px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('email')}
								/>
								{formik.touched.email && formik.errors.email && (
									<p data-cy="create-user-email-error" className="text-red-500">
										{formik.errors.email}
									</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="address"
								className="block text-sm font-medium leading-6 text-white"
							>
								Address
							</label>
							<div className="mt-2">
								<input
									data-cy="create-user-address"
									type="text"
									id="address"
									className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('address')}
								/>
								{formik.touched.address && formik.errors.address && (
									<p
										data-cy="create-user-address-error"
										className="text-red-500"
									>
										{formik.errors.address}
									</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-white"
							>
								Country
							</label>
							<div className="mt-2">
								<input
									data-cy="create-user-country"
									type="text"
									id="country"
									className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('country')}
								/>
								{formik.touched.country && formik.errors.country && (
									<p
										data-cy="create-user-country-error"
										className="text-red-500"
									>
										{formik.errors.country}
									</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="dob"
								className="block text-sm font-medium leading-6 text-white"
							>
								Birthdate
							</label>
							<div className="mt-2">
								<input
									data-cy="create-user-dob"
									id="dob"
									type="date"
									max={new Date().toISOString().split('T')[0]}
									min="1900-01-01"
									className="block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('dob')}
								/>
								{formik.touched.dob && formik.errors.dob && (
									<p data-cy="create-user-dob-error" className="text-red-500">
										{formik.errors.dob}
									</p>
								)}
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="role"
								className="block text-sm font-medium leading-6 text-white"
							>
								Role
							</label>
							<div className="mt-2">
								<select
									data-cy="create-user-role"
									id="role"
									className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 [&_*]:text-black"
									{...formik.getFieldProps('role')}
								>
									<option value="" disabled>
										Select role
									</option>
									<option value={'client'}>Client</option>
									<option value={'admin'}>Admin</option>
								</select>
								{formik.touched.role && formik.errors.role && (
									<p data-cy="create-user-role-error" className="text-red-500">
										{formik.errors.role}
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
					data-cy="create-user-submit-button"
					className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Create
				</button>
			</div>
		</form>
	);
};
