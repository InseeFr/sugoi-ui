import axios, { AxiosRequestConfig } from 'axios';
import { configWrapper } from './utils';
import Store from './store-configuration';

export const getAuthClient = () => {
	return configWrapper((resp: any) => {
		const client = axios.create({
			baseURL: resp.api,
		});
		client.interceptors.request.use(
			async (config: AxiosRequestConfig) => {
				config.headers.Authorization =
					'Bearer ' + Store.getState().user.access_token;
				return config;
			},
			(err) => {
				return Promise.reject(err);
			},
		);

		return client;
	});
};

export const getClient = () => {
	return configWrapper((resp: any) => {
		const client = axios.create({
			baseURL: resp.api,
		});
		return client;
	});
};
