import Swal from 'sweetalert2';

import { ICarImages, createCar } from '@/service/api/car/car-requests';
import { uploadCarPicture } from '@/service/api/picture/picture-requests';

interface IFormData {
	picture: any;
	title: string;
	description: string;
	type: string;
	date: string;
}

interface ICarDto {
	brand: string;
	model: string;
	color: string;
	passengers: string;
	ac: boolean | string;
	pricePerDay: number;
	picture: any;
	title: string;
	description: string;
	type: string;
	date: string;
}

export const fileUpload = async (
	id: number,
	values: IFormData,
	message: string,
): Promise<ICarImages> => {
	const formData = new FormData();
	formData.append('file', values.picture);
	formData.append('title', values.title);
	formData.append('description', values.description);
	formData.append('type', values.type);
	formData.append('date', values.date);

	try {
		const response = await uploadCarPicture(id, formData);

		if (response.status === 201) {
			Swal.fire({
				position: 'top-end',
				icon: 'success',
				title: `<span data-cy="create-car-success">${message}</span>`,
				showConfirmButton: false,
				timer: 2500,
				background: '#000000',
				color: '#F0F0F0',
			});
		}

		return response.data;
	} catch (error: unknown) {
		console.log(error);
		Swal.fire({
			icon: 'error',
			title: `<span data-cy="create-picture-error-alert">${error}</span>`,
			background: '#000000',
			color: '#F0F0F0',
		});
		throw error;
	}
};

export const onCreateCar = async (values: ICarDto): Promise<void> => {
	try {
		const id = await createCar({
			brand: values.brand,
			model: values.model,
			color: values.color,
			pricePerDay: Number(values.pricePerDay),
			passengers: Number(values.passengers),
			ac: values.ac === 'true' ? true : false,
		});
		fileUpload(
			id,
			{
				picture: values.picture[0],
				title: values.title,
				description: values.description,
				type: values.type,
				date: values.date,
			},
			`Car with id ${id} created!`,
		);
	} catch (error: unknown) {
		console.log(error);
		Swal.fire({
			icon: 'error',
			title: `<span data-cy="create-car-error-alert">${error}</span>`,
			background: '#000000',
			color: '#F0F0F0',
		});
	}
};
