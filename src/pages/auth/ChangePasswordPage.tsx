import { ArrowUturnLeftIcon } from '@heroicons/react/24/solid';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { AuthLayout } from './AuthLayout';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { changePasswordSchema } from '@/helpers/validations/auth-validations';
import { changePassword } from '@/services/api/auth/auth';

interface IChangePasswordState {
	email: string;
	confirmationCode: string;
	newPassword: string;
}

const INITIAL_CHANGE_PASSWORD_STATE: IChangePasswordState = {
	email: '',
	confirmationCode: '',
	newPassword: '',
};
export const ChangePasswordPage = () => {
	const navigate = useNavigate();

	const handleSubmit = async (values: IChangePasswordState) => {
		try {
			await changePassword(values);
			notifyStatus(
				NOTIFICATION_TYPE.SUCCESS,
				'change-password-success-alert',
				'Password changed successfully!',
			);
			navigate('/login');
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'change-password-error-alert',
					error.message,
				);
			}
		}
	};

	const formik = useFormik({
		initialValues: INITIAL_CHANGE_PASSWORD_STATE,
		validationSchema: changePasswordSchema,
		onSubmit: async (values) => {
			await handleSubmit(values);
		},
	});

	return (
		<AuthLayout
			title="Change your password"
			subtitle="Use the confirmation code we sent to your email"
			img="/auth/confirmation-password-image.svg"
		>
			<form
				onSubmit={formik.handleSubmit}
				noValidate
				data-cy="change-password-form"
				className="w-full mt-10 grid grid-cols-1 gap-y-8"
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
							data-cy="change-password-email"
							id="email"
							type="email"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email && (
							<p
								data-cy="change-password-email-error"
								className="text-red-500 text-sm"
							>
								{formik.errors.email}
							</p>
						)}
					</div>
				</div>
				<div>
					<label
						htmlFor="confirmationCode"
						className="block text-sm font-medium leading-6 "
					>
						Confirmation Code
					</label>
					<div className="mt-2">
						<input
							data-cy="change-password-confirmation-code"
							id="confirmationCode"
							type="confirmationCode"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('confirmationCode')}
						/>
						{formik.touched.confirmationCode &&
							formik.errors.confirmationCode && (
								<p
									data-cy="change-password-confirmation-code-error"
									className="text-red-500 text-sm"
								>
									{formik.errors.confirmationCode}
								</p>
							)}
					</div>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium leading-6 "
					>
						New Password
					</label>
					<div className="mt-2">
						<input
							data-cy="change-password-password"
							id="newPassword"
							type="newPassword"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('newPassword')}
						/>
						{formik.touched.newPassword && formik.errors.newPassword && (
							<p
								data-cy="change-password-password-error"
								className="text-red-500 text-sm"
							>
								{formik.errors.newPassword}
							</p>
						)}
					</div>
				</div>
				<div className="flex justify-between items-center">
					<button
						data-cy="change-password-submit-button"
						type="submit"
						className="px-6 py-2 rounded-md bg-blue-700 text-white"
					>
						Enter
					</button>
					<button
						data-cy="change-password-back-button"
						onClick={() => navigate('/login')}
						type="button"
					>
						<ArrowUturnLeftIcon className="w-6 hover:text-blue-700" />
					</button>
				</div>
			</form>
		</AuthLayout>
	);
};
