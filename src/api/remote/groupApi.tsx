import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import { Group } from '../../model/api/group';

export const getGroups = (
	realm: string,
	application: string,
): Promise<Group[]> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/realms/' + realm + '/groups', {
				params: { application },
			})
			.then((r: any) => r.data),
	);

export const postGroup = (
	realm: string,
	application: string,
	group: Group,
): Promise<Group> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post('/realms/' + realm + '/groups', group, {
				params: { application },
			})
			.then((r: any) => r.data),
	);

export const putGroup = (
	realm: string,
	application: string,
	group: Group,
): Promise<Group> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put('/realms/' + realm + '/groups/' + group.name, group, {
				params: { application },
			})
			.then((r: any) => r.data),
	);

export const deleteGroup = (
	realm: string,
	application: string,
	groupId: string,
): Promise<string> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete('/realms/' + realm + '/groups/' + groupId, {
				params: { application },
			})
			.then((r: any) => r.data),
	);
