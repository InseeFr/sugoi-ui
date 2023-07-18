import { getAuthClient } from '../../configuration/axios-configuration';
import User from '../../model/api/user';

export const addAttributes = (
	realm: string,
	id: string,
	attribute_name: string,
	attribute_value: string,
	accessToken?: string,
): Promise<User> =>
	getAuthClient(accessToken)
		.patch(
			'/realms/' +
				realm +
				'/users/' +
				id +
				'/' +
				attribute_name +
				'/' +
				attribute_value,
		)
		.then((r: any) => r.data);

export const deleteAttributes = (
	realm: string,
	id: string,
	attribute_name: string,
	attribute_id: string,
	accessToken?: string,
): Promise<User> =>
	getAuthClient(accessToken)
		.delete(
			'/realms/' +
				realm +
				'/users/' +
				id +
				'/' +
				attribute_name +
				'/' +
				attribute_id,
		)
		.then((r: any) => r.data);

export const addAttributesFromUserStorage = (
	realm: string,
	userStorage: string,
	id: string,
	attribute_name: string,
	attribute_value: string,
	accessToken?: string,
): Promise<User> =>
	getAuthClient(accessToken)
		.patch(
			'/realms/' +
				realm +
				'/storages/' +
				userStorage +
				'/users/' +
				id +
				'/' +
				attribute_name +
				'/' +
				attribute_value,
		)
		.then((r: any) => r.data);

export const deleteAttributesFromUserStorage = (
	realm: string,
	userStorage: string,
	id: string,
	attribute_name: string,
	attribute_id: string,
	accessToken?: string,
): Promise<User> =>
	getAuthClient(accessToken)
		.delete(
			'/realms/' +
				realm +
				'/storages/' +
				userStorage +
				'/users/' +
				id +
				'/' +
				attribute_name +
				'/' +
				attribute_id,
		)
		.then((r: any) => r.data);
