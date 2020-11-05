import axios from 'axios';
import { configWrapper } from './utils';

const clientConfig = (config: any) => {
	return {
		...config,
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
	};
};

const getClient = () =>
	configWrapper((resp: any) => {
		const client = axios.create({
			baseURL: resp.api,
		});
		client.interceptors.request.use(
			async (config) => {
				try {
					return Promise.resolve(clientConfig(config));
				} catch (e) {}
			},
			(err) => {
				return Promise.reject(err);
			},
		);

		client.interceptors.response.use(
			(response) => response,
			(error) => Promise.reject(error),
		);
		return client;
	});

export default getClient;
