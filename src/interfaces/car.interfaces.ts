import { ICarPicture } from './pictures.interfaces';

export interface ICar {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	brand: string;
	model: string;
	color: string;
	passengers: number;
	ac: boolean;
	pricePerDay: number;
	images: ICarPicture[];
}

export interface INewCarDto {
	brand: string;
	model: string;
	color: string;
	passengers: number;
	ac: boolean | string;
	pricePerDay: number;
}

export interface IEditCarDto {
	brand?: string;
	model?: string;
	color?: string;
	passengers?: number;
	ac?: boolean | string;
	pricePerDay?: number;
}
