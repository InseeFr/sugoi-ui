import axios from 'axios';
import { configWrapper } from './utils';
import { AxiosInstance } from 'axios';

export const getClient = (): Promise<AxiosInstance> => {
	return configWrapper((resp: any) => {
		const client = axios.create({
			baseURL: resp.api,
		});
		return client;
	});
};
