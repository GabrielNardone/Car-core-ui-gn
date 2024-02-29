export interface ICarPicture {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	src: string;
	description: string;
	title: string;
	type: string;
	date: Date;
}

export interface ICreateCarPictureDto {
	carId: number;
	picture: FileList;
	title: string;
	description: string;
	type: string;
	date: string;
}
