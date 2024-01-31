import Api from '@/service';

export const deletePicture = async (id: number): Promise<boolean> => {
	try {
		const response = await Api.delete(`/picture/${id}`);
		console.log(response);

		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
