import { IimagesProps } from './get-all-cars';

import Api from '@/service';

export const getCarById = async (id: number): Promise<IimagesProps[]> => {
	try {
		const response = await Api.get(`/car/${id}`);

		return response.data.images;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
