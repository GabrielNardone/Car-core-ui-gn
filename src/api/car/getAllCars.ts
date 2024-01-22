import Api from '../index';

export const getAllCars = async () => {
	try {
		const resp = Api.get('/car');

		return resp;
	} catch (error) {
		console.log(error);
	}
};
