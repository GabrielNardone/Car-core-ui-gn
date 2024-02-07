import { AxiosError } from 'axios';

import Api from '../../index';
import { ICarPicture } from '../picture/picture';

import { CAR_ERRORS_MESSAGES } from '@/errors/car-errors-messages.enum';

const RESOURCE = 'car';

export interface ICar {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	brand: string;
	model: string;
	color: string;
	passengers: number;
	ac: boolean;
	pricePerDay: number;
	images: ICarPicture[];
}

export interface INewCarDto {
	brand: string;
	model: string;
	color: string;
	passengers: number;
	ac: boolean | string;
	pricePerDay: number;
}

interface IEditCarDto {
	brand?: string;
	model?: string;
	color?: string;
	passengers?: number;
	ac?: boolean | string;
	pricePerDay?: number;
}

export const getAllCars = async (): Promise<ICar[]> => {
	try {
		const { data } = await Api.get(`/${RESOURCE}`);

		return data;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(CAR_ERRORS_MESSAGES.GET_ALL_CARS_ERROR);
	}
};

export const getCarById = async (id: number): Promise<ICar> => {
	try {
		const { data } = await Api.get(`/${RESOURCE}/${id}`);

		return data;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(CAR_ERRORS_MESSAGES.GET_CAR_BY_ID_ERROR);
	}
};

export const createCar = async (newCar: INewCarDto): Promise<number> => {
	try {
		const {
			data: { id },
		} = await Api.post(`/${RESOURCE}`, newCar);

		return id;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(CAR_ERRORS_MESSAGES.CREATE_CAR_ERROR);
	}
};

export const editCar = async (
	id: number,
	car: IEditCarDto,
): Promise<number> => {
	try {
		const { status } = await Api.patch(`/${RESOURCE}/${id}`, car);

		return status;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(CAR_ERRORS_MESSAGES.EDIT_CAR_ERROR);
	}
};

export const deleteCar = async (id: number): Promise<boolean> => {
	try {
		const { data } = await Api.delete(`/${RESOURCE}/${id}`);

		return data;
	} catch (error: unknown) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(CAR_ERRORS_MESSAGES.DELETE_CAR_ERROR);
	}
};