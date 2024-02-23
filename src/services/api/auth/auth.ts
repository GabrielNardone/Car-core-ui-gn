import { AxiosError } from 'axios';

import { IUser } from '../user/user';

import { AUTH_ERRORS_MESSAGES } from '@/errors/auth-errors-messages.enum';
import Api from '@/services';

interface ILoginDto {
	email: string;
	password: string;
}

interface ISignUpDto {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	dob: string;
	address: string;
	country: string;
}

interface IForgotPasswordDto {
	email: string;
}

interface IConfirmPasswordDto {
	email: string;
	confirmationCode: string;
	newPassword: string;
}

interface ITokenGroup {
	AccessToken?: string;
	IdToken?: string;
	RefreshToken?: string;
}

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
		console.log(data);

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
