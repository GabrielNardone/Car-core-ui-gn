import Api from '../index';

interface imagesProps {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	src: string;
	description: string;
	title: string;
	type: string;
	date: Date;
}

export interface Cars {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	brand: string;
	model: string;
	color: string;
	passengers: number;
	ac: boolean;
	pricePerDay: number;
	images: imagesProps[];
}

export const getAllCars = async (): Promise<Cars[]> => {
	try {
		const resp = await Api.get('/car');

		return resp.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};
