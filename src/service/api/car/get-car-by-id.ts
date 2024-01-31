import { ICarImages } from './get-all-cars';

import Api from '@/service';

export const getCarById = async (id: number): Promise<ICarImages[]> => {
	try {
		const response = await Api.get(`/car/${id}`);

		return response.data.images;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
