import { FormikValues } from 'formik';
import * as yup from 'yup';

export const createCarSchema = yup.object({
	brand: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	model: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	color: yup.string().required('Required'),
	passengers: yup.number().required('Required'),
	ac: yup.boolean().required('Required'),
	pricePerDay: yup
		.number()
		.required('Required')
		.positive('Must be a positive number'),
	picture: yup
		.mixed()
		.required('Required')
		.test(
			'fileFormat',
			'Only JPG, JPEG and PNG files are allowed',
			(value: FormikValues) => {
				if (value) {
					const supportedFormats = ['jpg', 'jpeg', 'png'];
					return supportedFormats.includes(value[0].name.split('.').pop());
				}
				return true;
			},
		),
	title: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	description: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(120, 'Maximum (120) characters'),
	type: yup.string().required('Required'),
	date: yup.string().required('Required'),
});

export const editCarSchema = yup.object({
	brand: yup
		.string()
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	model: yup
		.string()
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	color: yup.string(),
	passengers: yup.number(),
	ac: yup.boolean(),
	pricePerDay: yup.number().positive('Must be a positive number'),
});

export const createPictureSchema = yup.object({
	picture: yup.mixed().required('Required'),
	title: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	description: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(120, 'Maximum (120) characters'),
	type: yup.string().required('Required'),
	date: yup.string().required('Required'),
});
