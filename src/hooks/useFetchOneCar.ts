import { useQuery } from '@tanstack/react-query';

import { NOTIFICATION_TYPE, notifyStatus } from '@/helpers/notifications';
import { getCarById } from '@/services/api/car/car';

export const useFetchOneCar = (carId: number) => {
	const {
		data: car,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['car', carId],
		queryFn: () => getCarById(carId),
		retry: false,
	});

	if (isError) {
		notifyStatus(
			NOTIFICATION_TYPE.ERROR,
			'detail-get-car-error-alert',
			error.message,
		);
	}

	return {
		car,
		isLoading,
		isError,
	};
};
