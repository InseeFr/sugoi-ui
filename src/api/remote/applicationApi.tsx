import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';
import { Pageable } from '../../model/api/pageable';

export const getApplications = (realm: string): Promise<Pageable> =>
	getAuthClient().then((client: AxiosInstance) =>
		client.get('/' + realm + '/applications').then((r: any) => r.data),
	);
