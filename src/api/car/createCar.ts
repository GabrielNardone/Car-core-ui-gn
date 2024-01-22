import Api from '../index';

import { newCarProps } from '@/pages/admin/car/CarForm';

export const createCar = async (newCar: newCarProps) => {
	try {
		const resp = await Api.post('/car', newCar);

		console.log(resp);
	} catch (error) {
		console.log(error);
	}
};
