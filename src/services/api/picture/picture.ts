import { AxiosError } from 'axios';

import { PICTURES_ERRORS_MESSAGES } from '@/errors/picture-errors-messages.enum';
import {
	ICarPicture,
	ICreateCarPictureDto,
} from '@/interfaces/pictures.interfaces';
import Api from '@/services';

const RESOURCE = 'picture';
export const createCarPicture = async (
	createCarPictureDto: ICreateCarPictureDto,
): Promise<ICarPicture> => {
	try {
		const formData = new FormData();
		formData.append('file', createCarPictureDto.picture[0]);
		formData.append('title', createCarPictureDto.title);
		formData.append('description', createCarPictureDto.description);
		formData.append('type', createCarPictureDto.type);
		formData.append('date', createCarPictureDto.date);

		const { data } = await Api.post(
			`/${RESOURCE}/car/${createCarPictureDto.carId}`,
			formData,
			{
				headers: { 'Content-Type': 'multipart/form-data' },
			},
		);

		return data;
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
