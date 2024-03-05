import { AxiosError } from 'axios';

import { RENT_ERRORS_MESSAGES } from '@/errors/rent-error-messages.enum';
import { ICar } from '@/interfaces/car.interfaces';
import { IUser } from '@/interfaces/user.interfaces';
import Api from '@/services';

const RESOURCE = 'rent';

export interface IRent {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	pricePerDay: number;
	startingDate: Date;
	endDate: Date;
	dueDate: Date;
	car: ICar;
	user: IUser;
	admin: IUser;
	rejected: boolean;
	acceptedDate?: Date;
}

export interface INewRentDto {
	pricePerDay: number;
	startingDate: Date | undefined;
	endDate: Date | undefined;
	dueDate: Date | undefined;
	car: number;
	user: number;
	admin: number;
	rejected: boolean;
}

export interface IEditRentDto {
	pricePerDay?: number;
	startingDate?: Date;
	endDate?: Date;
	dueDate?: Date;
	car?: ICar;
	user?: IUser;
	admin?: IUser;
	rejected?: boolean;
	acceptedDate?: Date;
}

export const getAllRents = async (): Promise<IRent[]> => {
	try {
		const { data } = await Api.get(`/${RESOURCE}`);
		console.log(data);

		return data;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(RENT_ERRORS_MESSAGES.GET_ALL_RENTS_ERROR);
	}
};

export const getRentById = async (id: number): Promise<IRent> => {
	try {
		const { data } = await Api.get(`/${RESOURCE}/${id}`);

		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(RENT_ERRORS_MESSAGES.GET_RENT_BY_ID_ERROR);
	}
};

export const createRent = async (newRent: INewRentDto): Promise<number> => {
	try {
		const {
			data: { id },
		} = await Api.post(`/${RESOURCE}`, newRent);
		return id;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(RENT_ERRORS_MESSAGES.CREATE_RENT_ERROR);
	}
};
export const editRent = async (
	id: number,
	editRent: INewRentDto,
): Promise<number> => {
	try {
		const { status } = await Api.post(`/${RESOURCE}/${id}`, editRent);
		return status;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(RENT_ERRORS_MESSAGES.EDIT_RENT_ERROR);
	}
};
export const deleteRent = async (id: number): Promise<boolean> => {
	try {
		const { data } = await Api.delete(`/${RESOURCE}/${id}`);
		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(RENT_ERRORS_MESSAGES.DELETE_RENT_ERROR);
	}
};
