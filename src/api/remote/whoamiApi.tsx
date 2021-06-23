import { AxiosInstance } from 'axios';
import { getAuthClient } from '../../configuration/axios-configuration';

export const getWhoami = () =>
	getAuthClient()
		.then((client: AxiosInstance) => client.get('/whoami'))
		.then((r) => r.data);
