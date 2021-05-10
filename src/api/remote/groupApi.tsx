import { AxiosInstance } from 'axios';
import { getClient } from '../../configuration/axios-configuration';
import { Group } from '../../model/api/group';

export const getGroups = (token?: string) => (
	realm: string,
	application: string,
): Promise<Group[]> =>
	getClient().then((client: AxiosInstance) =>
		client
			.get(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/',
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const getGroup = (token?: string) => (
	realm: string,
	application: string,
	group: string,
): Promise<Group> =>
	getClient().then((client: AxiosInstance) =>
		client
			.get(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/' +
					group,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const postGroup = (token?: string) => (
	realm: string,
	application: string,
	group: Group,
): Promise<Group> =>
	getClient().then((client: AxiosInstance) =>
		client
			.post(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/',
				group,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const putGroup = (token?: string) => (
	realm: string,
	application: string,
	group: Group,
): Promise<Group> =>
	getClient().then((client: AxiosInstance) =>
		client
			.put(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/' +
					group.name,
				group,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const deleteGroup = (token?: string) => (
	realm: string,
	application: string,
	groupId: string,
): Promise<string> =>
	getClient().then((client: AxiosInstance) =>
		client
			.delete(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/' +
					groupId,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);

export const addUserToGroup = (token?: string) => (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
): Promise<string> => {
	return getClient().then((client: AxiosInstance) =>
		client
			.put(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/' +
					groupId +
					'/members/' +
					userId,
				null,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);
};
export const deleteUserFromGroup = (token?: string) => (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
): Promise<string> =>
	getClient().then((client: AxiosInstance) =>
		client
			.delete(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/' +
					groupId +
					'/members/' +
					userId,
				{ headers: { Authorization: 'bearer ' + token } },
			)
			.then((r: any) => r.data),
	);
