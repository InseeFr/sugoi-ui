import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import Application from '../../model/api/application';
import { Pageable } from '../../model/api/pageable';

export const getApplications = (
	realm: string,
	name?: string,
): Promise<Pageable> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/applications', {
				params: { size: 500, name: name },
			})
			.then((r: any) => r.data),
	);

export const getApplication = (realm: string, name?: string): Promise<any> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/applications/' + name)
			.then((r: any) => r.data),
	);

export const putApplication = (realm: string, app: Application): Promise<any> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put('/realms/' + realm + '/applications/' + app.name, app)
			.then((r: any) => r.data),
	);

export const postApplication = (
	realm: string,
	app: Application,
): Promise<any> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post('/realms/' + realm + '/applications', app)
			.then((r: any) => r.data),
	);

export const deleteApplication = (realm: string, app: string): Promise<any> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete('/realms/' + realm + '/applications/' + app)
			.then((r: any) => r.data),
	);
