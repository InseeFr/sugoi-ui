import { AxiosInstance } from 'axios';
import { getClient } from '../../configuration/axios-configuration';
import Application from '../../model/api/application';
import { Pageable } from '../../model/api/pageable';

export const getApplications = (token?: string) => (
	realm: string,
	name?: string,
): Promise<Pageable> =>
	getClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/applications', {
				params: { size: 500, name: name },
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const getApplication = (token?: string) => (
	realm: string,
	name?: string,
): Promise<any> =>
	getClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/applications/' + name, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const putApplication = (token?: string) => (
	realm: string,
	app: Application,
): Promise<any> =>
	getClient().then((client: AxiosInstance) =>
		client
			.put('/realms/' + realm + '/applications/' + app.name, app, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const postApplication = (token?: string) => (
	realm: string,
	app: Application,
): Promise<any> =>
	getClient().then((client: AxiosInstance) =>
		client
			.post('/realms/' + realm + '/applications', app, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);

export const deleteApplication = (token?: string) => (
	realm: string,
	app: string,
): Promise<any> =>
	getClient().then((client: AxiosInstance) =>
		client
			.delete('/realms/' + realm + '/applications/' + app, {
				headers: { Authorization: 'bearer ' + token },
			})
			.then((r: any) => r.data),
	);
