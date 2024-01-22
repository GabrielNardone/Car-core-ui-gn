import { useState } from 'react';

export const useForm = <T>(initialForm: T) => {
	const [formState, setFormState] = useState(initialForm);

	const onInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const onNumberInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = event.target;
		setFormState({
			...formState,
			[name]: parseInt(value),
		});
	};

	const onSelectBooleanChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const { name, value } = event.target;

		if (value === 'true') {
			setFormState({
				...formState,
				[name]: true,
			});
		} else {
			setFormState({
				...formState,
				[name]: false,
			});
		}
	};

	const onResetForm = () => {
		setFormState(initialForm);
	};

	return {
		formState,
		onSelectBooleanChange,
		onNumberInputChange,
		onInputChange,
		onResetForm,
		...formState,
	};
};
