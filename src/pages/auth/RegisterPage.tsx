import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { AuthLayout } from './AuthLayout';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { registerSchema } from '@/helpers/validations/auth-validations';
import { register } from '@/services/api/auth/auth';

interface IRegisterState {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	dob: string;
	address: string;
	country: string;
}

const INITIAL_REGISTER_STATE: IRegisterState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	dob: '',
	address: '',
	country: '',
};
export const RegisterPage = () => {
	const navigate = useNavigate();

	const handleSubmit = async (values: IRegisterState) => {
		try {
			await register(values);
			notifyStatus(
				NOTIFICATION_TYPE.SUCCESS,
				'register-success-alert',
				`User ${values.firstName} ${values.lastName} registered successfully!`,
			);
			navigate('/login');
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'register-error-alert',
					error.message,
				);
			}
		}
	};

	const formik = useFormik({
		initialValues: INITIAL_REGISTER_STATE,
		validationSchema: registerSchema,
		onSubmit: async (values) => {
			await handleSubmit(values);
		},
	});
	return (
		<AuthLayout title="Register" img="register-image.svg">
			<form
				onSubmit={formik.handleSubmit}
				noValidate
				data-cy="register-form"
				className="mt-10 grid grid-cols-1 gap-y-8"
			>
				<div className="sm:col-span-3">
					<label
						htmlFor="firstName"
						className="block text-sm font-medium leading-6 "
					>
						First Name
					</label>
					<div className="mt-2">
						<input
							data-cy="register-first-name"
							id="firstName"
							type="email"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('firstName')}
						/>
						{formik.touched.firstName && formik.errors.firstName && (
							<p
								data-cy="register-first-name-error"
								className="text-sm text-red-500"
							>
								{formik.errors.firstName}
							</p>
						)}
					</div>
				</div>
				<div className="sm:col-span-3">
					<label
						htmlFor="lastName"
						className="block text-sm font-medium leading-6 "
					>
						Last Name
					</label>
					<div className="mt-2">
						<input
							data-cy="register-last-name"
							id="lastName"
							type="email"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('lastName')}
						/>
						{formik.touched.lastName && formik.errors.lastName && (
							<p
								data-cy="register-last-name-error"
								className="text-sm text-red-500"
							>
								{formik.errors.lastName}
							</p>
						)}
					</div>
				</div>
				<div className="sm:col-span-3">
					<label
						htmlFor="email"
						className="block text-sm font-medium leading-6 "
					>
						Email
					</label>
					<div className="mt-2">
						<input
							data-cy="register-email"
							id="email"
							type="email"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email && (
							<p
								data-cy="register-email-error"
								className="text-sm text-red-500"
							>
								{formik.errors.email}
							</p>
						)}
					</div>
				</div>
				<div className="sm:col-span-3">
					<label
						htmlFor="password"
						className="block text-sm font-medium leading-6 "
					>
						Password
					</label>
					<div className="mt-2">
						<input
							data-cy="register-password"
							id="password"
							type="password"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('password')}
						/>
						{formik.touched.password && formik.errors.password && (
							<p
								data-cy="register-password-error"
								className="text-sm text-red-500"
							>
								{formik.errors.password}
							</p>
						)}
					</div>
				</div>
				<div className="sm:col-span-3">
					<label htmlFor="dob" className="block text-sm font-medium leading-6">
						Birthdate
					</label>
					<div className="mt-2">
						<input
							data-cy="register-dob"
							id="dob"
							type="date"
							max={new Date().toISOString().split('T')[0]}
							min="1900-01-01"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('dob')}
						/>
						{formik.touched.dob && formik.errors.dob && (
							<p data-cy="register-dob-error" className="text-red-500">
								{formik.errors.dob}
							</p>
						)}
					</div>
				</div>
				<div className="sm:col-span-3">
					<label
						htmlFor="address"
						className="block text-sm font-medium leading-6 "
					>
						Address
					</label>
					<div className="mt-2">
						<input
							data-cy="register-address"
							id="address"
							type="email"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('address')}
						/>
						{formik.touched.address && formik.errors.address && (
							<p
								data-cy="register-address-error"
								className="text-sm text-red-500"
							>
								{formik.errors.address}
							</p>
						)}
					</div>
				</div>

				<div className="sm:col-span-3">
					<label
						htmlFor="country"
						className="block text-sm font-medium leading-6 "
					>
						Country
					</label>
					<div className="mt-2">
						<input
							data-cy="register-country"
							id="country"
							type="email"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('country')}
						/>
						{formik.touched.country && formik.errors.country && (
							<p
								data-cy="register-country-error"
								className="text-sm text-red-500"
							>
								{formik.errors.country}
							</p>
						)}
					</div>
				</div>

				<div className="flex justify-between items-start">
					<button
						data-cy="register-submit-button"
						type="submit"
						className="px-6 py-2 rounded-md bg-blue-700 text-white"
					>
						Enter
					</button>
					<div className="grid justify-end text-sm">
						<span className="text-end">Do you already have an account?</span>
						<Link
							data-cy="login-link"
							to={'/login'}
							className="text-end text-blue-700"
						>
							Login
						</Link>
					</div>
				</div>
			</form>
		</AuthLayout>
	);
};
