import { AxiosError } from 'axios';

import { AUTH_ERRORS_MESSAGES } from '@/errors/auth-errors-messages.enum';
import {
	IConfirmPasswordDto,
	IForgotPasswordDto,
	ILoginDto,
	ISignUpDto,
	ITokenGroup,
} from '@/interfaces/auth.interfaces';
import { IUser } from '@/interfaces/user.interfaces';
import Api from '@/services';

export const register = async (signUpDto: ISignUpDto): Promise<IUser> => {
	try {
		const { data } = await Api.post('/auth/sign-up', signUpDto);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		throw new Error(AUTH_ERRORS_MESSAGES.REGISTER_ERROR);
	}
};
export const login = async (loginDto: ILoginDto): Promise<ITokenGroup> => {
	try {
		const { data } = await Api.post('/auth/sign-in', loginDto);

		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(AUTH_ERRORS_MESSAGES.LOGIN_ERROR);
	}
};

export const forgotPassword = async (
	forgotPasswordDto: IForgotPasswordDto,
): Promise<string> => {
	try {
		const { data } = await Api.post('/auth/forgot-password', forgotPasswordDto);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(AUTH_ERRORS_MESSAGES.FORGOT_PASSWORD_ERROR);
	}
};

export const changePassword = async (
	confirmPasswordDto: IConfirmPasswordDto,
): Promise<boolean> => {
	try {
		const { data } = await Api.post(
			'/auth/confirm-password',
			confirmPasswordDto,
		);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(AUTH_ERRORS_MESSAGES.CONFIRM_PASSWORD_ERROR);
	}
};
