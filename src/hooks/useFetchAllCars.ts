import { useQuery } from '@tanstack/react-query';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { getAllCars } from '@/services/api/car/car';

export const useFetchAllCars = () => {
	const {
		data: cars,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['cars'],
		queryFn: getAllCars,
		retry: false,
	});

	if (isError) {
		notifyStatus(
			NOTIFICATION_TYPE.ERROR,
			'home-get-all-cars-error-alert',
			error.message,
		);
	}

	return {
		cars,
		isLoading,
		isError,
	};
};
