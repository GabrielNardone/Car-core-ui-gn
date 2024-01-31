import Api from '@/service';

interface editCarDto {
	brand?: string;
	model?: string;
	color?: string;
	passengers?: number;
	ac?: boolean | string;
	pricePerDay?: number;
}

export const editCar = async (id: number, car: editCarDto): Promise<number> => {
	try {
		const response = await Api.patch(`/car/${id}`, car);

		return response.status;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
