import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import { Group } from '../../model/api/group';

export const getGroups = (
	realm: string,
	application: string,
): Promise<Group[]> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/',
			)
			.then((r: any) => r.data),
	);

export const getGroup = (
	realm: string,
	application: string,
	group: string,
): Promise<Group> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/' +
					group,
			)
			.then((r: any) => r.data),
	);

export const postGroup = (
	realm: string,
	application: string,
	group: Group,
): Promise<Group> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.post(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/',
				group,
			)
			.then((r: any) => r.data),
	);

export const putGroup = (
	realm: string,
	application: string,
	group: Group,
): Promise<Group> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.put(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/' +
					group.name,
				group,
			)
			.then((r: any) => r.data),
	);

export const deleteGroup = (
	realm: string,
	application: string,
	groupId: string,
): Promise<string> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.delete(
				'/realms/' +
					realm +
					'/applications/' +
					application +
					'/groups/' +
					groupId,
			)
			.then((r: any) => r.data),
	);

export const addUserToGroup = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
): Promise<string> => {
	return getAuthClient().then((client: AxiosInstance) =>
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
			)
			.then((r: any) => r.data),
	);
};
export const deleteUserFromGroup = (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
): Promise<string> =>
	getAuthClient().then((client: AxiosInstance) =>
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
			)
			.then((r: any) => r.data),
	);
