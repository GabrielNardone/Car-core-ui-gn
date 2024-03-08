import { ICar } from './car.interfaces';
import { IUser } from './user.interfaces';

export interface IRent {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	pricePerDay: number;
	startingDate: Date;
	endDate: Date;
	dueDate: Date;
	car: ICar;
	user: IUser;
	admin: IUser;
	rejected: boolean;
	acceptedDate?: Date;
}

export interface INewRentDto {
	pricePerDay: number;
	startingDate: Date | undefined;
	endDate: Date | undefined;
	dueDate: Date | undefined;
	car: number;
	user: number;
	admin: number;
	rejected: boolean;
}

export interface IEditRentDto {
	pricePerDay?: number;
	startingDate?: Date;
	endDate?: Date;
	dueDate?: Date;
	car?: ICar;
	user?: IUser;
	admin?: IUser;
	rejected?: boolean;
	acceptedDate?: Date;
}
