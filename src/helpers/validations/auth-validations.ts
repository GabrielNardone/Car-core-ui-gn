import * as yup from 'yup';

export const loginSchema = yup.object({
	email: yup
		.string()
		.email('The email must have a valid format')
		.required('Required'),
	password: yup
		.string()
		.required('Required')
		.min(8, 'At least (8) characters')
		.max(20, 'Maximum (20) characters')
		.matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
			message: 'Uppercase, lowercase and a number required',
		}),
});

export const registerSchema = yup.object({
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
	email: yup
		.string()
		.email('The email must have a valid format')
		.required('Required'),
	password: yup
		.string()
		.required('Required')
		.min(8, 'At least (8) characters')
		.max(20, 'Maximum (20) characters')
		.matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
			message: 'Uppercase, lowercase and a number required',
		}),
	dob: yup.string().required('Required'),
	address: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(120, 'Maximum (120) characters'),
	country: yup
		.string()
		.required('Required')
		.min(3, 'At least (3) characters')
		.max(21, 'Maximum (21) characters'),
});

export const forgotPasswordSchema = yup.object({
	email: yup
		.string()
		.email('The email must have a valid format')
		.required('Required'),
});

export const changePasswordSchema = yup.object({
	email: yup
		.string()
		.email('The email must have a valid format')
		.required('Required'),
	confirmationCode: yup
		.string()
		.required('Required')
		.min(6, 'At least (6) characters')
		.max(6, 'Maximum (6) characters'),
	newPassword: yup
		.string()
		.required('Required')
		.min(8, 'At least (8) characters')
		.max(20, 'Maximum (20) characters')
		.matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
			message: 'Uppercase, lowercase and a number required',
		}),
});
