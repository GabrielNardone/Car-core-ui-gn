import { IimagesProps } from './get-all-cars';

import Api from '@/service';

interface IuploadCarPicture {
	status: number;
	data: IimagesProps;
}
export const uploadCarPicture = async (
	id: number,
	file: FormData,
): Promise<IuploadCarPicture> => {
	try {
		const response = await Api.post(`/picture/car/${id}`, file, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		console.log(response);

		return { status: response.status, data: response.data };
	} catch (error) {
		console.log(error);
		throw error;
	}
};
