import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';

export const getRemoteRealms = () =>
	getAuthClient().then((client: AxiosInstance) =>
		client.get('/realms').then((r: any) => r.data),
	);

export const getRemoteUsers = (domain: string) =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/' + domain + '/users', { params: { size: 500 } })
			.then((r: any) => r.data.results),
	);

export const getRemoteUser = (id: string, domain: string) =>
	getAuthClient().then((client: AxiosInstance) =>
		client.get('/' + domain + '/user/' + id).then((r: any) => r.data),
	);
