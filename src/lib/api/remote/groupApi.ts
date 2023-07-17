import { getAuthClient } from '../../configuration/axios-configuration';
import { Group } from '../../model/api/group';

export const getGroups = async (
	realm: string,
	application: string,
	accessToken?: string,
): Promise<Group[]> =>
	getAuthClient(accessToken)
		.get(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/groups/',
		)
		.then((r: any) => r.data);

export const getGroup = async (
	realm: string,
	application: string,
	group: string,
	accessToken?: string,
): Promise<Group> =>
	getAuthClient(accessToken)
		.get(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/groups/' +
				group,
		)
		.then((r: any) => r.data);

export const postGroup = async (
	realm: string,
	application: string,
	group: Group,
	accessToken?: string,
): Promise<Group> =>
	getAuthClient(accessToken)
		.post(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/groups/',
			group,
		)
		.then((r: any) => r.data);

export const putGroup = async (
	realm: string,
	application: string,
	group: Group,
	accessToken?: string,
): Promise<Group> =>
	getAuthClient(accessToken)
		.put(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/groups/' +
				group.name,
			group,
		)
		.then((r: any) => r.data);

export const deleteGroup = async (
	realm: string,
	application: string,
	groupId: string,
	accessToken?: string,
): Promise<string> =>
	getAuthClient(accessToken)
		.delete(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/groups/' +
				groupId,
		)
		.then((r: any) => r.data);

export const addUserToGroup = async (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
	accessToken?: string,
): Promise<string> => {
	return getAuthClient(accessToken)
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
		.then((r: any) => r.data);
};
export const deleteUserFromGroup = async (
	realm: string,
	application: string,
	groupId: string,
	userId: string,
	accessToken?: string,
): Promise<string> =>
	getAuthClient(accessToken)
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
		.then((r: any) => r.data);

export const getManagerGroup = async (
	realm: string,
	application: string,
	accessToken?: string,
): Promise<Group> =>
	getAuthClient(accessToken)
		.get(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/group_manager',
		)
		.then((r: any) => r.data);

export const addUserToManagerGroup = async (
	realm: string,
	application: string,
	userId: string,
	accessToken?: string,
): Promise<string> => {
	return getAuthClient(accessToken)
		.put(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/group_manager/members/' +
				userId,
		)
		.then((r: any) => r.data);
};
export const deleteUserFromManagerGroup = async (
	realm: string,
	application: string,
	userId: string,
	accessToken?: string,
): Promise<string> =>
	getAuthClient(accessToken)
		.delete(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/group_manager/members/' +
				userId,
		)
		.then((r: any) => r.data);
