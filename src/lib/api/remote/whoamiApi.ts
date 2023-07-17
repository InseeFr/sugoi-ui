import { getAuthClient } from '../../configuration/axios-configuration';

export const getWhoami = (accessToken?: string) =>
	getAuthClient(accessToken)
		.get('/whoami')
		.then((r) => r.data);
