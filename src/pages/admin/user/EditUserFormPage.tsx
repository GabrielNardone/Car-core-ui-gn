import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { editUserSchema } from '@/helpers/validations/user-validations';
import { IEditUserDto, IUser } from '@/interfaces/user.interfaces';
import { editUser, getUserById } from '@/services/api/user/user';

type IEditUserState = IEditUserDto;

export const EditUserFormPage = () => {
	const [user, setUser] = useState<IUser>({} as IUser);
	const navigate = useNavigate();
	const { id } = useParams();

	const userId = Number(id);

	const EDIT_USER_INITIAL_STATE: IEditUserState = {
		firstName: user?.firstName || '',
		lastName: user?.lastName || '',
		dob: user.dob || '',
		email: user?.email || '',
		address: user?.address || '',
		country: user?.country || '',
		role: user?.role || '',
	};

	const handleSubmit = async (values: IEditUserDto) => {
		try {
			await editUser(userId, {
				firstName: values.firstName || user.firstName,
				lastName: values.lastName || user.lastName,
				dob: values.dob || user.dob,
				email: values.email || user.email,
				address: values.address || user.address,
				country: values.country || user.country,
				role: values.role || user.role,
			});
			setUser({ ...user, ...values });
			notifyStatus(
				NOTIFICATION_TYPE.SUCCESS,
				'edit-user-success-alert',
				`User with ID ${userId} edited!`,
			);
		} catch (error: unknown) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'edit-user-error-alert',
					error.message,
				);
			}
		}
	};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: EDIT_USER_INITIAL_STATE,
		validationSchema: editUserSchema,
		onSubmit: async (values) => {
			await handleSubmit({ ...values, dob: values.dob });
			formik.resetForm();
		},
	});

	useEffect(() => {
		const fetchUser = async (): Promise<void> => {
			try {
				const user = await getUserById(userId);
				setUser(user);
			} catch (error) {
				if (error instanceof Error) {
					notifyStatus(
						NOTIFICATION_TYPE.ERROR,
						'get-user-error-alert',
						error.message,
					);
				}
			}
		};
		fetchUser();
	}, [userId]);

	return (
		<form
			className="flex-1 p-6"
			onSubmit={formik.handleSubmit}
			noValidate
			data-cy="edit-user-form"
		>
			<div className="space-y-10">
				<div className="border-b border-white/10 pb-8">
					<div className="flex">
						<div>
							<h2 className="text-base font-semibold leading-7 text-white">
								Fill the fields with new information
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-400">
								And leave the other with the previous information
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
						{user.firstName} {user.lastName} Information (ID {userId})
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
									data-cy="edit-user-first-name"
									id="firstName"
									type="text"
									className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('firstName')}
								/>
								{formik.touched.firstName && formik.errors.firstName && (
									<p
										data-cy="edit-user-first-name-error"
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
									data-cy="edit-user-last-name"
									id="lastName"
									type="text"
									className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('lastName')}
								/>
								{formik.touched.lastName && formik.errors.lastName && (
									<p
										data-cy="edit-user-last-name-error"
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
									data-cy="edit-user-email"
									id="email"
									type="email"
									className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('email')}
								/>
								{formik.touched.email && formik.errors.email && (
									<p data-cy="edit-user-email-error" className="text-red-500">
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
									data-cy="edit-user-address"
									type="text"
									id="address"
									className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('address')}
								/>
								{formik.touched.address && formik.errors.address && (
									<p data-cy="edit-user-address-error" className="text-red-500">
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
									data-cy="edit-user-country"
									type="text"
									id="country"
									className="block w-full rounded-md border-0 bg-white/5 px-1 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('country')}
								/>
								{formik.touched.country && formik.errors.country && (
									<p data-cy="edit-user-country-error" className="text-red-500">
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
									data-cy="edit-user-dob"
									id="dob"
									type="date"
									max={new Date().toISOString().split('T')[0]}
									min="1900-01-01"
									data-dateformat="dd-mm-yyyy"
									className="block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
									{...formik.getFieldProps('dob')}
								/>
								{formik.touched.dob && formik.errors.dob && (
									<p data-cy="edit-user-dob-error" className="text-red-500">
										{formik.errors.dob as string}
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
									data-cy="edit-user-role"
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
									<p data-cy="edit-user-role-error" className="text-red-500">
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
					disabled={formik.values === EDIT_USER_INITIAL_STATE}
					type="submit"
					className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				>
					Update
				</button>
			</div>
		</form>
	);
};
