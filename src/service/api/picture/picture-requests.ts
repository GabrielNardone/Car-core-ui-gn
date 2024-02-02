import { AxiosError } from 'axios';

import { ICarImages } from '../car/car-requests';

import { PICTURES_ERRORS_MESSAGES } from '@/errors/pictures-errors-enum';
import Api from '@/service';

const RESOURCE = 'picture';
interface IuploadCarPicture {
	status: number;
	data: ICarImages;
}
export const uploadCarPicture = async (
	id: number,
	file: FormData,
): Promise<IuploadCarPicture> => {
	try {
		const { status, data } = await Api.post(`/${RESOURCE}/car/${id}`, file, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		return { status, data };
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(PICTURES_ERRORS_MESSAGES.CREATE_PICTURE_ERROR);
	}
};

export const deletePicture = async (id: number): Promise<boolean> => {
	try {
		const { data } = await Api.delete(`/${RESOURCE}/${id}`);

		return data;
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(error.message);
		}
		console.log(error);
		throw new Error(PICTURES_ERRORS_MESSAGES.DELETE_PICTURE_ERROR);
	}
};
