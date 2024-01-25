import Api from '../../index';

interface newCarDto {
	brand: string;
	model: string;
	color: string;
	passengers: number;
	ac: boolean | string;
	pricePerDay: number;
}

export const createCar = async (newCar: newCarDto): Promise<number> => {
	try {
		const response = await Api.post('/car', newCar);

		return response.status;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
