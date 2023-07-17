import { getAuthClient } from '../../configuration/axios-configuration';
import Application from '../../model/api/application';
import { Pageable } from '../../model/api/pageable';
import axios, { CancelTokenSource } from 'axios';

let cancelToken: CancelTokenSource | undefined = undefined;

export const getApplications = (
	realm: string,
	name?: string,
	cancelable?: boolean,
	accessToken?: string,
): Promise<Pageable> => {
	//Check if there are any previous pending requests
	if (typeof cancelToken != typeof undefined) {
		cancelToken?.cancel('Operation canceled due to new request.');
	}
	cancelToken = axios.CancelToken.source();
	return cancelable
		? getAuthClient(accessToken)
				.get('/realms/' + realm + '/applications', {
					params: { size: 500, name: name },
					cancelToken: cancelToken.token,
				})
				.then((r: any) => r.data)
		: getAuthClient(accessToken)
				.get('/realms/' + realm + '/applications', {
					params: { size: 500, name: name },
				})
				.then((r: any) => r.data);
};
export const getApplication = (
	realm: string,
	name?: string,
	accessToken?: string,
): Promise<any> =>
	getAuthClient(accessToken)
		.get('/realms/' + realm + '/applications/' + name)
		.then((r: any) => r.data);

export const putApplication = (
	realm: string,
	app: Application,
	accessToken?: string,
): Promise<any> =>
	getAuthClient(accessToken)
		.put('/realms/' + realm + '/applications/' + app.name, app)

		.then((r: any) => r.data);

export const postApplication = (
	realm: string,
	app: Application,
	accessToken?: string,
): Promise<any> =>
	getAuthClient(accessToken)
		.post('/realms/' + realm + '/applications', app)
		.then((r: any) => r.data);

export const deleteApplication = (
	realm: string,
	app: string,
	accessToken?: string,
): Promise<any> =>
	getAuthClient(accessToken)
		.delete('/realms/' + realm + '/applications/' + app)
		.then((r: any) => r.data);
