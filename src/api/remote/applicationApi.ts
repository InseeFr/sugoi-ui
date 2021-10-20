import { getAuthClient } from '../../configuration/axios-configuration';
import Application from '../../model/api/application';
import { Pageable } from '../../model/api/pageable';

export const getApplications = (
	realm: string,
	name?: string,
): Promise<Pageable> =>
	getAuthClient()
		.get('/realms/' + realm + '/applications', {
			params: { size: 500, name: name },
		})
		.then((r: any) => r.data);

export const getApplication = (realm: string, name?: string): Promise<any> =>
	getAuthClient()
		.get('/realms/' + realm + '/applications/' + name)
		.then((r: any) => r.data);

export const putApplication = (realm: string, app: Application): Promise<any> =>
	getAuthClient()
		.put('/realms/' + realm + '/applications/' + app.name, app)

		.then((r: any) => r.data);

export const postApplication = (
	realm: string,
	app: Application,
): Promise<any> =>
	getAuthClient()
		.post('/realms/' + realm + '/applications', app)
		.then((r: any) => r.data);

export const deleteApplication = (realm: string, app: string): Promise<any> =>
	getAuthClient()
		.delete('/realms/' + realm + '/applications/' + app)
		.then((r: any) => r.data);
