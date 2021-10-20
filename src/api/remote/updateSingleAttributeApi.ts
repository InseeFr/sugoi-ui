import { getAuthClient } from '../../configuration/axios-configuration';
import User from '../../model/api/user';

export const addAttributes = (
	realm: string,
	id: string,
	attribute_name: string,
	attribute_value: string,
): Promise<User> =>
	getAuthClient()
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
): Promise<User> =>
	getAuthClient()
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
