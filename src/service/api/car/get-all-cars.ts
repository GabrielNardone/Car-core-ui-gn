import Api from '../../index';

export interface ICarImages {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	src: string;
	description: string;
	title: string;
	type: string;
	date: Date;
}

export interface ICars {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	brand: string;
	model: string;
	color: string;
	passengers: number;
	ac: boolean;
	pricePerDay: number;
	images: ICarImages[];
}

export const getAllCars = async (): Promise<ICars[]> => {
	try {
		const response = await Api.get('/car');

		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
