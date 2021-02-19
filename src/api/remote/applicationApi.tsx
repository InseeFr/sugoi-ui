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
			.get('/' + realm + '/applications', {
				params: { size: 500, name: name },
			})
			.then((r: any) => r.data),
	);

export const getApplication = (realm: string, name?: string): Promise<any> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/' + realm + '/applications/' + name)
			.then((r: any) => r.data),
	);

export const putApplication = (realm: string, app: Application): Promise<any> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put('/' + realm + '/applications/' + app.name, app)
			.then((r: any) => r.data),
	);
