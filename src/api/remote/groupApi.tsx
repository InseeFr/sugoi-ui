import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import { Group } from '../../model/api/group';

interface searchRequest {
	name?: string;
}

export const getGroups = (
	realm: string,
	{ name }: searchRequest,
): Promise<Group[]> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/' + realm + '/groups', {
				params: { name },
			})
			.then((r: any) => r.data),
	);
