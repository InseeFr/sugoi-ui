import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import { Group } from '../../model/api/group';

export const getGroups = (
	realm: string,
	application: string,
): Promise<Group[]> =>
	getAuthClient().then((client: AxiosInstance) =>
		client
			.get('/' + realm + '/groups', {
				params: { application },
			})
			.then((r: any) => r.data),
	);
