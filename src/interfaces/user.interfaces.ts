export enum UserRole {
	CLIENT = 'client',
	ADMIN = 'admin',
}
export interface IDocument {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	url: string;
	src: string;
	description: string;
	title: string;
	user: IUser;
}

export interface IUser {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	firstName: string;
	lastName: string;
	dob: Date;
	email: string;
	address: string;
	country: string;
	role: UserRole;
	externalId: string;
	document?: IDocument[];
}

export interface ICreateUserDto {
	firstName: string;
	lastName: string;
	dob: Date;
	email: string;
	address: string;
	country: string;
	role: UserRole;
}

export interface IEditUserDto {
	firstName?: string;
	lastName?: string;
	dob?: Date;
	email?: string;
	address?: string;
	country?: string;
	role?: UserRole;
}
