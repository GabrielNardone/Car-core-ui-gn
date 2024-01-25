import Api from '../index';

export interface newCarProps {
	brand: string;
	model: string;
	color: string;
	passengers: number;
	ac: boolean;
	pricePerDay: number;
}

export const createCar = async (newCar: newCarProps): Promise<void> => {
	try {
		const resp = await Api.post('/car', newCar);

		console.log(resp);
	} catch (error) {
		console.log(error);
	}
};
