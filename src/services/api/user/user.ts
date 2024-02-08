import { AxiosError } from 'axios';

import Api from '../../index';

import { USER_ERRORS_MESSAGES } from '@/errors/user-errors-enum';

const RESOURCE = 'user';
export interface IDocument {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	url: string;
	src: string;
	description: string;
	title: string;
	user: IUser;
}

export interface IUser {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	firstName: string;
	lastName: string;
	dob: Date;
	email: string;
	address: string;
	country: string;
	role: string;
	document?: IDocument[];
}

export interface ICreateUserDto {
	firstName: string;
	lastName: string;
	dob: Date;
	email: string;
	address: string;
	country: string;
	role: string;
}

export interface IEditUserDto {
	firstName?: string;
	lastName?: string;
	dob?: Date;
	email?: string;
	address?: string;
	country?: string;
	role?: string;
}

export const getAllUsers = async (): Promise<IUser[]> => {
	try {
		const response = await Api.get(`/${RESOURCE}`);

		return response.data;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(USER_ERRORS_MESSAGES.GET_ALL_USERS_ERROR);
	}
};

export const getUserById = async (id: number): Promise<IUser> => {
	try {
		const response = await Api.get(`/${RESOURCE}/${id}`);
		return response.data;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(USER_ERRORS_MESSAGES.GET_USER_BY_ID_ERROR);
	}
};

export const createUser = async (user: ICreateUserDto): Promise<number> => {
	try {
		const response = await Api.post(`/${RESOURCE}`, user);
		return response.status;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(USER_ERRORS_MESSAGES.CREATE_USER_ERROR);
	}
};

export const editUser = async (
	id: number,
	user: IEditUserDto,
): Promise<number> => {
	try {
		const response = await Api.patch(`/${RESOURCE}/${id}`, user);

		return response.status;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(USER_ERRORS_MESSAGES.EDIT_USER_ERROR);
	}
};

export const deleteUser = async (id: number): Promise<boolean> => {
	try {
		const response = await Api.delete(`/${RESOURCE}/${id}`);
		return response.data;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(USER_ERRORS_MESSAGES.DELETE_USER_ERROR);
	}
};
