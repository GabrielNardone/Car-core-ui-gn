import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import { AuthLayout } from './AuthLayout';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { forgotPasswordSchema } from '@/helpers/validations/auth-validations';
import { forgotPassword } from '@/services/api/auth/auth';

export const ForgotPasswordPage = () => {
	const handleSubmit = async (values: { email: string }) => {
		try {
			await forgotPassword(values);
			notifyStatus(
				NOTIFICATION_TYPE.SUCCESS,
				'forgot-password-success-alert',
				`We have sent a confirmation code to ${values.email}!`,
			);
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'forgot-password-error-alert',
					error.message,
				);
			}
		}
	};

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: forgotPasswordSchema,
		onSubmit: async (values) => {
			await handleSubmit(values);
		},
	});
	return (
		<AuthLayout
			title="Forgot your password?"
			subtitle="Write the email with which you registered and we will send you a confirmation code to change your password."
			img="/auth/forgot-password.svg"
		>
			<form
				onSubmit={formik.handleSubmit}
				noValidate
				data-cy="forgot-password-form"
				className="w-full mt-6 grid grid-cols-1 gap-y-8"
			>
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-medium leading-6 "
					>
						Email
					</label>
					<div className="mt-2">
						<input
							data-cy="forgot-password-email"
							id="email"
							type="email"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email && (
							<p
								data-cy="forgot-password-email-error"
								className="text-red-500 text-sm"
							>
								{formik.errors.email}
							</p>
						)}
					</div>
				</div>
				<div className="flex justify-between">
					<button
						data-cy="forgot-password-submit-button"
						type="submit"
						className="px-6 py-2 rounded-md bg-blue-700 text-white"
					>
						Send
					</button>
					<Link
						data-cy="forgot-password-change-password-link"
						to={'/change-password'}
						className="px-6 py-2 rounded-md bg-indigo-700 text-white"
					>
						Change Password
					</Link>
					<Link
						data-cy="forgot-password-login-link"
						to={'/login'}
						className="px-6 py-2 rounded-md bg-blue-700 text-white"
					>
						Login
					</Link>
				</div>
			</form>
		</AuthLayout>
	);
};
