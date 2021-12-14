import { getAuthClient } from '../../configuration/axios-configuration';
import { Group } from '../../model/api/group';

export const getGroups = async (
	realm: string,
	application: string,
): Promise<Group[]> =>
	getAuthClient()
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
): Promise<Group> =>
	getAuthClient()
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
): Promise<Group> =>
	getAuthClient()
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
): Promise<Group> =>
	getAuthClient()
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
): Promise<string> =>
	getAuthClient()
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
): Promise<string> => {
	return getAuthClient()
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
): Promise<string> =>
	getAuthClient()
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
): Promise<Group> =>
	getAuthClient()
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
): Promise<string> => {
	return getAuthClient()
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
): Promise<string> =>
	getAuthClient()
		.delete(
			'/realms/' +
				realm +
				'/applications/' +
				application +
				'/group_manager/members/' +
				userId,
		)
		.then((r: any) => r.data);
