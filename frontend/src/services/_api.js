import axios from "axios";
import { StatusCodes } from 'http-status-codes';

export const getApiInstance = () => {
	const apiInstance = axios.create();
	apiInstance.defaults.baseURL = `${String(process.env.REACT_APP_API_HOST || window.location.origin)}/back/api/`;
	apiInstance.defaults.headers.get.Accept = 'application/json';

	apiInstance.interceptors.request.use((config) => ({
		...config,
		headers: {
			...config.headers,
		},
	}));

	apiInstance.interceptors.response.use(
		(response) => {
			return response;
		},
		(error) => {
			if (error.response?.status === StatusCodes.UNAUTHORIZED) {
				// do something
			}
			return error.response;
		});
	return apiInstance;
}
