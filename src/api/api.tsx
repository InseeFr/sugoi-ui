import { AxiosInstance } from 'axios';
import getClient from '../configuration/axios-configuration';

export const getRealms = () =>
	getClient().then((client: AxiosInstance) =>
		client.get('/config/realms').then((r: any) => r.data),
	);

export const getUsers = (domain: string) =>
	getClient().then((client: AxiosInstance) =>
		client
			.get('/' + domain + '/users', { params: { size: 500 } })
			.then((r: any) => r.data),
	);
