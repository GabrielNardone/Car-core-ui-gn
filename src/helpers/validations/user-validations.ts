import * as yup from 'yup';

export const createUserSchema = yup.object({
	firstName: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	lastName: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	dob: yup.string().required('Required'),
	email: yup
		.string()
		.email('The email must have a valid format')
		.required('Required'),
	address: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(120, 'Maximum (120) characters'),
	country: yup.string().required('Required'),
	role: yup.string().required('Required'),
});

export const editUserSchema = yup.object({
	firstName: yup
		.string()
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	lastName: yup
		.string()
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
	dob: yup.string(),
	email: yup.string().email('The email must have a valid format'),
	address: yup
		.string()
		.min(3, 'At least (3) characters')
		.max(120, 'Maximum (120) characters'),
	country: yup.string(),
	role: yup.string(),
});
