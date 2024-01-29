import Api from '@/service';

export const uploadCarPicture = async (
	id: number,
	file: FormData,
): Promise<number> => {
	try {
		const response = await Api.post(`/picture/car/${id}`, file, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});

		return response.status;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
