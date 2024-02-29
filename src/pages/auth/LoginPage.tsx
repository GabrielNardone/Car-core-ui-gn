import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import { loginSchema } from '../../helpers/validations/auth-validations';
import { AuthLayout } from './AuthLayout';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { useAuthContext } from '@/hooks/useAuthContext';
import { login } from '@/services/api/auth/auth';

interface ILoginState {
	email: string;
	password: string;
}

const INITIAL_LOGIN_STATE: ILoginState = {
	email: '',
	password: '',
};
export const LoginPage = () => {
	const navigate = useNavigate();
	const { setSession } = useAuthContext();
	const handleSubmit = async (values: ILoginState) => {
		try {
			const tokenGroup = await login(values);
			setSession(tokenGroup);
			navigate('/');
			location.reload();
		} catch (error) {
			if (error instanceof Error) {
				notifyStatus(
					NOTIFICATION_TYPE.ERROR,
					'login-error-alert',
					error.message,
				);
			}
		}
	};

	const formik = useFormik({
		initialValues: INITIAL_LOGIN_STATE,
		validationSchema: loginSchema,
		onSubmit: async (values) => {
			await handleSubmit(values);
		},
	});

	return (
		<AuthLayout title="Login">
			<form
				onSubmit={formik.handleSubmit}
				noValidate
				data-cy="login-form"
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
							data-cy="login-email"
							id="email"
							type="email"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('email')}
						/>
						{formik.touched.email && formik.errors.email && (
							<p data-cy="login-email-error" className="text-red-500 text-sm">
								{formik.errors.email}
							</p>
						)}
					</div>
				</div>
				<div>
					<label
						htmlFor="password"
						className="block text-sm font-medium leading-6 "
					>
						Password
					</label>
					<div className="mt-2">
						<input
							data-cy="login-password"
							id="password"
							type="password"
							className="block w-full rounded-md bg-white px-1 py-1.5 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-1 sm:text-sm sm:leading-6"
							{...formik.getFieldProps('password')}
						/>
						{formik.touched.password && formik.errors.password && (
							<p
								data-cy="login-password-error"
								className="text-red-500 text-sm"
							>
								{formik.errors.password}
							</p>
						)}
					</div>
				</div>
				<div className="flex justify-between items-start">
					<button
						data-cy="login-submit-button"
						type="submit"
						className="px-6 py-2 rounded-md bg-blue-700 text-white"
					>
						Enter
					</button>
					<div className="grid justify-end text-sm">
						<Link
							data-cy="register-link"
							to={'/register'}
							className="text-end text-blue-700"
						>
							Create an account
						</Link>
						<Link
							data-cy="forgot-password-link"
							to={'/forgot-password	'}
							className="text-end text-violet-700 underline"
						>
							Forgot your password?
						</Link>
					</div>
				</div>
			</form>
		</AuthLayout>
	);
};
