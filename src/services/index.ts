import axios from 'axios';

const Api = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

Api.interceptors.request.use(
	(config) => {
		const tokenGroup = localStorage.getItem('tokenGroup');

		if (tokenGroup) {
			config.headers.set(
				'Authorization',
				`Bearer ${JSON.parse(tokenGroup).AccessToken}`,
			);
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

export default Api;
